import React, { useState } from 'react';
import { X, BookOpen, Award, CheckCircle2, Search, Filter, Layers, HelpCircle, FileText, ChevronRight } from 'lucide-react';
import { UGANDAN_NEW_CURRICULUM_SUBJECTS, UGANDAN_COMPETENCY_LEVELS, CurriculumSubjectDef } from '../assets/curriculum';
import { FULL_SCHOOL_NAME, SCHOOL_NAME } from '../assets/logo';

interface UgandanCurriculumGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UgandanCurriculumGuideModal: React.FC<UgandanCurriculumGuideModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<CurriculumSubjectDef | null>(UGANDAN_NEW_CURRICULUM_SUBJECTS[0]);

  if (!isOpen) return null;

  const categories = ['All', 'Compulsory Core', 'Elective / Vocational', 'Religious Education', 'Project Work'];

  const filteredSubjects = UGANDAN_NEW_CURRICULUM_SUBJECTS.filter((sub) => {
    const matchesCategory = selectedCategory === 'All' || sub.category === selectedCategory;
    const matchesSearch =
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-950 via-slate-900 to-amber-950/40 border-b border-slate-800 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] tracking-wider uppercase border border-amber-500/40">
                  UGANDA NCDC CBC FRAMEWORK
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">• {FULL_SCHOOL_NAME}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Ugandan New Lower Secondary Curriculum Subjects & Assessment Guide
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                National Curriculum Development Centre (NCDC) Competency-Based Curriculum for Senior 1 – Senior 4.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
            aria-label="Close Guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Assessment Architecture Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-blue-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Continuous Assessment (CA)</span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-black text-xs">20% WEIGHT</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">Activities of Integration (AoI)</h4>
                <p className="text-xs text-slate-300">
                  Formative problem-solving tasks administered at the end of each topic/theme. Evaluates practical application, critical thinking, and teamwork.
                </p>
              </div>
              <span className="text-[11px] font-mono text-blue-300 mt-2 block">Recorded on 0.0 – 3.0 scale</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-purple-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Summative Assessment</span>
                  <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-black text-xs">80% WEIGHT</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">End of Term & UNEB Exam</h4>
                <p className="text-xs text-slate-300">
                  Comprehensive end-of-term and national UCE exams evaluating synthesis, deep conceptual mastery, and cross-topic application.
                </p>
              </div>
              <span className="text-[11px] font-mono text-purple-300 mt-2 block">Standard Term Grade: AoI (20%) + EOT (80%)</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-amber-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Interdisciplinary Capstone</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-black text-xs">UNEB PORTFOLIO</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">General Project Work (NCDC)</h4>
                <p className="text-xs text-slate-300">
                  Mandatory hands-on community innovation project running across S.1 to S.4. Students design and build real-world solutions.
                </p>
              </div>
              <span className="text-[11px] font-mono text-amber-300 mt-2 block">Certified UNEB Continuous Assessment</span>
            </div>
          </div>

          {/* Competency Levels Scale Table */}
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              NCDC Competence Grading Scale (Scores out of 3.0)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {UGANDAN_COMPETENCY_LEVELS.map((lvl) => (
                <div
                  key={lvl.level}
                  className={`p-3.5 rounded-xl border ${
                    lvl.letterGrade === 'A'
                      ? 'bg-amber-500/10 border-amber-500/30'
                      : lvl.letterGrade === 'B'
                      ? 'bg-blue-500/10 border-blue-500/30'
                      : 'bg-emerald-500/10 border-emerald-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-black text-lg text-white">Score {lvl.minScore} – {lvl.maxScore}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-black ${
                        lvl.letterGrade === 'A'
                          ? 'bg-amber-500/30 text-amber-300'
                          : lvl.letterGrade === 'B'
                          ? 'bg-blue-500/30 text-blue-300'
                          : 'bg-emerald-500/30 text-emerald-300'
                      }`}
                    >
                      Grade {lvl.letterGrade}
                    </span>
                  </div>
                  <strong className="text-xs block text-white font-bold">{lvl.level}</strong>
                  <p className="text-[11px] text-slate-300 mt-1">{lvl.description}</p>
                  <span className="text-[10px] text-slate-400 mt-2 block italic">
                    {lvl.unebInterpretation}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Directory Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  Official Ugandan New Curriculum Subject Menu ({UGANDAN_NEW_CURRICULUM_SUBJECTS.length} Subjects)
                </h3>
                <p className="text-xs text-slate-400">
                  Select any subject below to inspect its curriculum learning competencies, department, and NCDC syllabus focus.
                </p>
              </div>

              {/* Search & Category Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search subject or code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 w-44"
                  />
                </div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Two Column Layout: Subject List + Selected Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left Column: Subject Grid */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                {filteredSubjects.map((sub) => {
                  const isSelected = selectedSubject?.code === sub.code;
                  return (
                    <button
                      key={sub.code}
                      onClick={() => setSelectedSubject(sub)}
                      className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-blue-900/40 border-amber-400 ring-1 ring-amber-400'
                          : 'bg-slate-800/50 border-slate-700/70 hover:bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <span className="font-mono font-black text-amber-400 text-xs">{sub.code}</span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            sub.category === 'Compulsory Core'
                              ? 'bg-blue-500/20 text-blue-300'
                              : sub.category === 'Elective / Vocational'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : sub.category === 'Religious Education'
                              ? 'bg-purple-500/20 text-purple-300'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {sub.category}
                        </span>
                      </div>
                      <div className="font-bold text-white text-xs mb-1 line-clamp-1">{sub.name}</div>
                      <div className="text-[10px] text-slate-400 line-clamp-2">{sub.description}</div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Selected Subject Details */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-800/70 to-blue-950/40 border border-slate-700 rounded-2xl p-4 flex flex-col justify-between">
                {selectedSubject ? (
                  <div className="space-y-3.5">
                    <div className="flex items-start justify-between gap-2 border-b border-slate-700 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-base font-black text-amber-400">{selectedSubject.code}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            {selectedSubject.level}
                          </span>
                        </div>
                        <h4 className="text-base font-black text-white mt-1">{selectedSubject.name}</h4>
                        <span className="text-xs text-slate-400">{selectedSubject.department}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Curriculum Scope & Syllabus Outline:
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {selectedSubject.description}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1.5">
                        Key Learning Competencies Evaluated:
                      </span>
                      <ul className="space-y-1.5">
                        {selectedSubject.keyCompetencies.map((comp, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{comp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700 text-[11px] text-slate-300">
                      <strong className="text-white block mb-0.5">SMUK SETS Practical Integration:</strong>
                      Taught with modern digital laboratories, hands-on Activities of Integration (AoI), and project mentorship.
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-slate-400">
                    Select a subject to view its curriculum competencies
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>St. Kalemba S.S Villamaria (SMUK) • Der Herr Ist Mein Hirt</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
