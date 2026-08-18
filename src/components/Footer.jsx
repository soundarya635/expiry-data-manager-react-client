import React from 'react';

function Footer() {
  return (
    <footer className="w-full border-t border-[rgba(255,255,255,0.06)] bg-[#0b0f19] py-8 text-center text-xs text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-slate-500">
            &copy; {new Date().getFullYear()} Expiry Manager. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-500">
            <span>Built with</span>
            <span className="text-secondary animate-pulse">❤️</span>
            <span>using Tailwind CSS v4 & React</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
