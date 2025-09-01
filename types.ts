import type React from 'react';

export interface Subject {
  name: string;
  // FIX: Specify that the icon element can accept a className prop to resolve React.cloneElement type errors.
  icon: React.ReactElement<{ className?: string }>;
  color: string;
}

export interface NavItem {
  name: string;
  // FIX: Specify that the icon element can accept a className prop to resolve React.cloneElement type errors.
  icon: React.ReactElement<{ className?: string }>;
}

// FIX: Add ChatMessage type definition for StudyBuddy component
export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}
