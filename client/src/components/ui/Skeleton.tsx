import React from "react";
import { cn } from "../../lib/utils";

/* ─────────────────────────────────────────────
   Base Skeleton
───────────────────────────────────────────── */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shape variant */
  variant?: "rectangular" | "circular" | "text";
  /** Explicit width (defaults to 100%) */
  width?: string | number;
  /** Explicit height */
  height?: string | number;
}

export function Skeleton({
  variant = "rectangular",
  width,
  height,
  className,
  style,
  ...rest
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-gray-200",
        variant === "circular" && "rounded-full",
        variant === "text" && "rounded",
        variant === "rectangular" && "rounded-md",
        className
      )}
      style={{
        width: width ?? "100%",
        height:
          height ?? (variant === "text" ? "1em" : undefined),
        ...style,
      }}
      {...rest}
    />
  );
}

/* ─────────────────────────────────────────────
   Preset: Text block
───────────────────────────────────────────── */
export interface SkeletonTextProps {
  /** Number of lines to render */
  lines?: number;
  className?: string;
}

export function SkeletonText({ lines = 3, className }: SkeletonTextProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex flex-col gap-2", className)}
    >
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          // Last line is shorter for a more natural look
          width={i === lines - 1 ? "66%" : "100%"}
          height="0.875rem"
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Preset: Card
───────────────────────────────────────────── */
export interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-xl border border-gray-100 bg-white p-4 shadow-sm",
        "flex flex-col gap-4",
        className
      )}
    >
      {/* Image / media area */}
      <Skeleton variant="rectangular" height={160} />
      {/* Title */}
      <Skeleton variant="text" width="50%" height="1.125rem" />
      {/* Body text */}
      <SkeletonText lines={3} />
    </div>
  );
}
