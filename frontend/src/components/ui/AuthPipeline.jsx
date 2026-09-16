import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserPlus,
  CheckCircle2,
  Binary,
  Database,
  LogIn,
  KeyRound,
  ShieldCheck,
  ChevronRight,
  ArrowDown,
  Terminal,
} from 'lucide-react';

const stages = [
  {
    id: 1,
    title: 'REGISTER',
    icon: UserPlus,
    accent: 'border-cyan-500/40 text-cyan-400',
    glow: 'rgba(0, 240, 255, 0.4)',
    short: 'Client signs up',
    description:
      'Client submits sanitized registration payload (Name, Email, Password, Confirm Password) via POST /api/auth/register over TLS.',
    tech: 'Payload normalization & sanitization',
    codeSnippet: 'POST /api/auth/register\n{\n  "name": "Jane Doe",\n  "email": "jane@securex.internal",\n  "password": "••••••••••••"\n}',
  },
  {
    id: 2,
    title: 'VALIDATE',
    icon: CheckCircle2,
    accent: 'border-blue-500/40 text-blue-400',
    glow: 'rgba(59, 130, 246, 0.4)',
    short: 'Strict Schema Checks',
    description:
      'Express-validator verifies field completeness, RFC-compliant email formatting, password complexity, and duplicate avoidance.',
    tech: 'Regex entropy + duplicate email collision check',
    codeSnippet: 'check("password")\n  .isLength({ min: 8 })\n  .matches(/[A-Z]/)\n  .matches(/[0-9]/)\n  .matches(/[\\W_]/)',
  },
  {
    id: 3,
    title: 'HASH PASSWORD',
    icon: Binary,
    accent: 'border-purple-500/40 text-purple-400',
    glow: 'rgba(139, 92, 246, 0.4)',
    short: 'Bcrypt 12 Salt Rounds',
    description:
      'Plaintext password is never saved. Bcrypt generates a cryptographic salt and one-way hashes the password before DB entry.',
    tech: 'bcrypt.hash(password, 12)',
    codeSnippet: 'const salt = await bcrypt.genSalt(12);\nthis.password = await bcrypt.hash(this.password, salt);',
  },
  {
    id: 4,
    title: 'STORE USER',
    icon: Database,
    accent: 'border-emerald-500/40 text-emerald-400',
    glow: 'rgba(16, 185, 129, 0.4)',
    short: 'Mongoose Persistence',
    description:
      'User record safely persisted in MongoDB with unique indexed email. Password attribute marked select: false.',
    tech: 'MongoDB unique index & automatic schema timestamps',
    codeSnippet: 'await User.create({\n  name,\n  email,\n  password: hashedPassword\n});',
  },
  {
    id: 5,
    title: 'LOGIN',
    icon: LogIn,
    accent: 'border-amber-500/40 text-amber-400',
    glow: 'rgba(245, 158, 11, 0.4)',
    short: 'Credential Verification',
    description:
      'Client submits credentials. Server uses constant-time bcrypt.compare to check password against hash without timing attacks.',
    tech: 'bcrypt.compare(candidate, user.password)',
    codeSnippet: 'const isMatch = await bcrypt.compare(\n  req.body.password,\n  user.password\n);',
  },
  {
    id: 6,
    title: 'GENERATE JWT',
    icon: KeyRound,
    accent: 'border-cyan-500/40 text-cyan-400',
    glow: 'rgba(0, 240, 255, 0.4)',
    short: 'Cryptographic Signature',
    description:
      'Upon verification, server signs a tamper-proof JWT token containing user identity and 24h expiration timestamp.',
    tech: 'jwt.sign({ id, email }, JWT_SECRET, { expiresIn: "24h" })',
    codeSnippet: 'const token = jwt.sign(\n  { id: user._id, email: user.email },\n  process.env.JWT_SECRET,\n  { expiresIn: "24h" }\n);',
  },
  {
    id: 7,
    title: 'PROTECTED API',
    icon: ShieldCheck,
    accent: 'border-green-400/40 text-green-400',
    glow: 'rgba(74, 222, 128, 0.4)',
    short: 'Guard Authorization',
    description:
      'Requests to GET /api/auth/me require Bearer token. authMiddleware validates signature before granting access to sensitive data.',
    tech: 'Authorization: Bearer <JWT_TOKEN>',
    codeSnippet: 'const token = req.headers.authorization?.split(" ")[1];\nconst decoded = jwt.verify(token, process.env.JWT_SECRET);\nreq.user = await User.findById(decoded.id).select("-password");',
  },
];

const AuthPipeline = () => {
  const [activeStage, setActiveStage] = useState(stages[0]);

  return (
    <div className="w-full">
      {/* Horizontal Flow Container */}
      <div className="relative py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 relative">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = activeStage.id === stage.id;

            return (
              <React.Fragment key={stage.id}>
                {/* Stage Card */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveStage(stage)}
                  style={isSelected ? { boxShadow: `0 0 25px ${stage.glow}` } : {}}
                  className={`relative cursor-pointer flex-1 w-full lg:w-auto p-4 rounded-2xl glass-card transition-all duration-300 ${
                    isSelected
                      ? 'border-cyan-400 bg-slate-900/90'
                      : 'border-slate-800/80 hover:border-slate-700 bg-slate-950/60'
                  }`}
                >
                  <div className="flex items-center lg:flex-col lg:items-center text-left lg:text-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border ${stage.accent} bg-slate-900/80 shadow-sm`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 font-semibold block">
                        STAGE 0{stage.id}
                      </span>
                      <h4 className="text-xs font-mono font-bold text-slate-100 tracking-wider">
                        {stage.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1 font-sans">
                        {stage.short}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#00f0ff]"
                    />
                  )}
                </motion.div>

                {/* Animated Arrow Connector (Hidden on last item) */}
                {idx < stages.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center text-cyan-400/40">
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                )}

                {idx < stages.length - 1 && (
                  <div className="lg:hidden flex items-center justify-center text-cyan-400/40 my-0.5">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Inspector Console */}
      <motion.div
        key={activeStage.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-4 p-6 rounded-2xl glass-card border border-cyan-500/20 bg-slate-950/80"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <activeStage.icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                STAGE 0{activeStage.id} TECHNICAL INSPECTOR
              </span>
              <h3 className="text-lg font-bold text-white tracking-wide">
                {activeStage.title} : {activeStage.short}
              </h3>
            </div>
          </div>
          <div className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
            {activeStage.tech}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Security Protocol Explanation
            </h5>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {activeStage.description}
            </p>
            <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs font-mono text-cyan-300 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Zero plain-text retention policy enforced at this boundary.</span>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#070a12]">
            <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
                implementation_snippet.js
              </span>
              <span className="text-[10px] font-mono text-cyan-400/70">EXPRESS & MONGOOSE</span>
            </div>
            <pre className="p-4 text-xs font-mono text-cyan-300/90 overflow-x-auto leading-relaxed">
              <code>{activeStage.codeSnippet}</code>
            </pre>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPipeline;
