"use client";

import { useEffect } from 'react';
import { Clock } from 'lucide-react';

interface QuizTimerProps {
  timeRemaining: number;
  onTimeUp: () => void;
}

export default function QuizTimer({ timeRemaining, onTimeUp }: QuizTimerProps) {
  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeUp();
    }
  }, [timeRemaining, onTimeUp]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="fixed top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center space-x-2">
      <Clock className="w-5 h-5 text-primary animate-pulse" />
      <span className="font-mono text-xl">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}