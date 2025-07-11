import type {NextConfig} from 'next';
import type hast from 'hast';
import type {Plugin} from 'unified';
import type {Program} from 'estree';
import path from 'node:path';

const rehypeAddHoverableFootnotes = () => {
	return async (tree: hast.Root) => {
		const {visit} = await import('unist-util-visit');

		// STEP 1: Extract footnote contents
		// Map from id to footnote content (array of elements)
		const footnoteMap = new Map();
		visit(tree, 'element', (node) => {
			if (node.tagName === 'li' && node.properties?.id?.toString().startsWith('user-content-fn-')) {
				const footnoteId = node.properties.id;
				const relevantChildren = node.children
					// Remove empty nodes
					.filter((c) => c.type !== 'text' || c.value !== '\n')
					// Remove backreference links
					.filter((c) => 'properties' in c && c.properties?.dataFootnoteBackref === undefined)
					.map((c) => ({
						...c,
						children: 'children' in c ? c.children.filter((cc) => !('properties' in cc) || cc.properties?.dataFootnoteBackref === undefined) : undefined,
					}));

				footnoteMap.set(footnoteId, relevantChildren);
			}
		});

		// STEP 2: Inject footnotes inline
		visit(tree, 'element', (node) => {
			const footnoteChildren = node.children.filter((c) => c.type === 'element' && c.tagName === 'sup' && c.children?.[0].type === 'element' && c.children[0].properties.dataFootnoteRef) as (hast.Element & {children: [hast.Element]})[];
			for (const footnoteNode of footnoteChildren) {
				const footnoteId = footnoteNode.children[0].properties.href?.toString().slice(1);
				const relevantChildren = footnoteMap.get(footnoteId);

				// Set the parent to relative, so the footnote can be positioned relative to it with the right width
				node.properties ??= {};
				node.properties.className = `${node.properties.className?.toString() ?? ''} relative`.trim();

				// React doesn't like nesting elements (like p's, ul's, etc.) inside of p's, because technically this is invalid HTML
				// This causes hydration errors when we insert our footnote if it contains these elements
				// Our hacky solution is to change the outer p's to spans with custom formatting (yuck)
				// NB: this still breaks for headings, but footnotes are rare in headings so I haven't bothered fixing this
				if (node.tagName === 'p') {
					node.tagName = 'span';
					node.properties.className += ' block my-5';
				}

				// Update the footnote tooltip trigger (anchor element) to have a wider hitbox, so it's easier to use and you can hover from the trigger to the tooltip itself
				// We also wrap the inner content in a span so the outline still is in the right place though
				footnoteNode.children[0].properties.className = 'p-4 -m-4 group outline-none';
				footnoteNode.children[0].children = [{
					type: 'element',
					tagName: 'span',
					properties: {
						className: 'group-focus-visible:outline-2 outline-blue-600 rounded-xs',
					},
					children: footnoteNode.children[0].children,
				}];

				// Create the footnote tooltip
				node.children.splice(node.children.indexOf(footnoteNode) + 1, 0, {
					type: 'element',
					tagName: 'span',
					properties: {
						className: 'absolute block !-mt-2 bg-white dark:bg-stone-800 border w-full border-stone-300 dark:border-stone-600 rounded-sm shadow-sm px-3 text-xs z-10 transition-all origin-top-left invisible scale-0 [sup:hover_+_&]:visible [sup:focus-within_+_&]:visible hover:visible focus-within:visible [sup:hover_+_&]:scale-100 [sup:focus-within_+_&]:scale-100 hover:scale-100 focus-within:scale-100',
					},
					children: relevantChildren,
				});
			}
		});
	};
};

/** @type {import("unified")} */
const recmaHref: Plugin<[], Program> = () => (ast, vfile) => {
	const pathFromRoot = path.relative(vfile.cwd, path.join(vfile.dirname!, vfile.stem!));
	const rootRelativeUrl = `/${pathFromRoot.startsWith('pages/') ? pathFromRoot.slice('pages/'.length) : pathFromRoot}/`;

	ast.body.push({
		type: 'ExpressionStatement',
		expression: {
			type: 'AssignmentExpression',
			operator: '=',
			left: {
				type: 'MemberExpression',
				object: {
					type: 'Identifier',
					name: 'MDXContent',
				},
				property: {
					type: 'Identifier',
					name: 'href',
				},
				computed: false,
				optional: false,
			},
			right: {
				type: 'Literal',
				value: rootRelativeUrl,
			},
		},
	});
};

export default async (): Promise<NextConfig> => {
	const nextMDX = (await import('@next/mdx')).default;

	const remarkFrontmatter = (await import('remark-frontmatter')).default;
	const remarkGfm = (await import('remark-gfm')).default;

	const rehypeSlug = (await import('rehype-slug')).default;
	const rehypeExtractToc = (await import('@stefanprobst/rehype-extract-toc')).default;
	const rehypeExtractTocExport = (await import('@stefanprobst/rehype-extract-toc/mdx')).default;

	const recmaMdxDisplayname = (await import('recma-mdx-displayname')).default;
	const recmaMdxFrontmatter = (await import('recma-mdx-frontmatter')).default;
	const recmaNextjsStaticProps = (await import('recma-nextjs-static-props')).default;

	const withMDX = nextMDX({
		extension: /\.mdx?$/,
		options: {
			remarkPlugins: [remarkFrontmatter, remarkGfm],
			rehypePlugins: [rehypeSlug, rehypeExtractToc, rehypeExtractTocExport, rehypeAddHoverableFootnotes],
			recmaPlugins: [recmaMdxDisplayname, recmaMdxFrontmatter, recmaHref, recmaNextjsStaticProps],
		},
	});

	const nextConfig: NextConfig = {
		output: 'export',
		distDir: 'dist',
		reactStrictMode: true,
		images: {
			unoptimized: true,
		},
		pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
		trailingSlash: true,
		devIndicators: false,
	};

	return withMDX(nextConfig);
};
