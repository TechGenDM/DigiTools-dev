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

  const handlePercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPercentValue(e.target.value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOfValue(e.target.value);
  };

  return (
    <div id="calculator-percent-of" className="calculator-card bg-white rounded-lg shadow-card p-6 mb-6">
      <h2 className="font-poppins text-xl font-semibold mb-4">Calculate X% of Y</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="percent-value" className="block text-sm font-medium text-slate-700 mb-1">
              Percentage (%)
            </label>
            <div className="relative">
              <input
                type="number"
                id="percent-value"
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g. 20"
                value={percentValue}
                onChange={handlePercentChange}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                %
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="of-value" className="block text-sm font-medium text-slate-700 mb-1">
              Value
            </label>
            <input
              type="number"
              id="of-value"
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g. 150"
              value={ofValue}
              onChange={handleValueChange}
            />
          </div>
        </div>
        <div className="result-box bg-slate-50 p-4 rounded-md">
          <p className="text-sm text-slate-500 mb-1">Result:</p>
          <div className="calculation-result font-medium text-lg" id="percent-of-result">
            <span className="text-[#4338ca] font-semibold">
              {result.toLocaleString('en-US', {maximumFractionDigits: 4})}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2" id="percent-of-equation">
            {showResult 
              ? `${percentValue}% of ${ofValue} = ${result.toLocaleString('en-US', {maximumFractionDigits: 4})}`
              : "Enter values to see the calculation"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PercentOfCalculator;
