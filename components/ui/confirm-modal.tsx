"use client";

import React from "react";
import { Modal } from "./modal";
import { Button } from "./button";
import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info";
  loading?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm Action",
  cancelLabel = "Discard",
  variant = "danger",
  loading = false,
}: ConfirmModalProps) => {
  const variantStyles = {
    danger: "bg-rose-500 hover:bg-rose-600 shadow-rose-500/20",
    warning: "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20",
    info: "bg-primary hover:bg-primary/60 shadow-primary/20",
  };

  const iconStyles = {
    danger: "text-rose-500 bg-rose-50",
    warning: "text-amber-500 bg-amber-50",
    info: "text-primary bg-primary/5",
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      className="max-w-md"
      footer={
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 font-bold text-[10px] uppercase tracking-widest h-11"
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button
            onClick={onConfirm}
            className={`flex-1 font-bold text-[10px] uppercase tracking-widest h-11 shadow-lg ${variantStyles[variant]}`}
            isLoading={loading}
          >
            {confirmLabel}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col items-center text-center space-y-4 py-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${iconStyles[variant]}`}>
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium px-4">
            {description}
          </p>
        </div>
      </div>
    </Modal>
  );
};
