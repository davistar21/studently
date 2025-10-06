import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { Link } from "react-router";
import GPAGauge from "~/components/gpaGauge";
import { Button } from "~/components/ui/button";
import { useAppStore } from "~/lib/zustandStore";
import { fetchAuthSession } from "aws-amplify/auth";
import Error from "~/components/Error";
import Loader from "~/components/Loader";
export default function Semesters() {
  const {
    addSemester,
    semesters,
    isLoading,
    loadSemesters,
    error,
  } = useAppStore();
  const handleAddSemester = async () => {
    await addSemester();
  };
  const { calculateGPA } = useAppStore();

  useEffect(() => {
    console.log("Data is being fetched");
    fetchAuthSession().then((data) => console.log("authdata", data));
    loadSemesters();
  }, []);

  if (error) return <Error error={error} retry={handleAddSemester} />;
  if (isLoading) return <Loader />;
  return (
    <div className="p-6 min-h-screen bg-[url('/images/bg-soft-light.png')] dark:bg-[url('/images/bg-soft-dark.png')] bg-cover bg-repeat bg-center relative">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h1 className="text-2xl font-bold mb-6 text-blue-600 dark:!text-gradient-light-blue">
          Your Semesters
        </h1>

        <motion.button
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          onClick={handleAddSemester}
          className="primary-gradient text-white font-semibold rounded-full py-4 px-6 w-fit "
        >
          + Add Semester
        </motion.button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white min-h-[300px] dark:bg-glass shadow-md rounded-2xl p-5 flex flex-col justify-between border-2 dark:border-gray-400 animate-pulse"
              >
                <div className="loader m-auto"></div>
              </div>
            ))
          : semesters.map((sem, idx) => {
              const gpa = calculateGPA(sem.id!);
              return (
                <Link to={`/semesters/${sem.id}`} key={idx}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    className="bg-white dark:bg-glass shadow-md rounded-2xl p-5 flex flex-col justify-between border-2 dark:border-gray-400"
                  >
                    <div className="flex items-center  mb-4">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {sem.name}
                      </h2>
                      <div className="ml-auto">
                        <GPAGauge gpa={gpa} />
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <p>📚 Courses: {sem.courses?.length ?? 0}</p>
                      <p>🔢 Units: {sem.units}</p>
                    </div>

                    <Button className="mt-4 inline-block text-center bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition">
                      View Courses
                    </Button>
                  </motion.div>
                </Link>
              );
            })}
      </div>
    </div>
  );
}
// import { list, uploadData } from "aws-amplify/storage";
// import * as Storage from "aws-amplify/storage"

// async function testStorage() {
//   try {
//     console.log("yoooohoo");
//     // list root folder
//     const { items } = await list({ path: "" });
//     console.log("Items in bucket:", items);
//     console.log("yooooholllllo");

//     // small test upload
//     const blob = new Blob(["Hello world"], { type: "text/plain" });
//     const result = await uploadData({ path: "test.txt", data: blob });
//     console.log("Upload result:", result);
//   } catch (err) {
//     console.error("Storage error:", err);
//   }
// }

// testStorage();
