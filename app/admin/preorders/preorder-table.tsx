"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import type { PreorderRecord } from "@/types/preorders";

type AdminPreorderTableProps = Readonly<{
  preorders: readonly PreorderRecord[];
}>;

const EXPORT_COLUMNS = [
  "Date",
  "Name",
  "Email",
  "Phone",
  "Size",
  "Color",
  "Qty",
] as const;

function toRow(item: PreorderRecord): string[] {
  return [
    new Date(item.createdAt).toLocaleDateString("en-CA"),
    item.name,
    item.email,
    item.phone,
    item.size,
    item.color,
    String(item.quantity),
  ];
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function AdminPreorderTable({ preorders }: AdminPreorderTableProps) {
  const [items, setItems] = useState(preorders);
  const [deletingId, setDeletingId] = useState<string>();
  const [error, setError] = useState<string>();

  function handleExportExcel() {
    const rows = [EXPORT_COLUMNS, ...items.map(toRow)];
    const csv = rows
      .map((row) =>
        row
          .map((cell) => `"${cell.replaceAll('"', '""')}"`)
          .join(","),
      )
      .join("\r\n");
    downloadBlob(
      new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" }),
      "jaali-preorders.csv",
    );
  }

  async function handleExportPdf() {
    const [{ default: jsPDF }, autoTable] = await Promise.all([
      import("jspdf"),
      import("jspdf-autotable"),
    ]);
    const doc = new jsPDF();
    doc.text("Justice for Jaali — Shirt Preorders", 14, 16);
    autoTable.default(doc, {
      startY: 22,
      head: [[...EXPORT_COLUMNS]],
      body: items.map(toRow),
    });
    doc.save("jaali-preorders.pdf");
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    setError(undefined);

    const response = await fetch(`/api/admin/preorders/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setDeletingId(undefined);
      setError("Something went wrong. Please try again.");
      return;
    }

    setItems((current) => current.filter((item) => item.id !== id));
    setDeletingId(undefined);
  }

  if (items.length === 0) return null;

  return (
    <>
      {error ? (
        <Text size="small" className="form-error" role="alert">
          {error}
        </Text>
      ) : null}
      <div className="admin-preorder-table__exports">
        <Button type="button" variant="secondary" onClick={handleExportPdf}>
          Download as PDF
        </Button>
        <Button type="button" variant="secondary" onClick={handleExportExcel}>
          Download as Excel
        </Button>
      </div>
      <div className="admin-preorder-table__wrap">
        <table className="admin-preorder-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Size</th>
              <th>Color</th>
              <th>Qty</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{new Date(item.createdAt).toLocaleDateString("en-CA")}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.size}</td>
                <td>{item.color}</td>
                <td>{item.quantity}</td>
                <td>
                  <Button
                    type="button"
                    variant="secondary"
                    size="medium"
                    disabled={deletingId !== undefined}
                    onClick={() => handleDelete(item.id)}
                  >
                    {deletingId === item.id ? "Deleting…" : "Delete"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
