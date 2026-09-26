import React, { useState } from 'react';
import { X, Sparkles, UserPlus, Coffee, Loader2 } from 'lucide-react';
import { Attendee } from '../types';

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newAttendee: Attendee) => void;
}

export const CheckInModal: React.FC<CheckInModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('AI / Cloud Builder');
  const [companyOrProject, setCompanyOrProject] = useState('');
  const [currentProject, setCurrentProject] = useState('');
  const [techStackInput, setTechStackInput] = useState('Gemini 3.8, Cloud Run, React');
  const [interestsInput, setInterestsInput] = useState('AI Agents, Specialty Coffee, Startups');
  const [tableNumber, setTableNumber] = useState('Table 4');
  const [openToChat, setOpenToChat] = useState(true);
  const [vibe, setVibe] = useState<Attendee['vibe']>('Open for coffee chat');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    try {
      const payload = {
        name,
        role,
        companyOrProject: companyOrProject || 'Independent Builder',
        currentProject: currentProject || 'Exploring Google Cloud & Gemini',
        techStack: techStackInput.split(',').map(s => s.trim()).filter(Boolean),
        interests: interestsInput.split(',').map(s => s.trim()).filter(Boolean),
        tableNumber,
        openToChat,
        vibe
      };

      const res = await fetch('/api/attendees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.attendee) {
        onSuccess(data.attendee);
        onClose();
      }
    } catch (err) {
      console.error('Check-in error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative flex flex-col max-h-[92vh] w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#34A853] text-white">
              <UserPlus className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Join the Café Radar</h3>
              <p className="text-[11px] text-gray-500">Connect with fellow builders at this Pop-Up</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Your Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Alex Rivera"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-[#34A853] focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Role / Job</label>
              <input
                type="text"
                value={role}
                onChange={e => setRole(e.target.value)}
                placeholder="e.g. AI Engineer"
                className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-[#34A853] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Company / Project</label>
              <input
                type="text"
                value={companyOrProject}
                onChange={e => setCompanyOrProject(e.target.value)}
                placeholder="e.g. Stealth / Google"
                className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-[#34A853] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">What are you working on right now?</label>
            <textarea
              rows={2}
              value={currentProject}
              onChange={e => setCurrentProject(e.target.value)}
              placeholder="e.g. Prototyping an AI agent workflow using Gemini 3.8 and Cloud Run"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-[#34A853] focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Tech Stack (comma separated)</label>
              <input
                type="text"
                value={techStackInput}
                onChange={e => setTechStackInput(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-[#34A853] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Table / Seating Area</label>
              <input
                type="text"
                value={tableNumber}
                onChange={e => setTableNumber(e.target.value)}
                placeholder="e.g. Table 5 / Window"
                className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-[#34A853] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Current Vibe</label>
            <select
              value={vibe}
              onChange={e => setVibe(e.target.value as Attendee['vibe'])}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 focus:ring-2 focus:ring-[#34A853] focus:outline-hidden"
            >
              <option value="Open for coffee chat">☕ Open for coffee chat</option>
              <option value="Brainstorming ideas">💡 Brainstorming ideas</option>
              <option value="Looking for co-founder">🤝 Looking for co-founder</option>
              <option value="Coding intensely">🎧 Coding intensely (Do Not Disturb)</option>
            </select>
          </div>

          {/* Open to chat toggle */}
          <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3 border border-gray-100">
            <div>
              <div className="font-semibold text-gray-800">Open to Meeting People?</div>
              <div className="text-[11px] text-gray-500">Allow builders to walk over or say hello</div>
            </div>
            <button
              type="button"
              onClick={() => setOpenToChat(!openToChat)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                openToChat ? 'bg-[#34A853]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
                  openToChat ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#34A853] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-600 disabled:opacity-50 transition-colors"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Check In to Café'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
