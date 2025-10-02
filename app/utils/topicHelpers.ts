import { client } from "~/lib/amplifyClient";

export const TopicAPI = {
  create: async (input: {
    id?: string;
    title: string;
    status: "not_started" | "in_progress" | "not_completed" | "completed";
    progress?: number;
    courseId: string; // link to Course
  }) => client.models.Topic.create(input),

  get: async (id: string) => client.models.Topic.get({ id }),

  list: async () => client.models.Topic.list(),

  update: async (
    id: string,
    updates: Partial<{
      title: string;
      status: "not_started" | "in_progress" | "not_completed" | "completed";
      progress: number;
      courseId: string;
    }>
  ) => client.models.Topic.update({ id, ...updates }),

  delete: async (id: string) => client.models.Topic.delete({ id }),
};
