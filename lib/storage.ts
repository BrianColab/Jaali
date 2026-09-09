import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";

let client: S3Client | undefined;

function getClient(): S3Client {
  if (!client) {
    client = new S3Client({
      region: "auto",
      endpoint: process.env.BUCKET_ENDPOINT ?? "",
      credentials: {
        accessKeyId: process.env.BUCKET_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY ?? "",
      },
    });
  }
  return client;
}

function getBucketName(): string {
  const bucket = process.env.BUCKET_NAME;
  if (!bucket) throw new Error("BUCKET_NAME is not configured");
  return bucket;
}

function getExtension(file: File): string {
  const fromName = file.name.split(".").pop();
  if (fromName && /^[a-z0-9]{1,5}$/i.test(fromName))
    return fromName.toLowerCase();
  const fromType = file.type.split("/").pop();
  return fromType && /^[a-z0-9]{1,5}$/i.test(fromType)
    ? fromType.toLowerCase()
    : "jpg";
}

export async function uploadMemoryImage(file: File): Promise<string> {
  const key = `memories/${randomUUID()}.${getExtension(file)}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await getClient().send(
    new PutObjectCommand({
      Bucket: getBucketName(),
      Key: key,
      Body: buffer,
      ContentType: file.type,
    }),
  );

  return key;
}

export function getMemoryImageUrl(key: string): string {
  return `/api/memories/image/${key}`;
}

export async function deleteMemoryImage(key: string): Promise<void> {
  await getClient().send(
    new DeleteObjectCommand({ Bucket: getBucketName(), Key: key }),
  );
}

export { GetObjectCommand, getClient as getStorageClient, getBucketName };
