"use client";

import { useState } from 'react';
import { Question } from '../types';
import { Check, X, MessageSquare } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import FeedbackForm from './FeedbackForm';

interface QuizReportProps {
  questions: Question[];
  answers: { [key: number]: string };
  email: string;
}

export default function QuizReport({ questions, answers, email }: QuizReportProps) {
  const [showFeedback, setShowFeedback] = useState(false);

  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach((q, index) => {
      if (!answers[index]) {
        unanswered++;
      } else if (answers[index] === q.correct_answer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    return [
      { name: 'Correct', value: correct, color: 'hsl(var(--chart-2))' },
      { name: 'Incorrect', value: incorrect, color: 'hsl(var(--chart-1))' },
      { name: 'Unanswered', value: unanswered, color: 'hsl(var(--chart-3))' }
    ];
  };

  const results = calculateResults();
  const totalCorrect = results[0].value;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Quiz Results</h1>
        <p className="text-muted-foreground mb-4">Email: {email}</p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Score Overview</h2>
            <div className="text-4xl font-bold">
              {Math.round((totalCorrect / questions.length) * 100)}%
            </div>
            <div className="text-lg text-muted-foreground">
              {totalCorrect} out of {questions.length} questions correct
            </div>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={results}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {results.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => {
                    const entry = results.find(r => r.name === value);
                    return `${value}: ${entry?.value}`;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Detailed Review</h2>
            <button
              onClick={() => setShowFeedback(!showFeedback)}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              <MessageSquare className="w-4 h-4" />
              {showFeedback ? 'Hide Feedback' : 'Give Feedback'}
            </button>
          </div>

          {showFeedback && (
            <div className="border rounded-lg p-6 bg-secondary/10">
              <FeedbackForm email={email} />
            </div>
          )}

          {questions.map((question, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h3 className="font-medium mb-2" dangerouslySetInnerHTML={{ __html: question.question }} />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Your Answer:</p>
                  <div className="flex items-center space-x-2">
                    {answers[index] === question.correct_answer ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                    <span dangerouslySetInnerHTML={{ __html: answers[index] || 'Not answered' }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Correct Answer:</p>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span dangerouslySetInnerHTML={{ __html: question.correct_answer }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}