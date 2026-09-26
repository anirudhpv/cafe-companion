import React, { useState, useEffect } from 'react';
import { X, Sparkles, MessageCircle, Lightbulb, Loader2, Copy, Check } from 'lucide-react';
import { Attendee, IcebreakerResult } from '../types';

interface IcebreakerModalProps {
  target: Attendee | null;
  currentUser: Attendee | null;
  onClose: () => void;
}

export const IcebreakerModal: React.FC<IcebreakerModalProps> = ({ target, currentUser, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IcebreakerResult | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!target) {
      setResult(null);
      return;
    }

    setLoading(true);
    fetch('/api/attendees/icebreaker', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        myId: currentUser?.id || 'att-1',
        targetId: target.id
      })
    })
      .then(res => res.json())
      .then(data => {
        setResult(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [target, currentUser]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!target) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative flex flex-col max-h-[92vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <img
              src={target.avatar}
              alt={target.name}
              className="h-10 w-10 rounded-full border border-gray-200 object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900 text-sm">Say Hello to {target.name}</h3>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                  {target.tableNumber}
                </span>
              </div>
              <p className="text-[11px] text-gray-500">{target.role} • {target.companyOrProject}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-[#34A853]" />
              <p className="mt-3 text-sm font-semibold text-gray-700">Gemini 3.8 Flash is crafting icebreakers...</p>
              <p className="text-xs text-gray-400">Finding shared tech interests between your builds</p>
            </div>
          ) : (
            <>
              {/* Synergies tag */}
              {result?.compatibilityTag && (
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                    <Sparkles className="h-3.5 w-3.5 text-[#34A853]" />
                    <span>Shared Synergy: {result.compatibilityTag}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-700">
                    Target is working on: <span className="font-medium text-gray-900">"{target.currentProject}"</span>
                  </p>
                </div>
              )}

              {/* Icebreaker Questions */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2.5 flex items-center gap-1.5">
                  <MessageCircle className="h-3.5 w-3.5 text-blue-600" />
                  <span>Curated Icebreakers (Pick one to say)</span>
                </h4>
                <div className="space-y-2">
                  {(result?.icebreakers || []).map((ib, i) => (
                    <div
                      key={i}
                      className="group flex items-start justify-between gap-2 rounded-xl border border-gray-200 bg-gray-50/50 p-3 hover:bg-blue-50/30 hover:border-blue-200 transition-all text-xs"
                    >
                      <span className="text-gray-800 font-medium leading-relaxed">{ib}</span>
                      <button
                        onClick={() => copyToClipboard(ib, i)}
                        className="shrink-0 p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copiedIndex === i ? (
                          <Check className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pair-programming / collab idea */}
              {result?.collaborativeIdea && (
                <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
                    <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
                    <span>Pop-Up Collaboration Idea:</span>
                  </div>
                  <p className="text-gray-800">{result.collaborativeIdea}</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Action Button */}
        <div className="border-t border-gray-100 bg-gray-50 p-3 text-center shrink-0">
          <p className="text-[11px] text-gray-500 font-medium">
            Walk up to {target.tableNumber} and say hello!
          </p>
        </div>
      </div>
    </div>
  );
};
