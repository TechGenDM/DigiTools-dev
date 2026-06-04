import React from "react";

const Examples: React.FC = () => {
  const examples = [
    {
      question: "What is 20% of 150?",
      answer: "30",
    },
    {
      question: "What percentage is 30 of 150?",
      answer: "20%",
    },
    {
      question: "Increase from 100 to 120?",
      answer: "20% increase",
    },
  ];

  return (
    <div className="glass-panel p-6 md:p-8 max-w-4xl mx-auto mb-16 relative z-10">
      <h2 className="font-display text-2xl font-semibold mb-6 text-slate-900 dark:text-white text-center">Example Calculations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {examples.map((example, index) => (
          <div key={index} className="p-5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-300">
            <p className="font-medium text-slate-700 dark:text-slate-300">{example.question}</p>
            <p className="text-primary font-bold text-xl mt-2 drop-shadow-md">{example.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Examples;
