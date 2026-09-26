import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, Compass } from 'lucide-react';
import { MenuItem, RecommendationResult } from '../types';

interface AiSommelierProps {
  onSelectItem: (item: MenuItem) => void;
}

const QUICK_PROMPTS = [
  "⚡ High caffeine focus drink for hackathon sprint",
  "🍃 Refreshing iced cooler with zero dairy",
  "🥐 Sweet flaky treat to pair with black coffee",
  "🍨 Dessert coffee hybrid with gelato"
];

export const AiSommelier: React.FC<AiSommelierProps> = ({ onSelectItem }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResult | null>(null);

  const handleSearch = async (userPrompt: string) => {
    if (!userPrompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/menu/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userPrompt })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-50/90 via-indigo-50/40 to-white p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#4285F4] text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">AI Taste Recommender</h3>
            <p className="text-[11px] text-gray-500">Not sure what to order? Describe your vibe or cravings</p>
          </div>
        </div>
        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
          Powered by Gemini 3.8 Flash
        </span>
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
        }}
        className="mt-3 flex gap-2"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. 'I want something smooth, non-dairy with good energy to code'"
          className="flex-1 rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 shadow-2xs focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-100"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="flex items-center gap-1.5 rounded-xl bg-[#4285F4] px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-600 disabled:opacity-50 transition-all shrink-0"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Ask <ArrowRight className="h-3.5 w-3.5" /></>}
        </button>
      </form>

      {/* Quick Prompts */}
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {QUICK_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            onClick={() => {
              setQuery(prompt);
              handleSearch(prompt);
            }}
            className="rounded-full border border-gray-200/80 bg-white/80 px-2.5 py-1 text-[11px] font-medium text-gray-600 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-700 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Results View */}
      {result && (
        <div className="mt-4 border-t border-blue-100 pt-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-2">
            <Compass className="h-3.5 w-3.5 text-[#4285F4]" />
            <span>Gemini's Match For You:</span>
          </div>

          <div className="space-y-2">
            {result.recommendations.map((rec, i) => (
              <div
                key={i}
                onClick={() => onSelectItem(rec.item)}
                className="group flex cursor-pointer items-center justify-between rounded-xl border border-white bg-white/90 p-3 shadow-2xs transition-all hover:border-blue-300 hover:shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={rec.item.image}
                    alt={rec.item.name}
                    className="h-12 w-12 rounded-lg object-cover group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-gray-900">{rec.item.name}</span>
                      <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2">
                        {rec.matchScore} match
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-1">{rec.reasoning}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-gray-900">{rec.item.price}</span>
                  <p className="text-[10px] text-blue-600 font-semibold group-hover:underline">View details →</p>
                </div>
              </div>
            ))}
          </div>

          {result.sommelierNote && (
            <p className="mt-2 text-[11px] italic text-gray-500 font-medium">
              💡 {result.sommelierNote}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
