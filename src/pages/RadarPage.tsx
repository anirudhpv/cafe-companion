import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Sparkles, MessageCircle, MapPin, Coffee, Code2, Headphones } from 'lucide-react';
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

  const fetchAttendees = () => {
    fetch('/api/attendees')
      .then(res => res.json())
      .then(data => {
        setAttendees(data.attendees || []);
        if (!currentUser && data.attendees?.length > 0) {
          setCurrentUser(data.attendees[0]); // default user context
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

  const filteredAttendees = attendees.filter(a => {
    if (filterOpenOnly && !a.openToChat) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-gray-900 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-[#34A853]/20 blur-3xl" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md border border-white/10 text-emerald-300">
              <Users className="h-3.5 w-3.5 text-emerald-400" />
              <span>IRL Café Networking</span>
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
              Café Radar.
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-gray-300 leading-relaxed">
              Find out who is sitting in the room, what tech stack they are using, and spark authentic conversations with Gemini-generated icebreakers.
            </p>
          </div>

          <button
            onClick={() => setIsCheckInOpen(true)}
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#34A853] px-5 py-3 text-xs font-bold text-white shadow-lg shadow-[#34A853]/30 hover:bg-emerald-600 transition-all shrink-0"
          >
            <UserPlus className="h-4 w-4" />
            <span>Check In to This Café</span>
          </button>
        </div>
      </div>

      {/* Control bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-800">
            {attendees.length} Builders in the room
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterOpenOnly(!filterOpenOnly)}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold border transition-all ${
              filterOpenOnly
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
            }`}
          >
            ☕ Open to Chat only
          </button>
        </div>
      </div>

      {/* Attendee Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="h-44 rounded-2xl bg-gray-200 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAttendees.map((att) => (
            <div
              key={att.id}
              className="flex flex-col justify-between rounded-2xl border border-gray-200/80 bg-white p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={att.avatar}
                        alt={att.name}
                        className="h-12 w-12 rounded-full border border-gray-200 object-cover"
                      />
                      <span
                        className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${
                          att.openToChat ? 'bg-emerald-500' : 'bg-gray-400'
                        }`}
                        title={att.openToChat ? 'Open for coffee chat' : 'Focus mode'}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900 text-sm">{att.name}</h3>
                        <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-bold text-gray-700 flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-red-500" />
                          {att.tableNumber}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium">
                        {att.role} • <span className="text-gray-700">{att.companyOrProject}</span>
                      </p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    att.openToChat
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {att.openToChat ? '☕ Open' : '🎧 Busy'}
                  </span>
                </div>

                {/* What they're working on */}
                <div className="mt-3 rounded-xl bg-gray-50 p-2.5 border border-gray-100">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Building today
                  </div>
                  <p className="mt-0.5 text-xs font-medium text-gray-800 line-clamp-2">
                    {att.currentProject}
                  </p>
                </div>

                {/* Tech stack badges */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {att.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-blue-50 border border-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700"
                    >
                      {tech}
                    </span>
                  ))}
                  <span className="rounded-md bg-amber-50 border border-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-800">
                    {att.vibe}
                  </span>
                </div>
              </div>

              {/* Spark Conversation Button */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-400 font-mono">
                  Checked in at {att.checkedInAt}
                </span>

                <button
                  onClick={() => setSelectedTarget(att)}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:from-blue-700 hover:to-indigo-700 transition-all"
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  <span>Spark Icebreaker</span>
                </button>
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
