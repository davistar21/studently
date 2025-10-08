import { client } from "~/lib/amplifyClient";
import type { Course, Topic } from "types";

type TopicCreateInput = {
  title: string;
  status: "not_started" | "in_progress" | "not_completed" | "completed" | null;
  progress?: number | null;
};
const permission: any = { authMode: "userPool" };

export const CourseAPI = {
  create: async (input: {
    id?: string;
    name: string;
    code: string;
    units: number;
    progress?: number;
    grade?: string;
    semesterId: string;
  }) => client.models.Course.create(input),

  get: async (id: string) =>
    client.models.Course.get(
      { id },
      {
        selectionSet: [
          "id",
          "name",
          "units",
          "code",
          "progress",
          "grade",
          "semesterId",
          "topics.*",
        ],
      }
    ),

  list: async () => client.models.Course.list(),

  update: async (updatedCourse: Course) => {
    const updatedId = updatedCourse.id;

    const originalResponse = await client.models.Course.get(
      { id: updatedId },
      {
        selectionSet: [
          "id",
          "name",
          "units",
          "code",
          "progress",
          "grade",
          "semesterId",
          "topics.*",
        ],
      }
    );
    const originalCourse = originalResponse.data;

    if (!originalCourse) {
      throw new Error(`Course with ID ${updatedId} not found.`);
    }

    const courseUpdates: Partial<Omit<Course, "id" | "topics">> = {};
    let hasCourseScalarChanges = false;

    if (originalCourse.name !== updatedCourse.name) {
      courseUpdates.name = updatedCourse.name;
      hasCourseScalarChanges = true;
    }
    if (originalCourse.units !== updatedCourse.units) {
      courseUpdates.units = updatedCourse.units;
      hasCourseScalarChanges = true;
    }
    if (originalCourse.code !== updatedCourse.code) {
      courseUpdates.code = updatedCourse.code;
      hasCourseScalarChanges = true;
    }
    if (originalCourse.progress !== updatedCourse.progress) {
      courseUpdates.progress = updatedCourse.progress;
      hasCourseScalarChanges = true;
    }
    if (originalCourse.grade !== updatedCourse.grade) {
      courseUpdates.grade = updatedCourse.grade;
      hasCourseScalarChanges = true;
    }

    const originalTopics = originalCourse.topics || [];
    const topicsModels = await updatedCourse.topics();
    const updatedTopics: Topic[] = topicsModels.items || [];
    const originalIdSet = new Set(originalTopics.map((t) => t.id));

    const topicsToDelete = originalTopics.filter(
      (topic) => !updatedTopics.some((t) => t.id === topic.id)
    );

    const topicsToAdd: TopicCreateInput[] = updatedTopics
      .filter((topic) => topic.id && !originalIdSet.has(topic.id))
      .map((t) => ({
        title: t.title,
        status: t.status,
        progress: t.progress,
      }));

    if (hasCourseScalarChanges) {
      await client.models.Course.update(
        { id: updatedId, ...courseUpdates },
        permission
      );
    }

    if (topicsToDelete.length > 0) {
      await Promise.all(
        topicsToDelete.map((topic) =>
          client.models.Topic.delete({ id: topic.id }, permission)
        )
      );
    }

    if (topicsToAdd.length > 0) {
      await Promise.all(
        topicsToAdd.map((topicInput) =>
          client.models.Topic.create(
            {
              ...topicInput,
              courseId: updatedId,
            },
            permission
          )
        )
      );
    }

    const topicsToUpdate = updatedTopics.filter(
      (topic) => topic.id && originalIdSet.has(topic.id)
    );

    if (topicsToUpdate.length > 0) {
      const updatePromises = topicsToUpdate.map((updatedTopic) => {
        const originalTopic = originalTopics.find(
          (t) => t.id === updatedTopic.id
        );
        if (!originalTopic) return Promise.resolve();

        let topicNeedsUpdate = false;
        const topicUpdates: any = { id: updatedTopic.id };

        if (originalTopic.title !== updatedTopic.title) {
          topicUpdates.title = updatedTopic.title;
          topicNeedsUpdate = true;
        }
        if (originalTopic.status !== updatedTopic.status) {
          topicUpdates.status = updatedTopic.status;
          topicNeedsUpdate = true;
        }
        if (originalTopic.progress !== updatedTopic.progress) {
          topicUpdates.progress = updatedTopic.progress;
          topicNeedsUpdate = true;
        }

        if (topicNeedsUpdate) {
          return client.models.Topic.update(topicUpdates, permission);
        }
        return Promise.resolve();
      });

      await Promise.all(updatePromises);
    }

    return client.models.Course.get(
      { id: updatedId },

      {
        selectionSet: [
          "id",
          "name",
          "units",
          "code",
          "progress",
          "grade",
          "semesterId",
          "topics.*",
        ],
      }
    );
  },

  delete: async (id: string) => client.models.Course.delete({ id }),
};
