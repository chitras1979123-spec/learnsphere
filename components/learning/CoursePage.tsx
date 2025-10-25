
import React, { useState } from 'react';
import type { Course } from '../../types';
import Quiz from './Quiz';

interface CoursePageProps {
  course: Course;
  onBack: () => void;
  onQuizComplete: (score: number, totalQuestions: number) => void;
}

const CoursePage: React.FC<CoursePageProps> = ({ course, onBack, onQuizComplete }) => {
  const [activeTab, setActiveTab] = useState<'module' | 'quiz'>('module');
  const [selectedModuleId, setSelectedModuleId] = useState(course.modules[0].id);

  const selectedModule = course.modules.find(m => m.id === selectedModuleId);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <button onClick={onBack} className="mb-6 flex items-center text-teal-400 hover:text-teal-300 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back to Dashboard
      </button>

      <header className="mb-8">
        <div className="flex items-center space-x-4">
            <course.icon className="h-12 w-12 text-teal-400" />
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400">{course.title}</h1>
        </div>
        <p className="mt-2 text-lg text-slate-400">{course.description}</p>
      </header>
      
      <div className="flex border-b border-slate-700 mb-6">
        <button 
          onClick={() => setActiveTab('module')}
          className={`px-4 py-2 text-lg font-medium transition-colors ${activeTab === 'module' ? 'border-b-2 border-teal-400 text-teal-400' : 'text-slate-400 hover:text-white'}`}
        >
          Modules
        </button>
        <button 
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2 text-lg font-medium transition-colors ${activeTab === 'quiz' ? 'border-b-2 border-teal-400 text-teal-400' : 'text-slate-400 hover:text-white'}`}
        >
          Final Quiz
        </button>
      </div>

      {activeTab === 'module' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4 text-slate-300">Course Content</h3>
            <ul className="space-y-2">
              {course.modules.map(module => (
                <li key={module.id}>
                  <button 
                    onClick={() => setSelectedModuleId(module.id)}
                    className={`w-full text-left p-3 rounded-md transition-all duration-200 ${selectedModuleId === module.id ? 'bg-teal-600 text-white font-semibold' : 'bg-slate-800 hover:bg-slate-700'}`}
                  >
                    {module.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3 bg-slate-800 p-6 rounded-lg border border-slate-700 min-h-[300px]">
            {selectedModule ? (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-teal-300">{selectedModule.title}</h2>
                <p className="text-slate-300 leading-relaxed">{selectedModule.content}</p>
              </div>
            ) : (
              <p>Select a module to begin.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'quiz' && (
        <div>
            <h2 className="text-3xl font-bold mb-4">Final Quiz</h2>
            <p className="text-slate-400 mb-6">Test your knowledge to complete the course. A score of 60% or higher is required to pass.</p>
            <Quiz courseId={course.id} courseTopic={course.topic} onQuizComplete={onQuizComplete}/>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
