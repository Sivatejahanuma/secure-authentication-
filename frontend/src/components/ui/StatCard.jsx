import React from 'react';

const StatCard = ({ title, value, subtitle, icon: Icon, statusColor = 'text-cyan-400', glowColor = 'rgba(0,240,255,0.2)' }) => {
  return (
    <div
      className="p-5 rounded-2xl glass-card glass-card-hover border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group"
      style={{
        boxShadow: `0 4px 20px -2px ${glowColor}`,
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <h4 className={`text-xl font-mono font-bold mt-1 tracking-wide ${statusColor}`}>
            {value}
          </h4>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-1 font-sans">
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-colors">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Subtle bottom glow accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default StatCard;
