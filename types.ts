import type React from 'react';

export interface Subject {
  name: string;
  // FIX: Specify that the icon element can accept a className prop to resolve React.cloneElement type errors.
  icon: React.ReactElement<{ className?: string }>;
  iconDark?: React.ReactElement<{ className?: string }>;
  color: string;
  cardColor: string;
}

export interface NavItem {
  name: string;
  // FIX: Specify that the icon element can accept a className prop to resolve React.cloneElement type errors.
  icon: React.ReactElement<{ className?: string }>;
}

// Add Quiz type definition for the new Quizzes feature
export interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  questions: QuizQuestion[];
}

export interface StudyPlanTask {
  time: string;
  subject: string;
  task: string;
}

export interface DailyStudyPlan {
  day: string;
  tasks: StudyPlanTask[];
}

export interface StudyPlanProgress {
    [dayIndex: number]: number[]; // array of completed task indices
}