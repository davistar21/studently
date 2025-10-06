// src/pages/Dashboard.tsx
import { BookOpen, GraduationCap, Calendar, BarChart3 } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-blue-600">Welcome, User</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Logout
        </button>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* GPA Tracker */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="text-blue-600" />
            <h2 className="text-lg font-semibold">GPA Tracker</h2>
          </div>
          <p className="text-gray-600 text-sm mb-2">Current GPA</p>
          <p className="text-3xl font-bold text-blue-600">3.72</p>
          <p className="text-xs text-gray-400 mt-2">
            Last updated: Sept 23, 2025
          </p>
        </div>

        {/* Study Assistant */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="text-green-600" />
            <h2 className="text-lg font-semibold">Study Assistant</h2>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            "Summarize lecture notes on Thermodynamics..."
          </p>
          <button className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition">
            Ask AI
          </button>
        </div>

        {/* Planner */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="text-coral-500" />
            <h2 className="text-lg font-semibold">Planner</h2>
          </div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>📘 Physics Assignment – due Sept 25</li>
            <li>📝 Group Project Meeting – Sept 27</li>
            <li>📊 Statistics Quiz – Sept 30</li>
          </ul>
        </div>

        {/* Analytics */}
        <div className="bg-white rounded-2xl shadow p-6 md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="text-red-500" />
            <h2 className="text-lg font-semibold">Performance Analytics</h2>
          </div>
          <p className="text-gray-600 text-sm">
            Track your GPA progress, study time, and task completion with
            charts.
          </p>
          {/* Placeholder for chart */}
          <div className="h-40 bg-gray-100 rounded-lg mt-4 flex items-center justify-center text-gray-400">
            Chart Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
}
