import React, { useState, useEffect } from 'react';
import { Clock, Activity, MessageSquare, Star, Send, ShieldCheck, HeartHandshake, Loader2 } from 'lucide-react';

export const RoomPage: React.FC = () => {
  const [roomData, setRoomData] = useState<{
    activeBuilders: number;
    openToConnect: number;
    focusMode: number;
    estimatedWaitTime: string;
    currentVibe: string;
    feedback: Array<{ id: string; rating: number; vibeComment: string; timestamp: string }>;
  } | null>(null);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchStatus = () => {
    fetch('/api/room/status')
      .then(res => res.json())
      .then(data => setRoomData(data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmitting(true);
    try {
      await fetch('/api/room/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, vibeComment: comment })
      });
      setComment('');
      fetchStatus();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-red-900 via-rose-900 to-gray-900 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-[#EA4335]/20 blur-3xl" />
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md border border-white/10 text-rose-300">
            <Activity className="h-3.5 w-3.5 text-rose-400" />
            <span>Understand the Room & Wait Times</span>
          </div>
          <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
            Live Café Pulse.
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-300 leading-relaxed">
            Real-time insights for both guests and café teams. Track barista queues, room capacity, and live sentiment.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Wait time */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Estimated Order Wait</span>
            <Clock className="h-4 w-4 text-[#4285F4]" />
          </div>
          <div className="text-2xl font-black text-gray-900">
            {roomData?.estimatedWaitTime || '4 - 6 mins'}
          </div>
          <p className="mt-1 text-xs text-emerald-600 font-semibold">
            ⚡ Optimal time to order coffee
          </p>
        </div>

        {/* Builders present */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Builders</span>
            <Activity className="h-4 w-4 text-[#34A853]" />
          </div>
          <div className="text-2xl font-black text-gray-900">
            {roomData?.activeBuilders || 4} Checked In
          </div>
          <p className="mt-1 text-xs text-gray-500 font-medium">
            {roomData?.openToConnect || 3} open to chat • {roomData?.focusMode || 1} deep focus
          </p>
        </div>

        {/* Vibe rating */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Room Energy</span>
            <HeartHandshake className="h-4 w-4 text-[#FBBC05]" />
          </div>
          <div className="text-2xl font-black text-gray-900">
            4.8 / 5.0 ⭐
          </div>
          <p className="mt-1 text-xs text-amber-600 font-semibold">
            {roomData?.currentVibe || 'High Productivity & Great Coffee'}
          </p>
        </div>
      </div>

      {/* Live Feedback / Sentiment Submission */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs">
        <h3 className="font-bold text-gray-900 text-sm mb-1">
          Share Your Live Café Vibe
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          Help the barista and event team tune music, temperature, or coffee pace.
        </p>

        <form onSubmit={handleFeedback} className="space-y-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-gray-600 mr-2">Vibe Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={`p-1 rounded-md transition-colors ${
                  star <= rating ? 'text-amber-400' : 'text-gray-300'
                }`}
              >
                <Star className="h-5 w-5 fill-current" />
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="e.g. 'Coffee is stellar!', 'Music volume is perfect for coding'..."
              className="flex-1 rounded-xl border border-gray-200 px-3.5 py-2 text-xs text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#EA4335]"
            />
            <button
              type="submit"
              disabled={submitting || !comment.trim()}
              className="flex items-center gap-1.5 rounded-xl bg-gray-900 px-4 py-2 text-xs font-bold text-white hover:bg-gray-800 disabled:opacity-50 transition-colors shrink-0"
            >
              {submitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <>Post Vibe <Send className="h-3 w-3" /></>}
            </button>
          </div>
        </form>

        {/* Live feed */}
        <div className="mt-5 border-t border-gray-100 pt-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
            Live Attendee Sentiment Feed
          </h4>
          <div className="space-y-2">
            {(roomData?.feedback || []).map((f) => (
              <div
                key={f.id}
                className="flex items-center justify-between rounded-xl bg-gray-50 p-2.5 border border-gray-100 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-500">{'⭐'.repeat(f.rating)}</span>
                  <span className="text-gray-700 font-medium">"{f.vibeComment}"</span>
                </div>
                <span className="text-[10px] text-gray-400 font-mono">{f.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
