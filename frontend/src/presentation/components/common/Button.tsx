import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  icon,
  iconPosition = 'left',
  ...props
}) => {
  // Base styles that apply to all buttons
  const baseStyles = `
    inline-flex items-center justify-center 
    font-medium transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    rounded-lg
  `;

  // Variant-specific styles
  const variantStyles = {
    primary: `
      bg-indigo-600 text-white border border-transparent
      hover:bg-indigo-700 
      focus:ring-indigo-500
      active:bg-indigo-800
    `,
    secondary: `
      bg-blue-600 text-white border border-transparent
      hover:bg-blue-700 
      focus:ring-blue-500
      active:bg-blue-800
    `,
    danger: `
      bg-red-600 text-white border border-transparent
      hover:bg-red-700 
      focus:ring-red-500
      active:bg-red-800
    `,
    outline: `
      border border-gray-300 bg-white text-gray-700 
      hover:bg-gray-50 hover:text-gray-900
      focus:ring-indigo-500
      active:bg-gray-100
    `,
    ghost: `
      bg-transparent text-gray-700 
      hover:bg-gray-100 
      focus:ring-indigo-500
      active:bg-gray-200
    `,
  };

  // Size-specific styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';
  
  // Loading and disabled styles
  const loadingStyles = isLoading ? 'cursor-not-allowed' : '';
  const disabledStyles = disabled ? 'opacity-60 cursor-not-allowed' : '';

  return (
    <button
      className={`
        ${baseStyles} 
        ${variantStyles[variant]} 
        ${sizeStyles[size]} 
        ${widthStyles} 
        ${loadingStyles} 
        ${disabledStyles} 
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{children}</span>
        </div>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;