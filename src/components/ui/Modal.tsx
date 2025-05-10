import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  closeOnOverlayClick?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  position?: 'center' | 'top';
  showCloseButton?: boolean;
  footer?: React.ReactNode;
  className?: string;
  hideOverlay?: boolean;
  closeButtonPosition?: 'header' | 'outside';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  closeOnOverlayClick = true,
  size = 'md',
  position = 'center',
  showCloseButton = true,
  footer,
  className = '',
  hideOverlay = false,
  closeButtonPosition = 'header',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        closeOnOverlayClick &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, closeOnOverlayClick]);

  if (!isOpen) return null;

  const sizeClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full mx-4',
  };

  const positionClasses = {
    center: 'items-center',
    top: 'items-start pt-16',
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${!hideOverlay ? 'bg-neutral-900/40 backdrop-blur-sm' : ''}
        flex justify-center ${positionClasses[position]} transition-opacity duration-300`}
    >
      <div
        ref={modalRef}
        className={`relative bg-white rounded shadow-xl w-full ${sizeClasses[size]} animate-fade-in ${className}`}
      >
        {closeButtonPosition === 'outside' && showCloseButton && (
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 bg-white text-neutral-500 hover:text-neutral-700 p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors z-10"
            aria-label="閉じる"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {(title || (showCloseButton && closeButtonPosition === 'header')) && (
          <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-200">
            {title && <h3 className="text-lg font-semibold text-neutral-800">{title}</h3>}
            
            {showCloseButton && closeButtonPosition === 'header' && (
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 rounded-full p-1 transition-colors"
                aria-label="閉じる"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        <div className="p-6">{children}</div>

        {footer && (
          <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;