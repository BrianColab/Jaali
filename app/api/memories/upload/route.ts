import { NextResponse } from "next/server";

import { insertPendingMemory } from "@/lib/memories";
import { uploadMemoryImage } from "@/lib/storage";

export const dynamic = "force-dynamic";

const maxFileSizeBytes = 8 * 1024 * 1024;
const maxFiles = 5;
const maxCaptionLength = 500;
const maxNameLength = 120;
const acceptedTypes = ["image/png", "image/jpeg", "image/gif"];

export async function POST(request: Request) {
  const formData = await request.formData();
  const images = formData
    .getAll("images")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);
  const name = formData.get("name");
  const caption = formData.get("caption");

  if (images.length === 0) {
    return NextResponse.json(
      { error: "At least one photo is required." },
      { status: 400 },
    );
  }

  if (images.length > maxFiles) {
    return NextResponse.json(
      { error: `You can share up to ${maxFiles} photos at a time.` },
      { status: 400 },
    );
  }

  for (const image of images) {
    if (!acceptedTypes.includes(image.type)) {
      return NextResponse.json(
        { error: "Photos must be PNG, JPEG, or GIF files." },
        { status: 400 },
      );
    }

    if (image.size > maxFileSizeBytes) {
      return NextResponse.json(
        { error: "Each photo must be 8MB or smaller." },
        { status: 400 },
      );
    }
  }

  const uploaderName =
    typeof name === "string" && name.trim()
      ? name.trim().slice(0, maxNameLength)
      : null;
  const trimmedCaption =
    typeof caption === "string" && caption.trim()
      ? caption.trim().slice(0, maxCaptionLength)
      : null;

  for (const image of images) {
    const imageKey = await uploadMemoryImage(image);
    await insertPendingMemory({
      imageKey,
      uploaderName,
      caption: trimmedCaption,
    });
  }

  return NextResponse.json({ status: "pending" }, { status: 201 });
}
