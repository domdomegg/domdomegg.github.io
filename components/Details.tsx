const Details: React.FC<React.PropsWithChildren<{ title: string }>> = ({ title, children }) => {
  return (
    <details
      className="my-4 px-4 bg-gray-100 border border-gray-200"
    >
      <summary
        className="px-4 py-4 -mx-4 cursor-pointer marker:text-gray-400 marker:scale-75"
      >
        <span className="pl-1.5">
          {title}
        </span>
      </summary>
      <div className="-mt-4 mb-4">{children}</div>
    </details>
  );
};

export default Details;
