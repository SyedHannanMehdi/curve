import React from "react";
import { cn } from "../../lib/utils";

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface SelectProps<T extends string = string>
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size" | "value" | "onChange"> {
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-3.5 text-sm",
  lg: "h-12 px-4 text-base",
};

export function Select<T extends string = string>({
  label,
  hint,
  error,
  options,
  value,
  onChange,
  placeholder,
  size = "md",
  className,
  id,
  disabled,
  ...rest
}: SelectProps<T>) {
  const inputId =
    id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={inputId}
          value={value ?? ""}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value as T)}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${inputId}-error`
              : hint
              ? `${inputId}-hint`
              : undefined
          }
          className={cn(
            "w-full appearance-none rounded-lg border bg-white pr-8 text-gray-900",
            "transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
            "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400",
            error
              ? "border-red-400 focus:ring-red-400 focus:border-red-400"
              : "border-gray-300",
            sizeClasses[size],
            className
          )}
          {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Chevron icon */}
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>

      {error ? (
        <p id={`${inputId}-error`} className="text-xs text-red-500" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-xs text-gray-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
