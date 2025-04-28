import React, { useState, useEffect } from "react";
import { Link } from "wouter";

const LoanCalculator: React.FC = () => {
  // State for input values
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanTenure, setLoanTenure] = useState<string>("");
  const [tenureType, setTenureType] = useState<"years" | "months">("years");
  
  // State for calculation results
  const [monthlyEMI, setMonthlyEMI] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Calculate EMI whenever inputs change
  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure, tenureType]);

  const calculateEMI = () => {
    // Reset error state
    setHasError(false);
    setErrorMessage("");
    
    // Parse input values
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const tenure = parseFloat(loanTenure);
    
    // Validate inputs
    if (isNaN(principal) || isNaN(annualRate) || isNaN(tenure)) {
      setShowResult(false);
      return;
    }

    if (principal <= 0 || annualRate <= 0 || tenure <= 0) {
      setHasError(true);
      setErrorMessage("All values must be greater than zero.");
      setShowResult(false);
      return;
    }
    
    // Calculate EMI
    try {
      // Convert annual rate to monthly and decimal form
      const monthlyRate = annualRate / 12 / 100;
      
      // Convert tenure to months if input is in years
      const tenureInMonths = tenureType === "years" ? tenure * 12 : tenure;
      
      // EMI calculation formula: [P × R × (1+R)^N] / [(1+R)^N – 1]
      const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths)) / 
                 (Math.pow(1 + monthlyRate, tenureInMonths) - 1);
      
      if (isNaN(emi) || !isFinite(emi)) {
        setHasError(true);
        setErrorMessage("Unable to calculate EMI. Please check your inputs.");
        setShowResult(false);
        return;
      }
      
      const totalAmount = emi * tenureInMonths;
      const interestPayable = totalAmount - principal;
      
      setMonthlyEMI(emi);
      setTotalPayment(totalAmount);
      setTotalInterest(interestPayable);
      setShowResult(true);
    } catch (error) {
      setHasError(true);
      setErrorMessage("An error occurred during calculation. Please check your inputs.");
      setShowResult(false);
    }
  };

  const resetCalculator = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTenure("");
    setTenureType("years");
    setShowResult(false);
    setHasError(false);
    setErrorMessage("");
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#4338ca] mb-2">
          Loan &amp; EMI Calculator
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto">
          Calculate your monthly EMI, total payment, and interest on your loan.
        </p>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm mb-6 bg-slate-50 p-2 rounded-md">
        <Link href="/">
          <div className="text-[#4338ca] hover:underline cursor-pointer">Home</div>
        </Link>
        <i className="ri-arrow-right-s-line mx-2 text-slate-400"></i>
        <span className="text-slate-700">Loan &amp; EMI Calculator</span>
      </div>

      {/* Calculator Card */}
      <div className="calculator-card bg-white rounded-lg shadow-card p-6 mb-6">
        <div className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 gap-4">
            <div className="form-group">
              <label htmlFor="loan-amount" className="block text-sm font-medium text-slate-700 mb-1">
                Loan Amount
              </label>
              <input
                type="number"
                id="loan-amount"
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g. 100000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                min="1"
                step="any"
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
                placeholder="e.g. 10.5"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                min="0.1"
                step="0.01"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="loan-tenure" className="block text-sm font-medium text-slate-700 mb-1">
                  Loan Tenure
                </label>
                <input
                  type="number"
                  id="loan-tenure"
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder={tenureType === "years" ? "e.g. 5" : "e.g. 60"}
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                  min="1"
                  step="1"
                />
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Tenure Type
                </label>
                <div className="flex border border-slate-300 rounded-md overflow-hidden">
                  <button
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${
                      tenureType === "years" 
                        ? "bg-[#4338ca] text-white" 
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                    onClick={() => setTenureType("years")}
                  >
                    Years
                  </button>
                  <button
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${
                      tenureType === "months" 
                        ? "bg-[#4338ca] text-white" 
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                    onClick={() => setTenureType("months")}
                  >
                    Months
                  </button>
                </div>
              </div>
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
            <div className="result-box bg-indigo-50 p-5 rounded-md border border-indigo-100">
              <h3 className="font-semibold text-lg text-[#4338ca] mb-4">
                Loan Summary
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="result-item bg-white p-4 rounded-md shadow-sm">
                  <p className="text-xs text-slate-500 mb-1">
                    Monthly EMI:
                  </p>
                  <p className="text-2xl font-bold text-[#4338ca] calculation-result">
                    ₹ {formatCurrency(monthlyEMI)}
                  </p>
                </div>
                
                <div className="result-item bg-white p-4 rounded-md shadow-sm">
                  <p className="text-xs text-slate-500 mb-1">
                    Total Payment:
                  </p>
                  <p className="text-2xl font-bold text-[#4338ca] calculation-result">
                    ₹ {formatCurrency(totalPayment)}
                  </p>
                </div>
                
                <div className="result-item bg-white p-4 rounded-md shadow-sm">
                  <p className="text-xs text-slate-500 mb-1">
                    Total Interest:
                  </p>
                  <p className="text-2xl font-bold text-[#4338ca] calculation-result">
                    ₹ {formatCurrency(totalInterest)}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 text-xs text-slate-600 bg-white p-3 rounded-md">
                <p className="font-medium mb-1">How EMI is calculated:</p>
                <p className="mb-1 break-words">
                  EMI = [P × R × (1+R)^N] / [(1+R)^N – 1], where:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>P = Principal loan amount (₹{formatCurrency(parseFloat(loanAmount))})</li>
                  <li>R = Monthly interest rate ({(parseFloat(interestRate) / 12 / 100).toFixed(6)})</li>
                  <li>N = Loan tenure in months ({tenureType === "years" ? parseFloat(loanTenure) * 12 : parseFloat(loanTenure)})</li>
                </ul>
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

export default LoanCalculator;