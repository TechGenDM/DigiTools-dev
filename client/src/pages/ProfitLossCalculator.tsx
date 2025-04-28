import React, { useState, useEffect } from "react";
import { Link } from "wouter";

const ProfitLossCalculator: React.FC = () => {
  // State for input values
  const [costPrice, setCostPrice] = useState<string>("");
  const [sellingPrice, setSellingPrice] = useState<string>("");
  
  // State for calculation results
  const [amount, setAmount] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [isProfit, setIsProfit] = useState<boolean>(true);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Calculate profit/loss whenever inputs change
  useEffect(() => {
    calculateProfitLoss();
  }, [costPrice, sellingPrice]);

  const calculateProfitLoss = () => {
    // Reset error state
    setHasError(false);
    setErrorMessage("");
    
    // Parse input values
    const cp = parseFloat(costPrice);
    const sp = parseFloat(sellingPrice);
    
    // Validate inputs
    if (isNaN(cp) || isNaN(sp)) {
      setShowResult(false);
      return;
    }

    if (cp < 0 || sp < 0) {
      setHasError(true);
      setErrorMessage("Cost Price and Selling Price cannot be negative.");
      setShowResult(false);
      return;
    }

    if (cp === 0) {
      setHasError(true);
      setErrorMessage("Cost Price cannot be zero.");
      setShowResult(false);
      return;
    }
    
    // Calculate profit or loss
    if (sp > cp) {
      // Profit
      setIsProfit(true);
      setAmount(sp - cp);
      setPercentage((sp - cp) / cp * 100);
    } else {
      // Loss
      setIsProfit(false);
      setAmount(cp - sp);
      setPercentage((cp - sp) / cp * 100);
    }
    
    setShowResult(true);
  };

  const resetCalculator = () => {
    setCostPrice("");
    setSellingPrice("");
    setShowResult(false);
    setHasError(false);
    setErrorMessage("");
  };

  // Format numbers for display
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#4338ca] mb-2">
          Profit and Loss Calculator
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto">
          Calculate profit or loss amount and percentage with this simple calculator.
        </p>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm mb-6 bg-slate-50 p-2 rounded-md">
        <Link href="/">
          <div className="text-[#4338ca] hover:underline cursor-pointer">Home</div>
        </Link>
        <i className="ri-arrow-right-s-line mx-2 text-slate-400"></i>
        <span className="text-slate-700">Profit and Loss Calculator</span>
      </div>

      {/* Calculator Card */}
      <div className="calculator-card bg-white rounded-lg shadow-card p-6 mb-6">
        <div className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="cost-price" className="block text-sm font-medium text-slate-700 mb-1">
                Cost Price (CP)
              </label>
              <input
                type="number"
                id="cost-price"
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g. 100"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                min="0"
                step="any"
              />
            </div>
            <div className="form-group">
              <label htmlFor="selling-price" className="block text-sm font-medium text-slate-700 mb-1">
                Selling Price (SP)
              </label>
              <input
                type="number"
                id="selling-price"
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g. 150"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                min="0"
                step="any"
              />
            </div>
          </div>
          
          {/* Error Message */}
          {hasError && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className="ri-error-warning-line text-red-400"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Results Section */}
          {showResult && (
            <div 
              className={`result-box p-4 rounded-md ${
                isProfit ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <h3 className="font-semibold text-lg">
                  {isProfit ? 'Profit' : 'Loss'} Summary
                </h3>
                <span 
                  className={`text-sm font-medium px-2 py-1 rounded-full w-fit ${
                    isProfit ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {isProfit ? 'Profit' : 'Loss'}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="result-item">
                  <p className="text-xs text-slate-500 mb-1">
                    {isProfit ? 'Profit' : 'Loss'} Amount:
                  </p>
                  <p 
                    className={`text-2xl font-bold ${
                      isProfit ? 'text-green-600' : 'text-red-600'
                    } calculation-result`}
                  >
                    {formatNumber(amount)}
                  </p>
                </div>
                
                <div className="result-item">
                  <p className="text-xs text-slate-500 mb-1">
                    {isProfit ? 'Profit' : 'Loss'} Percentage:
                  </p>
                  <p 
                    className={`text-2xl font-bold ${
                      isProfit ? 'text-green-600' : 'text-red-600'
                    } calculation-result`}
                  >
                    {formatNumber(percentage)}%
                  </p>
                </div>
              </div>
              
              <div className="mt-3 text-sm text-slate-600">
                {isProfit 
                  ? `You made a profit of ${formatNumber(percentage)}% on your investment!` 
                  : `You incurred a loss of ${formatNumber(percentage)}% on your investment.`
                }
              </div>
              
              <div className="mt-4 text-xs text-slate-500">
                <p className="mb-1 font-medium">Calculation:</p>
                {isProfit ? (
                  <p className="mb-1 break-words">
                    <span className="font-semibold">Profit</span> = SP - CP = {formatNumber(parseFloat(sellingPrice))} - {formatNumber(parseFloat(costPrice))} = {formatNumber(amount)}
                  </p>
                ) : (
                  <p className="mb-1 break-words">
                    <span className="font-semibold">Loss</span> = CP - SP = {formatNumber(parseFloat(costPrice))} - {formatNumber(parseFloat(sellingPrice))} = {formatNumber(amount)}
                  </p>
                )}
                <p className="break-words">
                  <span className="font-semibold">Percentage</span> = ({isProfit ? 'Profit' : 'Loss'} ÷ CP) × 100 = 
                  <br className="sm:hidden" /> ({formatNumber(amount)} ÷ {formatNumber(parseFloat(costPrice))}) × 100 = {formatNumber(percentage)}%
                </p>
              </div>
            </div>
          )}
          
          {/* Reset Button */}
          <div className="flex justify-end">
            <button 
              onClick={resetCalculator}
              className="px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
            >
              <i className="ri-refresh-line mr-1"></i> Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitLossCalculator;