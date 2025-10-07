// components/SettingsSection.tsx

import { Switch } from "~/components/ui/switch";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { useState } from "react";
import { useAppStore } from "~/lib/zustandStore";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Studently | Settings" },
    {
      name: "description",
      content: "Customize your application in settings...",
    },
  ];
}

export default function SettingsSection() {
  const [darkMode, setDarkMode] = useState(false);
  const [semester, setSemester] = useState("Semester 1");
  const { semesters } = useAppStore();
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 sm:p-8 transition-colors">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Settings
        </h2>

        {/* Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg text-gray-700 dark:text-gray-300">
            Dark Mode
          </span>
          <Switch checked={darkMode} onCheckedChange={handleDarkModeToggle} />
        </div>

        <Separator className="my-4" />

        {/* Semester Management */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Current Semester
            </h3>
            <select
              defaultValue={"Semester"}
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {semesters.length === 0 ? (
                <option disabled>No semesters available</option>
              ) : (
                semesters.map((sem) => (
                  <option key={sem.id} value={sem.name}>
                    {" "}
                    {sem.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Custom Data Options */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Customize Data
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your study data preferences (e.g., sync notes, manage
              topics).
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <Button variant="outline" className="w-1/2">
                Sync Notes
              </Button>
              <Button variant="outline" className="w-1/2">
                Manage Topics
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Courses */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Manage Courses
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Add, edit, or remove courses from your study plan.
            </p>
            <Button variant="outline" className="w-full mt-2">
              Add New Course
            </Button>
          </div>

          <Separator className="my-4" />

          {/* Notes */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes Management
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Review, update, and delete your study notes.
            </p>
            <Button variant="outline" className="w-full mt-2">
              View Notes
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
