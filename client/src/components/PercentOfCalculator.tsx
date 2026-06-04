import React, { useState, useEffect } from "react";

const PercentOfCalculator: React.FC = () => {
  const [percentValue, setPercentValue] = useState<string>("");
  const [ofValue, setOfValue] = useState<string>("");
  const [result, setResult] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);

  useEffect(() => {
    calculatePercentOf();
  }, [percentValue, ofValue]);

  const calculatePercentOf = () => {
    const percent = parseFloat(percentValue) || 0;
    const value = parseFloat(ofValue) || 0;

    if (percent && value) {
      setResult((percent / 100) * value);
      setShowResult(true);
    } else {
      setResult(0);
      setShowResult(false);
    }
  };

  return (
    <div id="calculator-percent-of" className="relative p-6 z-10">
      <h2 className="font-display text-2xl font-semibold mb-6 text-slate-900 dark:text-white text-center">Calculate X% of Y</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor="percent-value" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Percentage (%)
            </label>
            <div className="relative">
              <input
                type="number"
                id="percent-value"
                className="glass-input w-full px-4 py-3 bg-transparent"
                placeholder="e.g. 20"
                value={percentValue}
                onChange={(e) => setPercentValue(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                %
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="of-value" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Value
            </label>
            <input
              type="number"
              id="of-value"
              className="glass-input w-full px-4 py-3 bg-transparent"
              placeholder="e.g. 150"
              value={ofValue}
              onChange={(e) => setOfValue(e.target.value)}
            />
          </div>
        </div>
        
        <div className={`result-box mt-8 ${showResult ? 'opacity-100' : 'opacity-50'}`}>
          <div className="calculation-result text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 font-light tracking-wide uppercase">Result</p>
            <div className="font-display font-bold text-4xl text-slate-900 dark:text-white drop-shadow-md">
              {result.toLocaleString('en-US', {maximumFractionDigits: 4})}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 font-light">
              {showResult 
                ? <><span className="text-primary font-medium">{percentValue}%</span> of <span className="text-primary font-medium">{ofValue}</span> = {result.toLocaleString('en-US', {maximumFractionDigits: 4})}</>
                : "Enter values to see the calculation"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PercentOfCalculator;
