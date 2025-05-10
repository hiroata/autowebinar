import React, { forwardRef } from "react";

// size属性の競合を解決するためにInputHTMLAttributesからsizeを除外して拡張
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  name: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
  className?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  helperText?: string;
  variant?: "default" | "filled" | "floating";
  size?: "xs" | "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    name,
    value,
    onChange,
    label,
    placeholder,
    type = "text",
    required = false,
    error,
    className = "",
    iconLeft,
    iconRight,
    helperText,
    variant = "default",
    size = "md",
    fullWidth = true,
    ...rest
  }, ref) => {
    const sizeClasses = {
      xs: "px-2.5 py-1.5 text-xs",
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2.5 text-base",
      lg: "px-5 py-3.5 text-lg",
    };
    
    const variantClasses = {
      default: `bg-white border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20`,
      filled: `bg-neutral-100 border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20`,
      floating: `bg-white border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 pt-6`,
    };

    const widthClass = fullWidth ? "w-full" : "";
    
    const inputId = `input-${name}`;
    
    // 浮動ラベルの場合はplaceholderを空にする
    const inputPlaceholder = variant === "floating" ? " " : placeholder;
    
    return (
      <div className={`form-group ${widthClass}`}>
        {label && variant !== "floating" && (
          <label 
            htmlFor={inputId} 
            className="block mb-1.5 text-neutral-700 font-medium text-sm transition-colors duration-200"
          >
            {label}
            {required && <span className="text-accent-error ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {iconLeft && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              {iconLeft}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={inputPlaceholder}
            type={type}
            required={required}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
            className={`
              rounded
              ${variantClasses[variant]}
              ${sizeClasses[size]}
              ${iconLeft ? 'pl-10' : ''}
              ${iconRight ? 'pr-10' : ''}
              ${error ? 'border-accent-error focus:border-accent-error focus:ring focus:ring-accent-error/10' : ''}
              ${widthClass}
              transition-all duration-200 ease-in-out
              placeholder:text-neutral-400
              disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed
              ${className}
            `}
            {...rest}
          />
          
          {variant === "floating" && (
            <label 
              htmlFor={inputId}
              className={`
                absolute top-0 left-0 h-full px-4 flex items-center text-neutral-500
                transform transition-all duration-200 ease-in-out
                ${(value || rest.defaultValue) ? '-translate-y-1/3 scale-75 text-primary-600' : 'translate-y-0 cursor-text'}
                pointer-events-none
              `}
            >
              {label}
              {required && <span className="text-accent-error ml-1">*</span>}
            </label>
          )}
          
          {iconRight && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              {iconRight}
            </div>
          )}
          
          {error && !iconRight && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-accent-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        {error && (
          <p id={`${name}-error`} className="mt-1.5 text-sm text-accent-error">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p id={`${name}-helper`} className="mt-1.5 text-sm text-neutral-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;