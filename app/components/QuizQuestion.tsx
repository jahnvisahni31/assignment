"use client";

import { useState, useEffect } from 'react';
import { Question } from '../types';
import { cn } from '@/lib/utils';

interface QuizQuestionProps {
  question: Question;
  currentAnswer: string | undefined;
  onAnswer: (answer: string) => void;
}

export default function QuizQuestion({ question, currentAnswer, onAnswer }: QuizQuestionProps) {
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  useEffect(() => {
    const answers = [...question.incorrect_answers, question.correct_answer];
    setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
  }, [question]);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4" 
            dangerouslySetInnerHTML={{ __html: question.question }} />
        
        <div className="space-y-3">
          {shuffledAnswers.map((answer, index) => (
            <button
              key={index}
              onClick={() => onAnswer(answer)}
              className={cn(
                "w-full p-4 text-left rounded-lg transition-all",
                "hover:bg-gray-100 dark:hover:bg-gray-700",
                currentAnswer === answer && "bg-primary text-primary-foreground"
              )}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center text-sm text-muted-foreground">
          <span className="px-2 py-1 rounded bg-secondary">
            {question.category}
          </span>
          <span className="ml-2 px-2 py-1 rounded bg-secondary">
            {question.difficulty}
          </span>
        </div>
      </div>
    </div>
  );
}