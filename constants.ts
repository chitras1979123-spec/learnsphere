// Fix: Import React to enable JSX syntax parsing. Without this, TypeScript treats JSX tags like <svg> as invalid syntax.
import React from 'react';
import type { Course, Badge, LeaderboardEntry } from './types';

// Fix: Converted JSX to React.createElement to be valid in a .ts file.
const CodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" })
  )
);

// Fix: Converted JSX to React.createElement to be valid in a .ts file.
const DatabaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" })
  )
);

// Fix: Converted JSX to React.createElement to be valid in a .ts file.
const CloudIcon = (props: React.SVGProps<SVGSVGElement>) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-5.357-2.257 3.75 3.75 0 0 0-6.65-1.513A5.25 5.25 0 0 0 2.25 15Z" })
    )
);

// Fix: Converted JSX to React.createElement to be valid in a .ts file.
const SecurityIcon = (props: React.SVGProps<SVGSVGElement>) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Zm0 13.036h.008v.008h-.008v-.008Z" })
    )
);

// Fix: Converted JSX to React.createElement to be valid in a .ts file.
const DesignIcon = (props: React.SVGProps<SVGSVGElement>) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.47 2.118v-.09A12.75 12.75 0 0 1 8.5 4.97a12.75 12.75 0 0 1 6.954 2.823A8.96 8.96 0 0 1 18 18a8.96 8.96 0 0 1-2.346 6.023A12.75 12.75 0 0 1 8.5 21.75h-.614a3 3 0 0 0-3.638-3.023Z" })
    )
);

// Fix: Converted JSX to React.createElement to be valid in a .ts file.
const BadgeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", ...props },
    React.createElement('path', { fillRule: "evenodd", d: "M10 2a.75.75 0 01.75.75v.756a4.5 4.5 0 100 11.988V17.25a.75.75 0 01-1.5 0v-1.756a4.5 4.5 0 100-11.988V2.75A.75.75 0 0110 2zM8.5 4.5a.75.75 0 00-1.5 0v1.518a4.495 4.495 0 000 7.964V15.5a.75.75 0 001.5 0v-1.518a4.495 4.495 0 000-7.964V4.5zM10 6a4 4 0 100 8 4 4 0 000-8z", clipRule: "evenodd" })
  )
);

export const COURSES: Course[] = [
  {
    id: 1,
    title: "Java Full-Stack Development",
    description: "Master front-end and back-end development with Java, Spring Boot, and React.",
    icon: CodeIcon,
    topic: "Java Full-Stack with Spring Boot and React",
    modules: [
      { id: 1, title: "Introduction to Java", content: "Learn the basics of Java syntax, data types, and control flow." },
      { id: 2, title: "Spring Boot Essentials", content: "Build RESTful APIs quickly with Spring Boot." },
      { id: 3, title: "React for Beginners", content: "Understand components, state, and props in React." },
    ],
  },
  {
    id: 2,
    title: ".NET Core Web APIs",
    description: "Build powerful, cross-platform web APIs using C# and .NET Core.",
    icon: DatabaseIcon,
    topic: ".NET Core Web APIs",
    modules: [
      { id: 1, title: "C# Fundamentals", content: "Grasp the core concepts of the C# programming language." },
      { id: 2, title: "Building Your First API", content: "Create and run a simple web API with .NET Core." },
      { id: 3, title: "Entity Framework Core", content: "Interact with databases using EF Core for data persistence." },
    ],
  },
  {
    id: 3,
    title: "Cloud Native with Docker",
    description: "Learn to containerize your applications and manage them with Docker.",
    icon: CloudIcon,
    topic: "Cloud Native with Docker and Kubernetes",
    modules: [
        { id: 1, title: "What is Containerization?", content: "Understand the benefits of containers over virtual machines." },
        { id: 2, title: "Docker Fundamentals", content: "Learn Docker commands, Dockerfiles, and Docker Compose." },
        { id: 3, title: "Introduction to Kubernetes", content: "Orchestrate your containers at scale." },
    ],
  },
  {
    id: 4,
    title: "Cybersecurity Basics",
    description: "An introduction to the fundamental principles of cybersecurity.",
    icon: SecurityIcon,
    topic: "Cybersecurity Basics",
    modules: [
        { id: 1, title: "Common Threats", content: "Learn about malware, phishing, and denial-of-service attacks." },
        { id: 2, title: "Defensive Measures", content: "Explore firewalls, encryption, and secure coding practices." },
        { id: 3, title: "Ethical Hacking", content: "Understand how to test for vulnerabilities in a controlled way." },
    ],
  },
  {
    id: 5,
    title: "UI/UX Design Principles",
    description: "Create intuitive and beautiful user interfaces with core design principles.",
    icon: DesignIcon,
    topic: "UI/UX Design Principles",
    modules: [
        { id: 1, title: "User-Centered Design", content: "Learn to put the user first in your design process." },
        { id: 2, title: "Visual Hierarchy", content: "Guide the user's eye and create a clear flow of information." },
        { id: 3, title: "Prototyping & Testing", content: "Build interactive prototypes and gather user feedback." },
    ],
  }
];

export const BADGES: { [key: string]: Badge } = {
  'course-1': { id: 'course-1', name: "Java Pioneer", description: "Completed the Java Full-Stack course.", icon: BadgeIcon },
  'course-2': { id: 'course-2', name: ".NET Ninja", description: "Completed the .NET Core Web APIs course.", icon: BadgeIcon },
  'course-3': { id: 'course-3', name: "Cloud Commander", description: "Completed the Cloud Native with Docker course.", icon: BadgeIcon },
  'course-4': { id: 'course-4', name: "Security Sentinel", description: "Completed the Cybersecurity Basics course.", icon: BadgeIcon },
  'course-5': { id: 'course-5', name: "Design Virtuoso", description: "Completed the UI/UX Design Principles course.", icon: BadgeIcon },
  'perfect-quiz': { id: 'perfect-quiz', name: "Quiz Master", description: "Scored 100% on a quiz.", icon: BadgeIcon },
  'first-course': { id: 'first-course', name: "First Steps", description: "Completed your first course.", icon: BadgeIcon },
};

export const LEADERBOARD: LeaderboardEntry[] = [
    { name: "Alex R.", points: 1500, avatar: "https://i.pravatar.cc/48?u=1" },
    { name: "Ben C.", points: 1350, avatar: "https://i.pravatar.cc/48?u=2" },
    { name: "Chloe M.", points: 1200, avatar: "https://i.pravatar.cc/48?u=3" },
    { name: "David L.", points: 950, avatar: "https://i.pravatar.cc/48?u=4" },
];