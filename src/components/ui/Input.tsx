import React from "react";

interface InputProps {
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  value,
  onChange,
  label,
  placeholder,
  type = "text",
  required = false,
  error,
  className = "",
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block mb-1.5 text-apple-gray-500 font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        required={required}
        className={`w-full px-4 py-3 rounded-apple border border-apple-gray-200 bg-white 
        focus:outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/10
        transition-all duration-200 ${error ? "border-red-500" : ""} ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;