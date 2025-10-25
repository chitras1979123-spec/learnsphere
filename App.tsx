import React, { useState, useEffect } from 'react';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import Dashboard from './components/dashboard/Dashboard';
import CoursePage from './components/learning/CoursePage';
import ExamPage from './components/exam/ExamPage';
import { COURSES } from './constants';
import type { User, Page } from './types';

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('learnsphere-user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [page, setPage] = useState<Page>('login');
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('learnsphere-user', JSON.stringify(currentUser));
            setPage('dashboard');
        } else {
            localStorage.removeItem('learnsphere-user');
            setPage('login');
        }
    }, [currentUser]);
    
    const handleLogin = (name: string) => {
        // Mock user creation
        setCurrentUser({
            id: `user_${Date.now()}`,
            name,
            email: `${name.toLowerCase().replace(' ', '.')}@learnsphere.com`,
            points: 120,
            completedCourses: [],
            badges: [],
        });
    };

    const handleLogout = () => {
        setCurrentUser(null);
    };

    const handleSelectCourse = (id: number) => {
        setSelectedCourseId(id);
        setPage('course');
    };
    
    const handleQuizComplete = (score: number, totalQuestions: number) => {
        if (!currentUser || !selectedCourseId) return;

        const percentage = (score / totalQuestions) * 100;
        if (percentage >= 60 && !currentUser.completedCourses.includes(selectedCourseId)) {
            const newPoints = currentUser.points + 150 + (percentage === 100 ? 50 : 0);
            
            const newBadges = [...currentUser.badges];
            if (!newBadges.includes(`course-${selectedCourseId}`)) {
                newBadges.push(`course-${selectedCourseId}`);
            }
            if (currentUser.completedCourses.length === 0 && !newBadges.includes('first-course')) {
                newBadges.push('first-course');
            }
             if (percentage === 100 && !newBadges.includes('perfect-quiz')) {
                newBadges.push('perfect-quiz');
            }

            setCurrentUser({
                ...currentUser,
                points: newPoints,
                completedCourses: [...currentUser.completedCourses, selectedCourseId],
                badges: newBadges,
            });
        }
    };
    
    const renderContent = () => {
        if (!currentUser) {
            switch (page) {
                case 'signup':
                    return <SignupPage onSignup={handleLogin} onSwitchToLogin={() => setPage('login')} />;
                case 'login':
                default:
                    return <LoginPage onLogin={handleLogin} onSwitchToSignup={() => setPage('signup')} />;
            }
        }
        
        switch (page) {
            case 'course':
                const course = COURSES.find(c => c.id === selectedCourseId);
                if (course) {
                    return <CoursePage 
                                course={course} 
                                onBack={() => setPage('dashboard')} 
                                onQuizComplete={(score, total) => {
                                    handleQuizComplete(score, total);
                                    // Optionally, navigate back after a delay
                                    setTimeout(() => setPage('dashboard'), 3000);
                                }} 
                           />;
                }
                // Fallback to dashboard if course not found
                return <Dashboard user={currentUser} onSelectCourse={handleSelectCourse} onStartExam={() => setPage('exam')} />;
            case 'exam':
                return <ExamPage onBack={() => setPage('dashboard')} />;
            case 'dashboard':
            default:
                return <Dashboard user={currentUser} onSelectCourse={handleSelectCourse} onStartExam={() => setPage('exam')} />;
        }
    };

    return (
        <main>
            {currentUser && (
                <header className="bg-slate-800/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-700">
                    <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                        <span className="text-2xl font-bold text-white">Learn<span className="text-teal-400">Sphere</span></span>
                        <div className="flex items-center space-x-4">
                            <span className="font-semibold text-slate-300">{currentUser.name}</span>
                            <button onClick={handleLogout} className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-500 text-white font-semibold rounded-md transition-colors">
                                Logout
                            </button>
                        </div>
                    </nav>
                </header>
            )}
            {renderContent()}
        </main>
    );
};

export default App;