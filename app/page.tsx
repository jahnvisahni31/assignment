"use client";

import { useState, useEffect } from "react";
import { Question, QuizState } from "./types";
import EmailForm from "./components/EmailForm";
import QuizQuestion from "./components/QuizQuestion";
import QuestionNavigation from "./components/QuestionNavigation";
import QuizTimer from "./components/QuizTimer";
import QuizReport from "./components/QuizReport";

const QUIZ_TIME = 30 * 60; // 30 minutes in seconds

export default function Home() {
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    answers: {},
    visitedQuestions: new Set<number>([0]),
    timeRemaining: QUIZ_TIME,
    email: "",
    isComplete: false,
  });

  // Fetch questions once the email is set
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=15");
        const data = await response.json();
        setQuizState((prev) => ({ ...prev, questions: data.results }));
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };

    if (quizState.email && quizState.questions.length === 0) {
      fetchQuestions();
    }
  }, [quizState.email]);

  // Timer logic
  useEffect(() => {
    if (quizState.email && !quizState.isComplete && quizState.questions.length > 0) {
      const timer = setInterval(() => {
        setQuizState((prev) => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizState.email, quizState.isComplete, quizState.questions.length]);

  const handleEmailSubmit = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setQuizState((prev) => ({ ...prev, email }));
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const handleAnswer = (answer: string) => {
    setQuizState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [prev.currentQuestionIndex]: answer },
    }));
  };

  const handleQuestionSelect = (index: number) => {
    setQuizState((prev) => ({
      ...prev,
      currentQuestionIndex: index,
      visitedQuestions: new Set([...Array.from(prev.visitedQuestions), index]), // Fix for Set iteration
    }));
  };

  const handleTimeUp = () => {
    setQuizState((prev) => ({ ...prev, isComplete: true }));
  };

  if (!quizState.email) {
    return <EmailForm onSubmit={handleEmailSubmit} />;
  }

  if (quizState.isComplete || quizState.timeRemaining <= 0) {
    return (
      <QuizReport
        questions={quizState.questions}
        answers={quizState.answers}
        email={quizState.email}
      />
    );
  }

  if (quizState.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Fetching quiz questions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 py-12">
      <QuizTimer timeRemaining={quizState.timeRemaining} onTimeUp={handleTimeUp} />

      <QuestionNavigation
        totalQuestions={quizState.questions.length}
        currentQuestion={quizState.currentQuestionIndex}
        visitedQuestions={quizState.visitedQuestions}
        answers={quizState.answers}
        onQuestionSelect={handleQuestionSelect}
      />

      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-center text-xl font-semibold">
            Question {quizState.currentQuestionIndex + 1} of {quizState.questions.length}
          </h2>
        </div>

        <QuizQuestion
          question={quizState.questions[quizState.currentQuestionIndex]}
          currentAnswer={quizState.answers[quizState.currentQuestionIndex]}
          onAnswer={handleAnswer}
        />

        <div className="flex justify-between max-w-3xl mx-auto mt-6">
          <button
            onClick={() => handleQuestionSelect(Math.max(0, quizState.currentQuestionIndex - 1))}
            disabled={quizState.currentQuestionIndex === 0}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          {quizState.currentQuestionIndex === quizState.questions.length - 1 ? (
            <button
              onClick={handleTimeUp}
              disabled={Object.keys(quizState.answers).length < quizState.questions.length}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() => handleQuestionSelect(quizState.currentQuestionIndex + 1)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
