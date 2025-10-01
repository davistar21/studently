export interface Topic {
  id: string;
  title: string;
  status: "not_started" | "in_progress" | "not_completed" | "completed";
  progress?: number;
}

export interface Course {
  id: string;
  name: string;
  units: number;
  code: string;
  progress?: number;
  grade?: string;
  topics?: Topic[];
}

export interface Semester {
  id: string;
  name: string;
  units: number;
  courses: Course[];
}
