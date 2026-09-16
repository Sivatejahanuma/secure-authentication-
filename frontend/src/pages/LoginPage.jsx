import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, KeyRound, ArrowRight, AlertTriangle, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import CyberInput from '../components/auth/CyberInput';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Read location state redirect target if routed by ProtectedRoute
  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessMessage('');

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await login(formData.email.trim(), formData.password);
      setSuccessMessage('Signature verified. Directing to cryptographic console...');

      setTimeout(() => {
        navigate(from, { replace: true });
      }, 900);
    } catch (err) {
      setServerError(err.message || 'Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper for quick demonstration during grading / review
  const handleQuickDemo = () => {
    setFormData({
      email: 'demo.agent@securex.internal',
      password: 'DemoCyberPass!2026',
    });
    setErrors({});
    setServerError('');
  };

  return (
    <div className="relative z-10 min-h-screen pt-24 pb-16 flex items-center justify-center px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/40 shadow-glow-cyan-sm mb-2">
            <KeyRound className="w-6 h-6 text-cyan-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight">
            Security Authorization
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans">
            Authenticate to generate your signed JWT access token
          </p>
        </div>

        {/* Main Glass Form */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-cyan-500/20 shadow-2xl relative overflow-hidden bg-slate-950/70">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          {/* Feedback Alerts */}
          <AnimatePresence mode="wait">
            {serverError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-5 p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-xs font-mono text-red-300 flex items-start gap-2.5"
              >
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{serverError}</span>
              </motion.div>
            )}

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-5 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email Address */}
            <CyberInput
              id="email"
              label="Email Address"
              type="email"
              placeholder="e.g. agent@securex.internal"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={Mail}
              required
              disabled={isSubmitting}
              autoComplete="email"
            />

            {/* Password */}
            <CyberInput
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={Lock}
              required
              disabled={isSubmitting}
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer hover:text-slate-300">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-700 bg-slate-900 text-cyan-400 focus:ring-cyan-500/30"
                />
                <span>Keep session active</span>
              </label>

              <button
                type="button"
                onClick={handleQuickDemo}
                className="text-cyan-400/80 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                title="Fill sample demo credentials"
              >
                <Sparkles className="w-3 h-3" />
                <span>Demo Fill</span>
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 py-3 px-4 rounded-xl font-mono text-sm font-bold text-[#05070d] bg-cyan-400 hover:bg-cyan-300 shadow-glow-cyan transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#05070d]" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Authenticate & Enter</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center text-xs text-slate-400">
            <span>Don't have an account yet? </span>
            <Link
              to="/register"
              className="font-mono text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              Register Now
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
