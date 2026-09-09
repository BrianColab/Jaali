import { NextResponse } from "next/server";

import { insertPendingMemory } from "@/lib/memories";
import { uploadMemoryImage } from "@/lib/storage";

export const dynamic = "force-dynamic";

const maxFileSizeBytes = 8 * 1024 * 1024;
const maxCaptionLength = 500;
const maxNameLength = 120;

export async function POST(request: Request) {
  const formData = await request.formData();
  const image = formData.get("image");
  const name = formData.get("name");
  const caption = formData.get("caption");

  if (!(image instanceof File) || image.size === 0) {
    return NextResponse.json(
      { error: "An image is required." },
      { status: 400 },
    );
  }

  if (!image.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "The uploaded file must be an image." },
      { status: 400 },
    );
  }

  if (image.size > maxFileSizeBytes) {
    return NextResponse.json(
      { error: "Images must be 8MB or smaller." },
      { status: 400 },
    );
  }

  const uploaderName =
    typeof name === "string" && name.trim()
      ? name.trim().slice(0, maxNameLength)
      : null;
  const trimmedCaption =
    typeof caption === "string" && caption.trim()
      ? caption.trim().slice(0, maxCaptionLength)
      : null;

  const imageKey = await uploadMemoryImage(image);
  await insertPendingMemory({
    imageKey,
    uploaderName,
    caption: trimmedCaption,
  });

  return NextResponse.json({ status: "pending" }, { status: 201 });
}
