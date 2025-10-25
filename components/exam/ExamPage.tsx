
import React, { useState } from 'react';
import ProctoringMonitor from './ProctoringMonitor';

interface ExamPageProps {
  onBack: () => void;
}

const MAX_WARNINGS = 3;

const EXAM_QUESTIONS = [
    {
        question: "In object-oriented programming, what is encapsulation?",
        options: ["The process of hiding the internal state and requiring all interaction to be performed through an object's methods.", "The ability of an object to take on many forms.", "A mechanism where a new class derives from an existing class.", "A way to define methods with the same name but different parameters."],
        correctAnswer: "The process of hiding the internal state and requiring all interaction to be performed through an object's methods."
    },
    {
        question: "Which of the following is a key feature of RESTful APIs?",
        options: ["Stateful communication", "Stateless communication", "Tight coupling between client and server", "XML-only data format"],
        correctAnswer: "Stateless communication"
    }
];

const ExamPage: React.FC<ExamPageProps> = ({ onBack }) => {
  const [warnings, setWarnings] = useState(0);
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>([null, null]);

  const handleWarning = (type: 'tab' | 'face') => {
    const message = type === 'tab' 
        ? "Warning: You have switched tabs. Please remain focused on the exam."
        : "Warning: Suspicious activity detected (e.g., looking away). Please keep your face in view.";
    alert(message);
    const newWarnings = warnings + 1;
    setWarnings(newWarnings);
    if (newWarnings >= MAX_WARNINGS) {
      setIsDisqualified(true);
    }
  };
  
  const handleAnswerSelect = (qIndex: number, answer: string) => {
    if(isDisqualified || isFinished) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[qIndex] = answer;
    setSelectedAnswers(newAnswers);
  };
  
  const handleSubmit = () => {
    setIsFinished(true);
  };

  if (isDisqualified) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
            <div className="bg-red-900/50 border-2 border-red-500 p-10 rounded-lg text-center shadow-2xl">
                <h1 className="text-4xl font-extrabold text-red-400 mb-4">Exam Terminated</h1>
                <p className="text-lg text-slate-300 mb-6">You have been disqualified due to exceeding the maximum number of warnings.</p>
                <button onClick={onBack} className="px-6 py-2 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors">Return to Dashboard</button>
            </div>
        </div>
    );
  }

  if (isFinished) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
            <div className="bg-green-900/50 border-2 border-green-500 p-10 rounded-lg text-center shadow-2xl">
                <h1 className="text-4xl font-extrabold text-green-400 mb-4">Exam Submitted</h1>
                <p className="text-lg text-slate-300 mb-6">Your answers have been recorded. Thank you for your participation.</p>
                <button onClick={onBack} className="px-6 py-2 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors">Return to Dashboard</button>
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Proctored Final Exam</h1>
        <p className="text-slate-400 mt-2">Maintain focus. Do not switch tabs or leave the testing area.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 space-y-8">
                {EXAM_QUESTIONS.map((q, qIndex) => (
                    <div key={qIndex}>
                        <h3 className="text-xl font-semibold mb-4 text-slate-200">{qIndex+1}. {q.question}</h3>
                        <div className="space-y-3">
                            {q.options.map((opt, oIndex) => (
                                <button
                                    key={oIndex}
                                    onClick={() => handleAnswerSelect(qIndex, opt)}
                                    className={`w-full text-left p-3 rounded-md transition-all duration-200 border-2 ${
                                        selectedAnswers[qIndex] === opt
                                        ? 'bg-teal-500 border-teal-400 text-white'
                                        : 'bg-slate-700 border-slate-600 hover:bg-slate-600'
                                    }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="mt-8 pt-6 border-t border-slate-700">
                    <button 
                        onClick={handleSubmit}
                        className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-transform duration-200 hover:scale-105"
                    >
                        Submit Final Exam
                    </button>
                </div>
            </div>
        </div>
        <div className="lg:col-span-1">
          <ProctoringMonitor onWarning={handleWarning} warnings={warnings} />
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
