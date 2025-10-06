import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

export const schema = a.schema({
  Profile: a
    .model({
      id: a.id().required(),
      username: a.string().required(),
      email: a.email().required(),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime().required(),
    })
    .authorization((allow: any) => [allow.owner()]),

  Semester: a
    .model({
      id: a.string().required(),
      name: a.string().required(),
      units: a.integer().required(),
      owner: a.string().authorization((allow) => [allow.owner()]),
      courses: a.hasMany("Course", "semesterId"),
    })
    .authorization((allow: any) => [allow.owner()]),

  Course: a
    .model({
      id: a.id().required(),
      name: a.string().required(),
      code: a.string().required(),
      units: a.integer().required(),
      grade: a.string(),
      progress: a.integer(),
      semesterId: a.id().required(),
      semester: a.belongsTo("Semester", "semesterId"),
      owner: a.string().authorization((allow) => [allow.owner()]),

      topics: a.hasMany("Topic", "courseId"),
    })
    .authorization((allow: any) => [allow.owner()]),

  Topic: a
    .model({
      id: a.id().required(),
      title: a.string().required(),
      progress: a.integer(),
      status: a.enum([
        "not_started",
        "in_progress",
        "not_completed",
        "completed",
      ]),
      courseId: a.id().required(),
      course: a.belongsTo("Course", "courseId"),
      owner: a.string().authorization((allow) => [allow.owner()]),
    })
    .authorization((allow: any) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
