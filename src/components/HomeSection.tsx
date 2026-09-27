import React, { useState } from 'react';
import { StudentResult, SchoolDocument, SchoolUpdate, LiveStream } from '../types';
import {
  SMUK_TAG_IMAGE,
  SMUK_BADGE_IMAGE,
  APP_NAME,
  SCHOOL_NAME,
  FULL_SCHOOL_NAME,
  SCHOOL_MOTTO,
  TIKTOK_ACCOUNT_NAME,
  TIKTOK_HANDLE,
  TIKTOK_LIVE_URL,
} from '../assets/logo';
import {
  Search,
  Award,
  Calendar,
  Download,
  Radio,
  FileText,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Users,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { UgandanCurriculumGuideModal } from './UgandanCurriculumGuideModal';

interface HomeSectionProps {
  onSearchStudent: (id: string) => void;
  foundStudent: StudentResult | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenReportCard: () => void;
  onNavigateTab: (tab: 'home' | 'live' | 'updates' | 'profile') => void;
  documents: SchoolDocument[];
  updates: SchoolUpdate[];
  liveStream: LiveStream | null;
  onOpenUploadModal: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  onSearchStudent,
  foundStudent,
  searchQuery,
  setSearchQuery,
  onOpenReportCard,
  onNavigateTab,
  documents,
  updates,
  liveStream,
  onOpenUploadModal,
}) => {
  const [hasSearched, setHasSearched] = useState(false);
  const [showCurriculumModal, setShowCurriculumModal] = useState(false);
  const [showAllSubjects, setShowAllSubjects] = useState(false);

  const sampleStudentIds = [
    { id: 'SMUK-2024-042', name: 'Annette Michelle (S.4 SETS Top Scholar)' },
    { id: 'SMUK-2024-001', name: 'Brian Kato (S.4 Robotics Lead)' },
    { id: 'SMUK-2024-118', name: 'Trevor Agaba (S.3 Agriculture)' },
    { id: 'SMUK-2025-007', name: 'Chloe Nabatanzi (S.2 Foundation)' },
    { id: 'SMUK-2026-089', name: 'Derrick Ssenyonga (S.1 Pioneer)' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    onSearchStudent(searchQuery);
  };

  const handleSampleClick = (id: string) => {
    setSearchQuery(id);
    setHasSearched(true);
    onSearchStudent(id);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Live Stream Alert Ribbon (if active) */}
      {liveStream && liveStream.status === 'live' && (
        <div className="bg-gradient-to-r from-red-900/50 via-slate-900 to-amber-950/40 border border-red-500/40 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500"></span>
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-red-500 text-white tracking-wider">
                  BROADCASTING LIVE
                </span>
                <span className="text-xs text-slate-300 hidden sm:inline">• {liveStream.viewersCount} Parents Watching</span>
              </div>
              <p className="text-sm font-bold text-white mt-0.5">{liveStream.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={TIKTOK_LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 via-red-600 to-cyan-500 hover:opacity-95 text-white text-xs font-bold rounded-xl shadow-lg shadow-red-600/30 transition-all cursor-pointer whitespace-nowrap"
              title={`Join Live Broadcast on TikTok: ${TIKTOK_ACCOUNT_NAME} (${TIKTOK_HANDLE})`}
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43 6.31 6.31 0 0 0 1.93-4.52V8.92a8.28 8.28 0 0 0 4.8 1.53V7a4.84 4.84 0 0 1-1-.31z"/>
              </svg>
              <span>Join Live Broadcast ({TIKTOK_ACCOUNT_NAME})</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
            <button
              onClick={() => onNavigateTab('live')}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-all cursor-pointer whitespace-nowrap"
            >
              <Radio className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden sm:inline">Live Tab</span>
            </button>
          </div>
        </div>
      )}

      {/* Hero Banner with Tag Image */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-800/90 via-slate-900 to-slate-950 border border-slate-700/70 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Welcome to {SCHOOL_NAME} Digital Campus</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {APP_NAME}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Empowering parents and students with instant online academic results, live school broadcasts, real-time program updates, and seamless access to official school documents.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified Digital Report Cards
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Radio className="w-4 h-4 text-red-400" />
                Live Assemblies & Events
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <FileText className="w-4 h-4 text-blue-400" />
                Centralized Document Database
              </span>
            </div>
          </div>

          {/* School Tag Image Badge */}
          <div className="relative flex flex-col items-center">
            <div className="relative p-2.5 bg-gradient-to-tr from-amber-400 via-white to-blue-500 rounded-3xl shadow-2xl">
              <div className="w-44 h-56 sm:w-52 sm:h-64 bg-white rounded-2xl p-2 flex items-center justify-center overflow-hidden border-2 border-slate-900 shadow-inner">
                <img
                  src={SMUK_TAG_IMAGE}
                  alt="ST. KALEMBA S.S VILLAMARIA Official Crest"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400 block">
                {FULL_SCHOOL_NAME}
              </span>
              <span className="text-[11px] text-slate-300 font-semibold italic block">&quot;{SCHOOL_MOTTO}&quot;</span>
            </div>
          </div>
        </div>
      </div>

      {/* Online Student Result Lookup Box */}
      <div id="results-lookup" className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex p-2.5 rounded-2xl bg-amber-500/15 text-amber-400 mb-1 border border-amber-500/30">
              <Search className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Check Student Results Online
            </h2>
            <p className="text-sm text-slate-300">
              Enter the student ID number below to view the latest Term 3 official examination marks, aggregates, and teacher remarks.
            </p>
          </div>

          {/* Search Bar Form */}
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Student ID (e.g. SMUK-2024-042)"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-700 rounded-2xl text-white placeholder-slate-500 text-sm sm:text-base font-mono focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-2xl text-sm sm:text-base shadow-lg shadow-amber-500/20 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Get Results
            </button>
          </form>

          {/* Quick Click Sample IDs */}
          <div className="pt-1">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 text-center sm:text-left">
              Quick test IDs (Click any to load):
            </p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {sampleStudentIds.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSampleClick(item.id)}
                  className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    searchQuery.toUpperCase().includes(item.id)
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md'
                      : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-amber-400/50 hover:text-white'
                  }`}
                >
                  <span className="font-mono font-semibold">{item.id}</span>
                  <span className="text-[11px] opacity-75 ml-1.5">({item.name.split(' ')[0]})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Result Outcome Display */}
          {hasSearched && !foundStudent && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-300 text-sm">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <div>
                <p className="font-bold">No student record found for &quot;{searchQuery}&quot;</p>
                <p className="text-xs text-red-300/80 mt-0.5">
                  Please verify the student ID format (e.g. SMUK-2024-042). You can also click any sample ID above or upload student records via the Database portal.
                </p>
              </div>
            </div>
          )}

          {foundStudent && (
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 border-2 border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-white p-1 border-2 border-amber-400 shadow-md flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={SMUK_BADGE_IMAGE}
                      alt="SMUK Badge"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-extrabold text-white">{foundStudent.fullName}</h3>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {foundStudent.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      ID: <span className="font-mono text-amber-400 font-bold">{foundStudent.studentId}</span> • Class: <span className="text-slate-200">{foundStudent.classGrade}</span> • {foundStudent.term}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowCurriculumModal(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl text-xs font-semibold border border-amber-500/30 transition-all cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Curriculum Guide</span>
                  </button>
                  <button
                    onClick={onOpenReportCard}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    <Award className="w-4 h-4" />
                    <span>View Official Report</span>
                  </button>
                </div>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="text-[11px] text-slate-400 block uppercase font-semibold">Total Aggregates</span>
                  <span className="text-2xl font-black text-amber-400">{foundStudent.totalAggregates}</span>
                  <span className="text-[10px] text-slate-400 block">Best 8 Subjects</span>
                </div>
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="text-[11px] text-slate-400 block uppercase font-semibold">Academic Division</span>
                  <span className="text-sm sm:text-base font-black text-emerald-400 block truncate">{foundStudent.division}</span>
                  <span className="text-[10px] text-slate-400 block">Grade Distinction</span>
                </div>
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="text-[11px] text-slate-400 block uppercase font-semibold">Class Stream Rank</span>
                  <span className="text-2xl font-black text-blue-400">#{foundStudent.classRank}</span>
                  <span className="text-[10px] text-slate-400 block">Out of {foundStudent.totalStudentsInClass}</span>
                </div>
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="text-[11px] text-slate-400 block uppercase font-semibold">Average Score</span>
                  <span className="text-2xl font-black text-purple-400">{foundStudent.averageScore.toFixed(1)}%</span>
                  <span className="text-[10px] text-slate-400 block">Attendance: {foundStudent.attendance.percentage}%</span>
                </div>
              </div>

              {/* Uganda Curriculum Banner */}
              <div className="p-3 bg-blue-950/40 border border-blue-500/30 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs text-blue-200">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-500/40 text-[10px] uppercase">
                    UGANDA NEW CURRICULUM (NCDC)
                  </span>
                  <span>Continuous Assessment: AoI (20%) + Summative Exam: EOT (80%)</span>
                </div>
                <span className="font-mono text-amber-300 font-semibold text-[11px]">Score Scale: 0.0 – 3.0</span>
              </div>

              {/* Subject Mini Table Preview */}
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-800/80 text-slate-400">
                    <tr>
                      <th className="py-2.5 px-3">Subject (Uganda NLSC)</th>
                      <th className="py-2.5 px-2 text-center" title="Activity of Integration">AoI (20%)</th>
                      <th className="py-2.5 px-2 text-center" title="End of Term Summative">EOT (80%)</th>
                      <th className="py-2.5 px-2 text-center font-bold">Total (100%)</th>
                      <th className="py-2.5 px-2 text-center font-bold" title="CBC Competence Score on 3.0 Scale">Score / 3.0</th>
                      <th className="py-2.5 px-2 text-center">Competency Level</th>
                      <th className="py-2.5 px-3">Teacher Competence Feedback</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {(showAllSubjects ? foundStudent.subjects : foundStudent.subjects.slice(0, 6)).map((sub, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30">
                        <td className="py-2.5 px-3 font-medium text-white">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-mono text-slate-400 text-[11px]">{sub.code}</span>
                            <span>{sub.name}</span>
                            {sub.category && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                                {sub.category}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-2.5 px-2 text-center text-slate-300 font-mono">{sub.aoiScore ?? 18}</td>
                        <td className="py-2.5 px-2 text-center text-slate-300 font-mono">{sub.endTermScore}</td>
                        <td className="py-2.5 px-2 text-center font-bold text-amber-300 font-mono">{sub.totalScore}%</td>
                        <td className="py-2.5 px-2 text-center font-mono text-emerald-400 font-bold">{sub.scoreOutOf3 ?? ((sub.totalScore / 100) * 3).toFixed(1)}</td>
                        <td className="py-2.5 px-2 text-center">
                          <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                            (sub.competencyLevel && sub.competencyLevel.includes('Level 3')) || sub.totalScore >= 80
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}>
                            {sub.competencyLevel ?? 'Level 3 (Outstanding)'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-300 italic truncate max-w-xs">{sub.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between pt-1 gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">
                    Showing {showAllSubjects ? foundStudent.subjects.length : Math.min(6, foundStudent.subjects.length)} of {foundStudent.subjects.length} Ugandan curriculum subjects.
                  </span>
                  {foundStudent.subjects.length > 6 && (
                    <button
                      type="button"
                      onClick={() => setShowAllSubjects(!showAllSubjects)}
                      className="text-xs font-semibold text-blue-400 hover:text-blue-300 underline cursor-pointer"
                    >
                      {showAllSubjects ? 'Show Top 6' : `View All ${foundStudent.subjects.length} Subjects`}
                    </button>
                  )}
                </div>
                <button
                  onClick={onOpenReportCard}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Full Stamped Report</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Key School Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 text-center">
          <Users className="w-6 h-6 text-amber-400 mx-auto mb-2" />
          <h4 className="text-2xl font-black text-white">1,480+</h4>
          <p className="text-xs text-slate-400 mt-1 font-medium">Students Enrolled</p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 text-center">
          <TrendingUp className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
          <h4 className="text-2xl font-black text-white">99.4%</h4>
          <p className="text-xs text-slate-400 mt-1 font-medium">National Pass Rate</p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 text-center">
          <Award className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <h4 className="text-2xl font-black text-white">4 SETS Labs</h4>
          <p className="text-xs text-slate-400 mt-1 font-medium">Robotics & AI Centers</p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 text-center">
          <Radio className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <h4 className="text-2xl font-black text-white">100% Digital</h4>
          <p className="text-xs text-slate-400 mt-1 font-medium">Online Reports & Live</p>
        </div>
      </div>

      {/* Ongoing School Programs & Updates Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">Ongoing School Programs</h3>
            <p className="text-xs sm:text-sm text-slate-400">Events, exhibitions, and academic notices at SMUK</p>
          </div>
          <button
            onClick={() => onNavigateTab('updates')}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <span>View All ({updates.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {updates.slice(0, 3).map((upd) => (
            <div
              key={upd.id}
              onClick={() => onNavigateTab('updates')}
              className="bg-slate-800/70 border border-slate-700/70 hover:border-amber-400/50 rounded-2xl p-5 flex flex-col justify-between transition-all hover:-translate-y-1 shadow-lg cursor-pointer group"
            >
              <div className="space-y-3">
                {upd.imageUrl && (
                  <div className="h-36 rounded-xl overflow-hidden mb-3">
                    <img
                      src={upd.imageUrl}
                      alt={upd.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 font-bold border border-amber-500/20">
                    {upd.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {upd.date}
                  </span>
                </div>
                <h4 className="font-extrabold text-white text-base group-hover:text-amber-300 transition-colors line-clamp-2">
                  {upd.title}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {upd.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium truncate">{upd.coordinator}</span>
                <span className="font-bold text-blue-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                  Read more →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Central Database School Documents Section */}
      <div className="bg-slate-800/50 border border-slate-700/60 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 text-blue-300 text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>School Database Repository</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">Official Documents & Downloads</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Exam timetables, fee schedules, syllabi, circulars, and policies uploaded by school administration.
            </p>
          </div>

          <button
            onClick={onOpenUploadModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-amber-400/20 transition-all active:scale-95 cursor-pointer whitespace-nowrap self-start sm:self-auto"
          >
            <Download className="w-4 h-4 rotate-180" />
            <span>Upload Document to DB</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.slice(0, 6).map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-900/70 border border-slate-700/60 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-500 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                    <FileText className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                    {doc.fileType} • {doc.fileSize}
                  </span>
                </div>
                <h5 className="font-bold text-white text-sm line-clamp-2">{doc.title}</h5>
                <p className="text-xs text-slate-400 line-clamp-2">{doc.description}</p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">{doc.uploadDate}</span>
                <a
                  href={`#download-${doc.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Downloading "${doc.fileName}" (${doc.fileSize}). Authenticated by SMUK.`);
                  }}
                  className="flex items-center gap-1.5 font-bold text-amber-400 hover:text-amber-300 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ugandan Curriculum Guide Modal */}
      <UgandanCurriculumGuideModal
        isOpen={showCurriculumModal}
        onClose={() => setShowCurriculumModal(false)}
      />
    </div>
  );
};
