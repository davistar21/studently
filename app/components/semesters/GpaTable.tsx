import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { Edit2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { CourseData, SemesterData } from "types";
import AppDialog from "~/components/AppDialog";
import FileUploader from "~/components/FileUploader";
import { Button } from "~/components/ui/button";
import Loader from "../Loader";
import { CourseAPI } from "~/utils/courseHelpers";
import { useParams } from "react-router";
import Error from "../Error";
import capitalizeWords from "~/utils/capitalizeWords";
type GPATableProp = {
  courses: CourseData[];
  semester: SemesterData;
};

const GPATable: React.FC<GPATableProp> = ({ courses, semester }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { semesterId } = useParams();

  const [updatedCourse, setUpdatedCourse] = useState<CourseData>({
    semesterId,
    name: "",
    units: 0,
    grade: "",
    code: "",
  } as CourseData);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const lazy = {
        ...updatedCourse,
        topics: async () => ({
          items: updatedCourse.topics ?? [],
          hasNext: () => false,
          next: async () => ({ items: [], hasNext: () => false }),
        }),
      };  
      await CourseAPI.update(lazy);
    } catch (err) {
      setError("Failed to update course");
    } finally {
      setIsLoading(false);
    }
  };
  if (error) return <Error error={error} />;
  
  return (
    <div>
      {isLoading && <Loader statusText="Updating course..." />}
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-semibold text-gray-800">GPA Table</h2>
        <AppDialog
          triggerLabel="Upload Result"
          title="Upload Result"
          description="Upload this semester's result to automatically add them to the table"
        >
          <form className="space-y-2">
            <label htmlFor="file-upload" className="w-full">
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

      <div className="overflow-x-auto rounded-2xl">
        <table className="min-w-full bg-white dark:bg-gray-800 dark:text-white  shadow">
          <thead className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-center">Units</th>
              <th className="p-3 text-center">Grade</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {courses.length !== 0 &&
              courses.map((c, idx) => {
                const badgeColor = c.grade === "A" || c.grade === "B"
                  ? "bg-badge-green text-green-600 dark:bg-green-900 dark:!text-green-200"
                  : c.grade === "C" ? "bg-badge-yellow text-yellow-600 dark:bg-yellow-900 dark:!text-yellow-200"
                  : c.grade === "D" || c.grade === "E" || c.grade === "F" ? "bg-badge-red text-red-600 dark:bg-red-900 dark:!text-red-200"
                  : c.grade === "F" ? "bg-badge-red text-red-600"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
                return (
                <tr
                  key={idx}
                  className={`border-b last:border-none text-gray-800 dark:text-white
                    ${badgeColor}
                    `}
                >
                  <td className="p-3">{c.code}</td>
                  <td className="p-3 text-center">{c.units}</td>
                  <td className="p-3 text-center">{c.grade ?? "-"}</td>
                  <td>
                    <AppDialog
                      triggerClassName="!bg-gradient-to-r from-transparent to-transparent !p-0"
                      triggerLabel={
                        <div onClick={() => setUpdatedCourse(c)}>
                          <Edit2
                            size={16}
                            className="text-black dark:text-white"
                          />
                        </div>
                      }
                      title="Edit course"
                      description="Edit the course details below."
                    >
                      <form
                        className="space-y-2 text-black"
                        onSubmit={handleUpdate}
                      >
                        <input
                          type="text"
                          name="code"
                          placeholder="Course Code"
                          value={updatedCourse.code || ""}
                          onChange={(e) =>
                            setUpdatedCourse((prev) => ({
                              ...prev,
                              [e.target.name]: e.target.value.toUpperCase(),
                            }))
                          }
                        />

                        <input
                          type="text"
                          name="name"
                          placeholder="Course Name"
                          value={updatedCourse.name || ""}
                          onChange={(e) =>
                            setUpdatedCourse((prev) => ({
                              ...prev,
                              [e.target.name]: capitalizeWords(e.target.value),
                            }))
                          }
                        />

                        <Select
                          value={updatedCourse.grade ?? ""}
                          onValueChange={(value) =>
                            setUpdatedCourse((prev) => ({
                              ...prev,
                              grade: value,
                            }))
                          }
                        >
                          <SelectTrigger className="w-full p-3 rounded-xl bg-white border-2 border-[#2463eb6b]">
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            {["A", "B", "C", "D", "E", "F"].map((grade) => (
                              <SelectItem key={grade} value={grade}>
                                {grade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <input
                          type="number"
                          name="units"
                          placeholder="Units"
                          value={updatedCourse.units || ""}
                          onChange={(e) =>
                            setUpdatedCourse((prev) => ({
                              ...prev,
                              [e.target.name]: Number(e.target.value),
                            }))
                          }
                        />

                        <Button
                          type="submit"
                          className="primary-button text-white ml-auto w-fit"
                        >
                          Save
                        </Button>
                      </form>
                    </AppDialog>
                  </td>
                </tr>
              )})}
          </tbody>
        </table>
        {courses.length === 0 && (
          <div className="my-6 text-center text-gray-500 animate-pulse">
            No courses added yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default GPATable;
