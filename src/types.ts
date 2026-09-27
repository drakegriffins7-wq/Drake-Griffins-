export type TabType = 'home' | 'live' | 'updates' | 'profile';

export interface SubjectScore {
  code: string;
  name: string;
  aoiScore: number; // Activity of Integration (AoI) / Continuous Assessment (out of 20%)
  endTermScore: number; // End of Term Summative Assessment (out of 80%)
  midTermScore?: number; // Backward-compatible alias for AoI
  totalScore: number; // Overall percentage score (out of 100%)
  scoreOutOf3: number; // Ugandan CBC Competence Score (0.0 to 3.0 scale)
  competencyLevel: 'Level 3 (Outstanding)' | 'Level 2 (Achieved)' | 'Level 1 (Basic)';
  grade: string; // A (2.5 - 3.0), B (1.5 - 2.4), C (0.9 - 1.4)
  points: number;
  teacher: string;
  remarks: string; // Specific competence descriptor remarks
  category?: 'Compulsory Core' | 'Elective / Vocational' | 'Religious Education' | 'Project Work';
}

export interface StudentResult {
  id: string; // ID e.g. SMUK/2024/001
  studentId: string; // normalized lookup
  fullName: string;
  gender: 'Male' | 'Female';
  classGrade: string; // e.g., Senior 4 Tech, Senior 3 Science
  term: string; // e.g., Term 3 2026
  academicYear: string; // 2026
  dateOfBirth: string;
  house: string;
  guardianName: string;
  guardianContact: string;
  guardianEmail: string;
  avatarUrl?: string;
  attendance: {
    daysPresent: number;
    totalDays: number;
    percentage: number;
  };
  subjects: SubjectScore[];
  totalScore: number;
  averageScore: number;
  totalAggregates: number;
  division: string; // e.g. Division 1 (Distinction)
  classRank: number;
  totalStudentsInClass: number;
  conductGrade: string; // Excellent, Very Good, Good
  classTeacherRemarks: string;
  headTeacherRemarks: string;
  feesBalance: number;
  feesStatus: 'Cleared' | 'Pending' | 'Partial';
  nextTermBegins: string;
  status: 'Published' | 'Draft';
  createdAt: string;
}

export interface SchoolDocument {
  id: string;
  title: string;
  category: 'Circular' | 'Exam Timetable' | 'Syllabus' | 'Fee Structure' | 'Newsletter' | 'SETS Policy' | 'Results Sheet' | 'New Curriculum Guide' | 'NCDC AoI Assessment';
  targetAudience: string;
  uploadDate: string;
  fileSize: string;
  fileType: 'PDF' | 'XLSX' | 'DOCX' | 'IMAGE';
  fileName: string;
  fileContent?: string; // Data URL or text preview
  description: string;
  downloadCount: number;
  uploadedBy: string;
  isImportant?: boolean;
}

export interface SchoolUpdate {
  id: string;
  title: string;
  subtitle: string;
  category: 'SETS Innovation' | 'Academic' | 'Sports & Co-curricular' | 'Administrative' | 'Parents Notice';
  date: string;
  time?: string;
  venue?: string;
  description: string;
  detailedContent?: string;
  tags: string[];
  coordinator: string;
  imageUrl?: string;
  isPinned?: boolean;
  attachmentName?: string;
  attachmentSize?: string;
  documentId?: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  role: 'Parent' | 'Student' | 'Teacher' | 'Admin';
  message: string;
  timestamp: string;
  isPinned?: boolean;
  likes?: number;
}

export interface LiveStream {
  id: string;
  title: string;
  subtitle: string;
  status: 'live' | 'upcoming' | 'recorded';
  thumbnailUrl: string;
  speaker: string;
  speakerRole: string;
  viewersCount: number;
  scheduledFor: string;
  duration?: string;
  description: string;
  category: 'Assembly' | 'Prize Giving' | 'Science & SETS' | 'Sports Meet' | 'Webinar';
  chatMessages: ChatMessage[];
  videoSimulationUrl?: string;
}
