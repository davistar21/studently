import { motion } from "framer-motion";

export default function PoweredByAWS() {
  return (
    <div className="h-[40vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 mx-auto">
      <section className="flex items-center justify-center gap-4 p-6 bg-gray-50 rounded-lg shadow-md max-w-sm my-12">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
          alt="AWS Logo"
          className="w-24 h-auto"
        />
        <span className="text-gray-700 font-semibold text-lg md:text-xl">
          Powered by <span className="text-orange-600">AWS Services</span>
        </span>
      </section>
    </div>
  );
}
