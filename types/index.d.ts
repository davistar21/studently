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
  notes?: Note[];
}

export interface Semester {
  id: string;
  name: string;
  units: number;
  courses: Course[];
}

export interface Note {
  id: string;
  title: string;
}
/*
type Topic @model {
  id: ID!
  title: String!
  status: String!
  progress: Int
  course: Course @connection
}

type Course @model {
  id: ID!
  name: String!
  units: Int!
  code: String!
  progress: Int
  grade: String
  topics: [Topic] @connection
  semester: Semester @connection
}

type Semester @model {
  id: ID!
  name: String!
  units: Int!
  courses: [Course] @connection
}

type Note @model {
  id: ID!
  title: String!
  content: String
  semester: Semester @connection
}
*/
