import clsx from 'clsx';
import { useState } from 'react';

const Details: React.FC<React.PropsWithChildren<{ title: string }>> = ({ title, children }) => {
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = () => setOpen((s) => !s);

  return (
    <div
      className="my-4 px-4 bg-gray-100 border border-gray-200"
    >
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleOpen();
            e.preventDefault();
          }
        }}
        onClick={toggleOpen}
        aria-expanded={isOpen}
        className="px-4 py-4 -mx-4"
      >
        <span className={clsx('text-gray-400 inline-block transition-all select-none scale-75', { 'rotate-90': isOpen })}>▶</span>
        {' '}
        {title}
      </div>
      {isOpen ? <div className="-mt-4 mb-4">{children}</div> : null}
    </div>
  );
};

export default Details;
