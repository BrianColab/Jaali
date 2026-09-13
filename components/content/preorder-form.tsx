"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { SelectField, TextField } from "@/components/forms/form-controls";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";
import { SHIRT_COLORS, SHIRT_SIZES } from "@/types/preorders";
import { cn } from "@/utils/cn";

type PreorderFormProps = Readonly<{
  className?: string;
  idPrefix?: string;
}>;

type Status = "idle" | "submitting" | "success" | "error";

const sizeOptions = SHIRT_SIZES.map((size) => ({ label: size, value: size }));
const DEFAULT_COLOR: string = SHIRT_COLORS[0] ?? "Black";

export function PreorderForm({
  className,
  idPrefix = "preorder",
}: PreorderFormProps) {
  const titleId = `${idPrefix}-form-title`;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [color, setColor] = useState<string>(DEFAULT_COLOR);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/preorders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          size: data.get("size"),
          color,
          quantity: Number.parseInt(String(data.get("quantity")), 10),
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        setErrorMessage(
          payload?.error ?? "Something went wrong. Please try again.",
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
      setColor(DEFAULT_COLOR);
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={cn("preorder-form", className)}>
        <Heading id={titleId} level={3} variant="card">
          You&apos;re on the list
        </Heading>
        <Text>
          Thank you for your preorder. We&apos;ll email and call you as soon
          as the shirts are ready.
        </Text>
      </div>
    );
  }

  return (
    <form
      className={cn("preorder-form", className)}
      aria-labelledby={titleId}
      onSubmit={handleSubmit}
    >
      <span id={titleId} className="visually-hidden">
        Shirt preorder form
      </span>

      <div className="form-field">
        <span className="form-label">Colour</span>
        <div className="preorder-form__swatches" role="radiogroup" aria-label="Shirt colour">
          {SHIRT_COLORS.map((option) => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={color === option}
              className={cn(
                "preorder-form__swatch",
                color === option && "preorder-form__swatch--selected",
              )}
              data-color={option.toLowerCase()}
              onClick={() => setColor(option)}
            >
              <span className="visually-hidden">{option}</span>
            </button>
          ))}
        </div>
        <Text size="small" muted>
          Selected: {color}
        </Text>
      </div>

      <SelectField
        id={`${idPrefix}-size`}
        label="Size"
        name="size"
        required
        options={sizeOptions}
      />

      <TextField
        id={`${idPrefix}-quantity`}
        label="Quantity"
        name="quantity"
        type="number"
        min={1}
        max={50}
        defaultValue={1}
        required
      />

      <TextField id={`${idPrefix}-name`} label="Your name" name="name" required />
      <TextField
        id={`${idPrefix}-email`}
        label="Your email"
        name="email"
        type="email"
        required
      />
      <TextField
        id={`${idPrefix}-phone`}
        label="Phone number"
        name="phone"
        type="tel"
        required
      />

      {status === "error" && errorMessage ? (
        <p className="form-error" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <Button type="submit" size="large" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting…" : "Preorder — Notify Me"}
      </Button>
    </form>
  );
}
