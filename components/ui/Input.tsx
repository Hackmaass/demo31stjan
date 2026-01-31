import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-500 ml-1">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-4 rounded-2xl bg-gray-50 border border-transparent
          text-gray-900 text-base placeholder-gray-400
          focus:outline-none focus:bg-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10
          transition-all duration-300 ease-out
          ${error ? 'bg-red-50 border-red-500/30 text-red-900 focus:border-red-500/50 focus:ring-red-500/10' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 ml-1 font-medium animate-pulse">
          {error}
        </span>
      )}
    </div>
  );
};
