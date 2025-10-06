import { client } from "~/lib/amplifyClient";

export const TopicAPI = {
  create: async (input: {
    id?: string;
    title: string;
    status:
      | "not_started"
      | "in_progress"
      | "not_completed"
      | "completed"
      | null;
    progress?: number | null;
    courseId: string; // link to Course
  }) => {
    if (!input.status) {
      input.status = "not_started";
    }
    if (!input.progress) {
      input.progress = 0;
    }
    return client.models.Topic.create(input);
  },

  get: async (id: string) => client.models.Topic.get({ id }),

  list: async () => client.models.Topic.list(),

  update: async (updatedTopic: {
    id: string;
    title?: string;
    status?: "not_started" | "in_progress" | "not_completed" | "completed";
    progress?: number;
    courseId?: string;
  }) => {
    const { id, ...updates } = updatedTopic;
    return await client.models.Topic.update({ id, ...updates });
  },

  delete: async (id: string) => client.models.Topic.delete({ id }),
};
