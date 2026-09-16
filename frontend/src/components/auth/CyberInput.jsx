import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const CyberInput = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  icon: Icon,
  required = false,
  disabled = false,
  autoComplete,
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center justify-between"
        >
          <span>
            {label} {required && <span className="text-cyan-400">*</span>}
          </span>
          {error && (
            <span className="text-red-400 text-[11px] font-sans normal-case">
              {error}
            </span>
          )}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none transition-colors">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={id}
          name={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`w-full text-sm font-sans text-slate-100 placeholder-slate-500 rounded-xl px-4 py-2.5 
            ${Icon ? 'pl-10' : 'pl-4'}
            ${isPassword ? 'pr-11' : 'pr-4'}
            glass-input
            ${error ? 'border-red-500/60 focus:border-red-400 focus:shadow-[0_0_15px_rgba(239,68,68,0.25)]' : ''}
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 p-1 text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none"
            tabIndex="-1"
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 text-cyan-400" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CyberInput;
