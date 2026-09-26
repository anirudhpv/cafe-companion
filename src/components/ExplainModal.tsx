import React, { useState, useEffect } from 'react';
import { X, Sparkles, Volume2, Flame, Droplets, HeartHandshake, HelpCircle, Loader2 } from 'lucide-react';
import { MenuItem, ItemExplanation } from '../types';

interface ExplainModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const ExplainModal: React.FC<ExplainModalProps> = ({ item, onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [explanation, setExplanation] = useState<ItemExplanation | null>(null);
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [askingCustom, setAskingCustom] = useState<boolean>(false);

  useEffect(() => {
    if (!item) {
      setExplanation(null);
      return;
    }

    setLoading(true);
    fetch('/api/menu/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId: item.id, itemName: item.name })
    })
      .then(res => res.json())
      .then(data => {
        setExplanation(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [item]);

  const handleAskCustom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim() || !item) return;

    setAskingCustom(true);
    try {
      const res = await fetch('/api/menu/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: item.id,
          itemName: item.name,
          userQuestion: customQuestion
        })
      });
      const data = await res.json();
      setExplanation(data);
      setCustomQuestion('');
    } catch (err) {
      console.error(err);
    } finally {
      setAskingCustom(false);
    }
  };

  const playPronunciation = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative flex flex-col max-h-[92vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl transition-all"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Image & Close Button */}
        <div className="relative h-52 sm:h-60 w-full shrink-0 overflow-hidden bg-gray-900">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/80 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-500/90 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-xs">
                {item.category}
              </span>
              {item.isUnfamiliar && (
                <span className="rounded-full bg-amber-500/90 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                  First time trying?
                </span>
              )}
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <h2 className="text-2xl font-bold tracking-tight">{item.name}</h2>
              <span className="text-lg font-semibold text-amber-300">{item.price}</span>
            </div>
            {item.pronunciation && (
              <button 
                onClick={() => playPronunciation(item.name)}
                className="mt-1 inline-flex items-center gap-1.5 text-xs text-gray-200 hover:text-white transition-colors"
              >
                <Volume2 className="h-3.5 w-3.5 text-blue-400" />
                <span className="italic font-mono">"{item.pronunciation}"</span>
                <span className="text-[10px] text-gray-400">(Tap to listen)</span>
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-[#4285F4]" />
              <p className="mt-3 text-sm font-semibold text-gray-700">Gemini 3.8 Flash is analyzing this item...</p>
              <p className="text-xs text-gray-400">Breaking down origin, ingredients & taste profile</p>
            </div>
          ) : (
            <>
              {/* Gemini What It Is Card */}
              <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3.5">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 uppercase tracking-wider">
                    <Sparkles className="h-3.5 w-3.5 text-[#4285F4]" />
                    <span>What Actually Is It?</span>
                  </div>
                  <span className="text-[10px] font-mono font-medium text-blue-700">
                    {explanation?.source || 'Gemini 3.8 Flash'}
                  </span>
                </div>
                <p className="text-sm font-medium leading-relaxed text-gray-800">
                  {explanation?.whatItIs || item.briefDesc}
                </p>
                {explanation?.origin && (
                  <p className="mt-2 text-xs text-gray-600 border-t border-blue-200/50 pt-2 italic">
                    <span className="font-semibold not-italic text-gray-700">Heritage:</span> {explanation.origin}
                  </p>
                )}
              </div>

              {/* Sensory & Flavor Bar */}
              {explanation?.flavorProfile && (
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-3.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2.5">
                    Flavor & Texture Profile
                  </h4>
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="flex items-center justify-between rounded-lg bg-white p-2 border border-gray-200/60">
                      <span className="text-gray-500 flex items-center gap-1"><Flame className="h-3.5 w-3.5 text-red-500" /> Boldness</span>
                      <span className="font-bold text-gray-800">{explanation.flavorProfile.intensity}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-white p-2 border border-gray-200/60">
                      <span className="text-gray-500 flex items-center gap-1"><Droplets className="h-3.5 w-3.5 text-amber-500" /> Sweetness</span>
                      <span className="font-bold text-gray-800">{explanation.flavorProfile.sweetness}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-white p-2 border border-gray-200/60">
                      <span className="text-gray-500">Acidity / Crispness</span>
                      <span className="font-bold text-gray-800">{explanation.flavorProfile.acidity}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-white p-2 border border-gray-200/60">
                      <span className="text-gray-500">Mouthfeel</span>
                      <span className="font-bold text-gray-800">{explanation.flavorProfile.texture}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Ingredients List */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  What Goes Into It
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(explanation?.ingredientsBreakdown || item.baseIngredients).map((ing, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800 border border-gray-200/60"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dietary & Caffeine flags */}
              <div className="flex items-center gap-2 text-xs flex-wrap">
                <span className="font-semibold text-gray-600">Dietary:</span>
                {item.dietary.map((d, i) => (
                  <span key={i} className="rounded-md bg-emerald-50 text-emerald-700 font-medium px-2 py-0.5 border border-emerald-200/60">
                    {d}
                  </span>
                ))}
                <span className="ml-2 font-semibold text-gray-600">Caffeine:</span>
                <span className="rounded-md bg-amber-50 text-amber-700 font-medium px-2 py-0.5 border border-amber-200/60">
                  {item.caffeine}
                </span>
              </div>

              {/* Why try it */}
              {explanation?.whyTryIt && (
                <div className="flex items-start gap-2 rounded-xl bg-amber-50/70 border border-amber-200/70 p-3 text-xs text-amber-900">
                  <HeartHandshake className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                  <div>
                    <span className="font-bold">Barista recommendation: </span>
                    {explanation.whyTryIt}
                  </div>
                </div>
              )}

              {/* Custom Ask Gemini Bar */}
              <form onSubmit={handleAskCustom} className="pt-2 border-t border-gray-100">
                <label className="flex items-center gap-1 text-xs font-semibold text-gray-700 mb-1.5">
                  <HelpCircle className="h-3.5 w-3.5 text-[#4285F4]" />
                  <span>Have questions? Ask Gemini about this dish:</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customQuestion}
                    onChange={e => setCustomQuestion(e.target.value)}
                    placeholder="e.g. Is it too sweet? Can I make it with oat milk?"
                    className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#4285F4]"
                  />
                  <button
                    type="submit"
                    disabled={askingCustom || !customQuestion.trim()}
                    className="rounded-xl bg-[#4285F4] px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-600 disabled:opacity-50 transition-colors flex items-center gap-1 shrink-0"
                  >
                    {askingCustom ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Ask'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Footer Order Call to Action */}
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 flex items-center justify-between shrink-0">
          <div className="text-xs text-gray-500">
            Show this to barista or order at counter
          </div>
          <button
            onClick={() => {
              alert(`Ready to order 1x ${item.name}! Head over to the barista counter.`);
              onClose();
            }}
            className="rounded-xl bg-gray-900 px-4 py-2 text-xs font-bold text-white hover:bg-gray-800 transition-colors shadow-xs"
          >
            Order {item.name} ({item.price})
          </button>
        </div>
      </div>
    </div>
  );
};
