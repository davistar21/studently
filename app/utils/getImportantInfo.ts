import type { SemesterData } from "types";

type TopicSummary = {
  title: string;
  progress: number | null | undefined;
  status: "not_started" | "in_progress" | "not_completed" | "completed";
};

type CourseSummary = {
  code: string;
  grade: string | null | undefined;
  topics: TopicSummary[];
};

type SemesterSummary = {
  id: string;
  name: string;
  courses?: CourseSummary[];
};

export default function getImportantData(
  semesters: SemesterData[]
): SemesterSummary[] {
  return semesters.map((semester) => ({
    id: semester.id,
    name: semester.name,
    courses: semester.courses?.map((course) => ({
      code: course.code,
      grade: course.grade,
      topics:
        course.topics?.map((topic) => ({
          title: topic.title,
          progress: topic.progress,
          status: topic.status,
        })) || [],
    })),
  }));
}
