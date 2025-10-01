// src/pages/CourseDetailPage.tsx
import { motion } from "framer-motion";
import AppDialog from "~/components/AppDialog";
import { Button } from "~/components/ui/button";
import TopicDeck from "~/components/TopicDeck";
import { useParams } from "react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useAppStore } from "~/lib/zustandStore";
import type { Topic, Course } from "types";

const CourseDetailsPage = () => {
  // Dummy data
  const { semesterId, courseId } = useParams();
  // const { getCourse, getSemester, semesters } = useAppStore();
  const { semesters, getSemesterById } = useAppStore();
  // const [course, setCourse] = useState<Course | null>(null);
  // const dummyTopics: Topic[] = [
  //   {
  //     id: "1",
  //     title: "Partial Derivatives and Gradient Vectors",
  //     status: "completed",
  //   },
  //   {
  //     id: "2",
  //     title: "Multiple Integrals: Double and Triple Integrals",
  //     status: "in_progress",
  //   },
  //   {
  //     id: "3",
  //     title: "Chain Rule for Multivariable Functions",
  //     status: "not_started",
  //   },
  //   {
  //     id: "4",
  //     title: "Vector Calculus: Divergence and Curl",
  //     status: "not_completed",
  //   },
  //   {
  //     id: "5",
  //     title: "Surface Integrals and Green's Theorem",
  //     status: "completed",
  //   },
  // ];

  // const [topics, setTopics] = useState<Topic[]>([]);
  useEffect(() => {
    if (!courseId || !semesterId) return;
    // const course = getCourse(semesterId, courseId);
    // if (!course) return;
    // setCourse(course);
  }, [courseId, semesterId]);
  // const course = {
  //   code: "MTH101",
  //   name: "Calculus I",
  //   units: 3,
  //   grade: "-",
  //   progress: 78,
  //   topics: ["Limits", "Derivatives", "Integrals"],
  // };
  function handleSubmit() {}
  function handleAddTopic(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // const form = e.currentTarget.closest("form");
    // if (!form) return;
    // const formData = new FormData(form);
    // const title = formData.get("course-topic") as string;
    // if (!title) return;
    // const newTopic: Topic = {
    //   id: crypto.randomUUID(),
    //   title,
    //   status: "not_started",
    // };
    // setTopics((prev) => [...prev, newTopic]);
  }

  const course = useMemo(() => {
    const sem = semesterId ? getSemesterById(semesterId) : null;
    return sem?.courses.find((c) => c.id === courseId) ?? null;
  }, [semesterId, courseId, semesters]);
  const topics = useMemo(() => course?.topics ?? [], [course]);

  if (!course) return <div>Failed to fetch course</div>;
  return (
    <div className="p-6 min-h-screen bg-[url('/images/bg-soft-light.png')] dark:bg-[url('/images/bg-soft-dark.png')] bg-cover bg-repeat bg-center relative space-y-8">
      {/* Header */}
      <motion.div
        className="bg-white shadow rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">
          {course.code} - {course.name}
        </h1>
        <p className="text-gray-600 mt-1">
          Units: {course.units} | Grade: {course.grade}
        </p>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              key={course.progress} // Re-triggers animation on progress change
              className="bg-blue-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Progress: {course.progress}%
          </p>
        </div>
      </motion.div>
      <div className="topics">
        <div className="flex mb-4 justify-between items-center">
          {/* <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            onClick={handleAddTopic}
            className="primary-gradient text-white font-semibold rounded-full py-4 px-6 w-fit "
          >
            + Add Topic
          </motion.button> */}

          {topics.length > 0 && (
            <h2 className="text-xl font-semibold text-gray-800">Topics</h2>
          )}
          <AppDialog
            triggerLabel="Add Topic"
            title="Add a new course"
            description="Fill in the course details below."
          >
            <form className="space-y-2" onSubmit={handleAddTopic}>
              <label htmlFor="course-topic" className="w-full">
                <input
                  type="text"
                  name="course-topic"
                  id="course-topic"
                  placeholder="Add Topic"
                  className="border rounded-md capitalize"
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
        <TopicDeck topics={topics} />
      </div>
      {/* Tabs / Sections */}
      <div className="flex scrollbar p-2 overflow-x-auto gap-6">
        {/* Study Assistant */}
        <motion.div
          className="bg-white shadow rounded-2xl min-w-[300px] p-6"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-lg font-semibold mb-3">Study Assistant</h2>
          <p className="text-gray-600 text-sm">
            AI-powered study helper coming soon.
          </p>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          className="bg-white shadow rounded-2xl min-w-[300px] p-6"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-lg font-semibold mb-3">
            Personalized Recommendations
          </h2>
          <p className="text-gray-600 text-sm">
            Smart insights tailored to your study habits.
          </p>
        </motion.div>

        {/* Q&A */}
        <motion.div
          className="bg-white shadow rounded-2xl min-w-[300px] p-6"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-lg font-semibold mb-3">Q&A Section</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>❓ What’s the difference between limit and derivative?</li>
            <li>❓ How to approach integration by parts?</li>
          </ul>
          <button className="mt-3 text-sm text-blue-600 hover:underline">
            Add a Question
          </button>
        </motion.div>
      </div>

      {/* Topics */}
      {/* <div>
        <h2 className="text-xl font-semibold mb-3">Topics</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {course.topics.map((topic, idx) => (
            <motion.div
              key={idx}
              className="min-w-[150px] bg-white text-gray-800 rounded-xl shadow p-4 text-center"
              whileHover={{ scale: 1.05 }}
            >
              {topic}
            </motion.div>
          ))}
        </div>
      </div> */}

      {/* Actions */}
      <div className="flex gap-4">
        <AppDialog
          triggerLabel="Add Topic"
          title="Add a new topic"
          description="Fill in the topic details below."
        >
          <form className="space-y-2" onSubmit={handleSubmit}>
            <label htmlFor="course-name" className="w-full">
              <input
                type="text"
                name="course-name"
                id="course-name"
                placeholder="Course Name"
                className=" border rounded-md"
              />
            </label>
            <label htmlFor="course-code" className="w-full">
              <input
                type="text"
                name="course-code"
                id="course-code"
                placeholder="Course Code"
                className="border rounded-md "
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
              className="bg-blue-500 hover:bg-blue-700 transition ml-auto text-white"
            >
              Save
            </Button>
          </form>
        </AppDialog>
        {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add Topic
        </button> */}
        <button className="primary-button w-fit">Analyze with AI</button>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
