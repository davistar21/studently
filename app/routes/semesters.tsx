// src/pages/Semesters.tsx
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router";
import { PieChart, Pie, Cell } from "recharts";
import GPAGauge from "~/components/gpaGauge";
import { Button } from "~/components/ui/button";
import { useAppStore } from "~/lib/store";

// GPA Gauge helper
const IGPAGauge = ({ gpa }: { gpa: number }) => {
  const data = [
    { name: "GPA", value: gpa },
    { name: "Remaining", value: 4 - gpa },
  ];

  const COLORS = ["#3B82F6", "#E5E7EB"]; // primary blue + light gray

  return (
    <PieChart width={120} height={80}>
      <Pie
        data={data}
        cx="50%"
        cy="100%"
        startAngle={180}
        endAngle={0}
        innerRadius={40}
        outerRadius={60}
        dataKey="value"
        cornerRadius={10}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={18}
        fontWeight="bold"
        fill="#111827"
      >
        {gpa.toFixed(2)}
      </text>
    </PieChart>
  );
};

export default function Semesters() {
  const { addSemester, semesters, getTotalUnits } = useAppStore();
  useEffect(() => {
    if (semesters.length == 0) {
      addSemester({
        id: String(semesters.length + 1),
        name: "Semester" + String(semesters.length + 1),
        units: 0,
        courses: [],
      });
      // console.log(semesters);
    }
  }, [semesters]);
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">
          Your Semesters
        </h1>
        <motion.button
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          onClick={() => {
            addSemester({
              id: crypto.randomUUID(),
              name: "Semester " + (semesters.length + 1),
              units: 0,
              courses: [],
            });
          }}
          className="primary-gradient text-white font-semibold rounded-full py-4 px-6 w-fit "
        >
          + Add Semester
        </motion.button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {semesters.map((sem, idx) => (
          <Link to={`/semesters/${sem.id}`} key={idx}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="bg-white shadow-md rounded-2xl p-5 flex flex-col justify-between"
            >
              <div className="flex items-center  mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {sem.name}
                </h2>
                <div className="ml-auto">
                  <GPAGauge gpa={0} />
                </div>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>📚 Courses: {sem.courses.length}</p>
                <p>🔢 Units: {getTotalUnits(sem.id)}</p>
              </div>

              <Button className="mt-4 inline-block text-center bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition">
                View Courses
              </Button>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
