import { client } from "~/lib/amplifyClient";

export const CourseAPI = {
  create: async (input: {
    id?: string;
    name: string;
    code: string;
    units: number;
    progress?: number;
    grade?: string;
    semesterId: string; // link to Semester
  }) => client.models.Course.create(input),

  get: async (id: string) => client.models.Course.get({ id }),

  list: async () => client.models.Course.list(),

  update: async (
    id: string,
    updates: Partial<{
      name: string;
      code: string;
      units: number;
      progress: number;
      grade: string;
      semesterId: string;
    }>
  ) => client.models.Course.update({ id, ...updates }),

  delete: async (id: string) => client.models.Course.delete({ id }),
};
