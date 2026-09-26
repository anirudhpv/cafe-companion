import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Volume2 } from 'lucide-react';
import { MenuItem } from '../types';
import { ExplainModal } from '../components/ExplainModal';
import { AiSommelier } from '../components/AiSommelier';

export const MenuPage: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [search, setSearch] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
        setItems(data.items || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = ['All', 'Hot Brew', 'Cold Brew', 'Sandwich', 'Pancake', 'Shareable Bites'];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.tagline.toLowerCase().includes(search.toLowerCase()) ||
      item.baseIngredients.some(i => i.toLowerCase().includes(search.toLowerCase()));
    
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const playPronunciation = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-8 pb-20 md:pb-12 max-w-5xl mx-auto">
      {/* Editorial Header */}
      <div className="border-b border-zinc-200 pb-6 pt-2">
        <div className="flex items-baseline justify-between mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            CATALOGUE / CAFE SPECIFICATION
          </span>
          <span className="font-mono text-xs text-zinc-400">
            {filteredItems.length} ITEMS AVAILABLE
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950">
          Official Pop-Up Menu
        </h1>
        <p className="mt-2 text-sm text-zinc-600 max-w-2xl">
          Complete ingredient transparency and sensory profiles for all items prepared at the counter. Zero guesswork.
        </p>
      </div>

      {/* AI Conversational Recommender */}
      <AiSommelier onSelectItem={(item) => setSelectedItem(item)} />

      {/* Filter / Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Filter by ingredient (e.g., Chicory, Paneer, Yuzu, Cold steep)..."
              className="w-full border border-zinc-200 bg-white pl-9 pr-4 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto border-b border-zinc-200 pb-px">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pb-2 px-3 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                activeCategory === cat
                  ? 'border-zinc-950 text-zinc-950 font-bold'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Structured Item List (Zero fluff, instant ingredients) */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="h-32 bg-zinc-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-900 flex flex-col justify-between"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                        {item.category}
                      </span>
                      {item.menuDisplayName && item.menuDisplayName !== item.name && (
                        <span className="font-mono text-[10px] text-zinc-400">
                          (Board: "{item.menuDisplayName}")
                        </span>
                      )}
                    </div>
                    <h2 className="text-base font-semibold text-zinc-900 tracking-tight group-hover:underline">
                      {item.name}
                    </h2>
                  </div>

                  <span className="font-mono text-xs text-zinc-500 border border-zinc-200 px-2 py-0.5">
                    {item.price}
                  </span>
                </div>

                {/* Pronunciation & Description */}
                {item.pronunciation && (
                  <button
                    onClick={(e) => playPronunciation(e, item.name)}
                    className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-500 hover:text-zinc-900 mb-2"
                  >
                    <Volume2 className="h-3 w-3 text-zinc-400" />
                    <span>/{item.pronunciation}/</span>
                  </button>
                )}

                <p className="text-xs text-zinc-600 mb-3 leading-relaxed">
                  {item.tagline}
                </p>

                {/* PREDEFINED INGREDIENTS LIST - Displayed directly without LLM call */}
                <div className="border-t border-zinc-100 pt-2.5 mb-3">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5">
                    Ingredients:
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-zinc-700">
                    {item.baseIngredients.map((ing, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 font-mono">
                        <span className="h-1 w-1 bg-zinc-400 rounded-full" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer: Metadata table */}
              <div className="border-t border-zinc-100 pt-2 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <div className="flex items-center gap-3">
                  <span>Caffeine: <strong className="text-zinc-800 font-semibold">{item.caffeine}</strong></span>
                  <span>Diet: <strong className="text-zinc-800 font-semibold">{item.dietary.join(', ')}</strong></span>
                </div>
                <span className="group-hover:translate-x-0.5 transition-transform flex items-center gap-1 text-zinc-900 font-semibold">
                  Details <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Item Modal with Gemini Custom Q&A */}
      <ExplainModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
};
