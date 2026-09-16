import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Key,
  Database,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Server,
  Layers,
  Cpu,
} from 'lucide-react';
import CyberShield from '../components/ui/CyberShield';
import AuthPipeline from '../components/ui/AuthPipeline';

const features = [
  {
    title: 'SECURE AUTHENTICATION',
    description: 'Protect user accounts with modern authentication infrastructure engineered for zero-trust environments.',
    icon: ShieldCheck,
    tag: 'CORE ENGINE',
    glow: 'from-cyan-500/20 to-blue-600/10',
    borderColor: 'hover:border-cyan-500/50',
    textColor: 'text-cyan-400',
  },
  {
    title: 'PASSWORD PROTECTION',
    description: 'Passwords are securely hashed using bcrypt with salt rounds before database storage. Plaintext is never stored or logged.',
    icon: Lock,
    tag: 'CRYPTOGRAPHY',
    glow: 'from-purple-500/20 to-pink-600/10',
    borderColor: 'hover:border-purple-500/50',
    textColor: 'text-purple-400',
  },
  {
    title: 'JWT SECURITY',
    description: 'Authenticated requests are protected using signed, cryptographically verified tokens with strict expiration policies.',
    icon: Key,
    tag: 'STATELESS TOKENS',
    glow: 'from-blue-500/20 to-cyan-600/10',
    borderColor: 'hover:border-blue-500/50',
    textColor: 'text-blue-400',
  },
  {
    title: 'PROTECTED ROUTES',
    description: 'Sensitive endpoints and dashboard resources are shielded behind rigorous authentication middleware guards.',
    icon: Layers,
    tag: 'ACCESS CONTROL',
    glow: 'from-emerald-500/20 to-teal-600/10',
    borderColor: 'hover:border-emerald-500/50',
    textColor: 'text-emerald-400',
  },
];

const LandingPage = () => {
  return (
    <div className="relative z-10 pt-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Headline & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>PRODUCTION-GRADE IDENTITY INFRASTRUCTURE</span>
            </div>

            {/* Large Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-sans leading-[1.1]">
              <span className="text-white block">YOUR IDENTITY.</span>
              <span className="cyber-gradient-text block">SECURED BY DESIGN.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Modern authentication infrastructure built for secure, seamless digital experiences.
              Leveraging bcrypt salt hashing, stateless JSON Web Tokens, and resilient zero-trust access controls.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-mono text-sm font-bold text-[#05070d] bg-cyan-400 hover:bg-cyan-300 shadow-glow-cyan transition-all flex items-center justify-center gap-2 group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-mono text-sm text-slate-200 glass-card hover:border-cyan-500/40 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <span>Sign In</span>
              </Link>
            </div>

            {/* Key trust bullets */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-800/80 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Bcrypt 12 Rounds</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
                <span>Signed JWT (24h)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Zero Plaintext Leaks</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual: CyberShield */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <CyberShield />
          </motion.div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono tracking-widest uppercase text-cyan-400">
            ENGINEERED DEFENSE CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
            Security That Never Compromises
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every layer of SECUREX is built around industry-standard cryptographic primitives,
            ensuring confidential user data remains immune to credential stuffing, rainbow tables, and unauthorized API traversal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className={`p-6 rounded-2xl glass-card border border-slate-800/80 ${feature.borderColor} transition-all duration-300 relative overflow-hidden group flex flex-col justify-between`}
              >
                {/* Subtle top gradient glow */}
                <div
                  className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${feature.glow} blur-2xl group-hover:scale-150 transition-transform duration-500`}
                />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center border border-slate-800 group-hover:border-cyan-400/40 transition-colors">
                      <Icon className={`w-6 h-6 ${feature.textColor}`} />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-mono text-white tracking-wide">
                    {feature.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {feature.description}
                  </p>
                </div>

                <div className="relative z-10 pt-4 mt-4 border-t border-slate-800/60 flex items-center text-[11px] font-mono text-cyan-400/80 group-hover:text-cyan-300">
                  <span>Cryptographically Verified</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Interactive Authentication Flow Section */}
      <section id="flow" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono tracking-widest uppercase text-cyan-400">
            SYSTEM ARCHITECTURE LIFECYCLE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
            End-to-End Authentication Pipeline
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Click on each stage to inspect the cryptographic protocol, validation mechanisms, and backend execution flow.
          </p>
        </div>

        <AuthPipeline />
      </section>

      {/* Security Specifications Section */}
      <section id="security" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900">
        <div className="p-8 sm:p-12 rounded-3xl glass-card border border-cyan-500/20 bg-gradient-to-b from-slate-900/60 to-slate-950/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase font-semibold">
                EVALUATION BENCHMARK
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Built to Exceed Academic & Professional Standards
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Unlike primitive tutorial implementations that leave plaintext passwords in databases or leak hashes on registration,
                SECUREX adheres to the OWASP top 10 security guidelines and ISO/IEC cryptographic validation best practices.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono text-cyan-400">HTTP Status Code Precision</span>
                  <p className="text-xs text-slate-400">
                    200 (OK), 201 (Created), 400 (Validation), 401 (Unauthorized), 409 (Conflict), 500 (Internal Error).
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono text-cyan-400">Zero Password Exposure</span>
                  <p className="text-xs text-slate-400">
                    Mongoose schemas automatically strip password attributes across all serialization pipelines.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#04070e] border border-cyan-500/30 text-center space-y-4 shadow-glow-cyan-sm">
              <Cpu className="w-12 h-12 text-cyan-400 animate-pulse" />
              <h4 className="text-lg font-bold font-mono text-white">
                Ready to Experience SECUREX?
              </h4>
              <p className="text-xs text-slate-400 max-w-xs">
                Create a cryptographic user account in seconds and inspect live JWT tokens from your personal security dashboard.
              </p>
              <Link
                to="/register"
                className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold text-[#05070d] bg-cyan-400 hover:bg-cyan-300 shadow-glow-cyan transition-all"
              >
                Launch Verification Portal
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
