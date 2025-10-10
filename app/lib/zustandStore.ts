import { create } from "zustand";
import type {
  Course,
  Topic,
  SemesterData,
  SemesterModel,
  CourseData,
} from "types";

import { SemesterAPI } from "~/utils/semesterHelpers";
import { TopicAPI } from "~/utils/topicHelpers";

interface AppState {
  semesters: SemesterData[];
  isLoading: boolean;
  error: string | null;
  selectedSemesterId: string | null;

  loadSemesters: () => Promise<void>;
  addSemester: () => Promise<void>;
  setSemesters: (semesters: SemesterData[]) => void;
  setSelectedSemesterId: (semesterId: string | null) => void;
  getSemesterById: (semesterId: string) => SemesterData | null;
  getCourseById: (semesterId: string, courseId: string) => CourseData | null;
  addCourseToSemester: (
    semesterId: string,
    newCourse: CourseData
  ) => Promise<void>;
  addTopicToCourse: (
    semesterId: string,
    courseId: string,
    newTopic: Topic
  ) => Promise<void>;
  calculateGPA: (semesterId: string) => number;
  calculateCGPA: () => number;
}

export const useAppStore = create<AppState>((set, get) => ({
  semesters: [],
  isLoading: false,
  error: "",
  selectedSemesterId: null,
  loadSemesters: async () => {
    set({ isLoading: true });
    try {
      const semesterModels = await SemesterAPI.list();

      const semesterDataList: SemesterData[] = await Promise.all(
        semesterModels.data.map(
          async (semesterModel): Promise<SemesterData> => {
            const { id, name, units, owner, courses } = semesterModel;
            return {
              id,
              name,
              units,
              owner,
              courses,
            };
          }
        )
      );

      set({ semesters: semesterDataList });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to fetch semesters",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  addSemester: async () => {
    const { semesters } = get();
    const newSemester = {
      id: crypto.randomUUID().split("-")[0],
      name: `Semester ${semesters.length + 1}`,
      units: 0,
    };

    try {
      set({ isLoading: true });
      await SemesterAPI.create(newSemester);
      const fullSemester: SemesterData = {
        ...newSemester,
        owner: null,
        courses: [],
      };
      set({ semesters: [...semesters, fullSemester] });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Error creating semester",
      });
    } finally {
      set({ isLoading: false });
    }
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
    return semester.courses?.find((c) => c.id === courseId) || null;
  },
  addCourseToSemester: async (semesterId, newCourse) => {
    try {
      set({ isLoading: true });
      const { semesters, getSemesterById } = get();
      const semester = getSemesterById(semesterId);
      if (!semester) return;
      const updatedCourses = [...(semester.courses ?? []), newCourse];
      const updatedSemester: SemesterData = {
        ...semester,
        units: semester.units + newCourse.units,
        courses: updatedCourses,
      };
      const updatedSemesters = semesters.map((sem) =>
        sem.id === semesterId ? updatedSemester : sem
      );
      set({ semesters: updatedSemesters });
      await SemesterAPI.update(updatedSemester);
    } catch (err) {
      set({
        error:
          err instanceof Error
            ? err.message
            : "Failed to add course to semester",
      });
    } finally {
      set({ isLoading: false });
    }
  },
  addTopicToCourse: async (semesterId, courseId, newTopic) => {
    try {
      set({ isLoading: true });
      const { semesters, getSemesterById, getCourseById } = get();
      const semester = getSemesterById(semesterId);
      const course = getCourseById(semesterId, courseId);
      if (!course || !semester || !semester.courses) return;
      const updatedCourse: CourseData = {
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
      TopicAPI.create(newTopic);
    } catch (err) {
      set({
        error:
          err instanceof Error ? err.message : "Failed to add topic to course",
      });
    } finally {
      set({ isLoading: false });
    }
  },
  calculateGPA: (semesterId: string) => {
    const courses = get().getSemesterById(semesterId)?.courses || [];

    if (!courses || courses.length === 0) return 0;

    // grade to point mapping
    const gradePointsMap: Record<string, number> = {
      A: 5,
      B: 4,
      C: 3,
      D: 2,
      E: 1,
      F: 0,
    };

    let totalPoints = 0;
    let totalUnits = 0;

    for (const course of courses) {
      const gp = gradePointsMap[course.grade?.toUpperCase() ?? "F"] ?? 0;
      totalPoints += gp * course.units;
      totalUnits += course.units;
    }

    if (totalUnits === 0) return 0;
    return Number((totalPoints / totalUnits).toFixed(2));
  },

  calculateCGPA: () => {
    const allCourses = get().semesters.flatMap((s) => s.courses || []);

    if (!allCourses || allCourses.length === 0) return 0;

    const gradePointsMap: Record<string, number> = {
      A: 5,
      B: 4,
      C: 3,
      D: 2,
      E: 1,
      F: 0,
    };

    let totalPoints = 0;
    let totalUnits = 0;

    for (const course of allCourses) {
      const gp = gradePointsMap[course.grade?.toUpperCase() ?? "F"] ?? 0;
      totalPoints += gp * course.units;
      totalUnits += course.units;
    }

    if (totalUnits === 0) return 0;
    return Number((totalPoints / totalUnits).toFixed(2));
  },
}));
