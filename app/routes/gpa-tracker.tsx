import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { Download, TrendingUp, Target, BookOpen } from "lucide-react";
import type { Route } from "../+types/root";
import { useAppStore } from "~/lib/zustandStore";
import { useEffect, useMemo } from "react";
import Loader from "~/components/Loader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Studently | GPA Tracker" },
    {
      name: "description",
      content: "View and analyze changes and trends in GPA",
    },
  ];
}

export default function GpaTracker() {
  const { calculateCGPA, semesters, calculateGPA, loadSemesters, isLoading } =
    useAppStore();
  useEffect(() => {
    loadSemesters();
  }, []);
  const semestersUnits = useMemo(() => {
    const semestersUnitsArray = semesters.flatMap((semester) => semester.units);
    return semestersUnitsArray.reduce((sum, c) => sum + c, 0);
  }, []);
  const semestersCoursesLength = useMemo(
    () => semesters.flatMap((semester) => semester.courses).length,

    []
  );
  const semesterGpaData = semesters
    .map((semester) => ({
      semester: semester.name,
      gpa: calculateGPA(semester.id),
    }))
    .reverse();

  const gradePointsMap: Record<string, number> = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
    E: 1,
    F: 0,
  };

  const semesterCoursesData = semesters[1]?.courses?.map((course) => ({
    course: course.code,
    grade: gradePointsMap[course.grade?.toUpperCase() ?? "F"] ?? 0,
  }));
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      {/* Header */}
      {isLoading && <Loader />}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            GPA Tracker
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Monitor your academic journey and stay on track for your goals.
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
            <Download size={18} />
            Download Report
          </button>
          <button className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition">
            Save Progress
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        className="flex gap-4 overflow-x-auto scrollbar w-full gap-6 mb-10 snap-x snap-mandatory"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        <StatCard
          icon={<TrendingUp className="text-blue-500" />}
          title="Current GPA"
          value="3.00"
          color="from-blue-500 to-blue-700"
        />
        <StatCard
          icon={<Target className="text-green-500" />}
          title="CGPA"
          value={String(calculateCGPA() ?? 0)}
          color="from-green-500 to-emerald-600"
        />
        <StatCard
          icon={<BookOpen className="text-yellow-500" />}
          title="Courses Taken"
          value={String(semestersCoursesLength ?? 0)}
          color="from-yellow-500 to-orange-600"
        />
        <StatCard
          icon={<BookOpen className="text-teal-500" />}
          title="Units Total"
          value={String(semestersUnits ?? 0)}
          color="from-teal-500 to-cyan-600"
        />
      </motion.div>

      {/* Charts Section */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {/* GPA Over Semesters */}
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            GPA Progress Over Semesters
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={semesterGpaData}>
              <defs>
                <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(107,114,128,0.2)"
              />
              <XAxis dataKey="semester" stroke="#9ca3af" />
              <YAxis
                domain={[0, 5]}
                ticks={[0, 1, 2, 3, 4, 5]}
                stroke="#9ca3af"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  borderRadius: "8px",
                  border: "none",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="gpa"
                stroke="url(#gpaGradient)"
                strokeWidth={4}
                dot={{ r: 5, fill: "#3b82f6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Course Grades */}
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Last Semester Course Grades
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={semesterCoursesData}>
              <defs>
                <linearGradient id="gradeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(107,114,128,0.2)"
              />
              <XAxis dataKey="course" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  borderRadius: "8px",
                  border: "none",
                  color: "#fff",
                }}
              />
              <Bar
                dataKey="grade"
                fill="url(#gradeGradient)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-md p-6 min-w-[250px] h-[180px] snap-center flex flex-col items-center justify-center"
    >
      <div
        className={`absolute inset-0 opacity-10 bg-gradient-to-br ${color}`}
      ></div>
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="text-sm text-gray-500 dark:text-gray-400">{title}</h3>
      </div>
      <p className="text-4xl font-bold text-gray-900 dark:text-white ">
        {value}
      </p>
    </motion.div>
  );
}
