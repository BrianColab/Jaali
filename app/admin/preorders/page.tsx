import Link from "next/link";
import { redirect } from "next/navigation";

import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { getAllPreorders } from "@/lib/preorders";
import { hasAdminSession } from "@/lib/require-admin";

import { AdminPreorderTable } from "./preorder-table";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Pre-Orders Merch",
  robots: { index: false, follow: false },
};

export default async function AdminPreordersPage() {
  if (!(await hasAdminSession())) {
    redirect("/admin/login");
  }

  const preorders = await getAllPreorders();
  const totalShirts = preorders.reduce((sum, order) => sum + order.quantity, 0);

  return (
    <main className="admin-queue">
      <Container className="admin-queue__container">
        <Heading level={1} variant="section">
          Pre-Orders Merch
        </Heading>
        <Link href="/admin/memories">View memory photos →</Link>
        <Text muted>
          {preorders.length === 0
            ? "No preorders yet."
            : `${preorders.length} preorder${preorders.length === 1 ? "" : "s"} — ${totalShirts} shirt${totalShirts === 1 ? "" : "s"} total.`}
        </Text>
        <AdminPreorderTable preorders={preorders} />
      </Container>
    </main>
  );
}
