import React, { useState, useEffect } from 'react';
import { Search, Sparkles, HelpCircle, ArrowUpRight, Filter } from 'lucide-react';
import { MenuItem } from '../types';
import { ExplainModal } from '../components/ExplainModal';
import { AiSommelier } from '../components/AiSommelier';

export const MenuPage: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [search, setSearch] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [onlyUnfamiliar, setOnlyUnfamiliar] = useState<boolean>(false);

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
    const matchesUnfamiliar = !onlyUnfamiliar || item.isUnfamiliar;

    return matchesSearch && matchesCategory && matchesUnfamiliar;
  });

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-[#4285F4]/20 blur-3xl" />
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md border border-white/10 text-blue-200">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>Smart Café Experience</span>
          </div>
          <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
            Demystify the Menu.
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-300 leading-relaxed">
            Never wonder what an unfamiliar dish tastes like again. Tap any item to get an instant multimodal AI breakdown with ingredients, heritage, and flavor profiles.
          </p>
        </div>
      </div>

      {/* AI Conversational Sommelier Card */}
      <AiSommelier onSelectItem={(item) => setSelectedItem(item)} />

      {/* Search & Filter Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search items, ingredients (e.g. Yuzu, Pistachio, Gesha)..."
              className="w-full rounded-2xl border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-xs text-gray-900 placeholder-gray-400 shadow-2xs focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Unfamiliar Only Toggle */}
          <button
            onClick={() => setOnlyUnfamiliar(!onlyUnfamiliar)}
            className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all border shrink-0 ${
              onlyUnfamiliar
                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Unfamiliar Items Only</span>
          </button>
        </div>

        {/* Category Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="h-64 rounded-2xl bg-gray-200 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-2xs transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
            >
              <div>
                {/* Photo & Badges */}
                <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {item.isUnfamiliar && (
                    <span className="absolute top-2.5 left-2.5 rounded-full bg-amber-500/90 text-white font-bold text-[10px] px-2.5 py-0.5 backdrop-blur-xs">
                      What is this? 🤔
                    </span>
                  )}

                  <span className="absolute bottom-2.5 left-3 text-lg font-bold text-white">
                    {item.price}
                  </span>
                  <span className="absolute bottom-2.5 right-3 rounded-md bg-black/40 px-2 py-0.5 text-[10px] font-semibold text-gray-200 backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>

                {/* Details */}
                <div className="p-4">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#4285F4] transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  {item.menuDisplayName && item.menuDisplayName !== item.name && (
                    <div className="text-[10px] text-gray-400 font-mono">
                      Board: {item.menuDisplayName}
                    </div>
                  )}
                  
                  {item.pronunciation && (
                    <span className="text-[11px] font-mono text-gray-400 block">
                      "{item.pronunciation}"
                    </span>
                  )}

                  <p className="mt-1.5 text-xs text-gray-600 line-clamp-2">
                    {item.tagline}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {item.baseIngredients.slice(0, 2).map((ing, i) => (
                      <span key={i} className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] text-gray-700">
                        {ing}
                      </span>
                    ))}
                    {item.baseIngredients.length > 2 && (
                      <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500">
                        +{item.baseIngredients.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Call to Action */}
              <div className="border-t border-gray-100 bg-gray-50/70 px-4 py-2.5 flex items-center justify-between">
                <span className="flex items-center gap-1 text-[11px] font-bold text-[#4285F4]">
                  <Sparkles className="h-3 w-3" />
                  Gemini Breakdown
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 group-hover:bg-[#4285F4] group-hover:text-white group-hover:border-[#4285F4] transition-colors">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <ExplainModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
};
