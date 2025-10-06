import { useParams } from "react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useAppStore } from "~/lib/zustandStore";
import capitalizeWords from "~/utils/capitalizeWords";
import SemesterOverview from "~/components/semesters/SemesterOverview";
import CourseList from "~/components/semesters/CourseList";
import GPATable from "~/components/semesters/GpaTable";
import Error from "~/components/Error";
import Loader from "~/components/Loader";
import DeleteSemester from "~/components/semesters/DeleteSemester";

const SemesterPage = () => {
  const { semesterId } = useParams();
  const {
    semesters,
    getSemesterById,
    addCourseToSemester,
    isLoading,
    error,
    loadSemesters,
  } = useAppStore();
  useEffect(() => {
    loadSemesters();
  }, [semesters]);
  const semester = useMemo(() => {
    if (!semesterId) return;
    return getSemesterById(semesterId) ?? null;
  }, [semesterId, semesters]);

  if (!semester) return <Loader statusText="Loading semester..." />;
  if (error) return <Error error={error} />;
  return (
    <div className="md:p-6 p-2 min-h-screen bg-[url('/images/bg-soft-light.png')] dark:bg-[url('/images/bg-soft-dark.png')] bg-cover bg-repeat bg-center relative space-y-8">
      {/* {isLoading && <Loader statusText="Loading semester..." />} */}
      <SemesterOverview semester={semester} />
      <CourseList
        semesterId={semesterId!}
        courses={semester.courses ?? []}
        addCourse={(course) => addCourseToSemester(semesterId!, course)}
      />
      <GPATable courses={semester.courses ?? []} semester={semester} />
      <DeleteSemester semester={semester} />
    </div>
  );
};

export default SemesterPage;
