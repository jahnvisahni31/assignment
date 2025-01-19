"use client";

import { useState } from 'react';
import { Mail } from 'lucide-react';

interface EmailFormProps {
  onSubmit: (email: string) => void;
}

export default function EmailForm({ onSubmit }: EmailFormProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Welcome to the Quiz</h1>
          <p className="text-muted-foreground">Enter your email to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium
                     hover:opacity-90 transition-opacity"
          >
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
}