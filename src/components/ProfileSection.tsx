import React, { useState } from 'react';
import { StudentResult, SchoolDocument, SubjectScore } from '../types';
import { dbService } from '../services/database';
import { SMUK_TAG_IMAGE, SMUK_BADGE_IMAGE, SCHOOL_NAME, FULL_SCHOOL_NAME, APP_NAME, SCHOOL_MOTTO } from '../assets/logo';
import { UGANDAN_NEW_CURRICULUM_SUBJECTS, UGANDAN_COMPETENCY_LEVELS, CurriculumSubjectDef, calculateUgandanCbcScore } from '../assets/curriculum';
import { SmukBadge } from './SmukBadge';
import {
  User,
  Shield,
  CreditCard,
  Printer,
  Award,
  Upload,
  FileText,
  Trash2,
  Download,
  Plus,
  CheckCircle2,
  Sparkles,
  QrCode,
  Calendar,
  Phone,
  Mail,
  Home as HomeIcon,
  RefreshCw,
  BookOpen,
  Search,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface ProfileSectionProps {
  currentStudent: StudentResult | null;
  allStudents: StudentResult[];
  documents: SchoolDocument[];
  onSelectStudent: (student: StudentResult) => void;
  onOpenReportCard: () => void;
  onOpenUploadModal: () => void;
  onRefreshData: () => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  currentStudent,
  allStudents,
  documents,
  onSelectStudent,
  onOpenReportCard,
  onOpenUploadModal,
  onRefreshData,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'student' | 'idcard' | 'curriculum' | 'database'>('student');
  const [isAddingStudent, setIsAddingStudent] = useState(false);

  // New Student Form States
  const [newStudentId, setNewStudentId] = useState('');
  const [newName, setNewName] = useState('');
  const [newClass, setNewClass] = useState('Senior 4 (New Curriculum CBC - Tech & Sciences)');
  const [newHouse, setNewHouse] = useState('Newton Innovators House');
  const [newGuardian, setNewGuardian] = useState('');
  const [newContact, setNewContact] = useState('');
  const [selectedCurriculumStream, setSelectedCurriculumStream] = useState<'s1s2' | 's3s4_science' | 's3s4_agri' | 's3s4_arts'>('s3s4_science');

  // Curriculum Guide Sub-tab states
  const [curriculumCategory, setCurriculumCategory] = useState<string>('All');
  const [curriculumSearch, setCurriculumSearch] = useState<string>('');
  const [activeCurriculumSubject, setActiveCurriculumSubject] = useState<CurriculumSubjectDef | null>(UGANDAN_NEW_CURRICULUM_SUBJECTS[0]);

  const student = currentStudent || allStudents[0];

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentId.trim() || !newName.trim()) return;

    let generatedSubjects: SubjectScore[] = [];

    if (selectedCurriculumStream === 's1s2') {
      // S.1 - S.2 All 11 Compulsory Subjects + Elective (Art & Design) + General Project Work
      generatedSubjects = [
        { code: 'ENG201', name: 'English Language', aoiScore: 18.0, endTermScore: 71.0, totalScore: 89, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Musoke Jude', category: 'Compulsory Core', remarks: 'Good critical reading and descriptive writing.' },
        { code: 'MTC202', name: 'Mathematics', aoiScore: 17.5, endTermScore: 70.0, totalScore: 87.5, scoreOutOf3: 2.7, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Walusimbi Alex', category: 'Compulsory Core', remarks: 'Competent in algebraic factors and geometric shapes.' },
        { code: 'BIO203', name: 'Biology', aoiScore: 17.0, endTermScore: 68.0, totalScore: 85, scoreOutOf3: 2.6, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Ms. Nabirye Joan', category: 'Compulsory Core', remarks: 'Good microscope investigation and ecological concepts.' },
        { code: 'CHE204', name: 'Chemistry', aoiScore: 16.5, endTermScore: 67.5, totalScore: 84, scoreOutOf3: 2.6, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mrs. Namubiru Grace', category: 'Compulsory Core', remarks: 'Understands states of matter and lab reaction procedures.' },
        { code: 'PHY205', name: 'Physics', aoiScore: 17.5, endTermScore: 70.0, totalScore: 87.5, scoreOutOf3: 2.7, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Eng. Tumusiime Eric', category: 'Compulsory Core', remarks: 'Good practical handling of lenses and electrical circuits.' },
        { code: 'GEO206', name: 'Geography', aoiScore: 16.0, endTermScore: 66.0, totalScore: 82, scoreOutOf3: 2.5, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Kigozi Denis', category: 'Compulsory Core', remarks: 'Accurate sketch map interpretation and climatic zones.' },
        { code: 'HPE207', name: 'History & Political Education', aoiScore: 17.0, endTermScore: 68.0, totalScore: 85, scoreOutOf3: 2.6, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mrs. Kembabazi Alice', category: 'Compulsory Core', remarks: 'Active grasp of Ugandan constitution and Pan-Africanism.' },
        { code: 'PED208', name: 'Physical Education (PE)', aoiScore: 18.0, endTermScore: 72.0, totalScore: 90, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Coach Kato Denis', category: 'Compulsory Core', remarks: 'Great athletic performance and teamwork discipline.' },
        { code: 'KIS209', name: 'Kiswahili', aoiScore: 16.5, endTermScore: 66.5, totalScore: 83, scoreOutOf3: 2.5, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mwalimu Juma Salim', category: 'Compulsory Core', remarks: 'Speaks good conversational Kiswahili.' },
        { code: 'CRE210', name: 'Christian Religious Education (CRE)', aoiScore: 17.5, endTermScore: 70.5, totalScore: 88, scoreOutOf3: 2.7, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Sr. Mary Goretti', category: 'Religious Education', remarks: 'High moral reflection and community solidarity.' },
        { code: 'ENT211', name: 'Entrepreneurship Education', aoiScore: 18.0, endTermScore: 72.0, totalScore: 90, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Mukasa Ronald', category: 'Compulsory Core', remarks: 'Formulated a realistic student craft market initiative.' },
        { code: 'ART212', name: 'Art and Design', aoiScore: 18.5, endTermScore: 73.0, totalScore: 91.5, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mrs. Nakitto Brenda', category: 'Elective / Vocational', remarks: 'Excellent drawing composition and ceramics craft.' },
        { code: 'PRJ213', name: 'General Project Work (NCDC)', aoiScore: 9.5, endTermScore: 82.5, totalScore: 92, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'SETS Innovation Board', category: 'Project Work', remarks: 'Constructed an organic waste disposal bin prototype.' },
      ];
    } else if (selectedCurriculumStream === 's3s4_agri') {
      // S.3 - S.4 Agriculture & Agribusiness
      generatedSubjects = [
        { code: 'MTC301', name: 'Mathematics', aoiScore: 16.0, endTermScore: 66.0, totalScore: 82, scoreOutOf3: 2.5, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Okello David', category: 'Compulsory Core', remarks: 'Good accuracy in mathematical calculations.' },
        { code: 'ENG302', name: 'English Language', aoiScore: 16.5, endTermScore: 67.5, totalScore: 84, scoreOutOf3: 2.6, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Ms. Atuhaire Patricia', category: 'Compulsory Core', remarks: 'Clear and persuasive essay arguments.' },
        { code: 'BIO303', name: 'Biology', aoiScore: 17.5, endTermScore: 70.0, totalScore: 87.5, scoreOutOf3: 2.7, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Dr. Wandera Samuel', category: 'Compulsory Core', remarks: 'Excellent practical knowledge in plant botany.' },
        { code: 'CHE304', name: 'Chemistry', aoiScore: 15.5, endTermScore: 64.5, totalScore: 80, scoreOutOf3: 2.5, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mrs. Namubiru Grace', category: 'Compulsory Core', remarks: 'Sound knowledge in soil nutrients chemistry.' },
        { code: 'PHY305', name: 'Physics', aoiScore: 16.0, endTermScore: 65.0, totalScore: 81, scoreOutOf3: 2.5, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Eng. Tumusiime Eric', category: 'Compulsory Core', remarks: 'Understands fluid dynamics and farm machinery mechanics.' },
        { code: 'GEO306', name: 'Geography', aoiScore: 16.0, endTermScore: 67.0, totalScore: 83, scoreOutOf3: 2.5, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Kigozi Denis', category: 'Compulsory Core', remarks: 'Good analysis of agricultural agro-ecological zones.' },
        { code: 'HPE307', name: 'History & Political Education', aoiScore: 15.5, endTermScore: 65.0, totalScore: 80.5, scoreOutOf3: 2.5, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mrs. Babirye Christine', category: 'Compulsory Core', remarks: 'Understands land policies and historical trade.' },
        { code: 'AGR308', name: 'Agriculture', aoiScore: 19.0, endTermScore: 75.0, totalScore: 94, scoreOutOf3: 2.9, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Mugisha Paul', category: 'Elective / Vocational', remarks: 'Passionate about smart drip irrigation and organic composting.' },
        { code: 'ENT309', name: 'Entrepreneurship Education', aoiScore: 17.5, endTermScore: 71.5, totalScore: 89, scoreOutOf3: 2.7, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Mukasa Ronald', category: 'Elective / Vocational', remarks: 'Formulated high-yield horticulture financial plan.' },
        { code: 'KIS310', name: 'Kiswahili', aoiScore: 15.0, endTermScore: 62.0, totalScore: 77, scoreOutOf3: 2.3, competencyLevel: 'Level 2 (Achieved)', grade: 'B', points: 2, teacher: 'Mwalimu Juma Salim', category: 'Elective / Vocational', remarks: 'Steady conversational fluency.' },
        { code: 'CRE311', name: 'Christian Religious Education (CRE)', aoiScore: 17.0, endTermScore: 69.0, totalScore: 86, scoreOutOf3: 2.6, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Sr. Mary Goretti', category: 'Religious Education', remarks: 'Active in humanitarian peer guidance.' },
        { code: 'PRJ312', name: 'General Project Work (NCDC)', aoiScore: 9.0, endTermScore: 80.0, totalScore: 89, scoreOutOf3: 2.7, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'SETS Innovation Board', category: 'Project Work', remarks: 'Constructed automated poultry egg incubator.' },
      ];
    } else {
      // Default: S.3 - S.4 Science, Technology & Computing
      generatedSubjects = [
        { code: 'MTC401', name: 'Mathematics', aoiScore: 18.0, endTermScore: 72.0, totalScore: 90, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Okello David', category: 'Compulsory Core', remarks: 'Exceptional problem solving and geometry.' },
        { code: 'ENG402', name: 'English Language', aoiScore: 17.5, endTermScore: 70.0, totalScore: 87.5, scoreOutOf3: 2.7, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Ms. Atuhaire Patricia', category: 'Compulsory Core', remarks: 'Eloquent creative writing and critical debate.' },
        { code: 'PHY403', name: 'Physics', aoiScore: 18.0, endTermScore: 71.0, totalScore: 89, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Eng. Tumusiime Eric', category: 'Compulsory Core', remarks: 'Sound grasp of electrical circuits and energy.' },
        { code: 'CHE404', name: 'Chemistry', aoiScore: 17.0, endTermScore: 68.0, totalScore: 85, scoreOutOf3: 2.6, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mrs. Namubiru Grace', category: 'Compulsory Core', remarks: 'Diligent lab investigations and equations.' },
        { code: 'BIO405', name: 'Biology', aoiScore: 17.5, endTermScore: 70.5, totalScore: 88, scoreOutOf3: 2.7, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Dr. Wandera Samuel', category: 'Compulsory Core', remarks: 'Thorough in human anatomy and ecosystems.' },
        { code: 'HPE406', name: 'History & Political Education', aoiScore: 16.5, endTermScore: 68.5, totalScore: 85, scoreOutOf3: 2.6, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mrs. Babirye Christine', category: 'Compulsory Core', remarks: 'Understands governance, human rights, and culture.' },
        { code: 'GEO407', name: 'Geography', aoiScore: 16.0, endTermScore: 68.0, totalScore: 84, scoreOutOf3: 2.6, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Kigozi Denis', category: 'Compulsory Core', remarks: 'Good cartography and environment analysis.' },
        { code: 'ENT408', name: 'Entrepreneurship Education', aoiScore: 18.5, endTermScore: 72.5, totalScore: 91, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Mukasa Ronald', category: 'Elective / Vocational', remarks: 'High business acumen and financial planning.' },
        { code: 'ICT409', name: 'Information & Communications Tech (ICT)', aoiScore: 19.5, endTermScore: 76.5, totalScore: 96, scoreOutOf3: 2.9, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Byaruhanga Rogers', category: 'Elective / Vocational', remarks: 'Mastery in computer applications and coding.' },
        { code: 'KIS410', name: 'Kiswahili', aoiScore: 16.5, endTermScore: 67.5, totalScore: 84, scoreOutOf3: 2.6, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mwalimu Juma Salim', category: 'Elective / Vocational', remarks: 'Good grasp of grammar and conversational Kiswahili.' },
        { code: 'CRE411', name: 'Christian Religious Education (CRE)', aoiScore: 17.5, endTermScore: 70.5, totalScore: 88, scoreOutOf3: 2.7, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Sr. Mary Goretti', category: 'Religious Education', remarks: 'Strong moral reflection and active community participation.' },
        { code: 'PRJ412', name: 'General Project Work (NCDC)', aoiScore: 9.5, endTermScore: 83.5, totalScore: 93, scoreOutOf3: 2.9, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'SETS Innovation Board', category: 'Project Work', remarks: 'Completed an impactful community innovation project.' },
      ];
    }

    const totalSum = generatedSubjects.reduce((acc, curr) => acc + curr.totalScore, 0);
    const avgScore = Number((totalSum / generatedSubjects.length).toFixed(1));

    const newRecord: StudentResult = {
      id: newStudentId.trim(),
      studentId: newStudentId.trim(),
      fullName: newName.trim(),
      gender: 'Female',
      classGrade: newClass,
      term: 'Term 3 Final Assessment',
      academicYear: '2026',
      dateOfBirth: '2008-05-12',
      house: newHouse,
      guardianName: newGuardian.trim() || 'Parent / Guardian',
      guardianContact: newContact.trim() || '+256 700 000 000',
      guardianEmail: 'parent@smuk.edu',
      attendance: { daysPresent: 88, totalDays: 90, percentage: 97.7 },
      subjects: generatedSubjects,
      totalScore: totalSum,
      averageScore: avgScore,
      totalAggregates: 8,
      division: 'Level 3: Outstanding Competency (Division 1 Distinction)',
      classRank: 4,
      totalStudentsInClass: 54,
      conductGrade: 'Exemplary',
      classTeacherRemarks: 'Diligent scholar who demonstrates excellence under Uganda’s New Lower Secondary Curriculum.',
      headTeacherRemarks: 'Outstanding accomplishment! Keep leading the way.',
      feesBalance: 0,
      feesStatus: 'Cleared',
      nextTermBegins: 'February 2, 2027',
      status: 'Published',
      createdAt: new Date().toISOString(),
    };

    dbService.saveStudent(newRecord);
    onSelectStudent(newRecord);
    onRefreshData();
    setIsAddingStudent(false);
    setNewStudentId('');
    setNewName('');
    alert(`Student ${newRecord.fullName} (${newRecord.studentId}) successfully registered with Ugandan New Curriculum subjects!`);
  };

  const handleDeleteDocument = (id: string, title: string) => {
    if (confirm(`Remove document "${title}" from the school database?`)) {
      dbService.deleteDocument(id);
      onRefreshData();
    }
  };

  const filteredCurriculumSubjects = UGANDAN_NEW_CURRICULUM_SUBJECTS.filter((sub) => {
    const matchesCat = curriculumCategory === 'All' || sub.category === curriculumCategory;
    const matchesSearch =
      sub.name.toLowerCase().includes(curriculumSearch.toLowerCase()) ||
      sub.code.toLowerCase().includes(curriculumSearch.toLowerCase()) ||
      sub.department.toLowerCase().includes(curriculumSearch.toLowerCase()) ||
      sub.description.toLowerCase().includes(curriculumSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-bold mb-2">
            <User className="w-3.5 h-3.5" />
            <span>STUDENT PROFILE & DATABASE MANAGEMENT</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">Profile & School Database</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            View student credentials, digital ID card, explore the Ugandan New Curriculum subjects, and manage uploaded database documents.
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-800/80 rounded-2xl border border-slate-700">
          <button
            onClick={() => setActiveSubTab('student')}
            className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'student'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Student Bio & Results
          </button>
          <button
            onClick={() => setActiveSubTab('idcard')}
            className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'idcard'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Digital ID Card
          </button>
          <button
            onClick={() => setActiveSubTab('curriculum')}
            className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'curriculum'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Uganda New Curriculum (NCDC)
          </button>
          <button
            onClick={() => setActiveSubTab('database')}
            className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'database'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Database & Uploads ({documents.length})
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: Student Profile & Academic Overview */}
      {activeSubTab === 'student' && student && (
        <div className="space-y-6">
          {/* Student Switcher dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold uppercase">Active Student:</span>
              <strong className="text-white text-sm">{student.fullName} ({student.studentId})</strong>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Switch Registered Student:</span>
              <select
                value={student.studentId}
                onChange={(e) => {
                  const found = allStudents.find((s) => s.studentId === e.target.value);
                  if (found) {
                    onSelectStudent(found);
                    dbService.setActiveStudentId(found.studentId);
                  }
                }}
                className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {allStudents.map((s) => (
                  <option key={s.studentId} value={s.studentId}>
                    {s.studentId} - {s.fullName} ({s.classGrade.split(' ')[0]} {s.classGrade.split(' ')[1] || ''})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Profile Header Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Profile Badge Image */}
              <div className="relative group shrink-0">
                <div className="w-24 h-28 sm:w-28 sm:h-32 bg-white p-1 rounded-2xl ring-4 ring-amber-400/80 shadow-2xl overflow-hidden flex items-center justify-center">
                  <img
                    src={SMUK_BADGE_IMAGE}
                    alt="St. Kalemba S.S Villamaria Official Badge"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="absolute -bottom-2 -right-2 px-2 py-0.5 text-[10px] font-black rounded-full bg-emerald-500 text-white uppercase shadow-md border border-slate-900">
                  SMUK
                </span>
              </div>

              <div className="flex-1 text-center sm:text-left space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-2xl font-black text-white">{student.fullName}</h3>
                    <p className="text-xs text-amber-400 font-mono font-bold mt-0.5">
                      Student ID: {student.studentId} • {student.classGrade}
                    </p>
                    <p className="text-[11px] text-slate-400 italic mt-0.5">
                      School Motto: <strong className="text-amber-300 font-medium">&quot;{SCHOOL_MOTTO}&quot;</strong>
                    </p>
                  </div>
                  <button
                    onClick={onOpenReportCard}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer self-center sm:self-auto"
                  >
                    <Award className="w-4 h-4" />
                    <span>View Stamped Report Card</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                  <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">House</span>
                    <strong className="text-white">{student.house}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Term 3 Aggregates</span>
                    <strong className="text-amber-400 font-bold text-sm">{student.totalAggregates}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Class Rank</span>
                    <strong className="text-blue-400 font-bold text-sm">#{student.classRank} / {student.totalStudentsInClass}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Attendance</span>
                    <strong className="text-emerald-400 font-bold text-sm">{student.attendance.percentage}%</strong>
                  </div>
                </div>

                {/* Guardian Details */}
                <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2 text-xs">
                  <h5 className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
                    Guardian & Contact Information
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-300">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      <span>{student.guardianName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{student.guardianContact}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-blue-400" />
                      <span>{student.guardianEmail}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Results Breakdown Table (Ugandan New Curriculum) */}
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold text-[10px] uppercase border border-blue-500/30">
                    UGANDA NCDC CBC ASSESSMENT
                  </span>
                  <span className="text-xs text-slate-400">• {student.term}</span>
                </div>
                <h4 className="text-lg font-bold text-white mt-1">
                  Enrolled Subjects & Continuous Assessment Performance
                </h4>
              </div>
              <button
                onClick={onOpenReportCard}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
              >
                <span>Print Official Terminal Report</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-800/80 text-slate-300 border-b border-slate-700 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Code</th>
                    <th className="py-2.5 px-3">Ugandan Curriculum Subject</th>
                    <th className="py-2.5 px-2 text-center" title="Activity of Integration (Continuous Assessment)">AoI (20%)</th>
                    <th className="py-2.5 px-2 text-center" title="End of Term Summative Assessment">EOT (80%)</th>
                    <th className="py-2.5 px-2 text-center font-bold">Total (100%)</th>
                    <th className="py-2.5 px-2 text-center font-bold" title="Score on 3.0 Scale">Score / 3.0</th>
                    <th className="py-2.5 px-2 text-center">Competency Level</th>
                    <th className="py-2.5 px-3">Teacher Competence Feedback</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {student.subjects.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 font-mono text-slate-400">{sub.code}</td>
                      <td className="py-2.5 px-3 font-medium text-white">
                        <div className="flex items-center gap-1.5 flex-wrap">
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
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          (sub.competencyLevel && sub.competencyLevel.includes('Level 3')) || sub.totalScore >= 80
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : (sub.competencyLevel && sub.competencyLevel.includes('Level 2')) || sub.totalScore >= 60
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
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
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Digital Student ID Card */}
      {activeSubTab === 'idcard' && student && (
        <div className="space-y-6 flex flex-col items-center">
          <div className="flex items-center justify-between w-full max-w-md">
            <h4 className="font-bold text-white text-base">Digital Student Identity Card</h4>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print ID Card</span>
            </button>
          </div>

          {/* Realistic Student ID Card Graphic */}
          <div className="w-full max-w-md bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border-2 border-amber-400/70 rounded-3xl p-6 shadow-2xl space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* ID Header */}
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-11 h-11 rounded-xl bg-white p-1 border border-amber-400/60 overflow-hidden flex items-center justify-center shrink-0">
                  <img
                    src={SMUK_BADGE_IMAGE}
                    alt="St. Kalemba S.S Badge"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-black text-white text-xs sm:text-sm tracking-tight">{FULL_SCHOOL_NAME}</h4>
                  <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">{APP_NAME}</p>
                </div>
              </div>
              <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded bg-amber-400 text-slate-950">
                STUDENT PASS
              </span>
            </div>

            {/* ID Body */}
            <div className="flex gap-4 items-center">
              <div className="w-24 h-28 rounded-xl bg-white border-2 border-amber-400/70 overflow-hidden flex flex-col items-center justify-center shadow-lg shrink-0 p-1">
                <img
                  src={SMUK_BADGE_IMAGE}
                  alt="Student Badge"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-1 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block">Full Name:</span>
                  <strong className="text-white text-sm">{student.fullName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Student ID Number:</span>
                  <span className="font-mono text-amber-400 font-bold text-sm">{student.studentId}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Class & Stream:</span>
                  <span className="text-slate-200">{student.classGrade}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">House:</span>
                  <span className="text-slate-300">{student.house}</span>
                </div>
              </div>
            </div>

            {/* School Motto & Barcode */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
              <div>
                <p className="italic text-amber-300/90 font-medium">Motto: &quot;{SCHOOL_MOTTO}&quot;</p>
                <p className="text-[9px] text-slate-500 mt-0.5">Valid for Academic Year 2026/2027</p>
              </div>
              <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg">
                <QrCode className="w-7 h-7 text-slate-900" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Uganda New Curriculum (NCDC) Directory */}
      {activeSubTab === 'curriculum' && (
        <div className="space-y-6">
          {/* Overview Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-amber-950/40 border border-blue-500/30 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-black text-xs uppercase tracking-wider border border-amber-500/40">
                UGANDA NCDC LOWER SECONDARY CURRICULUM
              </span>
              <span className="text-xs text-slate-400">• Competency-Based Curriculum (CBC)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Official Subjects Menu & Assessment Architecture
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Under Uganda’s revised National Lower Secondary Curriculum (NCDC), learners are assessed through
              <strong> Activities of Integration (AoI - 20%)</strong> continuous assessment and
              <strong> End of Term Summative Examinations (EOT - 80%)</strong>. Explore all 21 approved subjects, core menus, and vocational electives below.
            </p>
          </div>

          {/* Assessment Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-blue-500/30">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase text-blue-400">Continuous Assessment (CA)</span>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-black text-xs">20% WEIGHT</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Activities of Integration (AoI)</h4>
              <p className="text-xs text-slate-300">
                Administered at the end of each topic to assess hands-on problem solving, creativity, and real-world application.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/30">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase text-purple-400">Summative Assessment</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-black text-xs">80% WEIGHT</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">End of Term & UNEB Exam</h4>
              <p className="text-xs text-slate-300">
                School terminal exams and the Uganda Certificate of Education (UCE) written papers and laboratory practical shifts.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/30">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase text-amber-400">Interdisciplinary Project</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-black text-xs">UNEB CA</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">General Project Work (NCDC)</h4>
              <p className="text-xs text-slate-300">
                A compulsory practical innovation capstone running from S.1 to S.4. Students compile an authenticated portfolio submitted to UNEB.
              </p>
            </div>
          </div>

          {/* Competence Grading Key */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              NCDC Competence Grading Scale (Scores out of 3.0)
            </h4>
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
                    <span className="font-mono font-black text-base text-white">Score {lvl.minScore} – {lvl.maxScore}</span>
                    <span className="px-2 py-0.5 rounded text-xs font-black bg-slate-800 text-white">
                      Grade {lvl.letterGrade}
                    </span>
                  </div>
                  <strong className="text-xs block text-white font-bold">{lvl.level}</strong>
                  <p className="text-[11px] text-slate-300 mt-1">{lvl.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Directory Browser */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  All Ugandan New Curriculum Subjects ({UGANDAN_NEW_CURRICULUM_SUBJECTS.length})
                </h4>
                <p className="text-xs text-slate-400">Filter by category or search by subject name and code</p>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search subject..."
                  value={curriculumSearch}
                  onChange={(e) => setCurriculumSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 w-44"
                />
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Compulsory Core', 'Elective / Vocational', 'Religious Education', 'Project Work'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCurriculumCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    curriculumCategory === cat
                      ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Subject Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredCurriculumSubjects.map((sub) => (
                <div
                  key={sub.code}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-1 mb-1.5">
                      <span className="font-mono font-black text-amber-400 text-xs">{sub.code}</span>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-800 text-blue-300">
                        {sub.level}
                      </span>
                    </div>
                    <h5 className="font-bold text-white text-sm mb-1">{sub.name}</h5>
                    <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed">{sub.description}</p>
                  </div>
                  <div className="pt-2 mt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                    <span>{sub.department}</span>
                    <span className="text-amber-400 font-semibold">{sub.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: Database & Uploads Portal */}
      {activeSubTab === 'database' && (
        <div className="space-y-6">
          {/* Top Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-800/60 rounded-2xl border border-slate-700/60">
            <div>
              <h4 className="font-bold text-white text-base">Connected School Database Repository</h4>
              <p className="text-xs text-slate-400">
                Upload school circulars, exam timetables, fee structures, and register new student examination records.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsAddingStudent(!isAddingStudent)}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{isAddingStudent ? 'Hide Form' : 'Register Student Result'}</span>
              </button>

              <button
                onClick={onOpenUploadModal}
                className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Document to DB</span>
              </button>
            </div>
          </div>

          {/* Add Student Record Form (Collapsible) */}
          {isAddingStudent && (
            <div className="p-5 sm:p-6 bg-slate-800 border-2 border-blue-500/50 rounded-3xl shadow-2xl space-y-4">
              <div className="border-b border-slate-700 pb-3">
                <h4 className="font-bold text-white text-base flex items-center gap-2">
                  <Plus className="w-4 h-4 text-blue-400" />
                  <span>Register New Student with Ugandan New Curriculum Subjects</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select curriculum level and stream to auto-populate all authentic NCDC subjects and assessment items.
                </p>
              </div>

              <form onSubmit={handleCreateStudent} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Student ID *</label>
                    <input
                      type="text"
                      required
                      value={newStudentId}
                      onChange={(e) => setNewStudentId(e.target.value)}
                      placeholder="e.g. SMUK-2025-055"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Student Full Name *</label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="e.g. Joy Rebecca Nalule"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Curriculum Stream Template *</label>
                    <select
                      value={selectedCurriculumStream}
                      onChange={(e) => {
                        const val = e.target.value as any;
                        setSelectedCurriculumStream(val);
                        if (val === 's1s2') {
                          setNewClass('Senior 2 (New Curriculum CBC - Foundation)');
                        } else if (val === 's3s4_agri') {
                          setNewClass('Senior 3 (New Curriculum CBC - Agriculture & Agribusiness)');
                        } else {
                          setNewClass('Senior 4 (New Curriculum CBC - Tech & Sciences)');
                        }
                      }}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs cursor-pointer"
                    >
                      <option value="s1s2">S.1 - S.2 (All 11 Compulsory Subjects + Elective + Project)</option>
                      <option value="s3s4_science">S.3 - S.4 (Tech, Sciences & Computing Stream)</option>
                      <option value="s3s4_agri">S.3 - S.4 (Agriculture & Agribusiness Stream)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Class Grade Title</label>
                    <input
                      type="text"
                      value={newClass}
                      onChange={(e) => setNewClass(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">House & Dorm</label>
                    <input
                      type="text"
                      value={newHouse}
                      onChange={(e) => setNewHouse(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Guardian Name & Phone</label>
                    <input
                      type="text"
                      value={newGuardian}
                      onChange={(e) => setNewGuardian(e.target.value)}
                      placeholder="e.g. Dr. Florence Kyosiime"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700 text-xs text-slate-300">
                  <span className="font-bold text-amber-400 block mb-1">Ugandan NCDC Subject Assignment:</span>
                  This student will be enrolled in official NCDC curriculum subjects with both Continuous Assessment (AoI: 20%) and Summative (EOT: 80%) rubrics and a 0.0 – 3.0 competence score scale.
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingStudent(false)}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md shadow-blue-600/30 cursor-pointer"
                  >
                    Save Student to SMUK Database
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Database Documents Table */}
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                All Documents in DB ({documents.length} files)
              </span>
              <button
                onClick={() => {
                  dbService.resetToDefaults();
                  onRefreshData();
                  alert('Reset database to initial pristine records with updated Ugandan curriculum.');
                }}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                title="Reset sample documents"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Demo Records</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-800/50 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Document Title</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Target Audience</th>
                    <th className="py-3 px-2 text-center">Type</th>
                    <th className="py-3 px-2 text-center">Size</th>
                    <th className="py-3 px-3 text-center">Downloads</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-800/30">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{doc.title}</div>
                        <div className="text-[10px] text-slate-400">{doc.fileName} • {doc.uploadDate}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-300 font-semibold text-[10px]">
                          {doc.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-300">{doc.targetAudience}</td>
                      <td className="py-3 px-2 text-center font-bold text-slate-400">{doc.fileType}</td>
                      <td className="py-3 px-2 text-center text-slate-400">{doc.fileSize}</td>
                      <td className="py-3 px-3 text-center text-slate-300 font-mono">{doc.downloadCount}</td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              dbService.incrementDownloadCount(doc.id);
                              onRefreshData();
                              alert(`Downloading "${doc.fileName}" (${doc.fileSize}). Authenticated by SMUK.`);
                            }}
                            className="p-1.5 text-blue-400 hover:text-blue-300 bg-blue-500/10 rounded-lg cursor-pointer"
                            title="Download document"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteDocument(doc.id, doc.title)}
                            className="p-1.5 text-red-400 hover:text-red-300 bg-red-500/10 rounded-lg cursor-pointer"
                            title="Delete document"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
