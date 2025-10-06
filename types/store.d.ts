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
