import type { Course } from "types";
import AppDialog from "~/components/AppDialog";
import FileUploader from "~/components/FileUploader";
import { Button } from "~/components/ui/button";

type GPATableProp = {
  courses: Course[];
  totalUnits: number;
};

const GPATable: React.FC<GPATableProp> = ({ courses, totalUnits }) => {
  return (
    <div>
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
            {courses.map((c, idx) => (
              <tr key={idx} className="border-b last:border-none text-gray-800 dark:text-white">
                <td className="p-3">{c.code}</td>
                <td className="p-3 text-center">{c.units}</td>
                <td className="p-3 text-center">{c.grade}</td>
                <td>{/* You can implement Edit dialog here */}</td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GPATable;
