import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Key, Cpu, Radio } from 'lucide-react';

const CyberShield = () => {
  return (
    <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center select-none">
      {/* Outer Rotating Cryptographic Ring 1 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border border-dashed border-cyan-500/25"
      />

      {/* Counter-rotating Ring 2 */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-8 rounded-full border border-dotted border-purple-500/30"
      />

      {/* Pulsing Concentric Ring 3 */}
      <motion.div
        animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-16 rounded-full border border-cyan-400/40 shadow-[0_0_25px_rgba(0,240,255,0.2)]"
      />

      {/* Central Cyber Glow */}
      <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-600/25 blur-2xl" />

      {/* Central Shield Container */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-40 h-40 sm:w-48 sm:h-48 rounded-3xl glass-card flex flex-col items-center justify-center border border-cyan-400/30 shadow-[0_0_40px_rgba(0,240,255,0.25)]"
      >
        <div className="relative flex items-center justify-center">
          {/* Glowing Shield Icon */}
          <Shield className="w-20 h-20 sm:w-24 sm:h-24 text-cyan-400 stroke-[1.25] drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]" />
          
          {/* Inner Lock Icon */}
          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute"
          >
            <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
          </motion.div>
        </div>

        {/* Binary Stream Visual */}
        <div className="mt-2 font-mono text-[9px] text-cyan-300/70 tracking-widest uppercase">
          01100001 01110101 01110100 01101000
        </div>
      </motion.div>

      {/* Floating Card 1: Bcrypt Hashing */}
      <motion.div
        animate={{ y: [-8, 8, -8], x: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-4 left-0 sm:-left-4 z-20 px-3.5 py-2 rounded-xl glass-card border border-cyan-500/30 shadow-lg flex items-center gap-2 text-xs font-mono"
      >
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <Key className="w-3.5 h-3.5 text-cyan-400" />
        <span className="text-slate-200">BCRYPT SALT: 12 ROUNDS</span>
      </motion.div>

      {/* Floating Card 2: JWT Verified */}
      <motion.div
        animate={{ y: [6, -6, 6], x: [3, -3, 3] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-6 -right-2 sm:-right-6 z-20 px-3.5 py-2 rounded-xl glass-card border border-purple-500/30 shadow-lg flex items-center gap-2 text-xs font-mono"
      >
        <Cpu className="w-3.5 h-3.5 text-purple-400" />
        <span className="text-slate-200">JWT SIGNED & VALIDATED</span>
      </motion.div>

      {/* Floating Card 3: Status Indicator */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-slate-950/90 border border-emerald-500/40 shadow-[0_0_20px_rgba(0,255,136,0.25)] flex items-center gap-2 whitespace-nowrap"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[11px] font-mono tracking-wider font-semibold text-emerald-300">
          AUTHENTICATION SYSTEM ONLINE
        </span>
      </motion.div>
    </div>
  );
};

export default CyberShield;
