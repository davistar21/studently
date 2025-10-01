// store.d.ts

// export interface Topic {
//   id: string;
//   title: string;
//   status: "not_started" | "in_progress" | "not_completed" | "completed";
//   progress?: number;
// }

// export interface Course {
//   id: string;
//   name: string;
//   units: number;
//   code: string;
//   progress?: number;
//   grade?: string;
//   topics?: Topic[];
// }

// export interface Semester {
//   id: string;
//   name: string;
//   units: number;
//   courses: Course[];
// }

export interface AppState {
  semesters: Semester[];

  // actions
  getCourse: (
    semesterId: string,
    courseId: string
  ) => Course | undefined | null;
  getSemester: (semesterId: string) => Semester | undefined | null;
  getTotalUnits: (semesterId: string) => number | undefined | null;
  addSemester: (semester: Semester) => void;
  removeSemester: (semesterId: string) => void;
  addCourse: (semesterId: string, course: Course) => void;
  updateCourse: (semesterId: string, course: Course) => void;
  addTopic?: (semesterId: string, courseId: string, topic: Topic) => void;
  updateTopicStatus?: (
    semesterId: string,
    courseId: string,
    topicId: string,
    status: Topic["status"]
  ) => void;
  calculateGPA: (semesterId: string) => void;
  // loadFromStorage:()
}
