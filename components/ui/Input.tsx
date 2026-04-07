import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = '', ...props }: Props) {
  return (
    <input
      className={`border rounded-md px-3 py-1.5 text-sm ${className}`}
      {...props}
    />
  );
}
