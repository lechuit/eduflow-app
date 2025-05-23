// User interfaces
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  plan: SubscriptionPlan;
  preferences: UserPreferences;
  stats: UserStats;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: NotificationSettings;
  teaching: TeachingPreferences;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  classGenerated: boolean;
  weeklyReport: boolean;
}

export interface TeachingPreferences {
  defaultSubject?: string;
  defaultGrade?: string;
  preferredStyle: TeachingStyle;
  defaultDuration: number;
}

export interface UserStats {
  totalClasses: number;
  totalStudents: number;
  thisMonthClasses: number;
  avgClassRating: number;
}

export enum UserRole {
  TEACHER = 'teacher',
  ADMIN = 'admin'
}

export enum SubscriptionPlan {
  FREE = 'free',
  TEACHER = 'teacher',
  SCHOOL = 'school'
}

export enum TeachingStyle {
  VISUAL = 'visual',
  AUDITORY = 'auditory',
  KINESTHETIC = 'kinesthetic',
  BALANCED = 'balanced'
}

// Auth interfaces
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  acceptTerms: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordConfirm {
  token: string;
  password: string;
  confirmPassword: string;
}