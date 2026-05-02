import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  submitLabel?: string;
  onSubmit?: () => Promise<void> | void;
  isSubmitting?: boolean;
  cancelLabel?: string;
  danger?: boolean;
  width?: string;
  footer?: React.ReactNode;
}

export function AdminModal({
  title,
  isOpen,
  onClose,
  children,
  submitLabel,
  onSubmit,
  isSubmitting = false,
  cancelLabel = "Cancel",
  danger = false,
  width = "sm",
  footer,
}: AdminModalProps) {
  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm", { hidden: !isOpen })}>
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="relative bg-card rounded-lg border p-6 shadow-lg">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 text-muted-foreground hover:text-primary/80"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              {/* Using Lucide icon for X */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

          {/* Body */}
          <div className="space-y-6">{children}</div>

          {/* Footer */}
          {footer ? (
            <div className="pt-5 border-t border-border">{footer}</div>
          ) : (
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-3 pt-5 border-t border-border">
              <Button
                variant="outline"
                onClick={onClose}
                className={cn("w-full sm:w-auto text-[10px] font-bold uppercase tracking-widest", danger && "text-rose-500 border-rose-500/50 hover:bg-rose-500/10")}
              >
                {cancelLabel}
              </Button>
              <Button
                onClick={async () => {
                  if (onSubmit) await onSubmit();
                }}
                isLoading={isSubmitting}
                className={cn(
                  "w-full sm:w-auto text-[10px] font-bold uppercase tracking-widest",
                  danger && "bg-rose-600 text-white hover:bg-rose-700",
                  !danger && "bg-primary text-white hover:bg-primary/90"
                )}
              >
                {submitLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}