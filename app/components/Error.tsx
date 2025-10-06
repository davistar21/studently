import React from "react";
import { Link } from "react-router";

export interface ErrorProps {
  error?: string;
  retry?: (...args: any[]) => Promise<void>;
}

const defaultErrorMessage =
  "Oops! Something went wrong. Please try again later.";

const Error: React.FC<ErrorProps> = ({
  error,
  retry = () => window.location.reload(),
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen fixed inset-0 z-8">
      <div className="min-h-[50vh] flex items-cente">
        <div className="max-w-md w-full bg-white h-fit dark:bg-gray-800 border border-red-400 text-red-700 dark:text-red-400 px-6 py-4 rounded-md shadow-md mx-auto mt-50 flex flex-col">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error || defaultErrorMessage}</p>
          <div className="flex justify-between items-center gap-2 mt-5">
            <Link
              to="/dashboard"
              className=" text-white font-semibold rounded-md underline hover:opacity-80 transition hover:scale-101 duration-500 opacity-100 scale-100"
            >
              Back to Homepage
            </Link>
            <button
              className="ml-auto py-2 px-4 border-2 border-red-400 rounded-md font-semibold hover:opacity-80 transition hover:scale-101 duration-500  opacity-100 scale-100"
              onClick={retry}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
