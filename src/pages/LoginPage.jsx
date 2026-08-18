import React, { useState } from 'react';
import { API_BASE_URL } from '../config/api';

function LoginPage({ onNavigate, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: 'Welcome back! Authentication successful.' });
        if (data.token) {
          localStorage.setItem('token', data.token);
        } else {
          localStorage.setItem('token', 'session_token');
        }
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        setTimeout(() => {
          onLoginSuccess(data.user);
        }, 600);
      } else {
        const errorMsg = data.errors 
          ? data.errors.map(err => err.msg).join(', ')
          : (data.message || 'Login failed. Please check your credentials.');
        setMessage({ type: 'error', text: errorMsg });
      }
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: `Unable to connect to backend server at ${API_BASE_URL}.` 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:py-24">
      <div className="relative overflow-hidden rounded-2xl border border-dark-border bg-dark-card/40 p-8 shadow-2xl backdrop-blur-md">
        
        {/* Glow accent */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />

        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
            🔐
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Welcome Back
          </h2>
          <p className="mt-1.5 text-xs text-slate-400">
            Sign in to manage your inventory and expiration alerts.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Email Address
            </label>
            <input 
              type="email" 
              className="w-full rounded-xl border border-dark-border bg-dark-bg/70 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition duration-200 focus:border-primary focus:ring-1 focus:ring-primary/20"
              placeholder="user@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Password
              </label>
            </div>
            <input 
              type="password" 
              className="w-full rounded-xl border border-dark-border bg-dark-bg/70 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition duration-200 focus:border-primary focus:ring-1 focus:ring-primary/20"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition duration-200 hover:bg-primary/90 hover:shadow-primary/30 active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Signing In...
              </span>
            ) : 'Sign In'}
          </button>

          <div className="text-center pt-2">
            <button 
              type="button" 
              className="text-xs text-slate-400 hover:text-white transition"
              onClick={() => onNavigate('register')}
            >
              Don't have an account? <span className="text-primary font-semibold hover:underline">Register here</span>
            </button>
          </div>
        </form>

        {message && (
          <div className={`mt-6 rounded-xl border p-4 text-xs font-medium transition duration-200 ${
            message.type === 'success' 
              ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400' 
              : 'border-red-500/20 bg-red-500/10 text-red-400'
          }`}>
            {message.type === 'success' ? '✅' : '❌'} {message.text}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
