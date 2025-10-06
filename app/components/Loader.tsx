interface LoaderProps {
  statusText?: string;
}
const Loader: React.FC<LoaderProps> = ({ statusText = "Loading..." }) => {
  return (
    <div className="h-[100vh] inset-0 fixed bg-[#ffffff80] dark:bg-[#00000080] flex items-center justify-center z-999">
      <div className="flex flex-col gap-2 items-center animate-pulse">
        <div className="loader"></div>
        <div>{statusText}</div>
      </div>
    </div>
  );
};

export default Loader;
