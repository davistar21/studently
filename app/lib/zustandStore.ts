import { create } from "zustand";
import type { Semester, Course } from "types";

interface AppState {
  semesters: Semester[];
  isLoading: boolean;
  selectedSemesterId: string | null;

  addSemester: () => void;
  setSemesters: (semesters: Semester[]) => void;
  setSelectedSemesterId: (semesterId: string | null) => void;
  getSemesterById: (semesterId: string) => Semester | null;

  addCourseToSemester: (semesterId: string, newCourse: Course) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  semesters: [],
  isLoading: false,
  selectedSemesterId: null,

  addSemester: () => {
    const { semesters } = get();
    const newSem: Semester = {
      id: crypto.randomUUID().split("-")[0],
      name: `Semester ${semesters.length + 1}`,
      courses: [],
      units: 0,
    };

    set({ semesters: [...semesters, newSem] });
  },
  setSemesters: (semesters) => set({ semesters }),
  setSelectedSemesterId: (id) => set({ selectedSemesterId: id }),

  getSemesterById: (id: string) => {
    const { semesters } = get();
    return semesters.find((s) => s.id === id) || null;
  },

  addCourseToSemester: (semesterId, newCourse) => {
    const { semesters, getSemesterById } = get();
    const semester = getSemesterById(semesterId);
    if (!semester) return;
    const updatedCourses = [...semester.courses, newCourse];
    const updatedSemester: Semester = {
      ...semester,
      units: semester.units + newCourse.units,
      courses: updatedCourses,
    };

    const updatedSemesters = semesters.map((sem) =>
      sem.id === semesterId ? updatedSemester : sem
    );
    set({ semesters: updatedSemesters });
  },
}));
