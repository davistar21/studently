import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

const schema = a.schema({
  Profile: a
    .model({
      id: a.id().required(),
      username: a.string().required(),
      email: a.email().required(),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime().required(),
    })
    .authorization((allow) => [allow.owner()]),

  Semester: a
    .model({
      id: a.id().required(),
      name: a.string().required(),
      units: a.integer().required(),
    })
    .authorization((allow) => [allow.owner()]),

  Course: a
    .model({
      id: a.id().required(),
      name: a.string().required(),
      code: a.string(),
      units: a.integer().required(),
      grade: a.string(),
      progress: a.integer(),
      semesterId: a.id().required(), // foreign key to Semester
    })
    .authorization((allow) => [allow.owner()]),

  Topic: a
    .model({
      id: a.id().required(),
      title: a.string().required(),
      status: a.enum(["not_started", "in_progress", "not_completed", "completed"]),
      progress: a.integer(),
      courseId: a.id().required(), // foreign key to Course
    })
    .authorization((allow) => [allow.owner()]),

  Note: a
    .model({
      id: a.id().required(),
      title: a.string().required(),
      courseId: a.id().required(), // foreign key to Course
    })
    .authorization((allow) => [allow.owner()]),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
  },
})
