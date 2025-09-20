"use client";

import { useEffect, useState } from "react";

export default function SleepCoachPage() {
  // 24hr login question logic (older version)
  const [lastLogin, setLastLogin] = useState<Date | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);

  useEffect(() => {
    // Simulate fetching last login from localStorage or API
    const last = localStorage.getItem("lastLogin");
    if (last) {
      const lastDate = new Date(last);
      setLastLogin(lastDate);
      const now = new Date();
      const diff = now.getTime() - lastDate.getTime();
      if (diff > 24 * 60 * 60 * 1000) {
        setShowQuestion(true);
      }
    } else {
      setShowQuestion(true);
    }
    // Update last login
    localStorage.setItem("lastLogin", new Date().toISOString());
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Sleep Coach</h1>
        {showQuestion ? (
          <div>
            <p className="mb-4">It's been over 24 hours since your last check-in. How did you sleep last night?</p>
            <input type="text" className="border rounded px-2 py-1 w-full mb-4" placeholder="Describe your sleep..." />
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
          </div>
        ) : (
          <p>Welcome back! You have already checked in within the last 24 hours.</p>
        )}
      </div>
    </div>
  );
}
