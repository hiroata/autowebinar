import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'neu' | 'elevated' | 'bordered' | 'subtle';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  clickable?: boolean;
  as?: React.ElementType;
  href?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  image?: string;
  imageHeight?: string;
  fullWidth?: boolean;
  style?: React.CSSProperties; // style プロパティを追加
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
  hoverEffect = true,
  clickable = false,
  as: Component = 'div',
  href,
  header,
  footer,
  image,
  imageHeight = 'auto',
  fullWidth = true,
  style, // style プロパティを追加
  ...rest
}) => {
  const variantClasses = {
    default: 'bg-white shadow-md',
    glass: 'bg-white/80 backdrop-blur shadow-glass border border-white/20',
    neu: 'bg-neutral-50 shadow-neu-soft',
    elevated: 'bg-white shadow-lg',
    bordered: 'bg-white border border-neutral-200',
    subtle: 'bg-neutral-50 border border-neutral-100',
  };

  const paddingClasses = {
    none: 'p-0',
    xs: 'p-3',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  };

  const hoverClasses = hoverEffect
    ? clickable
      ? 'transform transition-all duration-200 hover:-translate-y-1 hover:shadow-lg'
      : 'transition-shadow duration-200 hover:shadow-lg'
    : '';

  const clickableClasses = clickable ? 'cursor-pointer' : '';
  const widthClass = fullWidth ? 'w-full' : '';

  const cardClasses = `
    rounded
    ${variantClasses[variant]}
    ${paddingClasses[padding]}
    ${hoverClasses}
    ${clickableClasses}
    ${widthClass}
    overflow-hidden
    ${className}
  `;

  const props = Component === 'a' ? { href, style, ...rest } : { style, ...rest };

  // 画像のマージン調整
  const imageMarginClass = {
    none: '',
    xs: '-mx-3 -mt-3 mb-3',
    sm: '-mx-4 -mt-4 mb-4',
    md: '-mx-5 -mt-5 mb-5',
    lg: '-mx-6 -mt-6 mb-6',
  };

  return (
    <Component className={cardClasses} onClick={onClick} {...props}>
      {image && (
        <div className={`rounded-t overflow-hidden ${imageMarginClass[padding]}`}>
          <img 
            src={image} 
            alt="Card header" 
            className="w-full object-cover" 
            style={{ height: imageHeight }}
          />
        </div>
      )}
      
      {header && (
        <div className="mb-4 pb-4 border-b border-neutral-200">
          {header}
        </div>
      )}

      {children}

      {footer && (
        <div className="mt-4 pt-4 border-t border-neutral-200">
          {footer}
        </div>
      )}
    </Component>
  );
};

export default Card;