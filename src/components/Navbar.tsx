import React, { useEffect, useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Coffee, Users, Activity, Sparkles } from 'lucide-react';

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
    <header className="sticky top-0 z-40 w-full border-b border-gray-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#4285F4] to-[#34A853] text-white shadow-sm shadow-[#4285F4]/30">
            <Coffee className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-gray-900 tracking-tight text-base sm:text-lg">
              <span>The Café Companion</span>
              <span className="hidden rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600 sm:inline-block">
                Google Cloud Pop-Up
              </span>
            </div>
            <p className="text-[11px] text-gray-500 font-medium">Smart Ordering & IRL Café Radar</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-gray-100/80 p-1 rounded-xl text-sm font-medium">
          <Link
            to="/"
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 transition-all ${
              location.pathname === '/' || location.pathname === '/menu'
                ? 'bg-white text-gray-900 shadow-xs font-semibold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Coffee className="h-4 w-4 text-[#4285F4]" />
            <span>Smart Menu</span>
          </Link>
          <Link
            to="/radar"
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 transition-all ${
              location.pathname === '/radar'
                ? 'bg-white text-gray-900 shadow-xs font-semibold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="h-4 w-4 text-[#34A853]" />
            <span>IRL Radar</span>
          </Link>
          <Link
            to="/room"
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 transition-all ${
              location.pathname === '/room'
                ? 'bg-white text-gray-900 shadow-xs font-semibold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Activity className="h-4 w-4 text-[#EA4335]" />
            <span>Room Status</span>
          </Link>
        </nav>

        {/* Gemini status badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-700 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-[#4285F4] animate-pulse" />
            <span className="font-semibold text-gray-800">Gemini 3.8 Flash</span>
            <span className={`inline-block h-2 w-2 rounded-full ${health?.geminiConfigured ? 'bg-emerald-500' : 'bg-amber-400'}`} title={health?.geminiConfigured ? 'Gemini API Connected' : 'Waiting for .env key (preview active)'} />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 md:hidden items-center justify-around border-t border-gray-200 bg-white/95 px-2 backdrop-blur-md shadow-lg">
        <Link
          to="/"
          className={`flex flex-col items-center gap-0.5 text-xs font-medium py-1 px-3 rounded-lg ${
            location.pathname === '/' || location.pathname === '/menu'
              ? 'text-[#4285F4] font-bold'
              : 'text-gray-500'
          }`}
        >
          <Coffee className="h-5 w-5" />
          <span>Menu</span>
        </Link>
        <Link
          to="/radar"
          className={`flex flex-col items-center gap-0.5 text-xs font-medium py-1 px-3 rounded-lg ${
            location.pathname === '/radar'
              ? 'text-[#34A853] font-bold'
              : 'text-gray-500'
          }`}
        >
          <Users className="h-5 w-5" />
          <span>IRL Radar</span>
        </Link>
        <Link
          to="/room"
          className={`flex flex-col items-center gap-0.5 text-xs font-medium py-1 px-3 rounded-lg ${
            location.pathname === '/room'
              ? 'text-[#EA4335] font-bold'
              : 'text-gray-500'
          }`}
        >
          <Activity className="h-5 w-5" />
          <span>Room</span>
        </Link>
      </div>
    </header>
  );
};
