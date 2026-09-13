"use client";

import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { TextField } from "@/components/forms/form-controls";
import { Button } from "@/components/ui/button";

export function AdminLoginForm({
  autoFocus,
  onSuccess,
}: Readonly<{ autoFocus?: boolean; onSuccess?: () => void }> = {}) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

    onSuccess?.();
    router.push("/admin/memories");
    router.refresh();
  }

  return (
    <form className="admin-login-form" onSubmit={handleSubmit}>
      <TextField
        id="admin-password"
        label="Admin password"
        name="password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        autoFocus={autoFocus}
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        suffix={
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((visible) => !visible)}
          >
            {showPassword ? (
              <EyeOff aria-hidden="true" size={18} strokeWidth={1.5} />
            ) : (
              <Eye aria-hidden="true" size={18} strokeWidth={1.5} />
            )}
          </button>
        }
        {...(error ? { error } : {})}
      />
      <Button type="submit" size="large" disabled={submitting}>
        {submitting ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
