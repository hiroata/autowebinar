import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  message = "生成中...",
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };
  
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className={`animate-spin rounded-full border-t-4 border-l-4 border-apple-blue border-opacity-75 ${sizeClasses[size]}`} />
      <span className="mt-3 text-apple-gray-400 font-medium">{message}</span>
    </div>
  );
};

export default LoadingSpinner;