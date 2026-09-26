import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Sparkles, MapPin, Coffee, Code2, Heart, MessageCircle, ExternalLink, Zap } from 'lucide-react';
import { Attendee } from '../types';
import { CheckInModal } from '../components/CheckInModal';
import { IcebreakerModal } from '../components/IcebreakerModal';

export const RadarPage: React.FC = () => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<Attendee | null>(null);
  const [currentUser, setCurrentUser] = useState<Attendee | null>(null);
  const [filterOpenOnly, setFilterOpenOnly] = useState(false);
  const [wavingAt, setWavingAt] = useState<Record<string, boolean>>({});

  const fetchAttendees = () => {
    fetch('/api/attendees')
      .then(res => res.json())
      .then(data => {
        setAttendees(data.attendees || []);
        if (!currentUser && data.attendees?.length > 0) {
          setCurrentUser(data.attendees[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAttendees();
  }, []);

  const handleWave = (id: string, name: string) => {
    setWavingAt(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      alert(`👋 You waved at ${name}!`);
    }, 200);
  };

  const filteredAttendees = attendees.filter(a => {
    if (filterOpenOnly && !a.openToChat) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-950 to-gray-900 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md border border-white/10 text-pink-300">
              <Zap className="h-3.5 w-3.5 text-pink-400" />
              <span>Builder ID & Social Radar</span>
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
              Café Social Cards.
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-gray-300 leading-relaxed">
              IRL identity profiles for the room. See tech stacks, table seats, what people are shipping today, and break the ice with Gemini.
            </p>
          </div>

          <button
            onClick={() => setIsCheckInOpen(true)}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-pink-500/30 hover:brightness-110 transition-all shrink-0"
          >
            <UserPlus className="h-4 w-4" />
            <span>Create My Builder Card</span>
          </button>
        </div>
      </div>

      {/* Control bar */}
      <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-800">
            {attendees.length} Live Builder Profiles
          </span>
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <button
          onClick={() => setFilterOpenOnly(!filterOpenOnly)}
          className={`rounded-xl px-3 py-1.5 text-xs font-semibold border transition-all ${
            filterOpenOnly
              ? 'bg-pink-50 text-pink-700 border-pink-300'
              : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
          }`}
        >
          ☕ Open to Chat Only
        </button>
      </div>

      {/* Social / ID Card Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="h-72 rounded-3xl bg-gray-200 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAttendees.map((att) => (
            <div
              key={att.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-gray-200/90 bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* ID Card Top Accent Bar & Table Badge */}
              <div className="h-24 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-3 relative">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/40 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-white border border-white/20">
                    <MapPin className="h-3 w-3 text-pink-400" />
                    {att.tableNumber}
                  </span>

                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold backdrop-blur-md ${
                    att.openToChat
                      ? 'bg-emerald-500/90 text-white'
                      : 'bg-gray-800/80 text-gray-300'
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${att.openToChat ? 'bg-white animate-ping' : 'bg-gray-400'}`} />
                    {att.openToChat ? 'Open to Chat' : 'Headphones On'}
                  </span>
                </div>
              </div>

              {/* Avatar + Main Details */}
              <div className="px-5 pt-0 pb-4 relative -mt-12 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-end justify-between">
                    <div className="relative">
                      <img
                        src={att.avatar}
                        alt={att.name}
                        className="h-20 w-20 rounded-2xl border-4 border-white object-cover shadow-md bg-gray-100"
                      />
                      <span className="absolute bottom-1 right-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-1 text-white shadow-xs">
                        <Sparkles className="h-2.5 w-2.5" />
                      </span>
                    </div>

                    {/* Quick Wave / Like Button */}
                    <button
                      onClick={() => handleWave(att.id, att.name)}
                      className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-bold transition-all shadow-2xs ${
                        wavingAt[att.id]
                          ? 'bg-pink-100 text-pink-700 border-pink-300'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-pink-300 hover:text-pink-600'
                      }`}
                    >
                      <span>👋</span>
                      <span>Wave</span>
                    </button>
                  </div>

                  {/* Name & Title */}
                  <div className="mt-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-gray-900 tracking-tight">{att.name}</h3>
                      <span className="text-[11px] font-mono text-gray-400">@popup</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-600">
                      {att.role} <span className="text-indigo-600 font-bold">• {att.companyOrProject}</span>
                    </p>
                  </div>

                  {/* Building Prompt / Status Bio */}
                  <div className="mt-3 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/80 p-3 border border-gray-100 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block mb-1">
                      🛠️ Currently Shipping Today:
                    </span>
                    <p className="font-medium text-gray-800 leading-snug">
                      "{att.currentProject}"
                    </p>
                  </div>

                  {/* Tech Stack & Vibe Badges */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {att.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-blue-50 border border-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-blue-700 shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                    <span className="rounded-lg bg-purple-50 border border-purple-100 px-2.5 py-0.5 text-[10px] font-bold text-purple-700 shadow-2xs">
                      ✨ {att.vibe}
                    </span>
                  </div>
                </div>

                {/* ID Card Footer / Action */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gray-400">
                    Checked in {att.checkedInAt}
                  </span>

                  <button
                    onClick={() => setSelectedTarget(att)}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 py-2 text-xs font-extrabold text-white shadow-md shadow-indigo-500/25 hover:brightness-110 transition-all"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
                    <span>Spark Icebreaker</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <CheckInModal
        isOpen={isCheckInOpen}
        onClose={() => setIsCheckInOpen(false)}
        onSuccess={(newAttendee) => {
          setAttendees(prev => [newAttendee, ...prev]);
          setCurrentUser(newAttendee);
        }}
      />

      <IcebreakerModal
        target={selectedTarget}
        currentUser={currentUser}
        onClose={() => setSelectedTarget(null)}
      />
    </div>
  );
};
