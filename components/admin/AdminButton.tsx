import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "premium" | "mui-contained" | "mui-outlined";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  isLoading?: boolean;
  iconOnly?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
}

export function AdminButton({
  variant = "default",
  size = "default",
  asChild = false,
  isLoading = false,
  iconOnly = false,
  iconLeft,
  iconRight,
  className = "",
  ...props
}: AdminButtonProps) {
  const Comp = asChild ? "span" : "button";
  
  return (
    <Comp
      className={cn(
        "admin-button",
        className,
        iconOnly && "h-9 w-9 flex items-center justify-center"
      )}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin h-4 w-4">
          {/* Using Lucide icon for Loader2 */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      ) : (
        <>
          {iconLeft && !iconOnly && (
            <span className="mr-2 h-4 w-4">{iconLeft}</span>
          )}
          {!iconOnly && props.children}
          {iconRight && !iconOnly && (
            <span className="ml-2 h-4 w-4">{iconRight}</span>
          )}
          {iconOnly && (
            <>
              {iconLeft || iconRight}
              {iconLeft && iconRight && <span className="mx-1" />}
            </>
          )}
        </>
      )}
    </Comp>
  );
}