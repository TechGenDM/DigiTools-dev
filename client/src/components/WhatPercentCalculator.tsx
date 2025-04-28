import React, { useState, useEffect } from "react";

const WhatPercentCalculator: React.FC = () => {
  const [xValue, setXValue] = useState<string>("");
  const [yValue, setYValue] = useState<string>("");
  const [result, setResult] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);

  useEffect(() => {
    calculateWhatPercent();
  }, [xValue, yValue]);

  const calculateWhatPercent = () => {
    const x = parseFloat(xValue) || 0;
    const y = parseFloat(yValue) || 0;

    if (x && y) {
      setResult((x / y) * 100);
      setShowResult(true);
    } else {
      setResult(0);
      setShowResult(false);
    }
  };

  const handleXValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setXValue(e.target.value);
  };

  const handleYValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYValue(e.target.value);
  };

  return (
    <div id="calculator-x-is-what-percent" className="calculator-card bg-white rounded-lg shadow-card p-6 mb-6">
      <h2 className="font-poppins text-xl font-semibold mb-4">What percentage is X of Y?</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="what-x-value" className="block text-sm font-medium text-slate-700 mb-1">
              X Value
            </label>
            <input
              type="number"
              id="what-x-value"
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g. 30"
              value={xValue}
              onChange={handleXValueChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="what-y-value" className="block text-sm font-medium text-slate-700 mb-1">
              Y Value
            </label>
            <input
              type="number"
              id="what-y-value"
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g. 150"
              value={yValue}
              onChange={handleYValueChange}
            />
          </div>
        </div>
        <div className="result-box bg-slate-50 p-4 rounded-md">
          <p className="text-sm text-slate-500 mb-1">Result:</p>
          <div className="calculation-result font-medium text-lg" id="what-percent-result">
            <span className="text-[#4338ca] font-semibold">
              {result.toLocaleString('en-US', {maximumFractionDigits: 2})}%
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2" id="what-percent-equation">
            {showResult 
              ? `${xValue} is ${result.toLocaleString('en-US', {maximumFractionDigits: 2})}% of ${yValue}`
              : "Enter values to see the calculation"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatPercentCalculator;
