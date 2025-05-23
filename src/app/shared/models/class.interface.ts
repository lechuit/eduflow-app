// Class generation interfaces
export interface Class {
  id: string;
  title: string;
  subject: string;
  topic: string;
  grade: string;
  duration: number; // minutes
  objectives: string[];
  content: ClassContent;
  activities: Activity[];
  assessment: Assessment;
  resources: Resource[];
  teacherId: string;
  studentIds: string[];
  metadata: ClassMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClassContent {
  introduction: string;
  mainContent: ContentSection[];
  conclusion: string;
  homework?: string;
}

export interface ContentSection {
  title: string;
  content: string;
  duration: number; // minutes
  type: ContentType;
  difficulty: DifficultyLevel;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  type: ActivityType;
  duration: number; // minutes
  difficulty: DifficultyLevel;
  instructions: string[];
  materials: string[];
  adaptations?: StudentAdaptation[];
}

export interface Assessment {
  type: AssessmentType;
  questions: Question[];
  rubric?: Rubric;
  passingScore?: number;
}

export interface Question {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[]; // for multiple choice
  correctAnswer: string | string[];
  points: number;
  difficulty: DifficultyLevel;
}

export interface Rubric {
  criteria: RubricCriterion[];
  totalPoints: number;
}

export interface RubricCriterion {
  name: string;
  description: string;
  maxPoints: number;
  levels: RubricLevel[];
}

export interface RubricLevel {
  name: string;
  description: string;
  points: number;
}

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  url?: string;
  content?: string;
  description: string;
}

export interface ClassMetadata {
  generationTime: number; // seconds
  aiVersion: string;
  adaptationCount: number;
  rating?: number;
  feedback?: string;
  tags: string[];
}

// Class generation request
export interface ClassGenerationRequest {
  subject: string;
  topic: string;
  grade: string;
  duration: number;
  studentIds: string[];
  objectives?: string[];
  style?: TeachingStyle;
  difficulty?: DifficultyLevel;
  includeAssessment: boolean;
  includeHomework: boolean;
  customInstructions?: string;
}

export interface GeneratedClass {
  id: string;
  class: Class;
  adaptations: StudentAdaptation[];
  metadata: GenerationMetadata;
}

export interface GenerationMetadata {
  processingTime: number;
  tokensUsed: number;
  adaptationsGenerated: number;
  confidence: number;
}

// Student adaptations
export interface StudentAdaptation {
  studentId: string;
  adaptationType: AdaptationType;
  content: any; // Flexible content based on adaptation type
  reasoning: string;
}

// Enums
export enum ContentType {
  LECTURE = 'lecture',
  DISCUSSION = 'discussion',
  DEMONSTRATION = 'demonstration',
  PRACTICE = 'practice',
  REVIEW = 'review'
}

export enum ActivityType {
  INDIVIDUAL = 'individual',
  GROUP = 'group',
  PAIR = 'pair',
  PRESENTATION = 'presentation',
  EXPERIMENT = 'experiment',
  GAME = 'game',
  RESEARCH = 'research'
}

export enum AssessmentType {
  QUIZ = 'quiz',
  TEST = 'test',
  PROJECT = 'project',
  PRESENTATION = 'presentation',
  OBSERVATION = 'observation',
  PORTFOLIO = 'portfolio'
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  SHORT_ANSWER = 'short_answer',
  ESSAY = 'essay',
  FILL_BLANK = 'fill_blank'
}

export enum ResourceType {
  VIDEO = 'video',
  ARTICLE = 'article',
  IMAGE = 'image',
  DOCUMENT = 'document',
  LINK = 'link',
  WORKSHEET = 'worksheet'
}

export enum DifficultyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

export enum AdaptationType {
  CONTENT_SIMPLIFICATION = 'content_simplification',
  VISUAL_AIDS = 'visual_aids',
  ADDITIONAL_PRACTICE = 'additional_practice',
  ADVANCED_CHALLENGE = 'advanced_challenge',
  LEARNING_STYLE = 'learning_style',
  ACCESSIBILITY = 'accessibility'
}

export enum TeachingStyle {
  VISUAL = 'visual',
  AUDITORY = 'auditory',
  KINESTHETIC = 'kinesthetic',
  BALANCED = 'balanced'
}