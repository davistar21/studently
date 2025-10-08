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

  if (!response.Contents) return [];

  return response.Contents.map((item) => ({
    id: item.Key!,
    title: item.Key!.split("/").pop()!,
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
  const uint8Array = new Uint8Array(arrayBuffer);

  await s3Client.send(
    new PutObjectCommand({
      Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
      Key: key,
      Body: uint8Array,
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

export const getNoteUrl = async (s3Client: any, key: string) => {};
