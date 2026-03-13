import React from 'react';

interface FormInput {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;   
  maxLength?: number;   
}

export const FormInput: React.FC<FormInput> = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  maxLength,
}) => {
  return (
    <div style={{ marginBottom: '15px' }}>
      <label htmlFor={id} style={{ display: 'block', marginBottom: '5px' }}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        style={{ width: '100%', padding: '8px' }}
      />
    </div>
  );
};