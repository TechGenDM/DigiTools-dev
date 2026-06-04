import React, { useState, useEffect } from "react";
import SEOHead from "@/components/SEOHead";

const SIPCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>("");
  const [annualInterestRate, setAnnualInterestRate] = useState<string>("");
  const [investmentPeriod, setInvestmentPeriod] = useState<string>("");
  
  const [totalInvestedAmount, setTotalInvestedAmount] = useState<number | null>(null);
  const [estimatedReturns, setEstimatedReturns] = useState<number | null>(null);
  const [totalValue, setTotalValue] = useState<number | null>(null);
  
  const [error, setError] = useState<string>("");
  const [animateResults, setAnimateResults] = useState<boolean>(false);

  const calculateSIP = () => {
    try {
      setError("");
      
      const investment = parseFloat(monthlyInvestment);
      const rate = parseFloat(annualInterestRate);
      const years = parseFloat(investmentPeriod);
      
      if (isNaN(investment) || investment <= 0) {
        setError("Please enter a valid monthly investment amount (greater than 0)");
        resetResults();
        return;
      }
      
      if (isNaN(rate) || rate <= 0) {
        setError("Please enter a valid annual interest rate (greater than 0)");
        resetResults();
        return;
      }
      
      if (isNaN(years) || years <= 0) {
        setError("Please enter a valid investment period (greater than 0)");
        resetResults();
        return;
      }
      
      const monthlyRate = rate / 12 / 100;
      const totalMonths = years * 12;
      
      const maturityValue = investment * (((Math.pow(1 + monthlyRate, totalMonths) - 1) * (1 + monthlyRate)) / monthlyRate);
      const invested = investment * totalMonths;
      const returns = maturityValue - invested;
      
      setTotalInvestedAmount(invested);
      setEstimatedReturns(returns);
      setTotalValue(maturityValue);
      
      setAnimateResults(true);
      setTimeout(() => setAnimateResults(false), 1000);
      
    } catch (error) {
      setError("Error in calculation. Please check your inputs.");
      resetResults();
    }
  };

  const resetResults = () => {
    setTotalInvestedAmount(null);
    setEstimatedReturns(null);
    setTotalValue(null);
  };

  const resetAll = () => {
    setMonthlyInvestment("");
    setAnnualInterestRate("");
    setInvestmentPeriod("");
    resetResults();
    setError("");
  };

  useEffect(() => {
    if (monthlyInvestment && annualInterestRate && investmentPeriod) {
      calculateSIP();
    } else {
      resetResults();
    }
  }, [monthlyInvestment, annualInterestRate, investmentPeriod]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculatePieChartSegments = () => {
    if (totalInvestedAmount === null || totalValue === null) {
      return { investedPercent: 50, returnsPercent: 50 };
    }
    
    const investedPercent = (totalInvestedAmount / totalValue) * 100;
    const returnsPercent = 100 - investedPercent;
    
    return { investedPercent, returnsPercent };
  };

  const pieChart = calculatePieChartSegments();

  return (
    <>
      <SEOHead
        title="SIP Calculator – Plan Your Investments"
        description="Calculate how your systematic investments can grow over time with the power of compounding. Free SIP maturity value calculator."
        path="/sip-calculator"
      />
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <header className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-indigo-500/20 text-indigo-400">
            <i className="ri-line-chart-fill text-3xl"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Easy SIP <span className="text-gradient">Calculator</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto text-lg">
            Plan your investments and visualize the potential compounding growth.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 md:p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center mb-6">
                <i className="ri-money-rupee-circle-line text-2xl text-indigo-600 dark:text-indigo-400 mr-3"></i>
                <h2 className="text-xl font-display font-semibold text-white">Investment Details</h2>
              </div>
              
              <div className="space-y-6">
                <div className="form-group">
                  <label htmlFor="monthly-investment" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Monthly Investment (₹)
                  </label>
                  <input
                    type="number"
                    id="monthly-investment"
                    className="glass-input w-full px-4 py-3 bg-transparent"
                    placeholder="e.g. 5000"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(e.target.value)}
                    min="0"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="interest-rate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Annual Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    id="interest-rate"
                    className="glass-input w-full px-4 py-3 bg-transparent"
                    placeholder="e.g. 12"
                    value={annualInterestRate}
                    onChange={(e) => setAnnualInterestRate(e.target.value)}
                    min="0"
                    step="0.1"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="investment-period" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Investment Period (Years)
                  </label>
                  <input
                    type="number"
                    id="investment-period"
                    className="glass-input w-full px-4 py-3 bg-transparent"
                    placeholder="e.g. 10"
                    value={investmentPeriod}
                    onChange={(e) => setInvestmentPeriod(e.target.value)}
                    min="0"
                  />
                </div>
                
                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center">
                    <i className="ri-error-warning-line text-red-400 text-xl mr-3"></i>
                    <p className="text-sm text-red-200">{error}</p>
                  </div>
                )}
                
                <div className="flex justify-end pt-4">
                  <button 
                    onClick={resetAll}
                    className="px-6 py-2.5 text-sm bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-black/10 dark:border-white/10 rounded-xl transition-all"
                  >
                    <i className="ri-refresh-line mr-2"></i> Reset
                  </button>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 animate-slide-up bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border-indigo-500/20" style={{ animationDelay: '0.2s' }}>
              <h3 className="font-semibold text-md text-indigo-700 dark:text-indigo-300 mb-2">What is SIP?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                SIP (Systematic Investment Plan) helps you build wealth over time through disciplined monthly investments. It leverages the power of compounding and reduces the impact of market volatility.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass-panel p-6 md:p-8 h-full flex flex-col animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center mb-6">
                <i className="ri-pie-chart-2-line text-2xl text-purple-600 dark:text-purple-400 mr-3"></i>
                <h2 className="text-xl font-display font-semibold text-white">Investment Projection</h2>
              </div>
              
              {(!totalInvestedAmount && !totalValue && !estimatedReturns) ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-50">
                  <i className="ri-calculator-line text-6xl text-slate-500 mb-4"></i>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">Enter investment details to see your projection</p>
                </div>
              ) : (
                <div className="space-y-8 flex-1 flex flex-col justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 bg-black/5 dark:bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Total Invested</p>
                      <p className={`text-2xl font-bold text-indigo-600 dark:text-indigo-400 ${animateResults ? 'animate-pulse' : ''}`}>
                        {totalInvestedAmount !== null ? formatCurrency(totalInvestedAmount) : '-'}
                      </p>
                    </div>
                    
                    <div className="p-5 bg-black/5 dark:bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Est. Returns</p>
                      <p className={`text-2xl font-bold text-emerald-600 dark:text-emerald-400 ${animateResults ? 'animate-pulse' : ''}`}>
                        {estimatedReturns !== null ? formatCurrency(estimatedReturns) : '-'}
                      </p>
                    </div>
                    
                    <div className="p-5 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl border border-indigo-200 dark:border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                      <p className="text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Total Value</p>
                      <p className={`text-2xl font-bold text-slate-900 dark:text-white drop-shadow-md ${animateResults ? 'animate-pulse' : ''}`}>
                        {totalValue !== null ? formatCurrency(totalValue) : '-'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-8">
                    <div className="flex justify-center">
                      <div className="relative h-56 w-56">
                        <svg viewBox="0 0 36 36" className="w-full h-full drop-shadow-xl">
                          <circle cx="18" cy="18" r="16" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="3.6"></circle>
                          <circle 
                            cx="18" 
                            cy="18" 
                            r="16" 
                            fill="transparent" 
                            stroke="#818cf8" 
                            strokeWidth="3.6"
                            strokeDasharray={`${pieChart.investedPercent} ${100 - pieChart.investedPercent}`}
                            strokeDashoffset="25"
                            className="transition-all duration-1000 ease-out"
                          ></circle>
                          <circle 
                            cx="18" 
                            cy="18" 
                            r="16" 
                            fill="transparent" 
                            stroke="#10b981" 
                            strokeWidth="3.6"
                            strokeDasharray={`${pieChart.returnsPercent} ${100 - pieChart.returnsPercent}`}
                            strokeDashoffset={100 - pieChart.investedPercent + 25}
                            className="transition-all duration-1000 ease-out"
                          ></circle>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wide">Total Value</p>
                            <p className="text-xl font-bold text-slate-900 dark:text-white drop-shadow-md mt-1">
                              {totalValue !== null ? formatCurrency(totalValue) : '-'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="font-semibold text-slate-700 dark:text-slate-300 border-b border-black/10 dark:border-white/10 pb-2">Investment Breakdown</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-indigo-400 rounded-full mr-3 shadow-[0_0_8px_rgba(129,140,248,0.6)]"></div>
                            <p className="text-sm text-slate-300">Investment</p>
                          </div>
                          <div className="flex items-center text-right">
                            <p className="text-sm font-medium text-white">
                              {totalInvestedAmount !== null ? formatCurrency(totalInvestedAmount) : '-'}
                            </p>
                            <span className="text-xs text-slate-500 ml-2 w-12 text-right">
                              {pieChart.investedPercent.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-emerald-400 rounded-full mr-3 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                            <p className="text-sm text-slate-300">Est. Returns</p>
                          </div>
                          <div className="flex items-center text-right">
                            <p className="text-sm font-medium text-white">
                              {estimatedReturns !== null ? formatCurrency(estimatedReturns) : '-'}
                            </p>
                            <span className="text-xs text-slate-500 ml-2 w-12 text-right">
                              {pieChart.returnsPercent.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-black/5 dark:bg-white/5 p-4 rounded-xl border border-white/10">
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {investmentPeriod && monthlyInvestment ? (
                            <>
                              Investing <span className="font-medium text-white">₹{parseInt(monthlyInvestment).toLocaleString()}</span> monthly 
                              for <span className="font-medium text-white">{investmentPeriod} years</span> could grow 
                              to <span className="font-medium text-indigo-300">{totalValue !== null ? formatCurrency(totalValue) : '-'}</span>
                            </>
                          ) : (
                            'Complete all fields to see your personalized projection.'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SIPCalculator;