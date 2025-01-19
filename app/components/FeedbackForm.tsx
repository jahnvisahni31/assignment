"use client";

interface FeedbackFormProps {
  email: string;
}

export default function FeedbackForm({ email }: FeedbackFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const feedback = formData.get("feedback") as string;

    // Replace this with actual logic to submit feedback
    console.log(`Feedback from ${email}:`, feedback);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
          Your Feedback
        </label>
        <textarea
          id="feedback"
          name="feedback"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Share your thoughts about the quiz..."
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Submit Feedback
      </button>
    </form>
  );
}
