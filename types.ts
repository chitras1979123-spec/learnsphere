// Fix: Import React to make the JSX namespace available to TypeScript, which is required for using types like JSX.Element.
import React from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  completedCourses: number[];
  badges: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Module {
  id: number;
  title: string;
  content: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  // Fix: Replaced JSX.Element with React.ReactElement to avoid issues with the global JSX namespace.
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  modules: Module[];
  topic: string; // Topic for Gemini to generate quiz questions
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  // Fix: Replaced JSX.Element with React.ReactElement to avoid issues with the global JSX namespace.
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
}

export interface LeaderboardEntry {
  name: string;
  points: number;
  avatar: string;
}

export type Page = "login" | "signup" | "dashboard" | "course" | "exam";