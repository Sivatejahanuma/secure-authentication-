import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Calendar,
  ShieldCheck,
  Key,
  LogOut,
  Clock,
  Fingerprint,
  Cpu,
  Layers,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Active Session';

  return (
    <div className="relative z-10 min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Profile Header Card */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-cyan-500/20 bg-slate-950/75 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar Shield */}
            <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 border border-cyan-400/40 shadow-glow-cyan-sm flex-shrink-0">
              <Fingerprint className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            </div>

            {/* User Title */}
            <div className="text-center sm:text-left space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ACTIVE CRYPTOGRAPHIC SESSION</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
                {user?.name || 'Verified User'}
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm font-mono">
                {user?.email || 'user@securex.internal'}
              </p>
            </div>

            {/* Logout Action */}
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl font-mono text-xs font-semibold text-red-300 bg-red-950/30 hover:bg-red-950/60 border border-red-500/30 hover:border-red-500/60 transition-all flex items-center gap-2 self-center sm:self-start"
            >
              <LogOut className="w-4 h-4" />
              <span>Terminate Session</span>
            </button>
          </div>
        </div>

        {/* Detailed Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Identity Credentials */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 bg-slate-950/70 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <User className="w-4 h-4" />
              Identity Attributes
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">Full Name</span>
                <span className="text-white font-semibold">{user?.name}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">Email Address</span>
                <span className="text-white font-semibold">{user?.email}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">Account Creation</span>
                <span className="text-slate-200">{formattedDate}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">User ID</span>
                <span className="text-cyan-300 text-[11px] truncate max-w-[160px]">{user?.id}</span>
              </div>
            </div>
          </div>

          {/* Cryptographic Session Telemetry */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 bg-slate-950/70 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
              <Key className="w-4 h-4" />
              Session Telemetry
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">Authentication Status</span>
                <span className="text-emerald-400 font-bold">SECURE &bull; 200 OK</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">Session Status</span>
                <span className="text-cyan-400 font-bold">STATELESS JWT (ACTIVE)</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">Cryptographic Algorithm</span>
                <span className="text-purple-300 font-semibold">HMAC-SHA256 (HS256)</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">Password Encryption</span>
                <span className="text-emerald-300 font-semibold">Bcrypt (12 Rounds)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Advisory Card */}
        <div className="p-5 rounded-2xl glass-card border border-cyan-500/20 bg-cyan-950/20 text-xs font-mono text-slate-300 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white">Security Isolation Guarantee:</span>
            <p className="text-slate-400 leading-relaxed font-sans">
              Your password hash is never serialized to the frontend or included in JWT claims.
              Every protected resource access is independently verified through our express middleware barrier.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
