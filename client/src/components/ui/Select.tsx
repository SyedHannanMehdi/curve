import React from "react";
import { cn } from "../../lib/utils";

export type SelectSize = "sm" | "md" | "lg";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /** Visible label rendered above the select */
  label?: string;
  /** Hint text rendered below the select */
  hint?: string;
  /** Error message — takes precedence over hint */
  error?: string;
  /** Size variant */
  size?: SelectSize;
  /** Options list (alternative to JSX children) */
  options?: SelectOption[];
}

const sizeClasses: Record<SelectSize, string> = {
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      label,
      hint,
      error,
      size = "md",
      options,
      className,
      disabled,
      children,
      ...rest
    },
    ref
  ) => {
    const generatedId = React.useId();
    const selectId = id ?? generatedId;

    const hintId = hint ? `${selectId}-hint` : undefined;
    const errorId = error ? `${selectId}-error` : undefined;
    const describedBy =
      [errorId, hintId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(
            "w-full rounded-md border bg-white focus:outline-none",
            "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300",
            disabled && "opacity-50 bg-gray-50 cursor-not-allowed",
            sizeClasses[size],
            className
          )}
          {...rest}
        >
          {options
            ? options.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                >
                  {opt.label}
                </option>
              ))
            : children}
        </select>

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

Select.displayName = "Select";
