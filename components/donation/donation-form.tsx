import {
  CheckboxField,
  SelectField,
  TextField,
} from "@/components/forms/form-controls";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/typography";
import { donatePageContent } from "@/data/pages";
import { cn } from "@/utils/cn";

type DonationFormProps = Readonly<{
  className?: string;
  idPrefix?: string;
}>;

export function DonationForm({
  className,
  idPrefix = "donation",
}: DonationFormProps) {
  const titleId = `${idPrefix}-form-title`;

  return (
    <form className={cn("donation-form", className)} aria-labelledby={titleId}>
      <Heading id={titleId} level={3} variant="card">
        Your Support
      </Heading>
      <TextField
        id={`${idPrefix}-support`}
        aria-label="Your support in Canadian dollars"
        inputMode="decimal"
        label="Your support"
        min="1"
        name="support"
        prefix="$"
        step="0.01"
        type="number"
      />
      <SelectField
        id={`${idPrefix}-funding-area`}
        label="Funding will support"
        name="funding-area"
        options={donatePageContent.fundingAreas.map((area) => ({
          label: area,
          value: area,
        }))}
      />
      <CheckboxField id={`${idPrefix}-reporting`} name="reporting">
        We will report clearly on how funds are used and what the work achieves.
      </CheckboxField>
      <Button type="button" size="large">
        Donate
      </Button>
    </form>
  );
}
