import { motion } from "framer-motion";
import { Progress } from "~/components/ui/progress";
import { Button } from "~/components/ui/button";
import { BookOpen, Lightbulb, Sparkles, Brain, Clock } from "lucide-react";
import clsx from "clsx";
import type { Route } from "../+types/root";
import { useAppStore } from "~/lib/zustandStore";
import { useEffect, useState } from "react";
import Loader from "~/components/Loader";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Study on Studently" },
    {
      name: "description",
      content: "Study, analyze notes, take tests, and make arrangements",
    },
  ];
}

export default function StudyDashboard() {
  const { semesters, loadSemesters } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        await loadSemesters();
      } catch (err) {
        setError("Network Error");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  const activeCourses = semesters.flatMap((e) => e.courses);

  const suggestions = [
    "Study Fourier Series for 30 min",
    "Revise Convolution flashcards",
    "Review today's Circuit Theorems notes",
  ];

  const didYouKnow =
    "Did you know? Newton invented calculus while in quarantine.";

  const recommendations = [
    "Hey Eyitayo, good job so far with Circuits and Systems. Exam is in 2 weeks! 📘",
    "Next time you’re reading Convolution, remember the integral limits are from -∞ to ∞. 🔍",
  ];

  return (
    <div
      className={clsx(
        "p-6 space-y-10 min-h-screen transition-colors duration-300",
        "bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100"
      )}
    >
      {isLoading && <Loader />}
      <header className="flex items-center justify-between">
        <h1 className="!text-4xl font-bold tracking-tight">
          Ready to study smart today?
        </h1>
        <Sparkles className="text-indigo-500 w-6 h-6" />
      </header>

      {/* Continue Studying */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-500" /> Continue Studying
        </h2>
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-indigo-500/40">
          {activeCourses.slice(0, 3).map((course) => (
            <Link to={`/courses/${course.id}`} key={course.id}>
              <motion.div
                key={course.id}
                whileHover={{ scale: 1.05 }}
                className={clsx(
                  "min-w-[220px] rounded-2xl p-5 shadow-md border border-gray-200/50 backdrop-blur-md",
                  "bg-white/80 dark:bg-gray-800/50 dark:border-gray-700/60"
                )}
              >
                <h3 className="font-semibold text-lg mb-2">{course.name}</h3>
                <Progress value={course.progress} className="my-3" />
                <Button
                  size="sm"
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700"
                >
                  Continue
                </Button>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Study Suggestions */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-teal-500" /> Study Suggestions
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-teal-500/40">
          {suggestions.map((s, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.08 }}
              className={clsx(
                "min-w-[180px] text-center rounded-2xl py-5 px-4 shadow-md",
                "bg-gradient-to-br from-teal-100 to-green-100 text-teal-900 dark:from-teal-900/60 dark:to-green-800/60 dark:text-teal-100"
              )}
            >
              {s}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Did You Know */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" /> Did You Know?
        </h2>
        <motion.div
          whileHover={{ scale: 1.03 }}
          className={clsx(
            "rounded-2xl shadow-md p-6 text-center",
            "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-900 dark:from-yellow-900/60 dark:to-orange-800/60 dark:text-yellow-100"
          )}
        >
          {didYouKnow}
        </motion.div>
      </section>

      {/* Recommendations */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-pink-500" /> Recommendations
        </h2>
        <div className="space-y-4">
          {recommendations.map((rec, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className={clsx(
                "rounded-2xl shadow-md p-4",
                "bg-gradient-to-r from-pink-100 to-rose-100 text-pink-900 dark:from-pink-900/60 dark:to-rose-800/60 dark:text-pink-100"
              )}
            >
              {rec}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Active Courses */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-500" /> Active Courses
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {activeCourses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.03 }}
              className={clsx(
                "rounded-2xl shadow-md p-5 border border-gray-200/50",
                "bg-white/80 dark:bg-gray-800/60 dark:border-gray-700/60"
              )}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{course.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {course?.progress ?? 0}%
                </span>
              </div>
              <Progress value={course?.progress ?? 0} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
