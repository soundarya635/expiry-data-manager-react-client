import React from 'react';

function Header({ onNavigate, currentView, isLoggedIn, onLogout }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[rgba(255,255,255,0.06)] bg-[#0b0f19]/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand / Logo */}
        <button 
          onClick={() => onNavigate('landing')} 
          className="flex items-center gap-2.5 transition duration-200 hover:opacity-90 focus:outline-none"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary/80 p-0.5 shadow-md shadow-primary/10">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-dark-bg">
              <svg 
                className="h-5 w-5 text-primary" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {/* Custom Hourglass + Box SVG */}
                <path d="M5 2h14" />
                <path d="M5 22h14" />
                <path d="M19 2v4c0 3-2 5-5 7 3 2 5 4 5 7v4" />
                <path d="M5 2v4c0 3 2 5 5 7-3 2-5 4-5 7v4" />
                <path d="M12 11h.01" />
                <path d="M12 7h.01" />
                <path d="M12 17h.01" />
              </svg>
            </div>
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
            Expiry<span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Manager</span>
          </span>
        </button>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <button 
                onClick={() => onNavigate('dashboard')}
                className={`text-sm font-semibold transition ${
                  currentView === 'dashboard' ? 'text-primary' : 'text-slate-300 hover:text-white'
                }`}
              >
                Dashboard
              </button>
              <button 
                onClick={onLogout}
                className="rounded-lg border border-[rgba(255,255,255,0.08)] bg-dark-card px-4 py-2 text-xs font-semibold text-slate-300 transition duration-200 hover:border-secondary/30 hover:text-secondary hover:shadow-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => onNavigate('login')}
                className={`text-sm font-semibold transition duration-200 ${
                  currentView === 'login' ? 'text-primary' : 'text-slate-300 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button 
                onClick={() => onNavigate('register')}
                className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-md shadow-primary/20 transition duration-200 hover:bg-primary/95 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
