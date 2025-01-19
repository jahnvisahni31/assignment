"use client";

import { cn } from "@/lib/utils";

interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestion: number;
  visitedQuestions: Set<number>;
  answers: { [key: number]: string };
  onQuestionSelect: (index: number) => void;
}

export default function QuestionNavigation({
  totalQuestions,
  currentQuestion,
  visitedQuestions,
  answers,
  onQuestionSelect,
}: QuestionNavigationProps) {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-sm font-semibold mb-3">Questions Overview</h3>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => (
          <button
            key={i}
            onClick={() => onQuestionSelect(i)}
            className={cn(
              "w-10 h-10 rounded-lg text-sm font-medium transition-all",
              "hover:scale-105 active:scale-95",
              currentQuestion === i && "ring-2 ring-primary",
              answers[i] ? "bg-green-100 dark:bg-green-900" : "bg-gray-100 dark:bg-gray-700",
              visitedQuestions.has(i) && !answers[i] && "bg-yellow-100 dark:bg-yellow-900"
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}