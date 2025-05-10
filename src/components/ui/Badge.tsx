import React from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'subtle' | 'neutral';
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  pill?: boolean;
  outlined?: boolean;
  withDot?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'sm',
  className = '',
  pill = true,
  outlined = false,
  withDot = false,
}) => {
  const variantClasses = {
    primary: outlined
      ? 'bg-transparent text-primary-600 border border-primary-300'
      : 'bg-primary-100 text-primary-700',
    secondary: outlined
      ? 'bg-transparent text-secondary-600 border border-secondary-300'
      : 'bg-secondary-100 text-secondary-700',
    success: outlined
      ? 'bg-transparent text-accent-success border border-green-300'
      : 'bg-green-100 text-green-700',
    warning: outlined
      ? 'bg-transparent text-accent-warning border border-yellow-300'
      : 'bg-yellow-100 text-yellow-700',
    error: outlined
      ? 'bg-transparent text-accent-error border border-red-300'
      : 'bg-red-100 text-red-700',
    info: outlined
      ? 'bg-transparent text-accent-info border border-blue-300'
      : 'bg-blue-100 text-blue-700',
    subtle: outlined
      ? 'bg-transparent text-neutral-700 border border-neutral-300'
      : 'bg-neutral-100 text-neutral-700',
    neutral: outlined
      ? 'bg-transparent text-neutral-600 border border-neutral-300'
      : 'bg-neutral-200 text-neutral-700',
  };

  const sizeClasses = {
    xs: 'text-xs px-1.5 py-0.5',
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-sm px-3 py-1',
  };

  const shapeClass = pill ? 'rounded-full' : 'rounded';
  const dotColorClass = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    success: 'bg-accent-success',
    warning: 'bg-accent-warning',
    error: 'bg-accent-error',
    info: 'bg-accent-info',
    subtle: 'bg-neutral-400',
    neutral: 'bg-neutral-500',
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center font-medium
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${shapeClass}
        ${className}
      `}
    >
      {withDot && (
        <span
          className={`
            w-1.5 h-1.5 rounded-full mr-1.5
            ${dotColorClass[variant]}
          `}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;