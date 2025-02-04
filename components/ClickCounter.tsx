import {useState} from 'react';

export type Props = React.PropsWithChildren<{
	messages: Record<number, string>;
	/** name of the thing being clicked */
	clickee: string;
}>;

export const ClickCounter: React.FC<Props> = ({clickee, messages, children}) => {
	const [count, setCount] = useState(0);

	const increment = () => {
		const newCount = count + 1;

		console.log(`You have clicked ${clickee} ${newCount} time${newCount === 1 ? '' : 's'}`);

		if (messages[newCount]) {
			// eslint-disable-next-line no-alert
			alert(messages[newCount]);
		}

		setCount(newCount);
	};

	return (
		<div
			onClick={increment}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					increment();
				}
			}}
			role='button'
			tabIndex={0}
		>
			{children}
		</div>
	);
};
