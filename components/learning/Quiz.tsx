
import React, { useState, useEffect, useCallback } from 'react';
import { generateQuiz } from '../../services/geminiService';
import type { QuizQuestion, User } from '../../types';
import Spinner from '../ui/Spinner';

interface QuizProps {
  courseId: number;
  courseTopic: string;
  onQuizComplete: (score: number, totalQuestions: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ courseId, courseTopic, onQuizComplete }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const fetchQuiz = useCallback(async () => {
    setIsLoading(true);
    const quizQuestions = await generateQuiz(courseTopic);
    setQuestions(quizQuestions);
    setSelectedAnswers(new Array(quizQuestions.length).fill(null));
    setIsLoading(false);
  }, [courseTopic]);

  useEffect(() => {
    fetchQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    let finalScore = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        finalScore++;
      }
    });
    setScore(finalScore);
    setIsFinished(true);
    onQuizComplete(finalScore, questions.length);
  };

  if (isLoading) {
    return (
      <div className="text-center p-8 bg-slate-800 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-teal-300">Generating Your Quiz...</h3>
        <p className="text-slate-400 mb-6">Our AI is crafting unique questions just for you!</p>
        <Spinner />
      </div>
    );
  }

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 60;
    return (
      <div className={`text-center p-8 bg-slate-800 rounded-lg border-2 ${passed ? 'border-green-500' : 'border-red-500'}`}>
        <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-xl mb-2">Your Score:</p>
        <p className={`text-5xl font-bold mb-4 ${passed ? 'text-green-400' : 'text-red-400'}`}>{score} / {questions.length}</p>
        <p className="text-lg mb-6 text-slate-300">({percentage}%)</p>
        {passed ? (
            <p className="text-green-300">Congratulations! You've passed the quiz and completed the course.</p>
        ) : (
            <p className="text-red-300">It looks like you struggled with some concepts. We recommend reviewing the modules again before retaking the quiz.</p>
        )}
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return null;

  return (
    <div className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl border border-slate-700">
      <div className="mb-6">
        <p className="text-sm text-teal-400 font-semibold">Question {currentQuestionIndex + 1} of {questions.length}</p>
        <h3 className="text-2xl font-bold mt-2 text-slate-100">{currentQuestion.question}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswers[currentQuestionIndex] === option;
            return (
                <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`p-4 rounded-lg text-left transition-all duration-200 border-2 ${
                    isSelected 
                    ? 'bg-teal-500 border-teal-400 text-white font-bold shadow-lg' 
                    : 'bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-slate-500'
                }`}
                >
                {option}
                </button>
            )
        })}
      </div>
      
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-2 bg-slate-600 rounded-lg hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswers.includes(null)}
            className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-transform duration-200 hover:scale-105"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestionIndex] === null}
            className="px-6 py-2 bg-teal-600 rounded-lg hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
