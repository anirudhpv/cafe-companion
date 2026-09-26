import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { MenuItem, RecommendationResult } from '../types';

interface AiSommelierProps {
  onSelectItem: (item: MenuItem) => void;
}

const PRESET_QUERIES = [
  "High caffeine, low acidity",
  "Vegetarian spicy breakfast bite",
  "Non-dairy chilled refresher",
  "Light sweet pairing for black coffee"
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
    <div className="border border-zinc-200 bg-white p-4 sm:p-5">
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
          AI TASTE MATCHING / GEMINI 3.8 FLASH
        </span>
        <span className="font-mono text-[10px] text-zinc-400">
          NATURAL LANGUAGE QUERY
        </span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="State your flavor or caffeine preference (e.g. 'cold, low sugar, high energy')..."
          className="flex-1 border border-zinc-200 bg-zinc-50/50 px-3 py-2 text-xs font-mono text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-hidden"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="bg-zinc-900 text-white px-4 py-2 text-xs font-mono uppercase tracking-wider hover:bg-zinc-800 disabled:opacity-50 transition-colors flex items-center gap-1.5"
        >
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <>Match <ArrowRight className="h-3 w-3" /></>}
        </button>
      </form>

      {/* Preset pills */}
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {PRESET_QUERIES.map((p, i) => (
          <button
            key={i}
            onClick={() => {
              setQuery(p);
              handleSearch(p);
            }}
            className="border border-zinc-200 bg-white px-2 py-0.5 text-[11px] font-mono text-zinc-600 hover:border-zinc-950 hover:text-zinc-950 transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Recommendation Results */}
      {result && (
        <div className="mt-4 border-t border-zinc-100 pt-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {result.recommendations.map((rec, i) => (
              <div
                key={i}
                onClick={() => onSelectItem(rec.item)}
                className="cursor-pointer border border-zinc-200 p-3 hover:border-zinc-900 transition-colors bg-zinc-50/30"
              >
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-semibold text-xs text-zinc-900">{rec.item.name}</span>
                  <span className="font-mono text-[10px] text-zinc-500">{rec.matchScore} match</span>
                </div>
                <p className="text-[11px] text-zinc-600 leading-snug mb-2 font-mono">
                  {rec.reasoning}
                </p>
                <span className="text-[10px] font-mono text-zinc-900 underline">
                  Inspect ingredients →
                </span>
              </div>
            ))}
          </div>
          {result.sommelierNote && (
            <p className="mt-2 font-mono text-[10px] text-zinc-500">
              NOTE: {result.sommelierNote}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
