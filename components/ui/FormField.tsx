import { ReactNode } from 'react';
import type { FieldError } from 'react-hook-form';

type Props = {
  label: string;
  htmlFor: string;
  error?: FieldError;
  children: ReactNode;
};

export function FormField({ label, htmlFor, error, children }: Props) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
}
