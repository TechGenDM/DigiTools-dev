import React, { useState, useEffect } from "react";

const PercentChangeCalculator: React.FC = () => {
  const [fromValue, setFromValue] = useState<string>("");
  const [toValue, setToValue] = useState<string>("");
  const [result, setResult] = useState<number>(0);
  const [isIncrease, setIsIncrease] = useState<boolean>(true);
  const [showResult, setShowResult] = useState<boolean>(false);

  useEffect(() => {
    calculatePercentChange();
  }, [fromValue, toValue]);

  const calculatePercentChange = () => {
    const from = parseFloat(fromValue) || 0;
    const to = parseFloat(toValue) || 0;

    if (from && to) {
      const change = to - from;
      const percentChange = (change / from) * 100;
      
      setResult(Math.abs(percentChange));
      setIsIncrease(change >= 0);
      setShowResult(true);
    } else {
      setResult(0);
      setShowResult(false);
    }
  };

  const handleFromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromValue(e.target.value);
  };

  const handleToValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToValue(e.target.value);
  };

  return (
    <div id="calculator-percent-change" className="calculator-card bg-white rounded-lg shadow-card p-6 mb-6">
      <h2 className="font-poppins text-xl font-semibold mb-4">Percentage Increase/Decrease</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="from-value" className="block text-sm font-medium text-slate-700 mb-1">
              From Value
            </label>
            <input
              type="number"
              id="from-value"
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g. 100"
              value={fromValue}
              onChange={handleFromValueChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="to-value" className="block text-sm font-medium text-slate-700 mb-1">
              To Value
            </label>
            <input
              type="number"
              id="to-value"
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g. 120"
              value={toValue}
              onChange={handleToValueChange}
            />
          </div>
        </div>
        <div className="result-box bg-slate-50 p-4 rounded-md">
          <p className="text-sm text-slate-500 mb-1">Result:</p>
          <div className="calculation-result font-medium text-lg flex items-center" id="percent-change-result">
            <span className="text-[#4338ca] font-semibold">
              {result.toLocaleString('en-US', {maximumFractionDigits: 2})}%
            </span>
            {showResult && (
              <span 
                className={`ml-2 text-sm px-2 py-1 rounded ${
                  isIncrease 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {isIncrease ? 'increase' : 'decrease'}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-2" id="percent-change-equation">
            {showResult 
              ? `From ${fromValue} to ${toValue}: ${result.toLocaleString('en-US', {maximumFractionDigits: 2})}% ${isIncrease ? 'increase' : 'decrease'}`
              : "Enter values to see the calculation"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PercentChangeCalculator;
