import type {Toc, TocEntry} from '@stefanprobst/rehype-extract-toc';
import clsx from 'clsx';
import {useEffect, useState} from 'react';

const TableOfContents: React.FC<{title: string; tableOfContents: Toc}> = ({title, tableOfContents}) => {
	const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

	useEffect(() => {
		const handleScroll = () => {
			const newActiveSectionId = getActiveSectionId(tableOfContents);
			setActiveSectionId(newActiveSectionId);
		};

		window.addEventListener('scroll', handleScroll, {passive: true});
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [tableOfContents]);

	return (
		<nav className='text-sm'>
			<a href='#blog-headline' className={clsx('block ml-8 !no-underline hover:!text-stone-900 dark:hover:!text-stone-300 transition-all', activeSectionId === null ? '!text-stone-900 dark:!text-stone-300 text-base mb-8' : '!text-stone-400 mb-6')}>{title}</a>
			{tableOfContents.map((entry) => <TableOfContentsEntry key={entry.id} entry={entry} activeSectionId={activeSectionId} />)}
		</nav>
	);
};

const TableOfContentsEntry: React.FC<{entry: TocEntry; activeSectionId: string | null}> = ({entry, activeSectionId}) => {
	return (
		<div className={clsx('ml-8 group', entry.depth === 2 && 'mb-6')}>
			<a href={`#${entry.id}`} className={clsx('block mb-2 !no-underline hover:!text-stone-900 dark:hover:!text-stone-300 transition-all', activeSectionId === entry.id ? '!text-stone-900 dark:!text-stone-300' : '!text-stone-400')}>{entry.value}</a>
			{(entry.children ?? []).map((childEntry) => <TableOfContentsEntry key={childEntry.id} entry={childEntry} activeSectionId={activeSectionId} />)}
		</div>
	);
};

const getActiveSectionId = (tableOfContents: Toc): string | null => {
	const sectionIds = getSectionIds(tableOfContents);
	if (typeof window === 'undefined' || sectionIds.length === 0) {
		return null;
	}

	for (let i = 0; i < sectionIds.length; i++) {
		if (!isSectionPassedOrActive(sectionIds[i])) {
			if (i === 0) {
				return null;
			}

			return sectionIds[i - 1];
		}
	}

	return sectionIds[sectionIds.length - 1];
};

const getSectionIds = (tableOfContents: Toc): string[] => {
	return tableOfContents.flatMap((entry) => [...(entry.id ? [entry.id] : []), ...getSectionIds(entry.children ?? [])]);
};

const isSectionPassedOrActive = (id: string) => {
	const element = document.getElementById(id);
	if (!element) {
		console.error(`Element with id "${id}" not found`);
		return false;
	}

	const rect = element.getBoundingClientRect();
	const windowHeight = window.innerHeight || document.documentElement.clientHeight;
	const consideredActivePoint = Math.min(200, windowHeight / 3);

	return rect.top <= consideredActivePoint;
};

export default TableOfContents;
