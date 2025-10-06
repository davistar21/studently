// utils/noteStorage.ts
import {
  ListObjectsV2Command,
  DeleteObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

export const fetchNotes = async (s3Client: any, userId: string) => {
  if (!s3Client) return [];

  const command = new ListObjectsV2Command({
    Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
    Prefix: `private/${userId}/`,
  });

  const response = await s3Client.send(command);

  // If bucket is empty, return an empty array
  if (!response.Contents) return [];

  // Map S3 objects to your Note format
  return response.Contents.map((item) => ({
    id: item.Key!,
    title: item.Key!.split("/").pop()!, // filename only
    lastModified: item.LastModified ? item.LastModified.getTime() : undefined,
    size: item.Size,
  }));
};

export const uploadNote = async (
  s3Client: any,
  file: File,
  userId: string,
  semesterId: string,
  courseId: string
) => {
  const key = `private/${userId}/${semesterId}/${courseId}/${file.name}`;

  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer); // <-- convert ArrayBuffer to Uint8Array

  await s3Client.send(
    new PutObjectCommand({
      Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
      Key: key,
      Body: uint8Array, // <-- this works
      ContentType: file.type,
    })
  );

  return { id: key, title: file.name };
};

export const deleteNote = async (s3Client: any, key: string) => {
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
      Key: key,
    })
  );
};

export const getNoteUrl = async (s3Client: any, key: string) => {
  // Optional: Use getSignedUrl from @aws-sdk/s3-request-presigner if needed
};

console.log(
  /^[a-zA-Z0-9][a-zA-Z0-9-]{35}$/.test("studentlychatsession3141592653589793"),
  "studentlychatsession3141592653589793".length
);
