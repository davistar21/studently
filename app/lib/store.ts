// store.ts
import { create } from "zustand";
import type { AppState, Semester, Course, Topic } from "types";
const LOCAL_STORAGE_KEY = "app-store";
export const useAppStore = create<AppState>((set, get) => ({
  semesters: [],
  getCourse: (semesterId: string, courseId: string) => {
    const semester = get().getSemester(semesterId);
    if (!semester) return;
    const course = semester.courses.find((e) => e.id === courseId);
    return course;
  },
  addSemester: (semester: Semester) =>
    set((state) => ({ semesters: [...state.semesters, semester] })),

  removeSemester: (semesterId: string) =>
    set((state) => ({
      semesters: state.semesters.filter((s) => s.id !== semesterId),
    })),

  addCourse: (semesterId: string, course: Course) =>
    set((state) => ({
      semesters: state.semesters.map((s) =>
        s.id === semesterId ? { ...s, courses: [...s.courses, course] } : s
      ),
    })),

  updateCourse: (semesterId: string, course: Course) =>
    set((state) => ({
      semesters: state.semesters.map((s) =>
        s.id === semesterId
          ? {
              ...s,
              courses: s.courses.map((c) => (c.id === course.id ? course : c)),
            }
          : s
      ),
    })),

  // addTopic: (semesterId: string, courseId: string, topic: Topic) =>
  //   set((state) => ({
  //     semesters: state.semesters.map((s) =>
  //       s.id === semesterId
  //         ? {
  //             ...s,
  //             courses: s.courses.map((c) =>
  //               // c.id === courseId ? { ...c, topics: [...c.topics, topic] } : c
  //             ),
  //           }
  //         : s
  //     ),
  //   })),

  // updateTopicStatus: (semesterId, courseId, topicId, status) =>
  //   set((state) => ({
  //     semesters: state.semesters.map((s) =>
  //       s.id === semesterId
  //         ? {
  //             ...s,
  //             courses: s.courses.map((c) =>
  //               c.id === courseId
  //                 ? {
  //                     ...c,
  //                     topics: c.topics.map((t) =>
  //                       t.id === topicId ? { ...t, status } : t
  //                     ),
  //                   }
  //                 : c
  //             ),
  //           }
  //         : s
  //     ),
  //   })),
  getSemester: (semesterId: string) => {
    const semester = get().semesters.find((s) => s.id === semesterId);
    if (!semester) return;
    return semester;
  },
  getTotalUnits: (semesterId: string) => {
    const semester = get().getSemester(semesterId);
    const totalUnits = semester?.courses.reduce((sum, c) => sum + c.units, 0);
    return totalUnits;
  },
  calculateGPA: (semesterId: string) => {
    const semester = get().getSemester(semesterId);

    const totalUnits = get().getTotalUnits(semesterId);
    const gpa = totalUnits ? Math.random() * 5 : 0; // mock GPA
  },
}));
