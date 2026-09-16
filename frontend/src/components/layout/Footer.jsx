import React from 'react';
import { Shield, Lock, Terminal, Github, CheckCircle2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-slate-900/90 bg-[#04060a] relative z-10 pt-12 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-400/40">
                <Shield className="w-4 h-4 text-cyan-400" />
                <Lock className="w-2 h-2 text-white absolute" />
              </div>
              <span className="font-mono text-base font-extrabold tracking-widest text-white">
                SECURE<span className="text-cyan-400">X</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Enterprise-grade secure user authentication system built with zero-trust architecture,
              bcrypt cryptographic salt hashing, stateless JWT authorization, and real-time defense.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Full cryptographic compliance verified</span>
            </div>
          </div>

          {/* Security Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
              Cryptographic Specs
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li className="hover:text-cyan-400 transition-colors">Bcrypt 12 Salt Rounds</li>
              <li className="hover:text-cyan-400 transition-colors">HMAC-SHA256 JWT Signing</li>
              <li className="hover:text-cyan-400 transition-colors">OWASP Password Entropy</li>
              <li className="hover:text-cyan-400 transition-colors">Helmet Strict Headers</li>
            </ul>
          </div>

          {/* College Project Meta */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
              Project Blueprint
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>Node.js / Express Backend</li>
              <li>Mongoose & MongoDB</li>
              <li>React 18 & Vite Frontend</li>
              <li>Tailwind CSS & Framer Motion</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>SECUREX ACADEMIC & PRODUCTION AUTHENTICATION DEMO</span>
          </div>
          <div>MIT License &bull; Designed for Maximum Cybersecurity Evaluation</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
