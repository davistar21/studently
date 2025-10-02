"use client"

import { generateClient } from "aws-amplify/data"
import type { Schema } from "../../amplify/data/resource"

const client = generateClient<Schema>()

/**
 * Create a Profile
 */
export async function createProfile(input: {
  id: string
  username: string
  email: string
}) {
  return await client.models.Profile.create({
    ...input,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
}

/**
 * Get a Profile by ID
 */
export async function getProfile(id: string) {
  return await client.models.Profile.get({ id })
}

/**
 * Update a Profile
 */
export async function updateProfile(
  id: string,
  updates: Partial<{ username: string; email: string }>
) {
  return await client.models.Profile.update({
    id,
    ...updates,
    updatedAt: new Date().toISOString(),
  })
}

/**
 * Delete a Profile
 */
export async function deleteProfile(id: string) {
  return await client.models.Profile.delete({ id })
}

/**
 * List all Profiles (if you ever need it)
 */
export async function listProfiles() {
  return await client.models.Profile.list()
}
