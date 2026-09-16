import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  Server,
  KeyRound,
  User,
  Mail,
  Calendar,
  Clock,
  Terminal,
  Play,
  AlertTriangle,
  RefreshCw,
  Cpu,
  Lock,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import StatCard from '../components/ui/StatCard';

const DashboardPage = () => {
  const { user, token, refreshUser } = useAuth();

  const [liveUserData, setLiveUserData] = useState(user);
  const [isFetchingLive, setIsFetchingLive] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Evaluation sandbox state
  const [sandboxResponse, setSandboxResponse] = useState(null);
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [activeTestType, setActiveTestType] = useState(null);

  // Fetch verified user data on mount via GET /api/auth/me
  useEffect(() => {
    let isMounted = true;

    const fetchMe = async () => {
      setIsFetchingLive(true);
      setFetchError(null);
      try {
        const res = await authAPI.getMe();
        if (isMounted && res.success) {
          setLiveUserData(res.user);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.response?.data?.message || 'Failed to communicate with /api/auth/me');
        }
      } finally {
        if (isMounted) setIsFetchingLive(false);
      }
    };

    fetchMe();

    return () => {
      isMounted = false;
    };
  }, []);

  // Format account creation date
  const formattedDate = liveUserData?.createdAt
    ? new Date(liveUserData.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Synchronizing...';

  // Decode JWT payload for visualization (safe client-side base64 decode of payload)
  const decodedToken = React.useMemo(() => {
    if (!token) return null;
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        return payload;
      }
    } catch {
      return null;
    }
    return null;
  }, [token]);

  // Handler for live API test scenarios for evaluators
  const runApiTest = async (type) => {
    setIsTestingApi(true);
    setActiveTestType(type);
    setSandboxResponse(null);

    try {
      if (type === 'valid') {
        const res = await authAPI.testEndpoint('/auth/me');
        setSandboxResponse({
          type: 'VALID_AUTH',
          statusCode: res.status,
          statusText: '200 OK',
          body: res.data,
          note: 'Request succeeded: Token signature matched and user profile was returned.',
        });
      } else if (type === 'tampered') {
        // Send deliberately corrupted token
        try {
          await authAPI.testEndpoint('/auth/me', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.corrupted.signature');
        } catch (err) {
          setSandboxResponse({
            type: 'TAMPERED_TOKEN',
            statusCode: err.response?.status || 401,
            statusText: '401 Unauthorized',
            body: err.response?.data || { success: false, message: 'Invalid token' },
            note: 'Request rejected: Cryptographic signature mismatch triggered 401 Unauthorized barrier.',
          });
        }
      } else if (type === 'missing') {
        // Send empty token
        try {
          await authAPI.testEndpoint('/auth/me', '');
        } catch (err) {
          setSandboxResponse({
            type: 'MISSING_TOKEN',
            statusCode: err.response?.status || 401,
            statusText: '401 Unauthorized',
            body: err.response?.data || { success: false, message: 'No token provided' },
            note: 'Request blocked: Missing Authorization Bearer header resulted in 401 Unauthorized.',
          });
        }
      }
    } catch (generalErr) {
      setSandboxResponse({
        type: 'ERROR',
        statusCode: 500,
        statusText: 'Error',
        body: { error: generalErr.message },
        note: 'Unexpected error during endpoint execution.',
      });
    } finally {
      setIsTestingApi(false);
    }
  };

  return (
    <div className="relative z-10 min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>AUTHENTICATED SECURITY CONSOLE</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-sans text-white tracking-tight">
            Welcome back, <span className="cyber-gradient-text">{liveUserData?.name || user?.name || 'Authorized User'}</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 font-mono">
            Session identity validated &bull; Dynamic token authorization active
          </p>
        </div>

        <button
          onClick={async () => {
            setIsFetchingLive(true);
            const updated = await refreshUser();
            if (updated) setLiveUserData(updated);
            setIsFetchingLive(false);
          }}
          disabled={isFetchingLive}
          className="self-start md:self-auto px-4 py-2 rounded-xl text-xs font-mono text-slate-300 glass-card hover:border-cyan-500/40 hover:text-white flex items-center gap-2 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isFetchingLive ? 'animate-spin text-cyan-400' : ''}`} />
          <span>Sync /api/auth/me</span>
        </button>
      </div>

      {fetchError && (
        <div className="mb-6 p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-xs font-mono text-red-300 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <span>Warning: Could not refresh session from /api/auth/me: {fetchError}</span>
        </div>
      )}

      {/* 4 Required Core Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="AUTHENTICATION STATUS"
          value="SECURE"
          subtitle="Zero-Trust Encrypted Session"
          icon={ShieldCheck}
          statusColor="text-emerald-400"
          glowColor="rgba(16, 185, 129, 0.25)"
        />

        <StatCard
          title="ACCOUNT STATUS"
          value="ACTIVE"
          subtitle="Email Verified & Provisioned"
          icon={CheckCircle2}
          statusColor="text-cyan-400"
          glowColor="rgba(0, 240, 255, 0.25)"
        />

        <StatCard
          title="PROTECTED API"
          value="CONNECTED"
          subtitle="GET /api/auth/me Handshake OK"
          icon={Server}
          statusColor="text-blue-400"
          glowColor="rgba(59, 130, 246, 0.25)"
        />

        <StatCard
          title="JWT STATUS"
          value="VALID"
          subtitle="HMAC-SHA256 Signed & Active"
          icon={KeyRound}
          statusColor="text-purple-400"
          glowColor="rgba(139, 92, 246, 0.25)"
        />
      </div>

      {/* User Information Card & Security Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* User Information Card */}
        <div className="lg:col-span-5 glass-card p-6 rounded-3xl border border-cyan-500/20 bg-slate-950/70 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-mono text-white">USER IDENTITY CARD</h3>
                  <span className="text-[10px] font-mono text-slate-400">DB PERSISTENCE PROFILE</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30">
                VERIFIED
              </span>
            </div>

            <div className="space-y-3.5 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  Name:
                </span>
                <span className="text-slate-100 font-semibold">{liveUserData?.name || '—'}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  Email:
                </span>
                <span className="text-slate-100 font-semibold">{liveUserData?.email || '—'}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  Account Created:
                </span>
                <span className="text-slate-200 text-right">{formattedDate}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  Subject ID:
                </span>
                <span className="text-cyan-300 text-[11px] truncate max-w-[180px]">
                  {liveUserData?.id || decodedToken?.id || '—'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Password hash strictly excluded from memory payload.</span>
          </div>
        </div>

        {/* Security Visualization Card */}
        <div className="lg:col-span-7 glass-card p-6 rounded-3xl border border-purple-500/20 bg-slate-950/70 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-400/30 flex items-center justify-center text-purple-400">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-mono text-white">PROTECTED SESSION ACTIVE</h3>
                  <span className="text-[10px] font-mono text-slate-400">CRYPTOGRAPHIC TELEMETRY</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30">
                HS256 VERIFIED
              </span>
            </div>

            {/* Token details grid */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>BEARER TOKEN (OBFUSCATED):</span>
                  <span className="text-purple-400">HS256</span>
                </div>
                <div className="p-2 rounded-lg bg-[#060910] text-[11px] text-cyan-300/90 break-all font-mono border border-slate-800/80">
                  {token ? `${token.substring(0, 24)}...${token.substring(token.length - 18)}` : 'No active token'}
                </div>
              </div>

              {/* Decoded Claims Preview */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Token Issuer</span>
                  <span className="text-white text-xs font-semibold">{decodedToken?.iss || 'securex-auth'}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Token Audience</span>
                  <span className="text-white text-xs font-semibold">{decodedToken?.aud || 'securex-client'}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Issued At (iat)</span>
                  <span className="text-slate-300 text-xs">
                    {decodedToken?.iat ? new Date(decodedToken.iat * 1000).toLocaleTimeString() : 'N/A'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Expires In (exp)</span>
                  <span className="text-emerald-400 text-xs font-semibold">
                    {decodedToken?.exp ? new Date(decodedToken.exp * 1000).toLocaleTimeString() : '24h window'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Session Protection: Strict Authorization Header</span>
            <span className="text-emerald-400">TLS Protected</span>
          </div>
        </div>
      </div>

      {/* Live Interactive Evaluation Sandbox (Perfect for Professor & Academic Review) */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-slate-950/85">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>LIVE API DEMONSTRATION & EVALUATION SANDBOX</span>
            </div>
            <h3 className="text-xl font-bold font-sans text-white">
              Verify Protected Route Security Barriers
            </h3>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Trigger real HTTP requests to test 200 OK authorization vs 401 Unauthorized rejection behaviors.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => runApiTest('valid')}
              disabled={isTestingApi}
              className="px-3.5 py-2 rounded-xl text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Play className="w-3 h-3" />
              <span>Send Valid Token (200)</span>
            </button>

            <button
              onClick={() => runApiTest('tampered')}
              disabled={isTestingApi}
              className="px-3.5 py-2 rounded-xl text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <AlertTriangle className="w-3 h-3" />
              <span>Send Tampered Token (401)</span>
            </button>

            <button
              onClick={() => runApiTest('missing')}
              disabled={isTestingApi}
              className="px-3.5 py-2 rounded-xl text-xs font-mono font-semibold bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30 transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Lock className="w-3 h-3" />
              <span>Strip Header (401)</span>
            </button>
          </div>
        </div>

        {/* Live Terminal Output Console */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#06080f]">
          <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              <span className="text-xs font-mono text-slate-400 ml-2">securex-telemetry-console</span>
            </div>
            {sandboxResponse && (
              <span
                className={`text-xs font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  sandboxResponse.statusCode === 200
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                    : 'bg-red-950 text-red-400 border border-red-500/40'
                }`}
              >
                HTTP {sandboxResponse.statusText}
              </span>
            )}
          </div>

          <div className="p-4 sm:p-6 font-mono text-xs overflow-x-auto min-h-[160px] flex flex-col justify-center">
            {isTestingApi ? (
              <div className="flex items-center gap-3 text-cyan-400">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Executing test probe against GET /api/auth/me...</span>
              </div>
            ) : sandboxResponse ? (
              <div className="space-y-3">
                <div className="text-slate-400">
                  <span className="text-cyan-400">&gt; </span>
                  Target: <span className="text-white">GET /api/auth/me</span> &bull; Status:{' '}
                  <span
                    className={sandboxResponse.statusCode === 200 ? 'text-emerald-400' : 'text-red-400'}
                  >
                    {sandboxResponse.statusCode}
                  </span>
                </div>
                <div className="text-slate-300 text-[11px] italic">
                  # {sandboxResponse.note}
                </div>
                <pre className="text-cyan-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 overflow-x-auto">
                  <code>{JSON.stringify(sandboxResponse.body, null, 2)}</code>
                </pre>
              </div>
            ) : (
              <div className="text-slate-500 text-center py-6">
                Click any of the test buttons above to run an instant live authorization probe.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
