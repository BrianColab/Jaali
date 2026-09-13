"use client";

import { useState } from "react";

import { PreorderForm } from "@/components/content/preorder-form";
import { Modal } from "@/components/overlays/modal";
import { Button } from "@/components/ui/button";

export function PreorderCta() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        size="large"
        className="preorder-shirt-cta"
        onClick={() => setOpen(true)}
      >
        Pre-Order a Shirt
      </Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Pre-Order a Shirt"
        showLogo
      >
        <PreorderForm idPrefix="preorder-modal" />
      </Modal>
    </>
  );
}
