import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

export async function createProfile(input: {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}) {
  return await client.models.Profile.create({
    ...input,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}
export async function getProfile(id: string) {
  return await client.models.Profile.get({ id });
}

export async function updateProfile(
  id: string,
  updates: Partial<{ username: string; email: string }>
) {
  return await client.models.Profile.update({
    id,
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteProfile(id: string) {
  return await client.models.Profile.delete({ id });
}

export async function listProfiles() {
  return await client.models.Profile.list();
}
