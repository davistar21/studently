"use client";

import { generateClient } from "aws-amplify/data";

// @ts-ignore
// declare module "aws-amplify/data" {
//   export const generateClient: any;
// }
import type { Schema } from "../../amplify/data/resource";

// Initialize the Amplify DataStore client with the defined schema";

export const client = generateClient<Schema>();

// This client can now be used throughout the application to interact with the data models.
