import React from 'react';

function LandingPage({ onNavigate }) {
  return (
    <div className="relative isolate overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div 
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" 
        aria-hidden="true"
      >
        <div 
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 sm:pt-16 sm:pb-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          
          {/* Badge */}
          <div className="mx-auto mb-6 flex max-w-fit items-center justify-center gap-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-dark-card/50 px-3.5 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-secondary"></span>
            Smart Grocery Tracking
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Never Let Your Groceries{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Go to Waste Again
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg leading-8 text-slate-400 max-w-2xl mx-auto">
            Effortlessly monitor food expiry dates, reduce household waste, and save money. Expiry Manager helps you track items and alert you before they go bad.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex items-center justify-center gap-x-4 sm:gap-x-6">
            <button
              onClick={() => onNavigate('register')}
              className="rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:bg-primary/90 hover:shadow-primary/30 hover:scale-[1.03] active:scale-[0.97]"
            >
              Get Started for Free
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="rounded-xl border border-[rgba(255,255,255,0.1)] bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:border-white/20 active:scale-[0.98]"
            >
              Sign In to Account
            </button>
          </div>
        </div>

        {/* Dashboard Mockup Preview */}
        <div className="mt-16 sm:mt-20 flow-root">
          <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-dark-card/40 p-2 ring-1 ring-white/10 backdrop-blur-sm shadow-2xl">
            <div className="rounded-xl bg-dark-bg/80 p-6 sm:p-8 border border-[rgba(255,255,255,0.04)]">
              {/* Fake dashboard headers */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[rgba(255,255,255,0.06)] pb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">📦 Household Tracker</h3>
                  <p className="text-xs text-slate-400">Mockup preview of your items</p>
                </div>
                <div className="flex gap-2">
                  <span className="rounded-lg bg-red-500/10 border border-red-500/20 px-2.5 py-1 text-xs font-semibold text-red-400 flex items-center gap-1">
                    🔴 1 Expired
                  </span>
                  <span className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-xs font-semibold text-amber-400 flex items-center gap-1">
                    🟡 2 Soon
                  </span>
                  <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    🟢 2 Good
                  </span>
                </div>
              </div>

              {/* Fake dashboard items */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-[rgba(255,255,255,0.04)] bg-dark-card/30 p-4 transition-all duration-200 hover:border-red-500/20 hover:bg-dark-card/50">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-200 text-sm">Whole Wheat Bread</span>
                    <span className="text-xs text-slate-500">Category: Bakery</span>
                  </div>
                  <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 border border-red-500/15">
                    Expired (Yesterday)
                  </span>
                </div>
                
                <div className="flex items-center justify-between rounded-xl border border-[rgba(255,255,255,0.04)] bg-dark-card/30 p-4 transition-all duration-200 hover:border-amber-500/20 hover:bg-dark-card/50">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-200 text-sm">Organic Milk 1L</span>
                    <span className="text-xs text-slate-500">Category: Dairy</span>
                  </div>
                  <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400 border border-amber-500/15">
                    Expires Today
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-[rgba(255,255,255,0.04)] bg-dark-card/30 p-4 transition-all duration-200 hover:border-emerald-500/20 hover:bg-dark-card/50">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-200 text-sm">Greek Yogurt (Blueberry)</span>
                    <span className="text-xs text-slate-500">Category: Dairy</span>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/15">
                    Good (5 days left)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mx-auto mt-24 max-w-7xl px-2 sm:mt-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Reduce Waste, Save Money.
            </h2>
            <p className="mt-4 text-base text-slate-400">
              Powerful tools designed to simplify your pantry management and optimize your grocery usage.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-3">
              
              {/* Feature 1 */}
              <div className="flex flex-col rounded-2xl border border-[rgba(255,255,255,0.06)] bg-dark-card/20 p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-dark-card/30">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <span className="text-xl">⌛</span>
                  Visual Countdown
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-sm leading-6 text-slate-400">
                  <p className="flex-auto">Color-coded badges (Green, Yellow, Red) instantly show which products are safe and which ones require immediate attention.</p>
                </dd>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col rounded-2xl border border-[rgba(255,255,255,0.06)] bg-dark-card/20 p-6 transition duration-300 hover:-translate-y-1 hover:border-secondary/20 hover:bg-dark-card/30">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <span className="text-xl">🔍</span>
                  Quick Search & Sort
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-sm leading-6 text-slate-400">
                  <p className="flex-auto">Instantly search and sort through your entire catalog of food items by name, category, or remaining shelf life.</p>
                </dd>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col rounded-2xl border border-[rgba(255,255,255,0.06)] bg-dark-card/20 p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-dark-card/30">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <span className="text-xl">⚡</span>
                  Live Backend Sync
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-sm leading-6 text-slate-400">
                  <p className="flex-auto">Secure accounts and live API connectivity mean your pantry database is safely stored and synchronized in real-time.</p>
                </dd>
              </div>

            </dl>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LandingPage;
