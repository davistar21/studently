import { create } from "zustand";
import type { Semester, Course, Topic } from "types";
import { SemesterAPI } from "~/utils/semesterHelpers";

interface AppState {
  semesters: Semester[];
  isLoading: boolean;
  selectedSemesterId: string | null;

  loadSemesters: () => Promise<void>;
  addSemester: () => Promise<void>;
  setSemesters: (semesters: Semester[]) => void;
  setSelectedSemesterId: (semesterId: string | null) => void;
  getSemesterById: (semesterId: string) => Semester | null;
  getCourseById: (semesterId: string, courseId: string) => Course | null;
  addCourseToSemester: (semesterId: string, newCourse: Course) => void;
  addTopicToCourse: (
    semesterId: string,
    courseId: string,
    newTopic: Topic
  ) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  semesters: [],
  isLoading: false,
  selectedSemesterId: null,
  loadSemesters: async () => {
    set({ isLoading: true });
    try {
      const { data, errors } = await SemesterAPI.list();
      if (errors) {
        console.error("Failed to fetch semesters:", errors);
        return;
      }
      // Ensure courses/topics exist (empty arrays if none yet)
      const hydrated = (data ?? []).map((s: any) => ({
        ...s,
        courses: s.courses ?? [],
      }));
      set({ semesters: hydrated });
      console.log("Semesters fetched");
    } catch (err) {
      console.error("Error loading semesters:", err);
    } finally {
      set({ isLoading: false });
    }
  },
  addSemester: async () => {
    const { semesters } = get();
    try {
      const { data, errors } = await SemesterAPI.create({
        id: crypto.randomUUID().split("-")[0],
        name: `Semester ${semesters.length + 1}`,
        units: 0,
      });
      if (errors) {
        console.error("Failed to create semester:", errors);
        return;
      }
      if (!data) return;
      const newSemester: Semester = {
        id: data.id,
        name: data.name,
        units: data.units,
        courses: [],
      };
      set((state) => ({
        semesters: [...state.semesters, newSemester],
      }));
      console.log("semester added")
    } catch (err) {
       console.error("Error creating semester:", err);
    }

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
  getCourseById: (semesterId, courseId) => {
    const { getSemesterById } = get();
    const semester = getSemesterById(semesterId);
    if (!semester) return null;
    return semester.courses.find((course) => course.id === courseId) || null;
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
  addTopicToCourse: (semesterId, courseId, newTopic) => {
    const { semesters, getSemesterById, getCourseById } = get();
    const semester = getSemesterById(semesterId);
    const course = getCourseById(semesterId, courseId);
    if (!course || !semester) return;
    const updatedCourse: Course = {
      ...course,
      topics: [...(course.topics ?? []), newTopic],
    };
    const updatedCourses = semester.courses.map((course) =>
      course.id === courseId ? updatedCourse : course
    );
    const updatedSemester = {
      ...semester,
      courses: updatedCourses,
    };
    const updatedSemesters = semesters.map((sem) =>
      sem.id === semesterId ? updatedSemester : sem
    );
    set({ semesters: updatedSemesters });
  },
}));
