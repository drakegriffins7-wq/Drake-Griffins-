import React, { useEffect, useState } from 'react';
import { StudentResult } from '../types';
import { SMUK_TAG_IMAGE, FULL_SCHOOL_NAME, APP_NAME, SCHOOL_MOTTO } from '../assets/logo';
import { X, Printer, Award, CheckCircle2, AlertCircle, FileText, Calendar, User, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UgandanCurriculumGuideModal } from './UgandanCurriculumGuideModal';

interface ReportCardModalProps {
  student: StudentResult | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportCardModal: React.FC<ReportCardModalProps> = ({ student, isOpen, onClose }) => {
  const [showCurriculumModal, setShowCurriculumModal] = useState(false);

  useEffect(() => {
    if (isOpen && student && student.division.includes('Division 1')) {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#3b82f6', '#10b981', '#6366f1'],
      });
    }
  }, [isOpen, student]);

  if (!isOpen || !student) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white">
        {/* Container */}
        <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden print:border-none print:shadow-none print:rounded-none print:bg-white print:text-black">
          {/* Modal Actions Bar (hidden in print) */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-slate-800/90 border-b border-slate-700/70 print:hidden">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
                <Award className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-white text-base sm:text-lg">Official Academic Terminal Report</h3>
                <p className="text-xs text-slate-400">
                  Student ID: <span className="font-mono text-amber-400 font-semibold">{student.studentId}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCurriculumModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-700/70 hover:bg-slate-700 text-amber-300 rounded-xl text-xs font-semibold border border-amber-500/30 transition-all cursor-pointer"
                title="View Uganda NCDC CBC Curriculum & Assessment Guide"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ugandan Curriculum Guide</span>
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-blue-500/20 active:scale-95 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/60 rounded-xl transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Report Content */}
          <div id="printable-report" className="p-6 sm:p-8 space-y-6 text-slate-100 print:text-slate-900 print:p-4 bg-slate-900 print:bg-white">
            {/* Header with School Crest Tag Image */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-amber-500/40 pb-5 gap-4 print:border-amber-600">
              <div className="flex items-center gap-4">
                <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl bg-white p-1 shadow-lg border-2 border-amber-400/50 print:border-amber-600 flex items-center justify-center overflow-hidden shrink-0">
                  <img
                    src={SMUK_TAG_IMAGE}
                    alt="St. Kalemba S.S Villamaria Badge"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-amber-400 font-bold print:text-amber-700">
                    Republic of Uganda • Ministry of Education & Sports
                  </span>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white print:text-slate-950 uppercase">
                    {FULL_SCHOOL_NAME}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 print:text-slate-600 font-medium italic">
                    Motto: &quot;{SCHOOL_MOTTO}&quot;
                  </p>
                  <p className="text-[11px] text-slate-400 print:text-slate-500 mt-1">
                    P.O. Box 240, Masaka / Kalungu, Uganda • Centre No: U0086 • Email: info@smuk.sc.ug
                  </p>
                </div>
              </div>

              <div className="text-center sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-700">
                <span className="px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-xs rounded-full uppercase tracking-wider print:border-amber-600 print:text-amber-800">
                  OFFICIAL TERMINAL REPORT CARD
                </span>
                <p className="text-xs text-slate-400 print:text-slate-600 mt-2">
                  Academic Year: <span className="font-bold text-white print:text-black">{student.academicYear}</span>
                </p>
                <div className="sm:mt-2 text-right">
                  <span className="inline-block px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 print:bg-emerald-100 print:text-emerald-800">
                    {student.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Student Meta Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-800/40 print:bg-slate-50 rounded-xl border border-slate-700/60 print:border-slate-300 text-xs">
              <div>
                <span className="text-slate-400 print:text-slate-600 block text-[11px]">Student Full Name</span>
                <strong className="text-white print:text-slate-900 text-sm font-bold">{student.fullName}</strong>
              </div>
              <div>
                <span className="text-slate-400 print:text-slate-600 block text-[11px]">Student ID / Roll</span>
                <strong className="font-mono text-amber-400 print:text-amber-800 text-sm font-bold">{student.studentId}</strong>
              </div>
              <div>
                <span className="text-slate-400 print:text-slate-600 block text-[11px]">Class & Stream</span>
                <strong className="text-white print:text-slate-900 text-sm">{student.classGrade}</strong>
              </div>
              <div>
                <span className="text-slate-400 print:text-slate-600 block text-[11px]">Academic Term</span>
                <strong className="text-white print:text-slate-900 text-sm">{student.term} ({student.academicYear})</strong>
              </div>
              <div>
                <span className="text-slate-400 print:text-slate-600 block text-[11px]">House & Dorm</span>
                <span className="text-slate-200 print:text-slate-800">{student.house}</span>
              </div>
              <div>
                <span className="text-slate-400 print:text-slate-600 block text-[11px]">Attendance</span>
                <span className="text-slate-200 print:text-slate-800 font-medium">
                  {student.attendance.daysPresent}/{student.attendance.totalDays} Days ({student.attendance.percentage}%)
                </span>
              </div>
              <div>
                <span className="text-slate-400 print:text-slate-600 block text-[11px]">Parent / Guardian</span>
                <span className="text-slate-200 print:text-slate-800 truncate block">{student.guardianName}</span>
              </div>
              <div>
                <span className="text-slate-400 print:text-slate-600 block text-[11px]">Fees Clearance</span>
                <span className={`inline-flex items-center gap-1 font-semibold ${student.feesBalance === 0 ? 'text-emerald-400 print:text-emerald-700' : 'text-amber-400 print:text-amber-700'}`}>
                  {student.feesBalance === 0 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                  {student.feesBalance === 0 ? 'Cleared (UGX 0)' : `Bal: UGX ${student.feesBalance.toLocaleString()}`}
                </span>
              </div>
            </div>

            {/* Uganda New Curriculum Notice */}
            <div className="p-3 bg-blue-950/40 border border-blue-500/30 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs text-blue-200 print:bg-slate-50 print:border-slate-300 print:text-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-500/40 text-[10px] uppercase">
                  UGANDA NCDC CBC
                </span>
                <span><strong>New Lower Secondary Curriculum (NLSC):</strong> Formative Assessment (AoI: 20%) + Summative Assessment (EOT: 80%)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-amber-300 print:text-amber-800 font-semibold">Scale: 0.0 – 3.0</span>
                <button
                  onClick={() => setShowCurriculumModal(true)}
                  className="text-amber-400 print:hidden underline hover:text-amber-300 cursor-pointer text-[11px]"
                >
                  View Subject Guide
                </button>
              </div>
            </div>

            {/* Subject Performance Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-700/80 print:border-slate-300">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-800 print:bg-slate-200 text-slate-300 print:text-slate-800 font-semibold border-b border-slate-700 print:border-slate-300">
                  <tr>
                    <th className="py-2.5 px-3">Code</th>
                    <th className="py-2.5 px-3">Subject Name</th>
                    <th className="py-2.5 px-2 text-center" title="Activity of Integration / Formative Assessment">AoI (20%)</th>
                    <th className="py-2.5 px-2 text-center" title="End of Term Summative Assessment">EOT (80%)</th>
                    <th className="py-2.5 px-2 text-center font-bold">Total (100%)</th>
                    <th className="py-2.5 px-2 text-center font-bold" title="CBC Competence Score on 3.0 Scale">Score / 3.0</th>
                    <th className="py-2.5 px-2 text-center font-bold">Competency Level</th>
                    <th className="py-2.5 px-3">Competency Descriptors & Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 print:divide-slate-200 bg-slate-900/60 print:bg-white">
                  {student.subjects.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 print:hover:bg-transparent">
                      <td className="py-2.5 px-3 font-mono text-slate-400 print:text-slate-600">{sub.code}</td>
                      <td className="py-2.5 px-3 font-medium text-white print:text-slate-900">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span>{sub.name}</span>
                          {sub.category && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 print:bg-slate-100 text-slate-400 print:text-slate-600 font-normal border border-slate-700/50 print:border-slate-200">
                              {sub.category}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-2 text-center text-slate-300 print:text-slate-700 font-mono">
                        {sub.aoiScore ?? sub.midTermScore ?? 18}
                      </td>
                      <td className="py-2.5 px-2 text-center text-slate-300 print:text-slate-700 font-mono">
                        {sub.endTermScore}
                      </td>
                      <td className="py-2.5 px-2 text-center font-bold text-white print:text-slate-900 bg-slate-800/30 print:bg-slate-100">
                        {sub.totalScore}%
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono font-bold text-amber-400 print:text-amber-800">
                        {sub.scoreOutOf3 ?? ((sub.totalScore / 100) * 3).toFixed(1)}
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded font-bold text-[11px] ${
                          (sub.competencyLevel && sub.competencyLevel.includes('Level 3')) || sub.totalScore >= 80
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 print:bg-amber-100 print:text-amber-800'
                            : (sub.competencyLevel && sub.competencyLevel.includes('Level 2')) || sub.totalScore >= 60
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30 print:bg-blue-100 print:text-blue-800'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 print:bg-emerald-100 print:text-emerald-800'
                        }`}>
                          {sub.competencyLevel ?? 'Level 3 (Outstanding)'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-xs text-slate-300 print:text-slate-700 italic">
                        &quot;{sub.remarks}&quot; <span className="text-[10px] text-slate-400 print:text-slate-500 not-italic block">— {sub.teacher}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Academic Summary Score Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-gradient-to-br from-slate-800/80 to-blue-950/40 border border-amber-500/30 print:bg-slate-100 print:border-slate-300">
              <div className="text-center p-2 rounded-lg bg-slate-900/50 print:bg-white border border-slate-700/50 print:border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 print:text-slate-600 block">Total Aggregates</span>
                <strong className="text-xl sm:text-2xl font-black text-amber-400 print:text-amber-800">{student.totalAggregates}</strong>
                <span className="text-[10px] text-slate-400 print:text-slate-500 block">Best 8 subjects</span>
              </div>
              <div className="text-center p-2 rounded-lg bg-slate-900/50 print:bg-white border border-slate-700/50 print:border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 print:text-slate-600 block">Overall Division</span>
                <strong className="text-base sm:text-lg font-black text-emerald-400 print:text-emerald-700 block truncate">{student.division}</strong>
                <span className="text-[10px] text-slate-400 print:text-slate-500 block">Honor Roll</span>
              </div>
              <div className="text-center p-2 rounded-lg bg-slate-900/50 print:bg-white border border-slate-700/50 print:border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 print:text-slate-600 block">Class Stream Rank</span>
                <strong className="text-xl sm:text-2xl font-black text-blue-400 print:text-blue-800">{student.classRank} <span className="text-xs font-normal text-slate-400">/ {student.totalStudentsInClass}</span></strong>
                <span className="text-[10px] text-slate-400 print:text-slate-500 block">Position in class</span>
              </div>
              <div className="text-center p-2 rounded-lg bg-slate-900/50 print:bg-white border border-slate-700/50 print:border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 print:text-slate-600 block">Average Score</span>
                <strong className="text-xl sm:text-2xl font-black text-purple-400 print:text-purple-800">{student.averageScore.toFixed(1)}%</strong>
                <span className="text-[10px] text-slate-400 print:text-slate-500 block">Grade A Equivalent</span>
              </div>
            </div>

            {/* Official NCDC CBC Grading Key (Printed and on Screen) */}
            <div className="p-3 bg-slate-800/30 print:bg-slate-50 rounded-xl border border-slate-700/60 print:border-slate-300 text-[10px] sm:text-xs">
              <strong className="text-amber-400 print:text-amber-800 font-bold block mb-1">
                Uganda NCDC Competency Grading Scale & Reference Key:
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-300 print:text-slate-700">
                <div>
                  <span className="font-bold text-white print:text-black">Level 3 (Score 2.5 – 3.0 / Grade A):</span> Outstanding. Learner produces high-quality work and applies skills to new situations.
                </div>
                <div>
                  <span className="font-bold text-white print:text-black">Level 2 (Score 1.5 – 2.4 / Grade B):</span> Achieved. Learner demonstrates expected competencies in familiar situations.
                </div>
                <div>
                  <span className="font-bold text-white print:text-black">Level 1 (Score 0.9 – 1.4 / Grade C):</span> Basic. Learner demonstrates foundation skills requiring ongoing guidance.
                </div>
              </div>
            </div>

            {/* Conduct & Administrative Remarks */}
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/40 print:bg-slate-50 border border-slate-700/70 print:border-slate-300">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-3.5 h-3.5 text-blue-400 print:text-blue-700" />
                  <span className="font-bold text-white print:text-slate-900">Class Teacher’s Assessment:</span>
                  <span className="text-[11px] font-semibold text-amber-400 print:text-amber-800">Conduct: {student.conductGrade}</span>
                </div>
                <p className="text-slate-300 print:text-slate-700 italic pl-5">&quot;{student.classTeacherRemarks}&quot;</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 print:bg-slate-50 border border-slate-700/70 print:border-slate-300">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400 print:text-amber-700" />
                  <span className="font-bold text-white print:text-slate-900">Headteacher’s General Remarks:</span>
                </div>
                <p className="text-slate-300 print:text-slate-700 italic pl-5">&quot;{student.headTeacherRemarks}&quot;</p>
              </div>
            </div>

            {/* Signatures & Official Stamp Footer */}
            <div className="pt-4 border-t border-slate-700/80 print:border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-400 print:text-slate-600">
              <div>
                <p><strong className="text-slate-300 print:text-slate-900">Next Term Resumes:</strong> <span className="text-amber-400 print:text-amber-800 font-semibold">{student.nextTermBegins}</span></p>
                <p className="text-[11px] mt-1">This report is an official computer-generated academic record authenticated by SMUK SETS Go Digital under Uganda NCDC framework.</p>
              </div>

              {/* Official Stamp Box */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="w-28 border-b border-dashed border-slate-500 mb-1"></div>
                  <span className="text-[10px] uppercase font-semibold">Class Teacher Sign</span>
                </div>
                
                <div className="relative border-2 border-dashed border-amber-500/50 print:border-amber-700 rounded-lg p-2.5 text-center min-w-[130px] rotate-[-2deg] bg-amber-500/5 print:bg-amber-50">
                  <span className="block text-[10px] font-black text-amber-400 print:text-amber-800 uppercase tracking-wider">SMUK OFFICIAL STAMP</span>
                  <span className="block text-[8px] text-slate-400 print:text-slate-600">CERTIFIED DIGITAL SEAL</span>
                  <span className="block text-[9px] font-mono text-emerald-400 print:text-emerald-700 font-bold mt-0.5">VERIFIED • 2026</span>
                </div>

                <div className="text-center">
                  <div className="w-28 border-b border-dashed border-slate-500 mb-1"></div>
                  <span className="text-[10px] uppercase font-semibold">Headteacher Sign</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ugandan Curriculum Guide Modal */}
      <UgandanCurriculumGuideModal
        isOpen={showCurriculumModal}
        onClose={() => setShowCurriculumModal(false)}
      />
    </>
  );
};
