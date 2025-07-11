const ProsePage: React.FC<React.PropsWithChildren> = ({children}) => (<>
	<style>{`
	@media (prefers-color-scheme: dark) {
		body {
			background: var(--color-stone-900);
		}
	}
	`}</style>
	<div className='max-w-2xl mx-auto px-6 my-12 prose prose-stone dark:prose-invert'>{children}</div>
</>
);

export default ProsePage;
