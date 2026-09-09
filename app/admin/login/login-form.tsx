"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { TextField } from "@/components/forms/form-controls";
import { Button } from "@/components/ui/button";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(undefined);

    const formData = new FormData();
    formData.set("password", password);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      setSubmitting(false);
      setError("Incorrect password. Please try again.");
      return;
    }

    router.push("/admin/memories");
    router.refresh();
  }

  return (
    <form className="admin-login-form" onSubmit={handleSubmit}>
      <TextField
        id="admin-password"
        label="Admin password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        {...(error ? { error } : {})}
      />
      <Button type="submit" size="large" disabled={submitting}>
        {submitting ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
