
import type {
  AuthMode,
  CustomHeaders,
  ListReturnValue,
} from "@aws-amplify/datastore";

export interface Topic {
  id: string;
  title: string;
  status: "not_started" | "in_progress" | "not_completed" | "completed";
  progress?: number | null;
  courseId: string; // add this if you want to include relation key
  owner?: string | null;
}

export interface Course {
  id: string;
  name: string;
  units: number;
  code: string;
  progress?: number | null;
  grade?: string | null;
  semesterId?: string;
  owner?: string | null;

  // Lazy-loaded relations
  topics: (
    options?: {
      authMode?: AuthMode;
      authToken?: string;
      limit?: number;
      nextToken?: string | null;
      headers?: CustomHeaders;
    }
  ) => Promise<ListReturnValue<Topic>>;

  notes?: (
    options?: {
      authMode?: AuthMode;
      authToken?: string;
      limit?: number;
      nextToken?: string | null;
      headers?: CustomHeaders;
    }
  ) => Promise<ListReturnValue<Note>>;
}

// export interface Semester {
//   id: string;
//   name: string;
//   units: number;
//   owner?: string | null;

//   // Lazy-loaded relation for courses
//   courses?: (
//     options?: {
//       authMode?: AuthMode;
//       authToken?: string;
//       limit?: number;
//       nextToken?: string | null;
//       headers?: CustomHeaders;
//     }
//   ) => Promise<ListReturnValue<Course>>;
// }
// This represents the data you send/receive
export interface SemesterData {
  id: string;
  name: string;
  units: number;
  owner: string | null;
  courses: CourseData[] | null;
}

// This represents the runtime model from Amplify client
export interface SemesterModel {
  id: string;
  name: string;
  units: number;
  owner: string | null;
  courses: (options?: any) => Promise<ListReturnValue<Course>>;
}

// Runtime model from Amplify (lazy-loaded)
// export interface CourseModel {
//   id: string;
//   name: string;
//   code: string;
//   units: number;
//   semesterId: string;
//   grade?: string | null;
//   progress?: number | null;
//   owner?: string | null;
//   topics: (options?: any) => Promise<ListReturnValue<Topic>>;
// }

// Flattened data used in your app/store
export interface CourseData {
  id: string;
  name: string;
  code: string;
  units: number;
  semesterId: string;
  grade?: string | null;
  progress?: number | null;
  owner?: string | null;
  topics: Topic[];
}

export interface Note {
  id: string;
  title: string;
}
