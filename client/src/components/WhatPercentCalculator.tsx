import React, { useState, useEffect } from "react";

const WhatPercentCalculator: React.FC = () => {
  const [value1, setValue1] = useState<string>("");
  const [value2, setValue2] = useState<string>("");
  const [result, setResult] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);

  useEffect(() => {
    calculateWhatPercent();
  }, [value1, value2]);

  const calculateWhatPercent = () => {
    const v1 = parseFloat(value1) || 0;
    const v2 = parseFloat(value2) || 0;

    if (v1 && v2 !== 0) {
      setResult((v1 / v2) * 100);
      setShowResult(true);
    } else {
      setResult(0);
      setShowResult(false);
    }
  };

  return (
    <div id="calculator-what-percent" className="relative p-6 z-10">
      <h2 className="font-display text-2xl font-semibold mb-6 text-slate-900 dark:text-white text-center">What % is X of Y?</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor="value-1" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Value (X)
            </label>
            <input
              type="number"
              id="value-1"
              className="glass-input w-full px-4 py-3 bg-transparent"
              placeholder="e.g. 50"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="value-2" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Total Value (Y)
            </label>
            <input
              type="number"
              id="value-2"
              className="glass-input w-full px-4 py-3 bg-transparent"
              placeholder="e.g. 200"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
            />
          </div>
        </div>
        
        <div className={`result-box mt-8 ${showResult ? 'opacity-100' : 'opacity-50'}`}>
          <div className="calculation-result text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 font-light tracking-wide uppercase">Result</p>
            <div className="font-display font-bold text-4xl text-slate-900 dark:text-white drop-shadow-md">
              {result.toLocaleString('en-US', {maximumFractionDigits: 4})}<span className="text-primary text-2xl ml-1">%</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 font-light">
              {showResult 
                ? <><span className="text-primary font-medium">{value1}</span> is <span className="text-primary font-medium">{result.toLocaleString('en-US', {maximumFractionDigits: 4})}%</span> of <span className="text-primary font-medium">{value2}</span></>
                : "Enter values to see the calculation"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatPercentCalculator;
