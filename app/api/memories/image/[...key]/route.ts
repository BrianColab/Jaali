import { NextResponse } from "next/server";

import {
  GetObjectCommand,
  getBucketName,
  getStorageClient,
} from "@/lib/storage";

export const dynamic = "force-dynamic";

const validKeyPattern = /^memories\/[a-zA-Z0-9-]+\.[a-zA-Z0-9]{1,5}$/;

type RouteParams = Readonly<{ params: Promise<{ key: string[] }> }>;

export async function GET(_request: Request, { params }: RouteParams) {
  const { key: keyParts } = await params;
  const key = keyParts.join("/");

  if (!validKeyPattern.test(key)) {
    return NextResponse.json({ error: "Invalid image key." }, { status: 400 });
  }

  const object = await getStorageClient().send(
    new GetObjectCommand({ Bucket: getBucketName(), Key: key }),
  );

  if (!object.Body) {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }

  const body = await object.Body.transformToByteArray();

  return new NextResponse(Buffer.from(body), {
    headers: {
      "Content-Type": object.ContentType ?? "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
