import React from 'react';
import type { User, Course, LeaderboardEntry, Badge } from '../../types';
import { BADGES, COURSES, LEADERBOARD } from '../../constants';
import CourseCard from './CourseCard';

interface DashboardProps {
  user: User;
  onSelectCourse: (id: number) => void;
  onStartExam: () => void;
}

// Fix: Changed the type of the 'icon' prop from 'JSX.Element' to 'React.ReactNode' to resolve the 'Cannot find namespace JSX' error.
const StatCard: React.FC<{label: string; value: string | number; icon: React.ReactNode}> = ({label, value, icon}) => (
    <div className="bg-slate-800 p-4 rounded-lg flex items-center space-x-4 border border-slate-700">
        <div className="p-3 bg-slate-700 rounded-full">{icon}</div>
        <div>
            <p className="text-slate-400 text-sm">{label}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const TrophyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
    </svg>
);

const BookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m0 0a8.484 8.484 0 00-4.08-1.126 8.484 8.484 0 00-4.08 1.126V6.253a8.484 8.484 0 014.08-1.126 8.484 8.484 0 014.08 1.126z" />
    </svg>
);

const BadgeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
);

const Dashboard: React.FC<DashboardProps> = ({ user, onSelectCourse, onStartExam }) => {
  const userLeaderboard = [...LEADERBOARD, { name: `${user.name} (You)`, points: user.points, avatar: `https://i.pravatar.cc/48?u=${user.id}` }].sort((a, b) => b.points - a.points);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, <span className="text-teal-400">{user.name}!</span></h1>
      <p className="text-slate-400 mb-8">Ready to learn something new today?</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Your Points" value={user.points} icon={<TrophyIcon />} />
        <StatCard label="Courses Completed" value={`${user.completedCourses.length} / ${COURSES.length}`} icon={<BookIcon />} />
        <StatCard label="Badges Earned" value={user.badges.length} icon={<BadgeIcon />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            {/* Courses Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {COURSES.map(course => (
                    <CourseCard 
                        key={course.id} 
                        course={course} 
                        isCompleted={user.completedCourses.includes(course.id)}
                        onSelectCourse={onSelectCourse}
                    />
                ))}
                </div>
            </section>
        </div>

        <div className="lg:col-span-1 space-y-8">
          {/* Leaderboard Section */}
          <section className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
            <ul className="space-y-3">
              {userLeaderboard.slice(0, 5).map((entry, index) => (
                <li key={index} className={`flex items-center space-x-4 p-2 rounded-lg ${entry.name.includes('(You)') ? 'bg-teal-900/50' : ''}`}>
                  <span className="font-bold text-slate-400 w-6">{index + 1}</span>
                  <img src={entry.avatar} alt={entry.name} className="w-10 h-10 rounded-full" />
                  <span className="flex-grow font-semibold">{entry.name}</span>
                  <span className="font-bold text-teal-400">{entry.points} pts</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Badges Section */}
          <section className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-bold mb-4">Your Badges</h2>
            {user.badges.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                    {user.badges.map(badgeId => {
                        const badge = BADGES[badgeId];
                        return (
                            <div key={badge.id} className="text-center group" title={badge.description}>
                                <badge.icon className="h-12 w-12 text-purple-400 group-hover:text-purple-300 transition-colors mx-auto" />
                                <p className="text-xs mt-1 text-slate-400">{badge.name}</p>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <p className="text-slate-500 text-center py-4">Complete courses to earn badges!</p>
            )}
          </section>

          {/* Exam Section */}
          <section className="bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-xl text-white shadow-lg">
            <h2 className="text-xl font-bold mb-2">Final Examination</h2>
            <p className="mb-4 text-sm opacity-90">Ready to test your overall knowledge? This is a secure, proctored exam.</p>
            <button onClick={onStartExam} className="w-full bg-white text-red-600 font-bold py-2 px-4 rounded-lg hover:bg-red-100 transition-colors">
                Start Proctored Exam
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;