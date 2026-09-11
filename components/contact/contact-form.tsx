"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { TextAreaField, TextField } from "@/components/forms/form-controls";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";
import { cn } from "@/utils/cn";

type ContactFormProps = Readonly<{
  className?: string;
  idPrefix?: string;
}>;

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({
  className,
  idPrefix = "contact",
}: ContactFormProps) {
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
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
          Message Sent
        </Heading>
        <Text>Thank you for reaching out. We will get back to you soon.</Text>
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
        Contact form
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
        id={`${idPrefix}-subject`}
        label="Subject"
        name="subject"
      />
      <TextAreaField
        id={`${idPrefix}-message`}
        label="Message"
        name="message"
        required
        rows={5}
      />
      {status === "error" && errorMessage ? (
        <p className="form-error" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <Button type="submit" size="large" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
