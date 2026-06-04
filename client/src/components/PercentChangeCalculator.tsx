import React, { useState, useEffect } from "react";

const PercentChangeCalculator: React.FC = () => {
  const [value1, setValue1] = useState<string>("");
  const [value2, setValue2] = useState<string>("");
  const [result, setResult] = useState<number>(0);
  const [isIncrease, setIsIncrease] = useState<boolean>(true);
  const [showResult, setShowResult] = useState<boolean>(false);

  useEffect(() => {
    calculatePercentChange();
  }, [value1, value2]);

  const calculatePercentChange = () => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);

    if (!isNaN(v1) && !isNaN(v2) && v1 !== 0 && value1 !== "" && value2 !== "") {
      const change = ((v2 - v1) / Math.abs(v1)) * 100;
      setResult(Math.abs(change));
      setIsIncrease(change >= 0);
      setShowResult(true);
    } else {
      setResult(0);
      setShowResult(false);
    }
  };

  return (
    <div id="calculator-percent-change" className="relative p-6 z-10">
      <h2 className="font-display text-2xl font-semibold mb-6 text-slate-900 dark:text-white text-center">Percentage Change</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor="change-value-1" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              From Value
            </label>
            <input
              type="number"
              id="change-value-1"
              className="glass-input w-full px-4 py-3 bg-transparent"
              placeholder="e.g. 100"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="change-value-2" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              To Value
            </label>
            <input
              type="number"
              id="change-value-2"
              className="glass-input w-full px-4 py-3 bg-transparent"
              placeholder="e.g. 120"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
            />
          </div>
        </div>
        
        <div className={`result-box mt-8 ${showResult ? 'opacity-100' : 'opacity-50'}`}>
          <div className="calculation-result text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 font-light tracking-wide uppercase">Result</p>
            <div className="flex items-center justify-center">
              {showResult && (
                <i className={`text-2xl mr-2 ${isIncrease ? 'ri-arrow-up-circle-fill text-emerald-400' : 'ri-arrow-down-circle-fill text-rose-400'}`}></i>
              )}
              <div className="font-display font-bold text-4xl text-slate-900 dark:text-white drop-shadow-md">
                {result.toLocaleString('en-US', {maximumFractionDigits: 4})}<span className="text-primary text-2xl ml-1">%</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 font-light">
              {showResult 
                ? <>
                    The value {isIncrease ? <span className="text-emerald-600 dark:text-emerald-400 font-medium">increased</span> : <span className="text-rose-600 dark:text-rose-400 font-medium">decreased</span>} by <span className="text-primary font-medium">{result.toLocaleString('en-US', {maximumFractionDigits: 4})}%</span>
                  </>
                : "Enter values to see the calculation"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PercentChangeCalculator;
