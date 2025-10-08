import type { SemesterData, SemesterModel } from "types";
import { client } from "~/lib/amplifyClient";

type CourseCreateInput = {
  name: string;
  units: number;
  code: string;
  grade?: string | null;
  progress?: number | null;
};

const permission: any = { authMode: "userPool" };
export const SemesterAPI = {
  create: async (input: { id?: string; name: string; units: number }) => {
    await client.models.Semester.create(input, permission);
  },
  get: async (id: string) =>
    await client.models.Semester.get(
      { id },
      {
        selectionSet: [
          "id",
          "name",
          "units",
          "owner",
          "courses.*",
          "courses.topics.*",
        ],
      }
    ),

  list: async () =>
    await client.models.Semester.list({
      selectionSet: [
        "id",
        "name",
        "units",
        "owner",
        "courses.*",
        "courses.topics.*",
      ],
    }),

  update: async (updatedSemester: SemesterData) => {
    const updatedId = updatedSemester.id;

    const originalResponse = await client.models.Semester.get(
      { id: updatedId },
      { selectionSet: ["id", "name", "units", "owner", "courses.*"] }
    );
    const originalSemester = originalResponse.data;

    if (!originalSemester) {
      throw new Error(`Semester with ID ${updatedId} not found.`);
    }

    const scalarUpdates: Partial<{
      name: string;
      units: number;
      owner: string;
    }> = {};
    let hasScalarChanges = false;

    if (originalSemester.name !== updatedSemester.name) {
      scalarUpdates.name = updatedSemester.name;
      hasScalarChanges = true;
    }
    if (originalSemester.units !== updatedSemester.units) {
      scalarUpdates.units = updatedSemester.units;
      hasScalarChanges = true;
    }

    const originalCourses = originalSemester.courses || [];
    const updatedCourses = updatedSemester.courses || [];

    const originalIdSet = new Set(originalCourses.map((c) => c.id));

    const coursesToDelete = originalCourses.filter((course) => {
      return !updatedCourses.some((c) => c.id === course.id);
    });

    const coursesToAdd: CourseCreateInput[] = updatedCourses
      .filter((course) => {
        return !originalIdSet.has(course.id);
      })
      .map((c) => ({
        name: c.name,
        units: c.units,
        code: c.code,
        grade: c.grade,
        progress: c.progress,
      }));

    if (hasScalarChanges) {
      await client.models.Semester.update(
        { id: updatedId, ...scalarUpdates },
        permission
      );
    }

    if (coursesToDelete.length > 0) {
      await Promise.all(
        coursesToDelete.map((course) =>
          client.models.Course.delete({ id: course.id }, permission)
        )
      );
    }

    if (coursesToAdd.length > 0) {
      await Promise.all(
        coursesToAdd.map((courseInput) =>
          client.models.Course.create(
            {
              ...courseInput,
              semesterId: updatedId,
            },
            permission
          )
        )
      );
    }

    const coursesToUpdate = updatedCourses.filter(
      (course) => course.id && originalIdSet.has(course.id)
    );

    if (coursesToUpdate.length > 0) {
      const updatePromises = coursesToUpdate.map((updatedCourse) => {
        const originalCourse = originalCourses.find(
          (c) => c.id === updatedCourse.id
        );
        if (!originalCourse) return Promise.resolve();

        let courseNeedsUpdate = false;
        const courseUpdates: any = { id: updatedCourse.id };

        if (originalCourse.name !== updatedCourse.name) {
          courseUpdates.name = updatedCourse.name;
          courseNeedsUpdate = true;
        }
        if (originalCourse.units !== updatedCourse.units) {
          courseUpdates.units = updatedCourse.units;
          courseNeedsUpdate = true;
        }
        if (originalCourse.code !== updatedCourse.code) {
          courseUpdates.code = updatedCourse.code;
          courseNeedsUpdate = true;
        }
        if (originalCourse.grade !== updatedCourse.grade) {
          courseUpdates.grade = updatedCourse.grade;
          courseNeedsUpdate = true;
        }
        if (originalCourse.progress !== updatedCourse.progress) {
          courseUpdates.progress = updatedCourse.progress;
          courseNeedsUpdate = true;
        }

        if (courseNeedsUpdate) {
          return client.models.Course.update(courseUpdates, permission);
        }
        return Promise.resolve();
      });

      await Promise.all(updatePromises);
    }

    return client.models.Semester.get(
      { id: updatedId },
      { selectionSet: ["id", "name", "units", "owner", "courses.*"] }
    );
  },

  delete: async (id: string) =>
    await client.models.Semester.delete({ id }, permission),
};
