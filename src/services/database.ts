import { StudentResult, SchoolDocument, SchoolUpdate, LiveStream } from '../types';

const STORAGE_KEYS = {
  STUDENTS: 'smuk_students_db_v4',
  DOCUMENTS: 'smuk_documents_db_v3',
  UPDATES: 'smuk_updates_db_v2',
  LIVE_STREAMS: 'smuk_live_streams_db_v1',
  ACTIVE_STUDENT_ID: 'smuk_active_student_id',
};

// Seed student records based on Uganda New Lower Secondary Curriculum (CBC / NLSC)
const INITIAL_STUDENTS: StudentResult[] = [
  {
    id: 'SMUK-2024-042',
    studentId: 'SMUK-2024-042',
    fullName: 'Annette Michelle Kyosiime',
    gender: 'Female',
    classGrade: 'Senior 4 (New Curriculum CBC - Tech & Sciences)',
    term: 'Term 3 Final Assessment',
    academicYear: '2026',
    dateOfBirth: '2008-08-22',
    house: 'Curie Discovery House',
    guardianName: 'Hon. Florence Kyosiime',
    guardianContact: '+256 772 890 144',
    guardianEmail: 'florence.k@parents.smuk.edu',
    attendance: {
      daysPresent: 90,
      totalDays: 90,
      percentage: 100,
    },
    subjects: [
      { code: 'MTC401', name: 'Mathematics', aoiScore: 19.5, endTermScore: 76.5, midTermScore: 19.5, totalScore: 96, scoreOutOf3: 2.9, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Okello David', category: 'Compulsory Core', remarks: 'Exceptional mathematical modeling, algebra, and precision in geometry.' },
      { code: 'ENG402', name: 'English Language', aoiScore: 18.0, endTermScore: 71.0, midTermScore: 18.0, totalScore: 89, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Ms. Atuhaire Patricia', category: 'Compulsory Core', remarks: 'Eloquently writes persuasive essays, debates with critical fluency.' },
      { code: 'PHY403', name: 'Physics', aoiScore: 19.0, endTermScore: 75.0, midTermScore: 19.0, totalScore: 94, scoreOutOf3: 2.9, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Eng. Tumusiime Eric', category: 'Compulsory Core', remarks: 'Outstanding circuit analysis; designed an automated solar tracker.' },
      { code: 'CHE404', name: 'Chemistry', aoiScore: 18.5, endTermScore: 72.5, midTermScore: 18.5, totalScore: 91, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mrs. Namubiru Grace', category: 'Compulsory Core', remarks: 'Mastery in chemical stoichiometry and rigorous laboratory safety.' },
      { code: 'BIO405', name: 'Biology', aoiScore: 18.0, endTermScore: 70.0, midTermScore: 18.0, totalScore: 88, scoreOutOf3: 2.7, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Dr. Wandera Samuel', category: 'Compulsory Core', remarks: 'Insightful investigation into genetics, ecosystems, and human anatomy.' },
      { code: 'HPE406', name: 'History & Political Education', aoiScore: 18.0, endTermScore: 71.0, midTermScore: 18.0, totalScore: 89, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mrs. Babirye Christine', category: 'Compulsory Core', remarks: 'Comprehensive grasp of constitution, governance, and Pan-African heritage.' },
      { code: 'GEO407', name: 'Geography', aoiScore: 17.5, endTermScore: 69.5, midTermScore: 17.5, totalScore: 87, scoreOutOf3: 2.7, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Kigozi Denis', category: 'Compulsory Core', remarks: 'Superb cartographic interpretation and environmental conservation analysis.' },
      { code: 'ENT408', name: 'Entrepreneurship Education', aoiScore: 19.0, endTermScore: 74.0, midTermScore: 19.0, totalScore: 93, scoreOutOf3: 2.9, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Mukasa Ronald', category: 'Elective / Vocational', remarks: 'Formulated a viable agribusiness venture plan with full financial records.' },
      { code: 'ICT409', name: 'Information & Communications Tech (ICT)', aoiScore: 20.0, endTermScore: 78.0, midTermScore: 20.0, totalScore: 98, scoreOutOf3: 3.0, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Byaruhanga Rogers', category: 'Elective / Vocational', remarks: 'Top in school for software development and algorithms.' },
      { code: 'KIS410', name: 'Kiswahili', aoiScore: 17.0, endTermScore: 68.0, midTermScore: 17.0, totalScore: 85, scoreOutOf3: 2.6, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mwalimu Juma Salim', category: 'Elective / Vocational', remarks: 'Nzuri sana! Speaks and writes fluent conversational and literary Swahili.' },
      { code: 'CRE411', name: 'Christian Religious Education (CRE)', aoiScore: 18.5, endTermScore: 73.5, midTermScore: 18.5, totalScore: 92, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Sr. Mary Goretti', category: 'Religious Education', remarks: 'Deep moral discernment and active participation in community service.' },
      { code: 'PRJ412', name: 'General Project Work (NCDC)', aoiScore: 10.0, endTermScore: 88.0, midTermScore: 10.0, totalScore: 98, scoreOutOf3: 3.0, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'SETS Innovation Board', category: 'Project Work', remarks: 'Built "SMUK Green IoT Irrigation" prototype; awarded National STEM gold.' },
    ],
    totalScore: 1090,
    averageScore: 90.8,
    totalAggregates: 8,
    division: 'Level 3: Outstanding Competency (Division 1 Distinction)',
    classRank: 1,
    totalStudentsInClass: 54,
    conductGrade: 'Exemplary & Role Model',
    classTeacherRemarks: 'Annette is an exceptional, self-driven learner who exemplifies the true spirit of Uganda’s New Lower Secondary Curriculum.',
    headTeacherRemarks: 'Outstanding accomplishment! Annette has set the highest standard of competence and leadership at SMUK. Keep soaring!',
    feesBalance: 0,
    feesStatus: 'Cleared',
    nextTermBegins: 'February 2, 2027',
    status: 'Published',
    createdAt: '2026-09-18',
  },
  {
    id: 'SMUK-2024-001',
    studentId: 'SMUK-2024-001',
    fullName: 'Brian Kato Mukasa',
    gender: 'Male',
    classGrade: 'Senior 4 (New Curriculum CBC - Engineering & Technology)',
    term: 'Term 3 Final Assessment',
    academicYear: '2026',
    dateOfBirth: '2008-04-14',
    house: 'Newton Innovators House',
    guardianName: 'Dr. Joseph Mukasa & Sarah Mukasa',
    guardianContact: '+256 701 445 921',
    guardianEmail: 'jmukasa@parents.smuk.edu',
    attendance: {
      daysPresent: 88,
      totalDays: 90,
      percentage: 97.8,
    },
    subjects: [
      { code: 'MTC401', name: 'Mathematics', aoiScore: 18.5, endTermScore: 73.5, midTermScore: 18.5, totalScore: 92, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Okello David', category: 'Compulsory Core', remarks: 'High accuracy in statistical modeling and trigonometric vectors.' },
      { code: 'ENG402', name: 'English Language', aoiScore: 16.0, endTermScore: 66.0, midTermScore: 16.0, totalScore: 82, scoreOutOf3: 2.5, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Ms. Atuhaire Patricia', category: 'Compulsory Core', remarks: 'Good vocabulary and creative literary analysis.' },
      { code: 'PHY403', name: 'Physics', aoiScore: 19.0, endTermScore: 72.0, midTermScore: 19.0, totalScore: 91, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Eng. Tumusiime Eric', category: 'Compulsory Core', remarks: 'Talented in electronics, mechanics experiments, and circuit boards.' },
      { code: 'CHE404', name: 'Chemistry', aoiScore: 17.5, endTermScore: 68.5, midTermScore: 17.5, totalScore: 86, scoreOutOf3: 2.6, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mrs. Namubiru Grace', category: 'Compulsory Core', remarks: 'Thorough understanding of organic chemical bonding and reaction rates.' },
      { code: 'BIO405', name: 'Biology', aoiScore: 17.0, endTermScore: 67.0, midTermScore: 17.0, totalScore: 84, scoreOutOf3: 2.6, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Dr. Wandera Samuel', category: 'Compulsory Core', remarks: 'Competent in microscopic dissection and plant physiology studies.' },
      { code: 'HPE406', name: 'History & Political Education', aoiScore: 16.5, endTermScore: 66.5, midTermScore: 16.5, totalScore: 83, scoreOutOf3: 2.5, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mrs. Babirye Christine', category: 'Compulsory Core', remarks: 'Good critical examination of socio-political movements in East Africa.' },
      { code: 'GEO407', name: 'Geography', aoiScore: 16.0, endTermScore: 65.0, midTermScore: 16.0, totalScore: 81, scoreOutOf3: 2.5, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Kigozi Denis', category: 'Compulsory Core', remarks: 'Competent fieldwork analysis and photographic interpretation.' },
      { code: 'ENT408', name: 'Entrepreneurship Education', aoiScore: 18.0, endTermScore: 70.0, midTermScore: 18.0, totalScore: 88, scoreOutOf3: 2.7, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Mukasa Ronald', category: 'Elective / Vocational', remarks: 'Demonstrated exceptional market research and pitch presentation skills.' },
      { code: 'ICT409', name: 'Information & Communications Tech (ICT)', aoiScore: 19.5, endTermScore: 76.5, midTermScore: 19.5, totalScore: 96, scoreOutOf3: 2.9, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Byaruhanga Rogers', category: 'Elective / Vocational', remarks: 'Excellent coding in Python; leads school computer lab assistance.' },
      { code: 'PED410', name: 'Physical Education (PE)', aoiScore: 18.0, endTermScore: 71.0, midTermScore: 18.0, totalScore: 89, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Coach Kato Denis', category: 'Elective / Vocational', remarks: 'Excellent physical fitness, sportsmanship, and teamwork on field.' },
      { code: 'CRE411', name: 'Christian Religious Education (CRE)', aoiScore: 17.0, endTermScore: 68.0, midTermScore: 17.0, totalScore: 85, scoreOutOf3: 2.6, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Sr. Mary Goretti', category: 'Religious Education', remarks: 'High ethical values and active role in peer counseling.' },
      { code: 'PRJ412', name: 'General Project Work (NCDC)', aoiScore: 10.0, endTermScore: 84.0, midTermScore: 10.0, totalScore: 94, scoreOutOf3: 2.9, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'SETS Innovation Board', category: 'Project Work', remarks: 'Developed solar-powered automated school bell timer.' },
    ],
    totalScore: 1041,
    averageScore: 86.75,
    totalAggregates: 10,
    division: 'Level 3: Outstanding Competency (Division 1 Distinction)',
    classRank: 2,
    totalStudentsInClass: 54,
    conductGrade: 'Exemplary',
    classTeacherRemarks: 'Brian is an innovative student whose practical abilities in technology and sciences are second to none.',
    headTeacherRemarks: 'Splendid results! Brian represents the practical transformation fostered by the new curriculum.',
    feesBalance: 0,
    feesStatus: 'Cleared',
    nextTermBegins: 'February 2, 2027',
    status: 'Published',
    createdAt: '2026-09-15',
  },
  {
    id: 'SMUK-2024-118',
    studentId: 'SMUK-2024-118',
    fullName: 'Trevor Agaba Ssemwanga',
    gender: 'Male',
    classGrade: 'Senior 3 (New Curriculum CBC - Agriculture & Life Sciences)',
    term: 'Term 3 Final Assessment',
    academicYear: '2026',
    dateOfBirth: '2009-02-11',
    house: 'Mandela Leadership House',
    guardianName: 'Patrick Ssemwanga',
    guardianContact: '+256 754 122 309',
    guardianEmail: 'pssemwanga@gmail.com',
    attendance: {
      daysPresent: 82,
      totalDays: 90,
      percentage: 91.1,
    },
    subjects: [
      { code: 'MTC301', name: 'Mathematics', aoiScore: 15.0, endTermScore: 61.0, midTermScore: 15.0, totalScore: 76, scoreOutOf3: 2.3, competencyLevel: 'Level 2 (Achieved)', grade: 'B', points: 3, teacher: 'Mr. Okello David', category: 'Compulsory Core', remarks: 'Good grasp of algebra, needs extra revision in circle geometry.' },
      { code: 'ENG302', name: 'English Language', aoiScore: 15.5, endTermScore: 60.5, midTermScore: 15.5, totalScore: 76, scoreOutOf3: 2.3, competencyLevel: 'Level 2 (Achieved)', grade: 'B', points: 3, teacher: 'Ms. Atuhaire Patricia', category: 'Compulsory Core', remarks: 'Steady improvement in descriptive essays and functional writing.' },
      { code: 'PHY303', name: 'Physics', aoiScore: 16.0, endTermScore: 62.0, midTermScore: 16.0, totalScore: 78, scoreOutOf3: 2.4, competencyLevel: 'Level 2 (Achieved)', grade: 'B', points: 2, teacher: 'Eng. Tumusiime Eric', category: 'Compulsory Core', remarks: 'Enthusiastic in mechanics and optics practical tasks.' },
      { code: 'CHE304', name: 'Chemistry', aoiScore: 14.5, endTermScore: 58.5, midTermScore: 14.5, totalScore: 73, scoreOutOf3: 2.2, competencyLevel: 'Level 2 (Achieved)', grade: 'B', points: 3, teacher: 'Mrs. Namubiru Grace', category: 'Compulsory Core', remarks: 'Able to prepare standard solutions; practice ionic equations.' },
      { code: 'BIO305', name: 'Biology', aoiScore: 16.0, endTermScore: 63.0, midTermScore: 16.0, totalScore: 79, scoreOutOf3: 2.4, competencyLevel: 'Level 2 (Achieved)', grade: 'B', points: 2, teacher: 'Dr. Wandera Samuel', category: 'Compulsory Core', remarks: 'Very good in environmental field studies and food test experiments.' },
      { code: 'HPE306', name: 'History & Political Education', aoiScore: 15.0, endTermScore: 60.0, midTermScore: 15.0, totalScore: 75, scoreOutOf3: 2.3, competencyLevel: 'Level 2 (Achieved)', grade: 'B', points: 3, teacher: 'Mrs. Babirye Christine', category: 'Compulsory Core', remarks: 'Understands democratic values and historical peace treaties.' },
      { code: 'GEO307', name: 'Geography', aoiScore: 14.0, endTermScore: 58.0, midTermScore: 14.0, totalScore: 72, scoreOutOf3: 2.2, competencyLevel: 'Level 2 (Achieved)', grade: 'B', points: 3, teacher: 'Mr. Kigozi Denis', category: 'Compulsory Core', remarks: 'Satisfactory map interpretation; revise contour cross-sections.' },
      { code: 'AGR308', name: 'Agriculture', aoiScore: 18.5, endTermScore: 72.5, midTermScore: 18.5, totalScore: 91, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Mugisha Paul', category: 'Elective / Vocational', remarks: 'Passionate about organic fertilizer formulation and modern crop irrigation.' },
      { code: 'ENT309', name: 'Entrepreneurship Education', aoiScore: 17.0, endTermScore: 67.0, midTermScore: 17.0, totalScore: 84, scoreOutOf3: 2.6, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Mukasa Ronald', category: 'Elective / Vocational', remarks: 'Demonstrated strong acumen in customer service and pricing strategies.' },
      { code: 'KIS310', name: 'Kiswahili', aoiScore: 14.5, endTermScore: 57.5, midTermScore: 14.5, totalScore: 72, scoreOutOf3: 2.2, competencyLevel: 'Level 2 (Achieved)', grade: 'B', points: 3, teacher: 'Mwalimu Juma Salim', category: 'Elective / Vocational', remarks: 'Inaendelea vizuri; practice verb conjugation and vocabulary.' },
      { code: 'CRE311', name: 'Christian Religious Education (CRE)', aoiScore: 16.5, endTermScore: 65.5, midTermScore: 16.5, totalScore: 82, scoreOutOf3: 2.5, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Sr. Mary Goretti', category: 'Religious Education', remarks: 'Insightful contribution in class discussions and community ethics.' },
      { code: 'PRJ312', name: 'General Project Work (NCDC)', aoiScore: 8.5, endTermScore: 73.5, midTermScore: 8.5, totalScore: 82, scoreOutOf3: 2.5, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'SETS Innovation Board', category: 'Project Work', remarks: 'Produced a functional waste recycling bin sorting system.' },
    ],
    totalScore: 940,
    averageScore: 78.33,
    totalAggregates: 16,
    division: 'Level 2: Achieved Competency (Division 2 High Merit)',
    classRank: 8,
    totalStudentsInClass: 58,
    conductGrade: 'Very Good',
    classTeacherRemarks: 'Trevor has demonstrated commendable dedication and upward growth in activities of integration and agricultural research.',
    headTeacherRemarks: 'A very solid performance! Focus on upgrading science AoIs to reach Level 3 across all subjects.',
    feesBalance: 150000,
    feesStatus: 'Partial',
    nextTermBegins: 'February 2, 2027',
    status: 'Published',
    createdAt: '2026-09-20',
  },
  {
    id: 'SMUK-2025-007',
    studentId: 'SMUK-2025-007',
    fullName: 'Chloe Nabatanzi Lwanga',
    gender: 'Female',
    classGrade: 'Senior 2 (New Curriculum CBC - Foundation)',
    term: 'Term 3 Final Assessment',
    academicYear: '2026',
    dateOfBirth: '2010-11-05',
    house: 'Turing Technology House',
    guardianName: 'Eng. Ronald Lwanga',
    guardianContact: '+256 788 333 410',
    guardianEmail: 'rlwanga@innovations.co.ug',
    attendance: {
      daysPresent: 89,
      totalDays: 90,
      percentage: 98.9,
    },
    subjects: [
      { code: 'ENG201', name: 'English Language', aoiScore: 18.5, endTermScore: 72.5, midTermScore: 18.5, totalScore: 91, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Musoke Jude', category: 'Compulsory Core', remarks: 'Creative storytelling and eloquent oral presentation.' },
      { code: 'MTC202', name: 'Mathematics', aoiScore: 18.0, endTermScore: 71.0, midTermScore: 18.0, totalScore: 89, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Walusimbi Alex', category: 'Compulsory Core', remarks: 'Exceptional logic and geometric reasoning.' },
      { code: 'BIO203', name: 'Biology', aoiScore: 18.0, endTermScore: 71.0, midTermScore: 18.0, totalScore: 89, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Ms. Nabirye Joan', category: 'Compulsory Core', remarks: 'Keen observer in plant classification and nutrition.' },
      { code: 'CHE204', name: 'Chemistry', aoiScore: 17.0, endTermScore: 68.0, midTermScore: 17.0, totalScore: 85, scoreOutOf3: 2.6, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mrs. Namubiru Grace', category: 'Compulsory Core', remarks: 'Thorough in distinguishing mixtures, compounds, and states of matter.' },
      { code: 'PHY205', name: 'Physics', aoiScore: 17.5, endTermScore: 69.5, midTermScore: 17.5, totalScore: 87, scoreOutOf3: 2.7, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Eng. Tumusiime Eric', category: 'Compulsory Core', remarks: 'Understands laws of motion and simple machines.' },
      { code: 'GEO206', name: 'Geography', aoiScore: 17.0, endTermScore: 69.0, midTermScore: 17.0, totalScore: 86, scoreOutOf3: 2.6, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Kigozi Denis', category: 'Compulsory Core', remarks: 'Accurate sketch maps and climatic zone illustrations.' },
      { code: 'HPE207', name: 'History & Political Education', aoiScore: 17.5, endTermScore: 70.0, midTermScore: 17.5, totalScore: 87.5, scoreOutOf3: 2.7, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mrs. Kembabazi Alice', category: 'Compulsory Core', remarks: 'Great presentation on Ugandan cultural heritage and early migrations.' },
      { code: 'PED208', name: 'Physical Education (PE)', aoiScore: 18.0, endTermScore: 72.0, midTermScore: 18.0, totalScore: 90, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Coach Kato Denis', category: 'Compulsory Core', remarks: 'Active in athletics, gymnastics, and school aerobic fitness.' },
      { code: 'KIS209', name: 'Kiswahili', aoiScore: 17.0, endTermScore: 68.0, midTermScore: 17.0, totalScore: 85, scoreOutOf3: 2.6, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mwalimu Juma Salim', category: 'Compulsory Core', remarks: 'Nzuri sana! Fast learner with excellent pronunciation.' },
      { code: 'CRE210', name: 'Christian Religious Education (CRE)', aoiScore: 18.0, endTermScore: 70.0, midTermScore: 18.0, totalScore: 88, scoreOutOf3: 2.7, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Sr. Mary Goretti', category: 'Religious Education', remarks: 'Kind, cooperative, and reflective in spiritual activities.' },
      { code: 'ENT211', name: 'Entrepreneurship Education', aoiScore: 18.5, endTermScore: 73.0, midTermScore: 18.5, totalScore: 91.5, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Mukasa Ronald', category: 'Compulsory Core', remarks: 'Invented a student handcraft stall; outstanding bookkeeping.' },
      { code: 'ART212', name: 'Art and Design', aoiScore: 19.0, endTermScore: 74.0, midTermScore: 19.0, totalScore: 93, scoreOutOf3: 2.9, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mrs. Nakitto Brenda', category: 'Elective / Vocational', remarks: 'Superb batik fabric design, clay sculpture, and color mixing.' },
      { code: 'PRJ213', name: 'General Project Work (NCDC)', aoiScore: 9.5, endTermScore: 82.5, midTermScore: 9.5, totalScore: 92, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'SETS Innovation Board', category: 'Project Work', remarks: 'Designed an energy-saving clay cooking stove for local communities.' },
    ],
    totalScore: 1146,
    averageScore: 88.15,
    totalAggregates: 6,
    division: 'Level 3: Outstanding Competency (Division 1 Distinction)',
    classRank: 2,
    totalStudentsInClass: 60,
    conductGrade: 'Exemplary',
    classTeacherRemarks: 'Chloe is polite, creative, and passionate about collaborative project work across all 11 compulsory subjects.',
    headTeacherRemarks: 'Brilliant foundation for Junior Secondary CBC excellence. Well done Chloe!',
    feesBalance: 0,
    feesStatus: 'Cleared',
    nextTermBegins: 'February 2, 2027',
    status: 'Published',
    createdAt: '2026-09-22',
  },
  {
    id: 'SMUK-2026-089',
    studentId: 'SMUK-2026-089',
    fullName: 'Derrick Ssenyonga',
    gender: 'Male',
    classGrade: 'Senior 1 (New Curriculum CBC - Pioneer Stream)',
    term: 'Term 3 Final Assessment',
    academicYear: '2026',
    dateOfBirth: '2011-06-18',
    house: 'Mandela Leadership House',
    guardianName: 'Hajjat Fatuma Ssenyonga',
    guardianContact: '+256 774 221 005',
    guardianEmail: 'fsenyonga@gmail.com',
    attendance: {
      daysPresent: 87,
      totalDays: 90,
      percentage: 96.6,
    },
    subjects: [
      { code: 'ENG101', name: 'English Language', aoiScore: 17.0, endTermScore: 68.0, midTermScore: 17.0, totalScore: 85, scoreOutOf3: 2.6, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Musoke Jude', category: 'Compulsory Core', remarks: 'Confident reader, eager participant in literature discussions.' },
      { code: 'MTC102', name: 'Mathematics', aoiScore: 18.0, endTermScore: 70.0, midTermScore: 18.0, totalScore: 88, scoreOutOf3: 2.7, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Walusimbi Alex', category: 'Compulsory Core', remarks: 'Good grasp of set theory, integers, and geometric constructions.' },
      { code: 'BIO103', name: 'Biology', aoiScore: 17.5, endTermScore: 69.5, midTermScore: 17.5, totalScore: 87, scoreOutOf3: 2.7, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Ms. Nabirye Joan', category: 'Compulsory Core', remarks: 'Active in laboratory microscope preparations.' },
      { code: 'CHE104', name: 'Chemistry', aoiScore: 16.5, endTermScore: 66.5, midTermScore: 16.5, totalScore: 83, scoreOutOf3: 2.5, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mrs. Namubiru Grace', category: 'Compulsory Core', remarks: 'Understands physical and chemical properties and separation techniques.' },
      { code: 'PHY105', name: 'Physics', aoiScore: 17.0, endTermScore: 68.0, midTermScore: 17.0, totalScore: 85, scoreOutOf3: 2.6, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Eng. Tumusiime Eric', category: 'Compulsory Core', remarks: 'Understands basic units of measurement and density calculations.' },
      { code: 'GEO106', name: 'Geography', aoiScore: 16.0, endTermScore: 66.0, midTermScore: 16.0, totalScore: 82, scoreOutOf3: 2.5, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Kigozi Denis', category: 'Compulsory Core', remarks: 'Understands Ugandan relief regions and weather instruments.' },
      { code: 'HPE107', name: 'History & Political Education', aoiScore: 17.0, endTermScore: 68.0, midTermScore: 17.0, totalScore: 85, scoreOutOf3: 2.6, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mrs. Kembabazi Alice', category: 'Compulsory Core', remarks: 'Participates actively in discussing citizens’ rights and responsibilities.' },
      { code: 'PED108', name: 'Physical Education (PE)', aoiScore: 18.5, endTermScore: 73.5, midTermScore: 18.5, totalScore: 92, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Coach Kato Denis', category: 'Compulsory Core', remarks: 'Star performer in track sprints and team football.' },
      { code: 'KIS109', name: 'Kiswahili', aoiScore: 16.5, endTermScore: 65.5, midTermScore: 16.5, totalScore: 82, scoreOutOf3: 2.5, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mwalimu Juma Salim', category: 'Compulsory Core', remarks: 'Habari nzuri; fast learner in conversational dialogues.' },
      { code: 'IRE110', name: 'Islamic Religious Education (IRE)', aoiScore: 18.0, endTermScore: 72.0, midTermScore: 18.0, totalScore: 90, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Sheikh Haruna Matovu', category: 'Religious Education', remarks: 'Eloquent Quranic recitation and high moral discipline.' },
      { code: 'ENT111', name: 'Entrepreneurship Education', aoiScore: 17.5, endTermScore: 69.5, midTermScore: 17.5, totalScore: 87, scoreOutOf3: 2.7, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mr. Mukasa Ronald', category: 'Compulsory Core', remarks: 'Good understanding of savings, personal budgeting, and trade.' },
      { code: 'NFT112', name: 'Nutrition & Food Technology', aoiScore: 18.0, endTermScore: 71.0, midTermScore: 18.0, totalScore: 89, scoreOutOf3: 2.8, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'Mrs. Kiconco Sarah', category: 'Elective / Vocational', remarks: 'Prepared balanced diet menus using indigenous Ugandan produce.' },
      { code: 'PRJ113', name: 'General Project Work (NCDC)', aoiScore: 9.0, endTermScore: 80.0, midTermScore: 9.0, totalScore: 89, scoreOutOf3: 2.7, competencyLevel: 'Level 3 (Outstanding)', grade: 'A', points: 1, teacher: 'SETS Innovation Board', category: 'Project Work', remarks: 'Produced reusable sanitary and hygiene paper dispensers.' },
    ],
    totalScore: 1104,
    averageScore: 84.92,
    totalAggregates: 9,
    division: 'Level 3: Outstanding Competency (Division 1 Distinction)',
    classRank: 3,
    totalStudentsInClass: 62,
    conductGrade: 'Exemplary',
    classTeacherRemarks: 'Derrick has made a flying start in Senior 1. Enthusiastic, disciplined, and very hands-on in workshops.',
    headTeacherRemarks: 'Commendable pioneer performance! St. Kalemba S.S is proud of Derrick’s dedication.',
    feesBalance: 0,
    feesStatus: 'Cleared',
    nextTermBegins: 'February 2, 2027',
    status: 'Published',
    createdAt: '2026-09-24',
  }
];

// Seed school documents (The database storage for uploaded school docs)
const INITIAL_DOCUMENTS: SchoolDocument[] = [
  {
    id: 'DOC-2026-NCDC-01',
    title: 'Uganda NCDC New Lower Secondary Curriculum (NLSC) Syllabi & Guidelines',
    category: 'New Curriculum Guide',
    targetAudience: 'All Teachers, Parents & Learners (S.1 - S.4)',
    uploadDate: '2026-09-26',
    fileSize: '4.2 MB',
    fileType: 'PDF',
    fileName: 'Uganda_NCDC_New_Curriculum_Complete_Framework.pdf',
    description: 'Official National Curriculum Development Centre (NCDC) handbook outlining all 21 subjects, compulsory core menus, elective pathways, and learner assessment guidelines.',
    downloadCount: 712,
    uploadedBy: 'Director of Studies (DOS)',
    isImportant: true,
  },
  {
    id: 'DOC-2026-NCDC-02',
    title: 'Activities of Integration (AoI) Continuous Assessment Guide (20% CA)',
    category: 'NCDC AoI Assessment',
    targetAudience: 'Parents & Teachers',
    uploadDate: '2026-09-22',
    fileSize: '2.6 MB',
    fileType: 'PDF',
    fileName: 'NCDC_AoI_Formative_Assessment_Manual_2026.pdf',
    description: 'Step-by-step scoring rubric for formative continuous assessment: scoring on the 0.0 to 3.0 scale, converting to 20%, and preparing UNEB submission portfolios.',
    downloadCount: 524,
    uploadedBy: 'Academic Registrar & Examination Board',
    isImportant: true,
  },
  {
    id: 'DOC-2026-NCDC-03',
    title: 'UNEB Sample Assessment Items & Scoring Rubrics for S.4 Candidates',
    category: 'Exam Timetable',
    targetAudience: 'Senior 3 & Senior 4 Candidates',
    uploadDate: '2026-09-15',
    fileSize: '3.8 MB',
    fileType: 'PDF',
    fileName: 'UNEB_New_Curriculum_Sample_Items_2026.pdf',
    description: 'UNEB competency-based sample examination papers for sciences, humanities, languages, and vocational subjects under the new curriculum.',
    downloadCount: 649,
    uploadedBy: 'Dean of Sciences & DOS',
    isImportant: true,
  },
  {
    id: 'DOC-2026-001',
    title: 'SMUK Term 3 2026 Official Examination Timetable & Guidelines',
    category: 'Exam Timetable',
    targetAudience: 'All Parents & Students (S.1 - S.6)',
    uploadDate: '2026-09-10',
    fileSize: '1.8 MB',
    fileType: 'PDF',
    fileName: 'SMUK_Term3_Exam_Timetable_2026.pdf',
    description: 'Complete schedules for morning and afternoon papers, laboratory practical shifts, and student examination code of conduct.',
    downloadCount: 342,
    uploadedBy: 'Director of Studies (DOS)',
    isImportant: true,
  },
  {
    id: 'DOC-2026-002',
    title: 'SMUK SETS Robotics & AI Curriculum Manual 2026/2027',
    category: 'Syllabus',
    targetAudience: 'S.1 to S.4 Students',
    uploadDate: '2026-08-28',
    fileSize: '3.4 MB',
    fileType: 'PDF',
    fileName: 'SETS_Robotics_Digital_Curriculum_2026.pdf',
    description: 'Curriculum outline for computer programming, micro-controller circuits, drone technology, and digital design modules.',
    downloadCount: 219,
    uploadedBy: 'Head of SETS Department',
    isImportant: true,
  },
  {
    id: 'DOC-2026-003',
    title: 'Term 1 2027 School Fees Structure & Banking Details',
    category: 'Fee Structure',
    targetAudience: 'All Parents & Guardians',
    uploadDate: '2026-09-24',
    fileSize: '950 KB',
    fileType: 'PDF',
    fileName: 'SMUK_Fees_Structure_Term1_2027.pdf',
    description: 'Comprehensive breakdown of tuition, digital lab access, boarding, uniforms, and approved bank account numbers & mobile payment codes.',
    downloadCount: 580,
    uploadedBy: 'Bursar & Finance Office',
    isImportant: true,
  },
  {
    id: 'DOC-2026-004',
    title: 'End of Year Parents General Meeting Circular & Resolutions',
    category: 'Circular',
    targetAudience: 'All Parents',
    uploadDate: '2026-09-21',
    fileSize: '1.2 MB',
    fileType: 'PDF',
    fileName: 'SMUK_PTA_Meeting_Minutes_Resolutions.pdf',
    description: 'Highlights from the Headteacher address, infrastructural developments, digital smartboard installations, and holiday projects.',
    downloadCount: 412,
    uploadedBy: 'Headteacher / Secretary PTA',
  },
  {
    id: 'DOC-2026-005',
    title: 'SMUK Annual Science & Sports Gala Program Bulletin',
    category: 'Newsletter',
    targetAudience: 'General Public & Parents',
    uploadDate: '2026-09-18',
    fileSize: '4.1 MB',
    fileType: 'PDF',
    fileName: 'SMUK_Annual_Gala_Special_Edition.pdf',
    description: 'Special digest showcasing student tech innovations, track and field records, inter-house points, and guest speaker profile.',
    downloadCount: 187,
    uploadedBy: 'Public Relations & Co-curricular Desk',
  },
  {
    id: 'DOC-2026-006',
    title: 'Digital Safety & Device Usage Policy on Campus',
    category: 'SETS Policy',
    targetAudience: 'Students, Staff & Guardians',
    uploadDate: '2026-08-15',
    fileSize: '720 KB',
    fileType: 'PDF',
    fileName: 'SMUK_Campus_Digital_Citizenship_Policy.pdf',
    description: 'Rules regarding student laptop use, school Wi-Fi authentication, academic cloud accounts, and digital ethics.',
    downloadCount: 165,
    uploadedBy: 'ICT Directorate',
  },
];

// Seed school updates & programs
const INITIAL_UPDATES: SchoolUpdate[] = [
  {
    id: 'UPD-2026-101',
    title: 'SMUK SETS Go Digital Portal Launch & Term 3 Results Out',
    subtitle: 'Parents can now access instant student academic reports anytime using student IDs.',
    category: 'SETS Innovation',
    date: 'September 25, 2026',
    time: '08:30 AM',
    venue: 'SMUK Digital Auditorium & Cloud Portal',
    description: 'We are thrilled to officially unveil the SMUK SETS Go Digital platform. All parents can now key in their student’s ID number to view term report cards, aggregate breakdowns, teacher feedback, and download official stamp-certified copies. No more queuing or waiting for physical cards!',
    detailedContent: 'The new system incorporates real-time analytics, automated GPA aggregates, and cloud document storage. Parents can also stream school events live and download all official circulars directly from their smartphones.',
    tags: ['GoDigital', 'ExamResults', 'Innovation', 'ParentPortal'],
    coordinator: 'Mr. Byaruhanga Rogers (ICT Directorate)',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    isPinned: true,
    attachmentName: 'How_to_Access_Results_Guide.pdf',
    attachmentSize: '820 KB',
  },
  {
    id: 'UPD-2026-102',
    title: 'Grand SETS Robotics & Green Energy Exhibition 2026',
    subtitle: 'Student engineers present automated solar tracking and agricultural IoT devices.',
    category: 'SETS Innovation',
    date: 'October 3, 2026',
    time: '10:00 AM - 4:00 PM',
    venue: 'Main Science Complex & Quadrangle',
    description: 'Our junior and senior engineers will demonstrate working prototypes of AI solar trackers, automated classroom lighting, and robotic arms developed during the Term 3 practicals. Judges from National Science Foundation will award seed funding.',
    detailedContent: 'Parents are cordially invited to test-drive student projects. Demonstrations will also be broadcasted live on our Live tab with interactive Q&A.',
    tags: ['Robotics', 'CleanEnergy', 'IoT', 'StudentsInnovate'],
    coordinator: 'Eng. Tumusiime Eric (SETS Lead)',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop',
    isPinned: true,
    attachmentName: 'Exhibition_Program_Schedule.pdf',
    attachmentSize: '1.4 MB',
  },
  {
    id: 'UPD-2026-103',
    title: 'Parents Consultative Day & Career Mentorship Forum',
    subtitle: 'One-on-one sessions with class teachers, house masters, and university counselors.',
    category: 'Academic',
    date: 'October 12, 2026',
    time: '09:00 AM - 3:30 PM',
    venue: 'School Dining Hall & Dedicated Classrooms',
    description: 'An opportunity for guardians to discuss the Term 3 academic performance, subject choices for Senior 3 and Senior 5, and international university placement prep with our guidance team.',
    detailedContent: 'Refreshments will be provided. Please arrive promptly at your assigned time slot listed in your student profile notification.',
    tags: ['PTA', 'Academics', 'Mentorship', 'CareerGuidance'],
    coordinator: 'Ms. Atuhaire Patricia & DOS',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop',
    attachmentName: 'Consultation_Slots_Booking.pdf',
    attachmentSize: '950 KB',
  },
  {
    id: 'UPD-2026-104',
    title: 'Inter-House Digital Quiz & National Debate Championship',
    subtitle: 'Newton, Curie, Mandela and Turing houses battle for the 2026 Academic Cup.',
    category: 'Sports & Co-curricular',
    date: 'October 19, 2026',
    time: '02:00 PM',
    venue: 'SMUK Assembly Hall & Streamed Live',
    description: 'Our top debaters and science quiz champions take the stage in rapid-fire rounds covering World History, Artificial Intelligence, Global Economics, and Environmental Science.',
    detailedContent: 'Live audience voting will be enabled via the SMUK SETS Live chat portal.',
    tags: ['Debate', 'Quiz', 'InterHouse', 'LiveEvent'],
    coordinator: 'Mrs. Babirye Christine & Senior Prefects',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'UPD-2026-105',
    title: 'Term 1 2027 Early Admissions & Scholarship Screening',
    subtitle: 'Applications open for gifted STEM students and sports bursaries.',
    category: 'Administrative',
    date: 'November 1, 2026',
    time: 'All Day',
    venue: 'Admissions Office & Online Portal',
    description: 'SMUK announces 20 merit scholarships for upcoming S.1 and S.5 entrants excelling in Science, Technology, and Creative Arts. Download the application packet from the documents database.',
    detailedContent: 'Application forms must be submitted alongside primary leaving or O-level mock scores by November 20th.',
    tags: ['Admissions', 'Scholarships', '2027Intake', 'Notice'],
    coordinator: 'Registrar & Admissions Board',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
    attachmentName: 'Scholarship_Application_Pack_2027.pdf',
    attachmentSize: '2.1 MB',
  }
];

// Seed live streams
const INITIAL_LIVE_STREAMS: LiveStream[] = [
  {
    id: 'LIVE-001',
    title: 'SMUK SETS 2026 Grand Innovation Showcase & Speech Day',
    subtitle: 'Celebrating student excellence, academic awards, and robotics demonstrations.',
    status: 'live',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop',
    speaker: 'Prof. Arthur Ssebunya (Keynote) & Headteacher',
    speakerRole: 'Vice Chancellor & Guest of Honor',
    viewersCount: 428,
    scheduledFor: 'Happening Now',
    duration: '1 hr 45 min',
    description: 'Welcome to the live broadcast of our annual Speech Day. Watch our student exhibitions, award ceremonies for top performers in each stream, and the announcement of the 2026 House Champions!',
    category: 'Prize Giving',
    chatMessages: [
      { id: 'c1', sender: 'Dr. Joseph Mukasa', role: 'Parent', message: 'Proud parent watching! The student presentations look magnificent!', timestamp: 'Just now' },
      { id: 'c2', sender: 'Eng. Tumusiime', role: 'Teacher', message: 'Congratulations to the Senior 4 robotics squad on their automated solar prototype!', timestamp: '1m ago', isPinned: true },
      { id: 'c3', sender: 'Hon. Florence Kyosiime', role: 'Parent', message: 'Congratulations to Annette and the entire class of 2026! Keep soaring!', timestamp: '2m ago' },
      { id: 'c4', sender: 'SMUK Digital Mod', role: 'Admin', message: 'Audio check is clear. You can submit questions for the keynote speaker here in chat.', timestamp: '3m ago', isPinned: true },
      { id: 'c5', sender: 'Mrs. Namubiru Grace', role: 'Teacher', message: 'Chemistry exhibits in Pavilion B will be streamed right after the awards.', timestamp: '4m ago' },
      { id: 'c6', sender: 'Patrick Ssemwanga', role: 'Parent', message: 'Well done SMUK administration for making this accessible online!', timestamp: '5m ago' },
    ],
  },
  {
    id: 'LIVE-002',
    title: 'Morning General Assembly & Term Final Briefing',
    subtitle: 'Weekly school assembly, hymns, address by the Head Prefect and Headteacher.',
    status: 'upcoming',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200&auto=format&fit=crop',
    speaker: 'Mr. Kagimu Francis',
    speakerRole: 'Headmaster, SMUK',
    viewersCount: 0,
    scheduledFor: 'Tomorrow, 07:45 AM GMT+3',
    duration: '45 mins',
    description: 'Live morning assembly covering examination debriefs, holiday safety tips, boarding clearance procedures, and sports updates.',
    category: 'Assembly',
    chatMessages: [],
  },
  {
    id: 'LIVE-003',
    title: 'Inter-House SETS Coding Hackathon Final Showdown',
    subtitle: 'Turing vs Curie vs Newton vs Mandela in live speed algorithm design.',
    status: 'recorded',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop',
    speaker: 'Mr. Byaruhanga Rogers',
    speakerRole: 'Director of ICT & Coding Club',
    viewersCount: 890,
    scheduledFor: 'Streamed Sep 18, 2026',
    duration: '2 hrs 10 min',
    description: 'Full replay of the heated 2-hour software development contest where students coded web portals and automated school bells.',
    category: 'Science & SETS',
    chatMessages: [
      { id: 'rec-1', sender: 'Old Boy Club', role: 'Parent', message: 'Incredible speed from Curie House!', timestamp: 'Recorded' },
    ],
  },
];

class DatabaseService {
  // Initialize and load
  private getStorage<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      if (!item) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
      return JSON.parse(item);
    } catch {
      return defaultValue;
    }
  }

  private setStorage<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('Storage error:', err);
    }
  }

  // --- Student Results Database ---
  getAllStudents(): StudentResult[] {
    return this.getStorage<StudentResult[]>(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
  }

  getStudentById(idOrStudentId: string): StudentResult | null {
    if (!idOrStudentId) return null;
    const cleanQuery = idOrStudentId.trim().toUpperCase().replace(/[\s\-_/]/g, '');
    const students = this.getAllStudents();
    return (
      students.find((s) => {
        const normId = s.studentId.toUpperCase().replace(/[\s\-_/]/g, '');
        const normAltId = s.id.toUpperCase().replace(/[\s\-_/]/g, '');
        return normId === cleanQuery || normAltId === cleanQuery || normId.includes(cleanQuery);
      }) || null
    );
  }

  saveStudent(student: StudentResult): StudentResult {
    const list = this.getAllStudents();
    const existingIndex = list.findIndex((s) => s.id === student.id || s.studentId === student.studentId);
    if (existingIndex >= 0) {
      list[existingIndex] = student;
    } else {
      list.unshift(student);
    }
    this.setStorage(STORAGE_KEYS.STUDENTS, list);
    return student;
  }

  deleteStudent(id: string): void {
    const list = this.getAllStudents().filter((s) => s.id !== id && s.studentId !== id);
    this.setStorage(STORAGE_KEYS.STUDENTS, list);
  }

  // --- Document Storage & Uploads ---
  getAllDocuments(): SchoolDocument[] {
    return this.getStorage<SchoolDocument[]>(STORAGE_KEYS.DOCUMENTS, INITIAL_DOCUMENTS);
  }

  uploadDocument(docData: Omit<SchoolDocument, 'id' | 'uploadDate' | 'downloadCount'>): SchoolDocument {
    const documents = this.getAllDocuments();
    const newDoc: SchoolDocument = {
      ...docData,
      id: `DOC-${Date.now().toString().slice(-6)}`,
      uploadDate: new Date().toISOString().split('T')[0],
      downloadCount: 0,
    };
    documents.unshift(newDoc);
    this.setStorage(STORAGE_KEYS.DOCUMENTS, documents);
    return newDoc;
  }

  incrementDownloadCount(id: string): void {
    const documents = this.getAllDocuments();
    const target = documents.find((d) => d.id === id);
    if (target) {
      target.downloadCount += 1;
      this.setStorage(STORAGE_KEYS.DOCUMENTS, documents);
    }
  }

  deleteDocument(id: string): void {
    const documents = this.getAllDocuments().filter((d) => d.id !== id);
    this.setStorage(STORAGE_KEYS.DOCUMENTS, documents);
  }

  // --- School Updates & Programs ---
  getAllUpdates(): SchoolUpdate[] {
    return this.getStorage<SchoolUpdate[]>(STORAGE_KEYS.UPDATES, INITIAL_UPDATES);
  }

  addUpdate(update: Omit<SchoolUpdate, 'id' | 'date'> & { date?: string }): SchoolUpdate {
    const updates = this.getAllUpdates();
    const newUpdate: SchoolUpdate = {
      ...update,
      id: `UPD-${Date.now().toString().slice(-6)}`,
      date: update.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    };
    updates.unshift(newUpdate);
    this.setStorage(STORAGE_KEYS.UPDATES, updates);
    return newUpdate;
  }

  // --- Live Stream Broadcasts ---
  getAllLiveStreams(): LiveStream[] {
    return this.getStorage<LiveStream[]>(STORAGE_KEYS.LIVE_STREAMS, INITIAL_LIVE_STREAMS);
  }

  sendChatMessage(streamId: string, message: { sender: string; role: 'Parent' | 'Student' | 'Teacher' | 'Admin'; message: string }): void {
    const streams = this.getAllLiveStreams();
    const stream = streams.find((s) => s.id === streamId);
    if (stream) {
      stream.chatMessages.push({
        id: `msg-${Date.now()}`,
        sender: message.sender,
        role: message.role,
        message: message.message,
        timestamp: 'Just now',
      });
      this.setStorage(STORAGE_KEYS.LIVE_STREAMS, streams);
    }
  }

  // Active student session
  getActiveStudentId(): string {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_STUDENT_ID) || 'SMUK-2024-042';
  }

  setActiveStudentId(id: string): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_STUDENT_ID, id);
  }

  // Reset to original demo data if needed
  resetToDefaults(): void {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(INITIAL_DOCUMENTS));
    localStorage.setItem(STORAGE_KEYS.UPDATES, JSON.stringify(INITIAL_UPDATES));
    localStorage.setItem(STORAGE_KEYS.LIVE_STREAMS, JSON.stringify(INITIAL_LIVE_STREAMS));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_STUDENT_ID, 'SMUK-2024-042');
  }
}

export const dbService = new DatabaseService();
