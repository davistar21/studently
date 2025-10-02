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

const CourseDetailsPage = () => {
  const { semesterId, courseId } = useParams();

  const { semesters, getSemesterById,addTopicToCourse } = useAppStore();
  useEffect(() => {
    if (!courseId || !semesterId) return;
    // const course = getCourse(semesterId, courseId);
    // if (!course) return;
    // setCourse(course);
  }, [courseId, semesterId]);
  function handleSubmit() {}
  function handleAddTopic(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form || !semesterId || !courseId)return;
    const formData = new FormData(form);
    const topicTitle = formData.get("course-topic") as string;
    if (!topicTitle) return;
    const newTopic:Topic = {
      id: crypto.randomUUID().split('-')[0],
      title: topicTitle,
      status: "not_started",
      progress: 0,
    }
    addTopicToCourse(semesterId,courseId,newTopic)
  }

  const course = useMemo(() => {
    const sem = semesterId ? getSemesterById(semesterId) : null;
    return sem?.courses.find((c) => c.id === courseId) ?? null;
  }, [semesterId, courseId, semesters]);
  const topics = useMemo(() => course?.topics ?? [], [course]);

  if (!course) return <div>Failed to fetch course</div>;
  return (
    <div className="p-6 min-h-screen bg-[url('/images/bg-soft-light.png')] dark:bg-[url('/images/bg-soft-dark.png')] bg-cover bg-repeat bg-center relative space-y-8">
      <CourseHeader course={course} />
      <TopicSection topics={topics} onAddTopic={handleAddTopic} />
      <Notes/>
      {/* <ExtraInfoCards /> */}
      {/* <CourseActions onSubmit={handleSubmit} /> */}
    </div>
  );
};

export default CourseDetailsPage;
