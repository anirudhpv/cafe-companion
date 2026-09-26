import React, { useState, useEffect } from 'react';
import { X, Volume2, ArrowRight, Loader2 } from 'lucide-react';
import { MenuItem } from '../types';

interface ExplainModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const ExplainModal: React.FC<ExplainModalProps> = ({ item, onClose }) => {
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [askingCustom, setAskingCustom] = useState<boolean>(false);
  const [geminiAnswer, setGeminiAnswer] = useState<string | null>(null);

  useEffect(() => {
    setGeminiAnswer(null);
    setCustomQuestion('');
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
      setGeminiAnswer(data.whatItIs || data.whyTryIt || 'Explanation provided.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="relative flex flex-col max-h-[90vh] w-full max-w-lg bg-white border border-zinc-300 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-3">
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            SPECIFICATION / {item.category}
          </span>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-zinc-900 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Header Details */}
          <div>
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl font-semibold tracking-tight text-zinc-900">{item.name}</h2>
              <span className="font-mono text-xs border border-zinc-200 px-2 py-0.5 text-zinc-600">{item.price}</span>
            </div>
            {item.pronunciation && (
              <button
                onClick={() => playPronunciation(item.name)}
                className="inline-flex items-center gap-1 font-mono text-xs text-zinc-500 hover:text-zinc-900 mt-1"
              >
                <Volume2 className="h-3 w-3" />
                <span>/{item.pronunciation}/</span>
              </button>
            )}
            <p className="mt-2 text-xs text-zinc-600 leading-relaxed">
              {item.briefDesc}
            </p>
          </div>

          {/* Predefined Ingredients Table */}
          <div className="border border-zinc-200 p-3 bg-zinc-50/50">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 block mb-2">
              Verified Ingredients
            </span>
            <ul className="space-y-1 font-mono text-xs text-zinc-800">
              {item.baseIngredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-zinc-400">—</span>
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sensory Profile Grid */}
          <div className="border border-zinc-200 p-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 block mb-2">
              Sensory Profile
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="border-b border-zinc-100 pb-1">
                <span className="text-zinc-400 text-[10px]">INTENSITY:</span> {item.flavorProfile.intensity}
              </div>
              <div className="border-b border-zinc-100 pb-1">
                <span className="text-zinc-400 text-[10px]">SWEETNESS:</span> {item.flavorProfile.sweetness}
              </div>
              <div className="border-b border-zinc-100 pb-1">
                <span className="text-zinc-400 text-[10px]">ACIDITY:</span> {item.flavorProfile.acidity}
              </div>
              <div className="border-b border-zinc-100 pb-1">
                <span className="text-zinc-400 text-[10px]">MOUTHFEEL:</span> {item.flavorProfile.texture}
              </div>
            </div>
            <div className="mt-2 font-mono text-[11px] text-zinc-500">
              <span className="text-zinc-400">ORIGIN:</span> {item.origin}
            </div>
          </div>

          {/* Optional Gemini Inquiries */}
          <div className="border-t border-zinc-200 pt-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 block mb-2">
              Ask Gemini 3.8 Flash Custom Inquiry
            </span>
            <form onSubmit={handleAskCustom} className="flex gap-2">
              <input
                type="text"
                value={customQuestion}
                onChange={e => setCustomQuestion(e.target.value)}
                placeholder="e.g. Can this be prepared dairy-free? Is it bitter?"
                className="flex-1 border border-zinc-300 px-3 py-1.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:border-zinc-950 font-mono"
              />
              <button
                type="submit"
                disabled={askingCustom || !customQuestion.trim()}
                className="bg-zinc-900 text-white px-3 py-1.5 text-xs font-mono uppercase tracking-wider hover:bg-zinc-800 disabled:opacity-50"
              >
                {askingCustom ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Query'}
              </button>
            </form>

            {geminiAnswer && (
              <div className="mt-2.5 p-3 border border-zinc-200 bg-zinc-50 text-xs text-zinc-800 leading-relaxed font-mono">
                <span className="text-[10px] text-zinc-500 block mb-1">RESPONSE:</span>
                {geminiAnswer}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-zinc-200 px-5 py-3 flex items-center justify-between bg-zinc-50">
          <span className="font-mono text-[11px] text-zinc-500">
            Order directly at barista counter
          </span>
          <button
            onClick={() => {
              alert(`Ready to order 1x ${item.name}. Request at the counter.`);
              onClose();
            }}
            className="bg-zinc-950 text-white px-4 py-1.5 text-xs font-mono uppercase tracking-wider hover:bg-zinc-800 transition-colors"
          >
            Select Item
          </button>
        </div>
      </div>
    </div>
  );
};
