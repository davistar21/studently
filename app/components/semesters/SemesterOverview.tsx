import { motion } from "framer-motion";
import type { Semester } from "types";
import GPAGauge from "../gpaGauge";
import { useMemo } from "react";

const SemesterOverview = ({ semester }: { semester: Semester }) => {
  const randomCompletion = 52;
  const gpa = 2;
  const courses = semester.courses ?? [];
  const totalUnits = semester?.units ?? 0;
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">
        {semester?.name} Overview
      </h1>

      {/* Overview Stats */}
      <div className="flex overflow-x-auto py-4 px-2 scrollbar gap-6">
        <motion.div
          className="bg-white dark:bg-glass border-2 dark:border-gray-400 min-w-[200px] flex-shrink-0 rounded-2xl shadow-lg p-4 flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GPAGauge gpa={gpa} />
          <p className="mt-2  dark:text-gray-300 font-semibold text-gray-600">
            GPA
          </p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-glass border-2 dark:border-gray-400 min-w-[200px] flex flex-col gap-3 justify-center flex-shrink-0 rounded-2xl shadow-lg p-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-gray-600  dark:text-gray-300 font-semibold">
            Courses
          </p>
          <p className="text-4xl font-bold text-blue-600">{courses.length}</p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-glass border-2 dark:border-gray-400 min-w-[200px] flex flex-col gap-3 justify-center flex-shrink-0 rounded-2xl shadow-lg p-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-gray-600  dark:text-gray-300 font-semibold">
            Units
          </p>
          <p className="text-4xl font-bold text-green-600">{totalUnits}</p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-glass border-2 dark:border-gray-400 min-w-[200px] flex flex-col gap-3 justify-center flex-shrink-0 rounded-2xl shadow-lg p-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-600  dark:text-gray-300 font-semibold">
            Completion
          </p>
          <p className="text-3xl font-bold  text-pink-800">
            {randomCompletion}%
          </p>
        </motion.div>
        <motion.div
          className="bg-white dark:bg-glass border-2 dark:border-gray-400 min-w-[200px] flex flex-col gap-3 justify-center flex-shrink-0 rounded-2xl shadow-lg p-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-600  dark:text-gray-300 font-semibold">
            Days to Exam
          </p>
          <p className="text-3xl font-bold  text-red-800">27</p>
        </motion.div>
      </div>
    </div>
  );
};

export default SemesterOverview;
