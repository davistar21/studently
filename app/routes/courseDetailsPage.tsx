// src/pages/CourseDetailPage.tsx
import { motion } from "framer-motion";
import AppDialog from "~/components/AppDialog";
import { Button } from "~/components/ui/button";
import TopicDeck from "~/components/TopicDeck";
import { useParams } from "react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useAppStore } from "~/lib/zustandStore";
import type { Topic, Course } from "types";
import CourseHeader from "~/components/courseDetails/CourseHeader";
import TopicSection from "~/components/courseDetails/TopicSection";
import Notes from "~/components/courseDetails/NotesComponent";
import Error from "~/components/Error";
import Loader from "~/components/Loader";
import DeleteCourse from "~/components/courseDetails/DeleteCourse";

const CourseDetailsPage = () => {
  const { semesterId, courseId } = useParams();
  const {
    loadSemesters,
    isLoading,
    error,
    semesters,
    getSemesterById,
    addTopicToCourse,
  } = useAppStore();

  useEffect(() => {
    loadSemesters();
  }, []);
  function handleAddTopic(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form || !semesterId || !courseId) return;
    const formData = new FormData(form);
    const topicTitle = formData.get("course-topic") as string;
    if (!topicTitle) return;
    const newTopic: Topic = {
      id: crypto.randomUUID().split("-")[0],
      title: topicTitle,
      status: "not_started",
      progress: 0,
      courseId,
    };
    addTopicToCourse(semesterId, courseId, newTopic);
  }

  const course = useMemo(() => {
    const sem = semesterId ? getSemesterById(semesterId) : null;
    return sem?.courses?.find((c) => c.id === courseId) ?? null;
  }, [semesterId, courseId, semesters]);
  const topics = useMemo(() => course?.topics ?? [], [course]);

  if (!course) return <Loader statusText="Loading course..." />;
  if (error) return <Error error={error} />;
  return (
    <div className="p-2 md:p-6 pb-16 min-h-screen bg-[url('/images/bg-soft-light.png')] dark:bg-[url('/images/bg-soft-dark.png')] bg-cover bg-repeat bg-center relative space-y-8">
      {isLoading && <Loader />}
      <CourseHeader course={course} />
      <TopicSection
        topics={topics}
        onAddTopic={handleAddTopic}
        params={{
          semesterId: semesterId ?? "",
          courseId: courseId ?? "",
        }}
      />
      <Notes />
      {/* <ExtraInfoCards /> */}
      {/* <CourseActions onSubmit={handleSubmit} /> */}
      <DeleteCourse course={course}/>
    </div>
  );
};

export default CourseDetailsPage;
