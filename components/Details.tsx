const Details: React.FC<React.PropsWithChildren<{title: string}>> = ({title, children}) => {
	return (
		<details
			className='my-4 px-4 bg-stone-100 border dark:bg-stone-800 border-stone-200 dark:border-stone-600'
		>
			<summary
				className='px-4 py-4 -mx-4 cursor-pointer marker:text-stone-400 marker:scale-75'
			>
				<span className='pl-1.5'>
					{title}
				</span>
			</summary>
			<div className='-mt-4 mb-4'>{children}</div>
		</details>
	);
};

export default Details;
