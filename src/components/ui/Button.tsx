import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "ghost" | "subtle" | "danger";
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  rounded?: boolean;
  as?: React.ElementType;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  fullWidth = false,
  isLoading = false,
  icon,
  iconPosition = "left",
  rounded = false,
  as: Component = "button",
  href,
  ...rest
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus:ring-primary-500/50 shadow-md",
    secondary: "bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 focus:ring-secondary-500/50 shadow-md",
    outline: "bg-transparent text-primary-600 border border-primary-300 hover:border-primary-500 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500/30",
    ghost: "bg-transparent text-primary-600 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500/30",
    subtle: "bg-primary-50 text-primary-700 hover:bg-primary-100 active:bg-primary-200 focus:ring-primary-500/30",
    danger: "bg-accent-error text-white hover:bg-red-600 active:bg-red-700 focus:ring-red-500/50 shadow-md"
  };
  
  const sizeClasses = {
    xs: "px-2.5 py-1.5 text-xs",
    sm: "px-3.5 py-2 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-7 py-3 text-lg"
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  const roundedClass = rounded ? "rounded-full" : "rounded";
  const disabledClass = disabled || isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer";
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${roundedClass} ${disabledClass} ${className}`;
  
  // Link or button
  const props = Component === 'a' ? { href, ...rest } : { type, ...rest };
  
  return (
    <Component
      className={buttonClasses}
      onClick={!disabled && !isLoading ? onClick : undefined}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="mr-2 flex items-center">
          <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
      
      {icon && iconPosition === "left" && !isLoading && (
        <span className="mr-2 flex items-center">{icon}</span>
      )}
      
      <span className="truncate">{children}</span>
      
      {icon && iconPosition === "right" && (
        <span className="ml-2 flex items-center">{icon}</span>
      )}
    </Component>
  );
};

export default Button;