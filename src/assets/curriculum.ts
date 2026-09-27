/**
 * Uganda National Curriculum Development Centre (NCDC)
 * New Lower Secondary Curriculum (NLSC) - Competency Based Curriculum (CBC)
 * Official Subject Registry, Grading Matrices, and Assessment Standards
 */

export interface CurriculumSubjectDef {
  code: string;
  name: string;
  category: 'Compulsory Core' | 'Elective / Vocational' | 'Religious Education' | 'Project Work';
  level: 'S1-S4' | 'S1-S2 Compulsory' | 'S3-S4 Elective' | 'All Levels';
  department: string;
  description: string;
  keyCompetencies: string[];
}

export const UGANDAN_NEW_CURRICULUM_SUBJECTS: CurriculumSubjectDef[] = [
  // 11 Core Compulsory Subjects in S.1 & S.2 / Core in S.3 & S.4
  {
    code: 'ENG',
    name: 'English Language',
    category: 'Compulsory Core',
    level: 'S1-S4',
    department: 'Languages & Humanities',
    description: 'Focuses on functional communication, reading comprehension, critical analysis of texts, persuasive writing, and public speaking.',
    keyCompetencies: ['Critical reading', 'Functional & essay writing', 'Oral debate & presentation', 'Grammatical accuracy'],
  },
  {
    code: 'MTC',
    name: 'Mathematics',
    category: 'Compulsory Core',
    level: 'S1-S4',
    department: 'Mathematics & Computing',
    description: 'Emphasizes practical mathematical modeling, algebra, geometry, statistics, financial arithmetic, and logical problem solving.',
    keyCompetencies: ['Mathematical modeling', 'Algebraic manipulation', 'Data handling & probability', 'Spatial & geometric reasoning'],
  },
  {
    code: 'PHY',
    name: 'Physics',
    category: 'Compulsory Core',
    level: 'S1-S4',
    department: 'Physical Sciences',
    description: 'Investigates mechanics, thermodynamics, electromagnetism, wave theory, modern electronics, and hands-on technological experiments.',
    keyCompetencies: ['Scientific inquiry & experimentation', 'Circuitry & electronics', 'Energy conservation & efficiency', 'Mechanics calculations'],
  },
  {
    code: 'CHE',
    name: 'Chemistry',
    category: 'Compulsory Core',
    level: 'S1-S4',
    department: 'Physical Sciences',
    description: 'Explores matter and its changes, atomic structure, stoichiometric calculations, environmental chemistry, and green laboratory practices.',
    keyCompetencies: ['Laboratory safety & apparatus mastery', 'Chemical stoichiometry', 'Environmental monitoring', 'Organic & inorganic synthesis'],
  },
  {
    code: 'BIO',
    name: 'Biology',
    category: 'Compulsory Core',
    level: 'S1-S4',
    department: 'Biological & Health Sciences',
    description: 'Covers cell biology, plant and animal physiology, ecological stewardship, genetics, public health, and disease prevention in Uganda.',
    keyCompetencies: ['Microscopic observation & dissection', 'Ecological field sampling', 'Health & hygiene advocacy', 'Genetics & biotechnology fundamentals'],
  },
  {
    code: 'GEO',
    name: 'Geography',
    category: 'Compulsory Core',
    level: 'S1-S4',
    department: 'Earth & Environmental Studies',
    description: 'Examines physical geography of East Africa, photographic interpretation, cartography, climate change, and sustainable natural resources.',
    keyCompetencies: ['Map reading & grid references', 'Photographic & satellite image analysis', 'Fieldwork research', 'Environmental sustainability planning'],
  },
  {
    code: 'HPE',
    name: 'History & Political Education',
    category: 'Compulsory Core',
    level: 'S1-S4',
    department: 'Social Studies & Governance',
    description: 'Replaces traditional History in the new curriculum. Explores Uganda’s political evolution, constitution, human rights, Pan-Africanism, and global governance.',
    keyCompetencies: ['Constitutional literacy', 'Historical causality & source critique', 'Civic participation & conflict resolution', 'Pan-African heritage appreciation'],
  },
  {
    code: 'PED',
    name: 'Physical Education (PE)',
    category: 'Compulsory Core',
    level: 'S1-S2 Compulsory',
    department: 'Physical Education & Sports Science',
    description: 'Compulsory in S.1 & S.2. Promotes physical fitness, cardiovascular health, sportsmanship, athletics, gymnastics, and healthy living.',
    keyCompetencies: ['Athletic performance & motor skills', 'Teamwork & refereeing ethics', 'First aid & fitness monitoring', 'Recreational wellness'],
  },
  {
    code: 'KIS',
    name: 'Kiswahili',
    category: 'Compulsory Core',
    level: 'S1-S2 Compulsory',
    department: 'African Languages',
    description: 'Compulsory in S.1 & S.2 as East Africa’s regional lingua franca. Covers functional dialogues, grammar, composition, and literature.',
    keyCompetencies: ['Conversational fluency', 'Grammatical accuracy & sarufi', 'Reading comprehension', 'Cross-border cultural etiquette'],
  },
  {
    code: 'CRE',
    name: 'Christian Religious Education (CRE)',
    category: 'Religious Education',
    level: 'S1-S4',
    department: 'Religious & Ethical Studies',
    description: 'Fosters moral reflection, biblical principles, ethical leadership, empathy, and constructive community service.',
    keyCompetencies: ['Ethical discernment', 'Biblical textual interpretation', 'Community service leadership', 'Interpersonal moral empathy'],
  },
  {
    code: 'IRE',
    name: 'Islamic Religious Education (IRE)',
    category: 'Religious Education',
    level: 'S1-S4',
    department: 'Religious & Ethical Studies',
    description: 'Covers Quranic recitation, Hadith scholarship, Islamic jurisprudence (Fiqh), ethical values, and Islamic history.',
    keyCompetencies: ['Quranic analysis & values', 'Fiqh application in daily life', 'Moral integrity & charitable action', 'Historical Islamic civilization'],
  },
  {
    code: 'ENT',
    name: 'Entrepreneurship Education',
    category: 'Compulsory Core',
    level: 'S1-S2 Compulsory',
    department: 'Business & Vocational Studies',
    description: 'Compulsory in S.1 & S.2. Equips learners with startup creation, market surveying, financial record-keeping, and business ethics.',
    keyCompetencies: ['Business plan formulation', 'Market research & ideation', 'Financial bookkeeping & budgeting', 'Customer service & marketing'],
  },

  // Elective & Vocational Subjects
  {
    code: 'ICT',
    name: 'Information & Communications Technology (ICT)',
    category: 'Elective / Vocational',
    level: 'All Levels',
    department: 'Computer Science & SETS',
    description: 'Explores computer systems, web design, programming (Python & Scratch), database queries, digital graphics, and cyber hygiene.',
    keyCompetencies: ['Algorithm & coding fundamentals', 'Spreadsheet data modeling', 'Web development', 'Safe digital citizenship'],
  },
  {
    code: 'AGR',
    name: 'Agriculture',
    category: 'Elective / Vocational',
    level: 'All Levels',
    department: 'Agricultural Sciences',
    description: 'Core vocational subject in Uganda. Teaches crop production, animal husbandry, soil science, farm machinery, and modern agribusiness.',
    keyCompetencies: ['Soil fertility & composting', 'Crop pest & disease management', 'Livestock management', 'Agribusiness financial accounting'],
  },
  {
    code: 'ART',
    name: 'Art and Design',
    category: 'Elective / Vocational',
    level: 'All Levels',
    department: 'Creative & Visual Arts',
    description: 'Emphasizes drawing, painting, graphic design, textile printing, sculpture, ceramics, and craft marketing.',
    keyCompetencies: ['Visual composition & shading', 'Traditional craft technique', 'Digital graphic creation', 'Portfolio curation'],
  },
  {
    code: 'PA',
    name: 'Performing Arts (Music, Dance & Drama)',
    category: 'Elective / Vocational',
    level: 'All Levels',
    department: 'Performing Arts',
    description: 'Explores vocal music, traditional Ugandan musical instruments, theatrical scripting, choreography, and stage management.',
    keyCompetencies: ['Musical performance & notation', 'Dramatic scripting & acting', 'Choreography & cultural dance', 'Stage lighting & audio management'],
  },
  {
    code: 'NFT',
    name: 'Nutrition & Food Technology',
    category: 'Elective / Vocational',
    level: 'All Levels',
    department: 'Human Ecology & Hospitality',
    description: 'Teaches nutritional science, dietary planning, food preservation, bakery, culinary artistry, and hospitality enterprise.',
    keyCompetencies: ['Nutritional meal balancing', 'Food preservation & hygiene', 'Culinary preparation & baking', 'Catering enterprise planning'],
  },
  {
    code: 'TD',
    name: 'Technology & Design',
    category: 'Elective / Vocational',
    level: 'All Levels',
    department: 'Engineering & Industrial Tech',
    description: 'Covers technical drawing, woodwork, metal fabrication, architectural drafting, and prototyping mechanical devices.',
    keyCompetencies: ['Orthographic & isometric drawing', 'Wood & metal joinery', 'Safety protocol execution', 'Structural design'],
  },
  {
    code: 'LIT',
    name: 'Literature in English',
    category: 'Elective / Vocational',
    level: 'All Levels',
    department: 'Languages & Humanities',
    description: 'Delves into African and world prose, poetry, and drama. Encourages thematic analysis, empathetic critique, and creative writing.',
    keyCompetencies: ['Thematic text analysis', 'Character critique', 'Poetic interpretation', 'Creative literary writing'],
  },
  {
    code: 'LUG',
    name: 'Luganda / Local Language',
    category: 'Elective / Vocational',
    level: 'All Levels',
    department: 'African Languages & Cultural Heritage',
    description: 'Promotes deep appreciation of Ugandan linguistic heritage, proverbs, idioms, oral traditions, and formal writing in mother tongue.',
    keyCompetencies: ['Linguistic fluency & orthography', 'Cultural folklore interpretation', 'Proverbs and idioms usage', 'Translation & transcription'],
  },
  {
    code: 'FRE',
    name: 'French Language',
    category: 'Elective / Vocational',
    level: 'All Levels',
    department: 'Foreign Languages',
    description: 'Instruction in modern French for international diplomatic and commerce communication across the Francophone world.',
    keyCompetencies: ['Conversational French', 'Listening comprehension', 'Written composition', 'Cultural awareness'],
  },

  // Mandatory Capstone Continuous Assessment
  {
    code: 'PRJ',
    name: 'General Project Work (NCDC)',
    category: 'Project Work',
    level: 'S1-S4',
    department: 'SETS Interdisciplinary Innovation',
    description: 'Mandatory cross-curricular capstone under the Ugandan New Curriculum. Students identify community challenges, build functional prototypes or enterprise solutions, and compile an official portfolio submitted to UNEB.',
    keyCompetencies: ['Community needs assessment', 'Hands-on prototyping & fabrication', 'Project management & budgeting', 'Public exhibition & defense'],
  },
];

