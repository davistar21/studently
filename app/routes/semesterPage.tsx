import { useParams } from "react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useAppStore } from "~/lib/zustandStore";
import capitalizeWords from "~/utils/capitalizeWords";
import SemesterOverview from "~/components/semesters/SemesterOverview";
import CourseList from "~/components/semesters/CourseList";
import GPATable from "~/components/semesters/GpaTable";

const SemesterPage = () => {
  const { semesterId } = useParams();
  const { semesters, getSemesterById, addCourseToSemester } = useAppStore();
  const semester = useMemo(() => {
    if (!semesterId) return;
    return getSemesterById(semesterId) ?? null;
  }, [semesterId, semesters]);
  if (!semester)
    return (
      <div className="p-6 min-h-screen bg-[url('/images/bg-soft-light.png')] dark:bg-[url('/images/bg-soft-dark.png')] bg-cover bg-repeat bg-center relative space-y-8">
        <div>Semester not found</div>
      </div>
    );
  return (
    <div className="p-6 min-h-screen bg-[url('/images/bg-soft-light.png')] dark:bg-[url('/images/bg-soft-dark.png')] bg-cover bg-repeat bg-center relative space-y-8">
      <SemesterOverview semester={semester}/>
       <CourseList courses={semester.courses} addCourse={(course) => addCourseToSemester(semesterId!, course)} />
      <GPATable courses={semester.courses} totalUnits={semester.units} />
      
    </div>
  );
};

export default SemesterPage;
