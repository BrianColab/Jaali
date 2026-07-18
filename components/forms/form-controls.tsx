import type {
  ComponentPropsWithoutRef,
  ReactNode,
  SelectHTMLAttributes,
} from "react";

type FieldDescriptionProps = Readonly<{
  error?: string | undefined;
  hint?: string | undefined;
  id: string;
}>;

function getDescribedBy({ error, hint, id }: FieldDescriptionProps) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(" ");
}

function FieldMessages({ error, hint, id }: FieldDescriptionProps) {
  return (
    <>
      {hint ? (
        <p id={`${id}-hint`} className="form-hint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="form-error" role="alert">
          {error}
        </p>
      ) : null}
    </>
  );
}

type TextFieldProps = Readonly<{
  error?: string;
  hint?: string;
  id: string;
  label: string;
}> &
  Omit<
    ComponentPropsWithoutRef<"input">,
    "aria-describedby" | "aria-invalid" | "className" | "id"
  >;

export function TextField({
  error,
  hint,
  id,
  label,
  type = "text",
  ...props
}: TextFieldProps) {
  const describedBy = getDescribedBy({ error, hint, id });

  return (
    <div className="form-field">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="form-control"
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      <FieldMessages id={id} hint={hint} error={error} />
    </div>
  );
}

type TextAreaFieldProps = Readonly<{
  error?: string;
  hint?: string;
  id: string;
  label: string;
}> &
  Omit<
    ComponentPropsWithoutRef<"textarea">,
    "aria-describedby" | "aria-invalid" | "className" | "id"
  >;

export function TextAreaField({
  error,
  hint,
  id,
  label,
  ...props
}: TextAreaFieldProps) {
  const describedBy = getDescribedBy({ error, hint, id });

  return (
    <div className="form-field">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        className="form-control form-control--textarea"
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      <FieldMessages id={id} hint={hint} error={error} />
    </div>
  );
}

export type SelectOption = Readonly<{
  label: string;
  value: string;
}>;

type SelectFieldProps = Readonly<{
  error?: string;
  hint?: string;
  id: string;
  label: string;
  options: readonly SelectOption[];
}> &
  Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "aria-describedby" | "aria-invalid" | "className" | "id"
  >;

export function SelectField({
  error,
  hint,
  id,
  label,
  options,
  ...props
}: SelectFieldProps) {
  const describedBy = getDescribedBy({ error, hint, id });

  return (
    <div className="form-field">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="form-control"
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? true : undefined}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldMessages id={id} hint={hint} error={error} />
    </div>
  );
}

type CheckboxFieldProps = Readonly<{
  children: ReactNode;
  error?: string;
  hint?: string;
  id: string;
}> &
  Omit<
    ComponentPropsWithoutRef<"input">,
    | "aria-describedby"
    | "aria-invalid"
    | "children"
    | "className"
    | "id"
    | "type"
  >;

export function CheckboxField({
  children,
  error,
  hint,
  id,
  ...props
}: CheckboxFieldProps) {
  const describedBy = getDescribedBy({ error, hint, id });

  return (
    <div className="form-field">
      <label className="form-checkbox" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          className="form-checkbox__control"
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? true : undefined}
          {...props}
        />
        <span>{children}</span>
      </label>
      <FieldMessages id={id} hint={hint} error={error} />
    </div>
  );
}

export { getDescribedBy };
