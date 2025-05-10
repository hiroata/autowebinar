import React, { useState, useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  showIcon?: boolean;
  showProgress?: boolean;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
  position = 'top-right',
  showIcon = true,
  showProgress = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    const interval = 10;
    const step = (interval / duration) * 100;
    
    if (showProgress) {
      progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress <= 0) {
            clearInterval(progressInterval);
            return 0;
          }
          return prevProgress - step;
        });
      }, interval);
    }
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onClose) onClose();
      }, 300); // アニメーション用の遅延
    }, duration);

    return () => {
      clearTimeout(timer);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [duration, onClose, showProgress]);

  if (!isVisible) return null;

  const typeClasses = {
    success: 'bg-white border-l-4 border-accent-success text-neutral-700',
    error: 'bg-white border-l-4 border-accent-error text-neutral-700',
    warning: 'bg-white border-l-4 border-accent-warning text-neutral-700',
    info: 'bg-white border-l-4 border-primary-500 text-neutral-700',
  };

  const typeBgClasses = {
    success: 'bg-green-50',
    error: 'bg-red-50',
    warning: 'bg-amber-50',
    info: 'bg-primary-50',
  };

  const typeIcons = {
    success: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-success" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-error" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-warning" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    info: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
      </svg>
    ),
  };

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };

  const progressColors = {
    success: 'bg-accent-success',
    error: 'bg-accent-error',
    warning: 'bg-accent-warning',
    info: 'bg-primary-500',
  };

  return (
    <div
      className={`fixed ${positionClasses[position]} z-50 max-w-sm shadow-lg rounded overflow-hidden transition-all duration-300 transform translate-y-0 animate-fade-in`}
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className={`flex items-start p-4 ${typeClasses[type]} ${typeBgClasses[type]}`}>
        {showIcon && <div className="flex-shrink-0 mr-3">{typeIcons[type]}</div>}
        
        <div className="flex-grow">
          <p className="text-sm font-medium">{message}</p>
        </div>
        
        <div className="ml-4 flex-shrink-0 flex">
          <button
            className="bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-300 text-neutral-400 hover:text-neutral-600 transition-colors"
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => {
                if (onClose) onClose();
              }, 300);
            }}
          >
            <span className="sr-only">閉じる</span>
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      
      {showProgress && (
        <div className="bg-neutral-200 h-1">
          <div
            className={`h-full ${progressColors[type]} transition-all ease-linear duration-100`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

// トースト通知を管理するためのコンテキストを作成
import { createContext, useContext } from 'react';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default Toast;