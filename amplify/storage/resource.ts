import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "studently-notes-tayo",
  access: (allow) => ({
    "public/*": [allow.guest.to(["read"])],
    "private/{identityId}/*": [
      allow.authenticated.to(["read", "write", "delete"]),
    ],
  }),
});
