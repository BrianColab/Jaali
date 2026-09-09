import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";

import { AdminLoginForm } from "./login-form";

export const metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="admin-login">
      <Container className="admin-login__container">
        <Heading level={1} variant="section">
          Admin Login
        </Heading>
        <Text muted>
          Enter the shared admin password to review memory photos.
        </Text>
        <AdminLoginForm />
      </Container>
    </main>
  );
}
