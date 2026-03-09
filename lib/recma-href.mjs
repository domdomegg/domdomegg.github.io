import path from 'node:path';

export default function recmaHref() {
	return (ast, vfile) => {
		const pathFromRoot = path.relative(vfile.cwd, path.join(vfile.dirname, vfile.stem));
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
}
