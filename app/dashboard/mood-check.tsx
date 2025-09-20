
"use client";
import React from "react";
import { QUESTIONS } from "./mood-check-questions";
import { handleMoodCheckSubmit } from "./mood-check-action";


export default function MoodCheck({ userId }: { userId: string }) {
  const [submitting, setSubmitting] = React.useState(false);

  async function clientHandleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    // @ts-ignore
    await handleMoodCheckSubmit(userId, formData);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Mood Check</h2>
        <form onSubmit={clientHandleSubmit} className="space-y-6">
          {QUESTIONS.map((q, i) => (
            <div key={q.id}>
              <p className="font-medium mb-2">{q.question}</p>
              <div className="flex flex-col gap-2">
                {q.options.map((opt, idx) => (
                  <label key={idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`q${i}`}
                      value={q.scores[idx]}
                      required={i === 0}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Finish & See Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
