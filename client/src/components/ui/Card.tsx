import React from "react";
import { cn } from "../../lib/utils";

/* ─────────────────────────────────────────────
   Card container
───────────────────────────────────────────── */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Remove the default box-shadow */
  flat?: boolean;
  /** Remove the default border */
  borderless?: boolean;
}

export function Card({
  flat = false,
  borderless = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-white",
        !borderless && "border border-gray-200",
        !flat && "shadow-sm",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Card.Header
───────────────────────────────────────────── */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional action element aligned to the right */
  action?: React.ReactNode;
}

export function CardHeader({
  action,
  className,
  children,
  ...rest
}: CardHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-4 border-b border-gray-200",
        className
      )}
      {...rest}
    >
      <div className="flex-1">{children}</div>
      {action && <div className="ml-4 shrink-0">{action}</div>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Card.Body
───────────────────────────────────────────── */
export function CardBody({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-6 py-4", className)} {...rest}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Card.Footer
───────────────────────────────────────────── */
export function CardFooter({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
