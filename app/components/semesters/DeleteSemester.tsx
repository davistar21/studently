import type { SemesterData } from "types";
import AppDialog from "../AppDialog";
import { Button } from "../ui/button";
import { useState, useRef, useEffect, type FormEvent } from "react";
import Loader from "../Loader";
import Error from "../Error";
import { useNavigate } from "react-router";
import { SemesterAPI } from "~/utils/semesterHelpers";

const DeleteSemester = ({ semester }: { semester: SemesterData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteInput, setDeleteInput] = useState<string>("");
  const deleteInputRef = useRef<HTMLInputElement>(null);

  const disabled = deleteInput.toLowerCase() !== "delete"; // directly use state for input value

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteInput(e.target.value);
  };
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await SemesterAPI.delete(semester.id);
      navigate("/semesters");
    } catch (err) {
      setError("An error occurred during deletion.");
    } finally {
      setIsLoading(false);
    }
  };

  if (error) return <Error error={error} />;

  return (
    <div className="flex justify-center mt-auto pt-16">
      {isLoading && <Loader statusText={`Deleting ${semester.name}`} />}
      <AppDialog
        triggerClassName="!bg-gradient-to-br from-red-600 to-red-700"
        triggerLabel={
          <button className="font-semibold bg-red-700 text-white ">
            Delete Semester
            
          </button>
        }
        title={`Are you sure you want to delete ${semester.name}?`}
        description="This action cannot be undone"
      >
        <form className="space-y-2" onSubmit={handleSubmit}>
          <label htmlFor="semester-topic" className="w-full">
            <p className="text-black dark:text-white text-sm mb-2">
              Please type <span className="text-red-600 font-bold">DELETE</span>{" "}
              to <span>permanently</span> delete this semester
            </p>
            <input
              ref={deleteInputRef}
              type="text"
              name=""
              id=""
              value={deleteInput}
              onChange={handleInputChange}
              className="border rounded-md"
            />
          </label>
          <Button
            type="submit"
            disabled={disabled}
            className="p-4 bg-red-700 text-white ml-auto w-fit font-semibold"
          >
            Delete
          </Button>
        </form>
      </AppDialog>
    </div>
  );
};

export default DeleteSemester;