/**
 * Ugandan CBC Competence Scale (Score out of 3.0)
 */
export interface CompetencyLevelInfo {
  level: 'Level 3 (Outstanding)' | 'Level 2 (Achieved)' | 'Level 1 (Basic)';
  minScore: number; // out of 3.0
  maxScore: number;
  letterGrade: 'A' | 'B' | 'C';
  description: string;
  unebInterpretation: string;
}

export const UGANDAN_COMPETENCY_LEVELS: CompetencyLevelInfo[] = [
  {
    level: 'Level 3 (Outstanding)',
    minScore: 2.5,
    maxScore: 3.0,
    letterGrade: 'A',
    description: 'Produces high-quality work, shows deep understanding, and transfers knowledge and skills to novel situations independently.',
    unebInterpretation: 'Highest level of competence achieved (Distinction Grade A)',
  },
  {
    level: 'Level 2 (Achieved)',
    minScore: 1.5,
    maxScore: 2.4,
    letterGrade: 'B',
    description: 'Has achieved the learning outcomes and proficiently applies knowledge and skills in familiar everyday situations.',
    unebInterpretation: 'Standard benchmark competence achieved (Credit Grade B)',
  },
  {
    level: 'Level 1 (Basic)',
    minScore: 0.9,
    maxScore: 1.4,
    letterGrade: 'C',
    description: 'Acquires basic knowledge and foundational skills, requiring guidance and targeted practice to attain proficiency.',
    unebInterpretation: 'Foundation competence emerging (Pass Grade C)',
  },
];

/**
 * Compute Ugandan New Lower Secondary Curriculum values:
 * - AoI: 20%
 * - End of Term (EOT): 80%
 * - Total: 100%
 * - Score out of 3.0
 * - Competency Level & Letter Grade
 */
export function calculateUgandanCbcScore(aoiScore: number, endTermScore: number): {
  totalScore: number;
  scoreOutOf3: number;
  competencyLevel: 'Level 3 (Outstanding)' | 'Level 2 (Achieved)' | 'Level 1 (Basic)';
  grade: 'A' | 'B' | 'C';
} {
  const totalScore = Math.round(aoiScore + endTermScore);
  const scoreOutOf3 = Math.min(3.0, Math.max(0.0, Number(((totalScore / 100) * 3).toFixed(1))));

  let competencyLevel: 'Level 3 (Outstanding)' | 'Level 2 (Achieved)' | 'Level 1 (Basic)';
  let grade: 'A' | 'B' | 'C';

  if (scoreOutOf3 >= 2.5) {
    competencyLevel = 'Level 3 (Outstanding)';
    grade = 'A';
  } else if (scoreOutOf3 >= 1.5) {
    competencyLevel = 'Level 2 (Achieved)';
    grade = 'B';
  } else {
    competencyLevel = 'Level 1 (Basic)';
    grade = 'C';
  }

  return { totalScore, scoreOutOf3, competencyLevel, grade };
}
