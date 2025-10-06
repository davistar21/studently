import { motion } from "framer-motion";
import { Link } from "react-router";
import AppDialog from "~/components/AppDialog";
import { Button } from "~/components/ui/button";
import capitalizeWords from "~/utils/capitalizeWords";
import { type FormEvent, useState } from "react";
import type { CourseData } from "types";
import FileUploader from "../FileUploader";

type CourseListProp = {
  semesterId: string;
  courses: CourseData[];
  addCourse: (course: CourseData) => void;
};

const CourseList: React.FC<CourseListProp> = ({
  semesterId,
  courses,
  addCourse,
}) => {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;

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
      topics: [],
      semesterId,
    };

    addCourse(newCourse);
    form.reset();
  }

  return (
    <div>
      <div className="flex mb-4 justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Courses</h2>
        <div className="flex gap-2">
          <AppDialog
            triggerClassName=""
            triggerLabel="Upload Outline"
            title="Add Course Outline"
            description="Upload file to extract courses and topics"
          >
            <form className="space-y-2" onSubmit={() => {}}>
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
          <AppDialog
            triggerClassName=""
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
        </div>
      </div>

      <div className="flex gap-6 scrollbar overflow-x-auto pb-4">
        {courses.length !== 0 ? (
          courses.map((course, idx) => (
            <Link to={`courses/${course.id}`} key={idx}>
              <motion.div
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
          ))
        ) : (
          <div className="my-6 text-center text-gray-500 animate-pulse">
            No courses added yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
