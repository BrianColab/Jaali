export type MemoryStatus = "pending" | "approved" | "declined";

export type MemoryRecord = Readonly<{
  id: string;
  imageKey: string;
  uploaderName: string | null;
  caption: string | null;
  status: MemoryStatus;
  createdAt: string;
}>;
