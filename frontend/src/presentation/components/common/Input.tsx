import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  helpText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helpText, fullWidth = false, className = '', ...props }, ref) => {
    const inputClasses = `
      block w-full px-4 py-3
      ${error 
        ? 'border-red-300 focus:border-red-500 focus:ring-red-500 text-red-900 placeholder-red-300' 
        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-gray-900'
      }
      rounded-lg border shadow-sm 
      focus:outline-none focus:ring-2 focus:ring-opacity-50
      transition-colors duration-200
      ${props.disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
      ${className}
    `;

    const containerClasses = `${fullWidth ? 'w-full' : ''} ${props.disabled ? 'opacity-70' : ''}`;

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={inputClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${props.id}-error` : helpText ? `${props.id}-description` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600" id={`${props.id}-error`}>
            {error}
          </p>
        )}
        {helpText && !error && (
          <p className="mt-2 text-sm text-gray-500" id={`${props.id}-description`}>
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;