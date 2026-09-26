import React, { useEffect, useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [health, setHealth] = useState<{ status: string; geminiConfigured: boolean; model: string } | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setHealth(data))
      .catch(() => setHealth({ status: 'ok', geminiConfigured: false, model: 'gemini-3.8-flash' }));
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-xs">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="h-4 w-4 bg-zinc-950 flex items-center justify-center text-[10px] font-bold text-white">
            C
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-zinc-900 tracking-tight text-sm">THE CAFÉ COMPANION</span>
            <span className="hidden sm:inline font-mono text-[10px] text-zinc-400">/ GOOGLE BUILDER POP-UP</span>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider uppercase">
          <Link
            to="/"
            className={`pb-0.5 transition-colors border-b-2 ${
              location.pathname === '/' || location.pathname === '/menu'
                ? 'border-zinc-950 text-zinc-950 font-semibold'
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            01. Menu & Ingredients
          </Link>
          <Link
            to="/radar"
            className={`pb-0.5 transition-colors border-b-2 ${
              location.pathname === '/radar'
                ? 'border-zinc-950 text-zinc-950 font-semibold'
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            02. Builder Radar
          </Link>
          <Link
            to="/room"
            className={`pb-0.5 transition-colors border-b-2 ${
              location.pathname === '/room'
                ? 'border-zinc-950 text-zinc-950 font-semibold'
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            03. Live Room Pulse
          </Link>
        </nav>

        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 border border-zinc-200 px-2 py-1 text-[11px] font-mono text-zinc-700">
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${health?.geminiConfigured ? 'bg-zinc-950' : 'bg-amber-500'}`} />
            <span>GEMINI 3.8 FLASH</span>
          </div>
        </div>
      </div>

      {/* Mobile Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex h-14 md:hidden items-center justify-around border-t border-zinc-200 bg-white px-2 font-mono text-[11px] uppercase tracking-wider">
        <Link
          to="/"
          className={`py-2 px-3 ${
            location.pathname === '/' || location.pathname === '/menu'
              ? 'text-zinc-950 font-bold border-t-2 border-zinc-950 -mt-px'
              : 'text-zinc-500'
          }`}
        >
          Menu
        </Link>
        <Link
          to="/radar"
          className={`py-2 px-3 ${
            location.pathname === '/radar'
              ? 'text-zinc-950 font-bold border-t-2 border-zinc-950 -mt-px'
              : 'text-zinc-500'
          }`}
        >
          Radar
        </Link>
        <Link
          to="/room"
          className={`py-2 px-3 ${
            location.pathname === '/room'
              ? 'text-zinc-950 font-bold border-t-2 border-zinc-950 -mt-px'
              : 'text-zinc-500'
          }`}
        >
          Pulse
        </Link>
      </div>
    </header>
  );
};
