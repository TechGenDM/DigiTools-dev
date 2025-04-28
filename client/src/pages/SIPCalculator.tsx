import React, { useState, useEffect } from "react";
import { Link } from "wouter";

const SIPCalculator: React.FC = () => {
  // State for form inputs
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>("");
  const [annualInterestRate, setAnnualInterestRate] = useState<string>("");
  const [investmentPeriod, setInvestmentPeriod] = useState<string>("");
  
  // State for calculated results
  const [totalInvestedAmount, setTotalInvestedAmount] = useState<number | null>(null);
  const [estimatedReturns, setEstimatedReturns] = useState<number | null>(null);
  const [totalValue, setTotalValue] = useState<number | null>(null);
  
  // State for input validation
  const [error, setError] = useState<string>("");
  
  // State for animation
  const [animateResults, setAnimateResults] = useState<boolean>(false);

  // Calculate SIP results
  const calculateSIP = () => {
    try {
      setError("");
      
      // Parse input values
      const investment = parseFloat(monthlyInvestment);
      const rate = parseFloat(annualInterestRate);
      const years = parseFloat(investmentPeriod);
      
      // Validate inputs
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
      
      // Calculate SIP maturity value
      const monthlyRate = rate / 12 / 100;
      const totalMonths = years * 12;
      
      // SIP Maturity Value = Monthly Investment × [(1 + r)^n – 1] × (1 + r) ÷ r
      const maturityValue = investment * (((Math.pow(1 + monthlyRate, totalMonths) - 1) * (1 + monthlyRate)) / monthlyRate);
      
      // Calculate total invested amount
      const invested = investment * totalMonths;
      
      // Calculate estimated returns
      const returns = maturityValue - invested;
      
      // Update results
      setTotalInvestedAmount(invested);
      setEstimatedReturns(returns);
      setTotalValue(maturityValue);
      
      // Trigger animation for results
      setAnimateResults(true);
      setTimeout(() => setAnimateResults(false), 1000);
      
    } catch (error) {
      setError("Error in calculation. Please check your inputs.");
      resetResults();
    }
  };

  // Reset calculated results
  const resetResults = () => {
    setTotalInvestedAmount(null);
    setEstimatedReturns(null);
    setTotalValue(null);
  };

  // Reset all fields
  const resetAll = () => {
    setMonthlyInvestment("");
    setAnnualInterestRate("");
    setInvestmentPeriod("");
    resetResults();
    setError("");
  };

  // Calculate when inputs change
  useEffect(() => {
    if (monthlyInvestment && annualInterestRate && investmentPeriod) {
      calculateSIP();
    } else {
      resetResults();
    }
  }, [monthlyInvestment, annualInterestRate, investmentPeriod]);

  // Format currency with commas and 2 decimal places
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Calculate pie chart segments
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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#4338ca] mb-2">
          Easy SIP Calculator
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto">
          Plan your investments and see the potential growth of your money over time.
        </p>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm mb-6 bg-slate-50 p-2 rounded-md">
        <Link href="/">
          <div className="text-[#4338ca] hover:underline cursor-pointer">Home</div>
        </Link>
        <i className="ri-arrow-right-s-line mx-2 text-slate-400"></i>
        <span className="text-slate-700">SIP Calculator</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-card p-6">
            <h2 className="text-xl font-semibold text-[#4338ca] mb-4 flex items-center">
              <i className="ri-money-rupee-circle-fill mr-2"></i>
              Investment Details
            </h2>
            
            <div className="space-y-4">
              <div className="form-group">
                <label htmlFor="monthly-investment" className="block text-sm font-medium text-slate-700 mb-1">
                  Monthly Investment (₹)
                </label>
                <input
                  type="number"
                  id="monthly-investment"
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g. 5000"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(e.target.value)}
                  min="0"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="interest-rate" className="block text-sm font-medium text-slate-700 mb-1">
                  Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  id="interest-rate"
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g. 12"
                  value={annualInterestRate}
                  onChange={(e) => setAnnualInterestRate(e.target.value)}
                  min="0"
                  step="0.1"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="investment-period" className="block text-sm font-medium text-slate-700 mb-1">
                  Investment Period (Years)
                </label>
                <input
                  type="number"
                  id="investment-period"
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g. 10"
                  value={investmentPeriod}
                  onChange={(e) => setInvestmentPeriod(e.target.value)}
                  min="0"
                />
              </div>
              
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <i className="ri-error-warning-line text-red-400"></i>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Reset Button */}
              <div className="flex justify-end mt-2">
                <button 
                  onClick={resetAll}
                  className="px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
                >
                  <i className="ri-refresh-line mr-1"></i> Reset
                </button>
              </div>
            </div>
          </div>
          
          {/* SIP Information */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-md border border-indigo-100 mt-4">
            <h3 className="font-semibold text-md text-[#4338ca] mb-2">
              What is SIP?
            </h3>
            <p className="text-sm text-slate-600">
              SIP (Systematic Investment Plan) helps you build wealth over time through disciplined monthly investments. It leverages the power of compounding and reduces the impact of market volatility.
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-card p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-[#4338ca] mb-4 flex items-center">
            <i className="ri-line-chart-fill mr-2"></i>
            Investment Projection
          </h2>
          
          {(!totalInvestedAmount && !totalValue && !estimatedReturns) ? (
            <div className="min-h-48 flex items-center justify-center">
              <div className="text-center p-8">
                <i className="ri-calculator-line text-4xl text-slate-300 mb-2"></i>
                <p className="text-slate-400">Enter investment details to see projections</p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Results Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="result-card p-4 bg-indigo-50 rounded-lg">
                  <p className="text-xs text-slate-500 uppercase font-medium">
                    Total Invested
                  </p>
                  <p className={`text-xl font-bold text-[#4338ca] mt-1 ${animateResults ? 'animate-pulse' : ''}`}>
                    {totalInvestedAmount !== null ? formatCurrency(totalInvestedAmount) : '-'}
                  </p>
                </div>
                
                <div className="result-card p-4 bg-green-50 rounded-lg">
                  <p className="text-xs text-slate-500 uppercase font-medium">
                    Estimated Returns
                  </p>
                  <p className={`text-xl font-bold text-green-600 mt-1 ${animateResults ? 'animate-pulse' : ''}`}>
                    {estimatedReturns !== null ? formatCurrency(estimatedReturns) : '-'}
                  </p>
                </div>
                
                <div className="result-card p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                  <p className="text-xs text-slate-500 uppercase font-medium">
                    Total Value
                  </p>
                  <p className={`text-xl font-bold text-purple-700 mt-1 ${animateResults ? 'animate-pulse' : ''}`}>
                    {totalValue !== null ? formatCurrency(totalValue) : '-'}
                  </p>
                </div>
              </div>
              
              {/* Pie Chart and Investment Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Pie Chart */}
                <div className="flex justify-center">
                  <div className="relative h-48 w-48">
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                      <circle cx="18" cy="18" r="16" fill="transparent" stroke="#e0e7ff" strokeWidth="3.6"></circle>
                      <circle 
                        cx="18" 
                        cy="18" 
                        r="16" 
                        fill="transparent" 
                        stroke="#818cf8" 
                        strokeWidth="3.6"
                        strokeDasharray={`${pieChart.investedPercent} ${100 - pieChart.investedPercent}`}
                        strokeDashoffset="25"
                        className="transition-all duration-500"
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
                        className="transition-all duration-500"
                      ></circle>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-xs text-slate-500">Total Value</p>
                        <p className="text-lg font-bold text-[#4338ca]">
                          {totalValue !== null ? formatCurrency(totalValue) : '-'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend & Investment Breakdown */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-700">Investment Breakdown</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-[#818cf8] rounded-full mr-2"></div>
                        <p className="text-sm text-slate-600">Investment</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm font-medium">
                          {totalInvestedAmount !== null ? formatCurrency(totalInvestedAmount) : '-'}
                        </p>
                        <span className="text-xs text-slate-500 ml-1">
                          ({pieChart.investedPercent.toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-[#10b981] rounded-full mr-2"></div>
                        <p className="text-sm text-slate-600">Returns</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm font-medium">
                          {estimatedReturns !== null ? formatCurrency(estimatedReturns) : '-'}
                        </p>
                        <span className="text-xs text-slate-500 ml-1">
                          ({pieChart.returnsPercent.toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-3 rounded-md">
                    <p className="text-xs text-slate-600">
                      {investmentPeriod && monthlyInvestment ? (
                        <>
                          Investing <span className="font-medium">₹{parseInt(monthlyInvestment).toLocaleString()}</span> monthly 
                          for <span className="font-medium">{investmentPeriod} years</span> could grow 
                          to <span className="font-medium">{totalValue !== null ? formatCurrency(totalValue) : '-'}</span>
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
  );
};

export default SIPCalculator;