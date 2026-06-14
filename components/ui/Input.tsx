import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = '', ...props }: Props) {
  return (
    <input
      className={`border rounded-md px-3 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 ${className}`}
      {...props}
    />
  );
}
