// s3Client.ts
import { S3Client } from "@aws-sdk/client-s3";
import { fetchAuthSession } from "aws-amplify/auth";

export const getS3Client = async (): Promise<S3Client> => {
  const { credentials } = await fetchAuthSession();
  if (!credentials) throw new Error("No AWS credentials available");

  return new S3Client({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      sessionToken: credentials.sessionToken,
    },
  });
};
