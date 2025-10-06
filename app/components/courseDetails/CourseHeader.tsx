import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { Course, CourseData } from "types";

const CourseHeader = ({ course }: { course: CourseData }) => {
  const progress = useMemo(
    () =>
      course.topics.reduce((sum, c) => sum + (c.progress ?? 0), 0) /
      course.topics.length,
    [course.topics, course]
  );

  return (
    <motion.div
      className="bg-white dark:bg-neumorphic-dark shadow rounded-2xl p-6 min-h-[250px] flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <h1 className="text-2xl font-bold text-gray-800">
        {course.code} - {course.name}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 ">
        Units: {course.units} | Grade: {course.grade}
      </p>
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            key={course.progress}
            className="bg-blue-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
          Progress: {Math.ceil(progress) || 0}%
        </p>
      </div>
    </motion.div>
  );
};

export default CourseHeader;
