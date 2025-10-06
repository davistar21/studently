import { motion } from "framer-motion";
import type { SemesterData } from "types";
import GPAGauge from "../gpaGauge";
import React, { useEffect, useMemo, useState } from "react";
import { Edit2 } from "lucide-react";
import { useAppStore } from "~/lib/zustandStore";
import AppDialog from "../AppDialog";
import { Button } from "../ui/button";
import { SemesterAPI } from "~/utils/semesterHelpers";
import Loader from "../Loader";
import Error from "../Error";

const SemesterOverview = ({ semester }: { semester: SemesterData }) => {
  // const semesterProgress = useMemo(
  //   () => semester.courses?.reduce((sum, c) => sum + (c.progress ?? 0), 0),
  //   [semester.courses]
  // );

  const { calculateGPA, semesters } = useAppStore();
  let semesterProgress = 0;
  const allCourses = semesters.flatMap((s) => s.courses || []);
  const allCoursesTopics = allCourses.flatMap((c) => c.topics || []);
  allCoursesTopics.forEach(t=>t.progress && (semesterProgress += t.progress));
  semesterProgress = Math.ceil(semesterProgress / allCoursesTopics.length) || 0;
  const gpa = useMemo(() => calculateGPA(semester.id!), [semester]);
  // const courses = semester.courses ?? [];
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const courses = useMemo(() => semester.courses ?? [], [semester]);
  const totalUnits = useMemo(
    () => courses.reduce((sum, c) => sum + c.units, 0),
    [courses]
  );
  const [semesterName, setSemesterName] = useState(semester?.name);
  // const totalUnits =
  // semester?.courses?.reduce((sum, c) => sum + c.units, 0) ?? 0;
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await SemesterAPI.update({ ...semester, name: semesterName! });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update semester"
      );
      console.error("Failed to update semester", err);
    } finally {
      setIsLoading(false);
    }
  };
  if (error) return <Error error={error} />;
  return (
    <div>
      {isLoading && <Loader statusText="Updating semester..." />}
      <div className="flex justify-between items-baseline">
        <h1 className="text-2xl font-bold text-gray-800">
          {semester?.name} Overview
        </h1>
        <AppDialog
          triggerClassName="!bg-gradient-to-r from-transparent to-transparent"
          triggerLabel={
            <div onClick={() => setSemesterName(semester?.name)}>
              <Edit2 size={20} className="text-black dark:text-white" />
            </div>
          }
          title="Edit Semester Name"
          description="Update the name of your semester"
        >
          <form className="space-y-2 text-black" onSubmit={handleUpdate}>
            <input
              type="text"
              name="semester-name"
              placeholder="Semester Name"
              value={semesterName || semester?.name || ""}
              onChange={(e) => setSemesterName(e.target.value)}
            />

            <Button
              type="submit"
              className="primary-button text-white ml-auto w-fit"
            >
              Save
            </Button>
          </form>
        </AppDialog>
      </div>
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
            {semesterProgress ?? 0}%
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
          <p className="text-3xl font-bold  text-emerald-800">-</p>
        </motion.div>
      </div>
    </div>
  );
};

export default SemesterOverview;
