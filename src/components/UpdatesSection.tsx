import React, { useState } from 'react';
import { SchoolUpdate } from '../types';
import { dbService } from '../services/database';
import {
  Bell,
  Calendar,
  Clock,
  MapPin,
  Tag,
  Download,
  Search,
  Filter,
  PlusCircle,
  X,
  Sparkles,
  CheckCircle2,
  FileText,
  User,
} from 'lucide-react';

interface UpdatesSectionProps {
  updates: SchoolUpdate[];
  onUpdateAdded: (newUpdate: SchoolUpdate) => void;
}

export const UpdatesSection: React.FC<UpdatesSectionProps> = ({ updates, onUpdateAdded }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingUpdate, setIsAddingUpdate] = useState(false);

  // New update form state
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState<SchoolUpdate['category']>('Academic');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newVenue, setNewVenue] = useState('');
  const [newCoordinator, setNewCoordinator] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newTags, setNewTags] = useState('');

  const categories = [
    'All',
    'SETS Innovation',
    'Academic',
    'Sports & Co-curricular',
    'Administrative',
  ];

  const filteredUpdates = updates.filter((item) => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.coordinator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleCreateUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const added = dbService.addUpdate({
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'Official announcement from SMUK Administration.',
      category: newCategory,
      date: newDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      time: newTime.trim() || 'TBA',
      venue: newVenue.trim() || 'SMUK Main Campus',
      coordinator: newCoordinator.trim() || 'School Administration',
      description: newDescription.trim(),
      tags: newTags
        ? newTags.split(',').map((t) => t.trim().replace(/^#/, ''))
        : ['Announcement', 'SMUK'],
      isPinned: false,
    });

    onUpdateAdded(added);
    setIsAddingUpdate(false);
    // Reset form
    setNewTitle('');
    setNewSubtitle('');
    setNewDescription('');
    setNewVenue('');
    setNewTime('');
    setNewCoordinator('');
    setNewTags('');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold mb-2">
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>CAMPUS PROGRAM BULLETINS & ANNOUNCEMENTS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">Ongoing School Programs</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time updates regarding academic schedules, SETS robotics exhibitions, exams, and PTA advisories.
          </p>
        </div>

        <button
          onClick={() => setIsAddingUpdate(!isAddingUpdate)}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-amber-400/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Program Update</span>
        </button>
      </div>

      {/* Add Program Update Form (Collapsible) */}
      {isAddingUpdate && (
        <div className="p-6 bg-slate-800/90 border border-amber-400/50 rounded-2xl shadow-xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <h4 className="font-bold text-white text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Publish Program Update to Database</span>
            </h4>
            <button
              onClick={() => setIsAddingUpdate(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleCreateUpdate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Program Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Senior 4 National Science Practicals Briefing"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="SETS Innovation">SETS Innovation</option>
                  <option value="Academic">Academic</option>
                  <option value="Sports & Co-curricular">Sports & Co-curricular</option>
                  <option value="Administrative">Administrative</option>
                  <option value="Parents Notice">Parents Notice</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Subtitle / Short Summary</label>
              <input
                type="text"
                value={newSubtitle}
                onChange={(e) => setNewSubtitle(e.target.value)}
                placeholder="Key highlights in one sentence..."
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
                <input
                  type="text"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  placeholder="e.g. October 24, 2026"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Time & Venue</label>
                <input
                  type="text"
                  value={newVenue}
                  onChange={(e) => setNewVenue(e.target.value)}
                  placeholder="e.g. 09:00 AM • Main Auditorium"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Coordinator / In-Charge</label>
                <input
                  type="text"
                  value={newCoordinator}
                  onChange={(e) => setNewCoordinator(e.target.value)}
                  placeholder="e.g. Director of Studies"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Description *</label>
              <textarea
                rows={3}
                required
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Full details, instructions for parents and students..."
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingUpdate(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow cursor-pointer"
              >
                Publish to SMUK Portal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search programs..."
            className="w-full pl-9 pr-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredUpdates.map((item) => (
          <div
            key={item.id}
            className="bg-slate-800/60 border border-slate-700/70 hover:border-amber-400/50 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl transition-all hover:-translate-y-0.5"
          >
            <div>
              {item.imageUrl && (
                <div className="h-44 w-full overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-lg bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-400/30">
                      {item.category}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-5 space-y-3">
                {!item.imageUrl && (
                  <span className="inline-block px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    {item.category}
                  </span>
                )}

                <h3 className="text-lg font-extrabold text-white leading-snug">{item.title}</h3>
                <p className="text-xs font-medium text-amber-300/90">{item.subtitle}</p>

                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {item.description}
                </p>

                {item.detailedContent && (
                  <p className="text-xs text-slate-400 italic bg-slate-900/40 p-2.5 rounded-xl border border-slate-700/50">
                    {item.detailedContent}
                  </p>
                )}

                {/* Metadata Pills */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-2 border-t border-slate-700/50">
                  <div className="flex items-center gap-1.5 truncate">
                    <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="truncate">{item.venue || 'Campus Main'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate col-span-2">
                    <User className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">Coordinator: {item.coordinator}</span>
                  </div>
                </div>

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-slate-900/60 border-t border-slate-700/60 flex items-center justify-between text-xs">
              {item.attachmentName ? (
                <button
                  onClick={() => alert(`Downloading attachment: ${item.attachmentName} (${item.attachmentSize || 'PDF'})`)}
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Circular ({item.attachmentSize})</span>
                </button>
              ) : (
                <span className="text-slate-400 text-[11px]">Official SMUK Digital Circular</span>
              )}

              <span className="text-[10px] text-slate-500 font-mono">ID: {item.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
