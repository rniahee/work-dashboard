import { SelectHTMLAttributes } from 'react';

type Option = {
  value: string;
  label: string;
};

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
  placeholder?: string;
};

export function Select({ options, placeholder, className = '', ...props }: Props) {
  return (
    <select className={`border rounded-md px-3 py-1.5 text-sm ${className}`} {...props}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(({ value, label }) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </select>
  );
}
