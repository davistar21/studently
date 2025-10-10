import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import GPAGauge from "~/components/gpaGauge";
import { Button } from "~/components/ui/button";
import { useAppStore } from "~/lib/zustandStore";
import { fetchAuthSession } from "aws-amplify/auth";
import Error from "~/components/Error";
import Loader from "~/components/Loader";
import type { Route } from "../+types/root";
import { ScoreCircle } from "~/components/ScoreCircle";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Studently | Semesters" },
    { name: "description", content: "View all your saved semesters" },
  ];
}

export default function Semesters() {
  const {
    addSemester,
    semesters,
    isLoading,
    loadSemesters,
    error,
    calculateGPA,
  } = useAppStore();
  const [statusText, setStatusText] = useState("Loading semesters...");
  const [err, setErr] = useState<string | null>(null);
  const handleAddSemester = async () => {
    try {
      setStatusText("Adding semester...");
      await addSemester();
    } catch (err) {
      setErr("Failed to add semester. Please try again.");
    } finally {
      setStatusText("Loading semesters...");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await loadSemesters();
        useAppStore().setSemesters(semesters);
      } catch (err) {
        setErr("Failed to load semesters. Please try again.");
      } finally {
        setStatusText("Loading semesters...");
      }
    })();
  }, []);

  if (error) return <Error error={error} retry={handleAddSemester} />;
  if (isLoading) return <Loader statusText={statusText} />;
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
      {semesters.length === 0 ? (
        <p className="text-sm text-gray-500 mx-auto mt-12 w-full text-center">
          No semesters yet. Click{" "}
          <span className="font-semibold">Add Semester</span>
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {semesters.map((sem, idx) => {
            const gpa = calculateGPA(sem.id!);
            return (
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
                      <GPAGauge gpa={gpa} />
                      {/* <ScoreCircle value={gpa} /> */}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <p>📚 Courses: {sem.courses?.length ?? 0}</p>
                    <p>
                      🔢 Units:{" "}
                      {sem.courses?.reduce((sum, c) => sum + c.units, 0) ?? 0}
                    </p>
                  </div>

                  <Button className="mt-4 inline-block text-center bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition">
                    View Courses
                  </Button>
                </motion.div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
