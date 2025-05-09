import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
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
}) => {
  const baseClasses = "font-medium rounded-pill transition-all duration-300 focus:outline-none";
  
  const variantClasses = {
    primary: "bg-apple-blue text-white hover:bg-[#0077ed] active:bg-[#0068d1]",
    secondary: "bg-apple-gray-100 text-apple-gray-500 hover:bg-apple-gray-200 active:bg-apple-gray-300",
    outline: "bg-transparent text-apple-blue border border-apple-blue hover:bg-apple-blue/5 active:bg-apple-blue/10"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;