export type ShirtSize = "S" | "M" | "L" | "XL" | "XXL";

export type ShirtColor = "Black" | "White" | "Red" | "Yellow";

export const SHIRT_SIZES: readonly ShirtSize[] = ["S", "M", "L", "XL", "XXL"];

export const SHIRT_COLORS: readonly ShirtColor[] = [
  "Black",
  "White",
  "Red",
  "Yellow",
];

export type PreorderRecord = Readonly<{
  id: string;
  name: string;
  email: string;
  phone: string;
  size: string;
  color: string;
  quantity: number;
  createdAt: string;
}>;
