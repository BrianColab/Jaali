"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import {
  CheckboxField,
  TextAreaField,
  TextField,
} from "@/components/forms/form-controls";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";
import { cn } from "@/utils/cn";

type ShareExperienceFormProps = Readonly<{
  className?: string;
  idPrefix?: string;
}>;

type Status = "idle" | "submitting" | "success" | "error";

export function ShareExperienceForm({
  className,
  idPrefix = "share-experience",
}: ShareExperienceFormProps) {
  const titleId = `${idPrefix}-form-title`;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/share-experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          experience: data.get("experience"),
          followUp: data.get("followUp") === "on",
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        setErrorMessage(payload?.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={cn("contact-form", className)}>
        <Heading id={titleId} level={3} variant="card">
          Thank You for Sharing
        </Heading>
        <Text>
          Your experience has been received. If you asked for follow-up, we
          will be in touch.
        </Text>
      </div>
    );
  }

  return (
    <form
      className={cn("contact-form", className)}
      aria-labelledby={titleId}
      onSubmit={handleSubmit}
    >
      <span id={titleId} className="visually-hidden">
        Share your experience form
      </span>
      <TextField
        id={`${idPrefix}-name`}
        label="Your name"
        name="name"
        required
      />
      <TextField
        id={`${idPrefix}-email`}
        label="Your email"
        name="email"
        required
        type="email"
      />
      <TextField
        id={`${idPrefix}-phone`}
        label="Phone number (optional)"
        name="phone"
        type="tel"
      />
      <TextAreaField
        id={`${idPrefix}-experience`}
        label="Your experience"
        name="experience"
        required
        rows={7}
      />
      <CheckboxField id={`${idPrefix}-follow-up`} name="followUp">
        I would like someone to follow up with me
      </CheckboxField>
      {status === "error" && errorMessage ? (
        <p className="form-error" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <Button type="submit" size="large" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Share Your Experience"}
      </Button>
    </form>
  );
}
