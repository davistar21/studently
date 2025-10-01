import { motion } from "framer-motion";
import GPAGauge from "../components/gpaGauge";
import { Link, useParams } from "react-router";
import AppDialog from "~/components/AppDialog";
import { Button } from "~/components/ui/button";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useAppStore } from "~/lib/zustandStore";
import type { Course } from "types";
import FileUploader from "~/components/FileUploader";
import capitalizeWords from "~/utils/capitalizeWords";

const SemesterPage = () => {
  const gpa = 0.0;
  const { semesterId } = useParams();
  // const { semesters, getSemester, addCourse } = useAppStore();
  const { semesters, getSemesterById, addCourseToSemester } = useAppStore();
  // const [courses, setCourses] = useState<Course[]>([]);
  // const [totalUnits, setTotalUnits] = useState(0);
  const semester = useMemo(() => {
    if (!semesterId) return;
    return getSemesterById(semesterId) ?? null;
  }, [semesterId, semesters]);
  const courses = semester?.courses ?? [];
  const totalUnits = semester?.units ?? 0;

  useEffect(() => {
    // if (!semesterId) return;
    // const semester = getSemesterById(semesterId);
    // const semesterCourses = semester ? semester.courses : [];
    // setCourses(semesterCourses);
    // setTotalUnits(semesterCourses.reduce((sum, c) => sum + c.units, 0));
  }, [semesterId]);

  const randomCompletion = 56;
  function handleEdit(id: string) {}
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form || !semesterId) return;

    const formData = new FormData(form);
    const name = formData.get("course-name") as string;
    const code = formData.get("course-code") as string;
    const units = formData.get("course-units") as string;
    if (!name || !code || !units) return;

    const newCourse = {
      id: crypto.randomUUID().split("-")[0],
      name: capitalizeWords(name),
      code: code.toUpperCase(),
      units: Number(units),
    };
    // setCourses((prev) => [...prev, newCourse]);
    addCourseToSemester(semesterId, newCourse);
    form.reset();
  }
  if (!semester)
    return (
      <div className="p-6 min-h-screen bg-[url('/images/bg-soft-light.png')] dark:bg-[url('/images/bg-soft-dark.png')] bg-cover bg-repeat bg-center relative space-y-8">
        <div>Semester not found</div>
      </div>
    );
  return (
    <div className="p-6 min-h-screen bg-[url('/images/bg-soft-light.png')] dark:bg-[url('/images/bg-soft-dark.png')] bg-cover bg-repeat bg-center relative space-y-8">
      {/* Header */}
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

      {/* Courses Deck */}
      <div>
        {/* Example Add Course dialog */}

        <div className="flex mb-4 justify-between items-center">
          {courses.length !== 0 && (
            <h2 className="text-xl font-semibold text-gray-800">Courses</h2>
          )}
          <AppDialog
            triggerLabel="Add Course"
            title="Add a new course"
            description="Fill in the course details below."
          >
            <form className="space-y-2" onSubmit={handleSubmit}>
              <label htmlFor="course-code" className="w-full">
                <input
                  type="text"
                  name="course-code"
                  id="course-code"
                  placeholder="Course Code"
                  className="border rounded-md uppercase placeholder:capitalize"
                />
              </label>
              <label htmlFor="course-name" className="w-full">
                <input
                  type="text"
                  name="course-name"
                  id="course-name"
                  placeholder="Course Name"
                  className=" border rounded-md uppercase  placeholder:capitalize"
                />
              </label>
              <label htmlFor="course-units" className="w-full">
                <input
                  type="number"
                  name="course-units"
                  id="course-units"
                  placeholder="Units"
                  className=" border rounded-md "
                />
              </label>
              <Button
                type="submit"
                className="primary-button text-white w-fit ml-auto"
              >
                Save
              </Button>
            </form>
          </AppDialog>
          {/* <button className="bg-blue-500 font-semibold p-2 rounded-full">
            + Add Course
          </button> */}
        </div>
        <div className="flex gap-6 scrollbar overflow-x-auto pb-4">
          {courses.length !== 0 &&
            courses.map((course, idx) => {
              // const id = crypto.randomUUID();

              return (
                <Link to={`courses/${course.id}`} key={idx}>
                  <motion.div
                    key={idx}
                    className="w-[200px] bg-neumorphic dark:bg-neumorphic-dark shadow rounded-2xl p-4 flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                  >
                    <h3 className="font-bold text-gray-800 uppercase dark:text-gray-200">
                      {course.code}
                    </h3>

                    <p
                      title={course.name}
                      className="truncate capitalize text-gray-600 dark:text-gray-400"
                    >
                      {course.name}
                    </p>
                    <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                      <p>Units: {course.units}</p>
                      <p>Grade: {course.grade || "-"}</p>
                      <p>Topics: {course.topics?.length ?? 0}</p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
        </div>
      </div>

      {/* GPA Table */}
      <div>
        <div className="flex justify-between mb-4 items-center">
          <h2 className="text-xl font-semibold  text-gray-800">GPA Table</h2>
          {/*p-2 bg-green-600 rounded-md text-white */}
          <AppDialog
            triggerLabel="Upload Result"
            title="Upload Result"
            description="Upload this semester's result to automatically add them to the table"
          >
            <form className="space-y-2" onSubmit={handleSubmit}>
              <label htmlFor="course-code" className="w-full">
                <FileUploader onFileSelect={() => {}} />
              </label>

              <Button
                type="submit"
                className="primary-button text-white w-fit ml-auto"
              >
                Upload
              </Button>
            </form>
          </AppDialog>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-2xl shadow">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Course</th>
                <th className="p-3 text-left">Units</th>
                <th className="p-3 text-left">Grade</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c, idx) => (
                <tr
                  key={idx}
                  className="border-b last:border-none text-gray-800"
                >
                  <td className="p-3">{c.code}</td>
                  <td className="p-3">{c.units}</td>
                  <td className="p-3">{c.grade}</td>
                  <td>
                    <AppDialog
                      triggerLabel="Edit"
                      title="Add a new course"
                      description="Fill in the course details below."
                    >
                      <form
                        className="space-y-2"
                        onSubmit={() => {
                          handleEdit(c.id);
                        }}
                      >
                        <label htmlFor="course-code" className="w-full">
                          <input
                            type="text"
                            name="course-code"
                            id="course-code"
                            placeholder="Course Code"
                            className="border rounded-md uppercase placeholder:capitalize"
                          />
                        </label>
                        <label htmlFor="course-name" className="w-full">
                          <input
                            type="text"
                            name="course-name"
                            id="course-name"
                            placeholder="Course Name"
                            className=" border rounded-md uppercase  placeholder:capitalize"
                          />
                        </label>
                        <label htmlFor="course-units" className="w-full">
                          <input
                            type="number"
                            name="course-units"
                            id="course-units"
                            placeholder="Units"
                            className=" border rounded-md "
                          />
                        </label>
                        <Button
                          type="submit"
                          className="primary-button text-white w-fit ml-auto"
                        >
                          Save
                        </Button>
                      </form>
                    </AppDialog>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold text-gray-600">
                <td className="p-3">Total</td>
                <td className="p-3">{totalUnits}</td>
                <td className="p-3">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SemesterPage;
