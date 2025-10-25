
import React from 'react';
import type { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  isCompleted: boolean;
  onSelectCourse: (id: number) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isCompleted, onSelectCourse }) => {
  return (
    <div className={`bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 transition-all duration-300 hover:shadow-cyan-500/20 hover:-translate-y-1 ${isCompleted ? 'opacity-60' : ''}`}>
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-slate-700 rounded-lg">
            <course.icon className="h-8 w-8 text-teal-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-100">{course.title}</h3>
          </div>
        </div>
        <p className="text-slate-400 mb-6 h-12">{course.description}</p>
        <div className="flex justify-between items-center">
            <button 
                onClick={() => onSelectCourse(course.id)}
                disabled={isCompleted}
                className="w-full px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-500 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
                {isCompleted ? 'Completed' : 'Start Learning'}
            </button>
            {isCompleted && (
                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    DONE
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
