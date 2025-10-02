import { client } from "~/lib/amplifyClient";

export const SemesterAPI = {
  create: async (input: { id: string; name: string; units: number }) =>
    client.models.Semester.create(input),

  get: async (id: string) => client.Semester.get({ id }),

  list: async () => client.models.Semester.list(),

  update: async (
    id: string,
    updates: Partial<{ name: string; units: number }>
  ) => client.models.Semester.update({ id, ...updates }),

  delete: async (id: string) => client.models.Semester.delete({ id }),
};
