import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router";
import GPAGauge from "~/components/gpaGauge";
import { Button } from "~/components/ui/button";
import { useAppStore } from "~/lib/zustandStore";

export default function Semesters() {
  const { addSemester, semesters, isLoading } = useAppStore();
  const handleAddSemester = async () => {
    await addSemester();
  };

  return (
    <div className="p-6 min-h-screen bg-[url('/images/bg-soft-light.png')] dark:bg-[url('/images/bg-soft-dark.png')] bg-cover bg-repeat bg-center relative">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h1 className="text-2xl font-bold mb-6 text-blue-600 dark:!text-gradient-light-blue">
          Your Semesters
        </h1>
        <motion.button
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          onClick={handleAddSemester}
          className="primary-gradient text-white font-semibold rounded-full py-4 px-6 w-fit "
        >
          + Add Semester
        </motion.button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <div className="bg-white min-h-[300px] dark:bg-glass shadow-md rounded-2xl p-5 flex flex-col justify-between border-2 dark:border-gray-400 animate-pulse">
                <div className="loader m-auto"></div>
              </div>
            ))
          : semesters.map((sem, idx) => (
              <Link to={`/semesters/${sem.id}`} key={idx}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="bg-white dark:bg-glass shadow-md rounded-2xl p-5 flex flex-col justify-between border-2 dark:border-gray-400"
                >
                  <div className="flex items-center  mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {sem.name}
                    </h2>
                    <div className="ml-auto">
                      <GPAGauge gpa={0} />
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <p>📚 Courses: {sem.courses.length}</p>
                    <p>🔢 Units: 0</p>
                  </div>

                  <Button className="mt-4 inline-block text-center bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition">
                    View Courses
                  </Button>
                </motion.div>
              </Link>
            ))}
      </div>
    </div>
  );
}
