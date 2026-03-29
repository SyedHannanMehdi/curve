import React from "react";
import { cn } from "../../lib/utils";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Visible label rendered above the input */
  label?: string;
  /** Hint text rendered below the input */
  hint?: string;
  /** Error message — takes precedence over hint */
  error?: string;
  /** Size variant */
  size?: InputSize;
  /** Element rendered before the input (inside the border) */
  leftAddon?: React.ReactNode;
  /** Element rendered after the input (inside the border) */
  rightAddon?: React.ReactNode;
}

const sizeClasses: Record<InputSize, string> = {
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      hint,
      error,
      size = "md",
      leftAddon,
      rightAddon,
      className,
      disabled,
      ...rest
    },
    ref
  ) => {
    // Always have a stable, unique ID so aria-describedby never becomes
    // "undefined-hint" or "undefined-error" (addresses review comment).
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy =
      [errorId, hintId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "flex items-center rounded-md border bg-white",
            "focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500",
            error
              ? "border-red-500 focus-within:ring-red-500"
              : "border-gray-300",
            disabled && "opacity-50 bg-gray-50 cursor-not-allowed"
          )}
        >
          {leftAddon && (
            <span className="px-3 text-gray-500 shrink-0">{leftAddon}</span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={cn(
              "w-full bg-transparent focus:outline-none",
              sizeClasses[size],
              leftAddon && "pl-0",
              rightAddon && "pr-0",
              className
            )}
            {...rest}
          />

          {rightAddon && (
            <span className="px-3 text-gray-500 shrink-0">{rightAddon}</span>
          )}
        </div>

        {error && (
          <p id={errorId} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={hintId} className="text-sm text-gray-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
