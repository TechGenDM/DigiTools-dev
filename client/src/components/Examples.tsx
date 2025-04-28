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
    <div className="bg-white rounded-lg shadow-card p-6 mb-6">
      <h2 className="font-poppins text-xl font-semibold mb-4">Example Calculations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {examples.map((example, index) => (
          <div key={index} className="p-3 bg-slate-50 rounded-md">
            <p className="font-medium">{example.question}</p>
            <p className="text-[#4338ca] font-semibold mt-1">{example.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Examples;
