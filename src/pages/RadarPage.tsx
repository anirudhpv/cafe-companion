import React, { useState, useEffect } from 'react';
import { UserPlus, Sparkles, MapPin, ArrowRight } from 'lucide-react';
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
      alert(`👋 You signaled an intro to ${name}.`);
    }, 150);
  };

  const filteredAttendees = attendees.filter(a => {
    if (filterOpenOnly && !a.openToChat) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-20 md:pb-12 max-w-5xl mx-auto">
      {/* Editorial Header */}
      <div className="border-b border-zinc-200 pb-6 pt-2 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-zinc-500 uppercase tracking-widest">
            <span>REGISTRY / BUILDER IDENTITIES</span>
            <span>•</span>
            <span className="text-zinc-950">{attendees.length} ACTIVE IN ROOM</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950">
            Café Room Radar
          </h1>
          <p className="mt-2 text-sm text-zinc-600 max-w-xl">
            Attendee cards displaying current technical builds, physical table coordinates, and Gemini-generated conversational starters.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilterOpenOnly(!filterOpenOnly)}
            className={`border px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
              filterOpenOnly
                ? 'border-zinc-950 bg-zinc-950 text-white'
                : 'border-zinc-300 bg-white text-zinc-700 hover:border-zinc-950'
            }`}
          >
            {filterOpenOnly ? 'Filtering: Open To Chat' : 'Filter: Open To Chat'}
          </button>

          <button
            onClick={() => setIsCheckInOpen(true)}
            className="bg-zinc-900 text-white px-4 py-1.5 text-xs font-mono uppercase tracking-wider hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
          >
            <UserPlus className="h-3.5 w-3.5" />
            <span>Register Profile</span>
          </button>
        </div>
      </div>

      {/* Swiss Identity Card Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="h-44 bg-zinc-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAttendees.map((att) => (
            <div
              key={att.id}
              className="border border-zinc-200 bg-white p-5 flex flex-col justify-between hover:border-zinc-900 transition-colors"
            >
              <div>
                {/* Header row: Table & Status badge */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 mb-3 font-mono text-xs">
                  <span className="flex items-center gap-1 text-zinc-600 font-semibold">
                    <MapPin className="h-3 w-3 text-zinc-400" />
                    {att.tableNumber}
                  </span>

                  <span className={`px-2 py-0.5 border text-[10px] uppercase tracking-wider font-semibold ${
                    att.openToChat
                      ? 'border-zinc-900 text-zinc-950 bg-zinc-50'
                      : 'border-zinc-200 text-zinc-400 bg-zinc-50'
                  }`}>
                    {att.openToChat ? 'Status: Available' : 'Status: Deep Focus'}
                  </span>
                </div>

                {/* Profile row */}
                <div className="flex items-start gap-3.5">
                  <img
                    src={att.avatar}
                    alt={att.name}
                    className="h-12 w-12 rounded-none border border-zinc-300 object-cover bg-zinc-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between">
                      <h2 className="text-base font-semibold text-zinc-900 truncate">
                        {att.name}
                      </h2>
                      <span className="font-mono text-[10px] text-zinc-400">
                        IN {att.checkedInAt}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 font-mono">
                      {att.role} / <span className="text-zinc-900">{att.companyOrProject}</span>
                    </p>
                  </div>
                </div>

                {/* Current Project Specification */}
                <div className="mt-3 bg-zinc-50/70 border border-zinc-100 p-2.5">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 block mb-1">
                    CURRENT SPRINTS / BUILDING TODAY:
                  </span>
                  <p className="text-xs text-zinc-800 leading-snug font-mono">
                    "{att.currentProject}"
                  </p>
                </div>

                {/* Tech Stack Badges */}
                <div className="mt-3 flex flex-wrap gap-1 font-mono text-[10px]">
                  {att.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="border border-zinc-200 bg-white px-2 py-0.5 text-zinc-700"
                    >
                      {tech}
                    </span>
                  ))}
                  <span className="border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-zinc-600">
                    {att.vibe}
                  </span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                <button
                  onClick={() => handleWave(att.id, att.name)}
                  className="font-mono text-xs text-zinc-600 hover:text-zinc-950 underline transition-colors"
                >
                  {wavingAt[att.id] ? 'Wave Sent ✓' : '👋 Send Intro'}
                </button>

                <button
                  onClick={() => setSelectedTarget(att)}
                  className="bg-zinc-900 text-white px-3 py-1.5 text-xs font-mono uppercase tracking-wider hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
                >
                  <span>Generate Icebreaker</span>
                  <ArrowRight className="h-3 w-3" />
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
