import { Link } from "react-router"; // or your router’s Link
import { motion, AnimatePresence } from "framer-motion";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Studently | 404" },
    { name: "description", content: "Page not Found" },
  ];
}

export default function NotFoundPage() {
  return (
    <div className="relative w-full min-h-screen bg-gray-50 pb-16 dark:bg-gray-900 flex items-center justify-center overflow-hidden">
      {/* Overlay blur */}
      <AnimatePresence>
        <motion.div
          key="overlay"
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>

      <motion.div
        key="content"
        className="relative z-7 flex flex-col items-center px-4 sm:px-6 max-w-lg text-center"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
          duration: 0.5,
        }}
      >
        {/* SVG / Illustration */}
        <div className="w-full max-w-xs mb-8">
          {/* You can inline the SVG or use <img src=... /> */}
          <img
            src="https://stories.freepiklabs.com/storage/13391/355-404-Error_Artboard-1.svg"
            alt="404 illustration"
            className="w-full h-auto"
          />
        </div>

        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Oops! Page not found.
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Sorry, we couldn’t find that page. Let’s get you back home.
        </p>

        <Link to="/dashboard">
          <motion.button
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let’s guide you back home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
