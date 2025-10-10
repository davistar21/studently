// src/pages/Dashboard.tsx

import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  BarChart3,
  Clock,
  Zap,
  ChevronRight,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { useAppStore } from "~/lib/zustandStore";
import { type ProfileProps } from "./profile";
import { fetchAuthSession } from "aws-amplify/auth";
import { listProfiles } from "~/utils/profileHelpers";
import type { Route } from "../+types/root";
import Loader from "~/components/Loader";

const gpaTrend = [
  { name: "Sem 1", gpa: 3.1 },
  { name: "Sem 2", gpa: 3.3 },
  { name: "Sem 3", gpa: 3.9 },
  { name: "Sem 4", gpa: 4.12 },
  { name: "Sem 5", gpa: 4.52 },
];

const studyTime = [
  { day: "Mon", hrs: 1.2 },
  { day: "Tue", hrs: 2.5 },
  { day: "Wed", hrs: 1.8 },
  { day: "Thu", hrs: 2.0 },
  { day: "Fri", hrs: 3.2 },
  { day: "Sat", hrs: 2.8 },
  { day: "Sun", hrs: 1.0 },
];

const recommendations = [
  "Revise Thermodynamics: exam in 10 days",
  "Practice 20 flashcards: Calculus II",
  "Schedule 30-min focus session tonight at 8 PM",
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Studently Dashboard" },
    { name: "description", content: "Your dashboard to view insights." },
  ];
}

export default function Dashboard() {
  const { loadSemesters, calculateCGPA, calculateGPA, semesters } =
    useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<ProfileProps | null>(null);
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
      name: semester.name,
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

  const semesterCoursesData =
    semesters[1]?.courses?.map((course) => ({
      course: course.code,
      grade: gradePointsMap[course.grade?.toUpperCase() ?? "F"] ?? 0,
    })) ?? [];
  const quickStats = [
    {
      id: "gpa",
      label: "Current CGPA",
      value: calculateCGPA() ?? 0,
      accent: "blue",
    },
    {
      id: "courses",
      label: "Active Courses",
      value: semestersCoursesLength,
      accent: "green",
    },
    {
      id: "units",
      label: "Total Units",
      value: semestersUnits,
      accent: "coral",
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const session = await fetchAuthSession();
        const userEmail = session?.tokens?.signInDetails?.loginId ?? "";
        const userId = session?.userSub ?? "";
        const userProfiles = await listProfiles();
        const profileFetched = userProfiles?.data.find(
          (profile) => profile.email === userEmail && profile.id === userId
        );
        if (profileFetched) {
          setProfile(profileFetched);
        } else {
          setProfile((prev) => ({
            ...prev,
            firstName: prev?.firstName ?? "",
            lastName: prev?.lastName ?? "",
            username: prev?.username ?? userId,
            email: userEmail,
            id: userId,
          }));
        }
      } catch (err) {
        setError("Failed to fetch profile");
      } finally {
        setIsLoading(false);
      }
    })();
    loadSemesters();
  }, []);
  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {isLoading && <Loader statusText="Loading dashboard..." />}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">
              Welcome,{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {profile?.firstName ?? "User"}
              </span>{" "}
              👋
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 max-w-xl">
              Here is your study overview. Continue where you left off, track
              progress, and let AI suggest the next best action.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow">
              <Clock size={16} />
              <div className="text-sm">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Focus Time
                </div>
                <div className="text-sm font-medium">25 min</div>
              </div>
            </div>

            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-emerald-400 text-white px-4 py-2 rounded-lg shadow hover:scale-[1.02] transform transition">
              <Zap size={16} />
              Quick Start
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 md:grid flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="col-span-2 grid grid-cols-3 gap-4"
          >
            {quickStats.map((s, i) => (
              <motion.div
                key={s.id}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500 dark:text-gray-300">
                    {s.label}
                  </div>
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      s.accent === "blue"
                        ? "bg-blue-100 text-blue-600"
                        : s.accent === "green"
                          ? "bg-green-100 text-green-600"
                          : "bg-pink-100 text-pink-600"
                    }`}
                  >
                    {s.id === "gpa" ? (
                      <GraduationCap size={16} />
                    ) : (
                      <BookOpen size={16} />
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold">{s.value}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 md:col-span-2"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="text-blue-600" />
                <h3 className="font-semibold">GPA Trend</h3>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-300">
                Semester view
              </div>
            </div>

            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={semesterGpaData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={undefined} />
                  <XAxis dataKey="name" tickLine={false} />
                  <YAxis domain={[2.5, 4]} tickLine={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="gpa"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Projected to reach __ next semester
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-4 shadow flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="text-green-600" />
                <div>
                  <h3 className="font-semibold">Study Assistant</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Ask for summaries, flashcards or quick quizzes
                  </p>
                </div>
              </div>
              <button className="text-sm min-w-[70px] bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow hover:opacity-95">
                Ask AI
              </button>
            </div>
            <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
              <strong>Recommended:</strong> 30-min focused session on Calculus
              II at 8:00 PM
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="text-coral-500" />
                <h3 className="font-semibold">Planner</h3>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-300">
                Today
              </div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium">Physics Assignment</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Due: Sept 25
                  </div>
                </div>
                <div className="text-xs text-gray-500">2d</div>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium">Group Meeting</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Sept 27 • Zoom
                  </div>
                </div>
                <div className="text-xs text-gray-500">4d</div>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.14 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex flex-col"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Continue Studying</h3>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Resume
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-blue-600 to-emerald-400 text-white rounded-xl p-4 shadow-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm opacity-90">Calculus II</div>
                    <div className="text-lg font-bold">
                      Integration: Techniques
                    </div>
                    <div className="text-xs opacity-90 mt-2">
                      Next: 20 flashcards • 30 min
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-xs opacity-80">Progress</div>
                    <div className="text-2xl font-bold">62%</div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm">
                    Continue
                  </button>
                  <button className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                    Preview
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.16 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Did you know?</h4>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Hourly insight
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
              Newton developed calculus during quarantine — small, unexpected
              facts keep learning fun and memorable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.18 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Recommendations</h4>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                AI coach
              </div>
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              {recommendations.map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">
                    <ChevronRight size={14} />
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{r}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">Study This Week</h4>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Hours
              </div>
            </div>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studyTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hrs" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Need a quick tour? Try the onboarding walk-through.
          </div>
          <div className="flex gap-2">
            <button className="text-sm bg-white dark:bg-gray-800 px-3 py-2 rounded-lg">
              Settings
            </button>
            <button className="text-sm bg-white dark:bg-gray-800 px-3 py-2 rounded-lg">
              Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
