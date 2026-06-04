import React, { useState, useEffect } from "react";
import SEOHead from "@/components/SEOHead";

const ProfitLossCalculator: React.FC = () => {
  const [costPrice, setCostPrice] = useState<string>("");
  const [sellingPrice, setSellingPrice] = useState<string>("");
  
  const [amount, setAmount] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [isProfit, setIsProfit] = useState<boolean>(true);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    calculateProfitLoss();
  }, [costPrice, sellingPrice]);

  const calculateProfitLoss = () => {
    setHasError(false);
    setErrorMessage("");
    
    const cp = parseFloat(costPrice);
    const sp = parseFloat(sellingPrice);
    
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
    
    if (sp >= cp) {
      setIsProfit(true);
      setAmount(sp - cp);
      setPercentage(((sp - cp) / cp) * 100);
    } else {
      setIsProfit(false);
      setAmount(cp - sp);
      setPercentage(((cp - sp) / cp) * 100);
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

  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
  };

  return (
    <>
      <SEOHead
        title="Profit & Loss Calculator"
        description="Calculate profit or loss amount and percentage based on cost price and selling price. Free, instant, and easy to use."
        path="/profit-loss-calculator"
      />
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <header className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-emerald-500/20 text-emerald-400">
            <i className="ri-line-chart-line text-3xl"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Profit & Loss <span className="text-gradient">Calculator</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto text-lg">
            Calculate profit or loss margins instantly with absolute precision.
          </p>
        </header>

        <div className="glass-panel p-6 md:p-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="cost-price" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Cost Price (CP)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">₹</div>
                  <input
                    type="number"
                    id="cost-price"
                    className="glass-input w-full pl-8 px-4 py-3 bg-transparent"
                    placeholder="e.g. 100"
                    value={costPrice}
                    onChange={(e) => setCostPrice(e.target.value)}
                    min="0"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="selling-price" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Selling Price (SP)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">₹</div>
                  <input
                    type="number"
                    id="selling-price"
                    className="glass-input w-full pl-8 px-4 py-3 bg-transparent"
                    placeholder="e.g. 150"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    min="0"
                  />
                </div>
              </div>
            </div>
            
            {hasError && (
              <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center">
                <i className="ri-error-warning-line text-red-400 text-xl mr-3"></i>
                <p className="text-sm text-red-200">{errorMessage}</p>
              </div>
            )}
            
            <div className={`result-box mt-8 ${showResult ? 'opacity-100' : 'opacity-0 hidden'} transition-opacity duration-500`}>
              <div className={`calculation-result p-6 rounded-xl border border-black/10 dark:border-white/10 ${isProfit ? 'bg-gradient-to-r from-emerald-500/10 to-transparent' : 'bg-gradient-to-r from-rose-500/10 to-transparent'}`}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 border-b border-black/10 dark:border-white/10 pb-4">
                  <h3 className="font-display font-semibold text-xl text-white">
                    {isProfit ? 'Profit' : 'Loss'} Summary
                  </h3>
                  <span className={`text-sm font-medium px-3 py-1 mt-2 sm:mt-0 rounded-full ${isProfit ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30'}`}>
                    {isProfit ? 'PROFIT' : 'LOSS'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="result-item">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider">
                      Amount
                    </p>
                    <p className={`text-3xl font-display font-bold drop-shadow-md ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                      ₹ {formatNumber(amount)}
                    </p>
                  </div>
                  
                  <div className="result-item">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider">
                      Percentage
                    </p>
                    <p className={`text-3xl font-display font-bold drop-shadow-md ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {formatNumber(percentage)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <button 
                onClick={resetCalculator}
                className="px-6 py-2.5 text-sm bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-black/10 dark:border-white/10 rounded-xl transition-all"
              >
                <i className="ri-refresh-line mr-2"></i> Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfitLossCalculator;