// Student interfaces
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  grade: string;
  dateOfBirth?: Date;
  parentEmail?: string;
  teacherId: string;
  profile: LearningProfile;
  progress: StudentProgress;
  metadata: StudentMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface LearningProfile {
  learningStyle: LearningStyle;
  academicLevel: AcademicLevel;
  strengths: string[];
  challenges: string[];
  interests: string[];
  accommodations: Accommodation[];
  preferredActivities: ActivityType[];
  attentionSpan: number; // minutes
  workingPace: WorkingPace;
}

export interface StudentProgress {
  totalClassesAttended: number;
  averagePerformance: number; // 0-100
  subjectPerformance: { [subject: string]: number };
  recentAssessments: AssessmentResult[];
  learningGoals: LearningGoal[];
  achievements: Achievement[];
  lastActiveDate: Date;
}

export interface AssessmentResult {
  id: string;
  classId: string;
  assessmentType: AssessmentType;
  score: number;
  maxScore: number;
  percentage: number;
  completedAt: Date;
  timeSpent: number; // minutes
  feedback?: string;
}

export interface LearningGoal {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  progress: number; // 0-100
  status: GoalStatus;
  createdAt: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: AchievementCategory;
}

export interface StudentMetadata {
  notes: string;
  tags: string[];
  emergencyContact?: EmergencyContact;
  medicalNotes?: string;
  behavioralNotes?: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface Accommodation {
  type: AccommodationType;
  description: string;
  isActive: boolean;
  addedAt: Date;
}

// Create/Update interfaces
export interface CreateStudentRequest {
  firstName: string;
  lastName: string;
  grade: string;
  dateOfBirth?: Date;
  parentEmail?: string;
  learningStyle?: LearningStyle;
  academicLevel?: AcademicLevel;
  strengths?: string[];
  challenges?: string[];
  interests?: string[];
  accommodations?: Accommodation[];
  notes?: string;
}

export interface UpdateStudentRequest extends Partial<CreateStudentRequest> {
  id: string;
}

// Enums
export enum LearningStyle {
  VISUAL = 'visual',
  AUDITORY = 'auditory',
  KINESTHETIC = 'kinesthetic',
  READING_WRITING = 'reading_writing',
  MULTIMODAL = 'multimodal'
}

export enum AcademicLevel {
  BELOW_GRADE = 'below_grade',
  AT_GRADE = 'at_grade',
  ABOVE_GRADE = 'above_grade',
  ADVANCED = 'advanced'
}

export enum WorkingPace {
  SLOW = 'slow',
  AVERAGE = 'average',
  FAST = 'fast'
}

export enum GoalStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  OVERDUE = 'overdue'
}

export enum AchievementCategory {
  ACADEMIC = 'academic',
  PARTICIPATION = 'participation',
  IMPROVEMENT = 'improvement',
  COLLABORATION = 'collaboration',
  CREATIVITY = 'creativity',
  MILESTONE = 'milestone'
}

export enum AccommodationType {
  EXTENDED_TIME = 'extended_time',
  REDUCED_DISTRACTIONS = 'reduced_distractions',
  VISUAL_SUPPORTS = 'visual_supports',
  AUDIO_SUPPORTS = 'audio_supports',
  MOVEMENT_BREAKS = 'movement_breaks',
  MODIFIED_ASSIGNMENTS = 'modified_assignments',
  ASSISTIVE_TECHNOLOGY = 'assistive_technology',
  PREFERENTIAL_SEATING = 'preferential_seating'
}

// Import necessary enums from class interface
import { ActivityType, AssessmentType } from './class.interface';