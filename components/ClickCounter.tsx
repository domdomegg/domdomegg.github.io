import { useState } from 'react';

export type Props = React.PropsWithChildren<{
  messages: { [at: number]: string },
  /** name of the thing being clicked */
  clickee: string,
}>;

const ClickCounter: React.FC<Props> = ({ clickee, messages, children }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    const newCount = count + 1;
    // eslint-disable-next-line no-console
    console.log(`You have clicked ${clickee} ${newCount} time${newCount === 1 ? '' : 's'}`);
    // eslint-disable-next-line no-alert
    if (messages[newCount]) alert(messages[newCount]);
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
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  );
};

export default ClickCounter;
