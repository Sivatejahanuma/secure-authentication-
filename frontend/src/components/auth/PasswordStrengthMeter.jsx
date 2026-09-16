import React, { useMemo } from 'react';
import { Check, X, ShieldCheck } from 'lucide-react';

const PasswordStrengthMeter = ({ password = '' }) => {
  const requirements = useMemo(() => [
    { label: 'Minimum 8 characters', met: password.length >= 8 },
    { label: 'At least one uppercase letter (A-Z)', met: /[A-Z]/.test(password) },
    { label: 'At least one lowercase letter (a-z)', met: /[a-z]/.test(password) },
    { label: 'At least one number (0-9)', met: /[0-9]/.test(password) },
    { label: 'At least one special character (!@#$...)', met: /[\W_]/.test(password) },
  ], [password]);

  const score = useMemo(() => {
    return requirements.filter((req) => req.met).length;
  }, [requirements]);

  const getStrengthConfig = () => {
    switch (score) {
      case 0:
        return { label: 'Empty / Very Weak', color: 'bg-red-500', text: 'text-red-400', width: '5%' };
      case 1:
        return { label: 'Insecure', color: 'bg-red-500', text: 'text-red-400', width: '20%' };
      case 2:
        return { label: 'Weak', color: 'bg-amber-500', text: 'text-amber-400', width: '40%' };
      case 3:
        return { label: 'Moderate', color: 'bg-yellow-400', text: 'text-yellow-400', width: '60%' };
      case 4:
        return { label: 'Strong', color: 'bg-cyan-400', text: 'text-cyan-400', width: '80%' };
      case 5:
        return { label: 'Cryptographically Strong', color: 'bg-emerald-400', text: 'text-emerald-400', width: '100%' };
      default:
        return { label: 'Unknown', color: 'bg-slate-600', text: 'text-slate-400', width: '0%' };
    }
  };

  const config = getStrengthConfig();

  if (!password) return null;

  return (
    <div className="mt-3 space-y-2 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400 font-mono flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          Entropy Analysis:
        </span>
        <span className={`font-mono font-medium ${config.text}`}>
          {config.label} ({score}/5)
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ease-out ${config.color}`}
          style={{ width: config.width }}
        />
      </div>

      {/* Criteria Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-[11px] font-mono">
        {requirements.map((req, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-1.5 transition-colors duration-200 ${
              req.met ? 'text-emerald-400' : 'text-slate-500'
            }`}
          >
            {req.met ? (
              <Check className="w-3.5 h-3.5 flex-shrink-0 text-emerald-400" />
            ) : (
              <X className="w-3.5 h-3.5 flex-shrink-0 text-slate-600" />
            )}
            <span>{req.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
