import React, { useState, useEffect } from "react";
import SEOHead from "@/components/SEOHead";

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

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure, tenureType]);

  const calculateEMI = () => {
    setHasError(false);
    setErrorMessage("");
    
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const tenure = parseFloat(loanTenure);
    
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
    
    try {
      const monthlyRate = annualRate / 12 / 100;
      const tenureInMonths = tenureType === "years" ? tenure * 12 : tenure;
      
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

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
  };

  return (
    <>
      <SEOHead
        title="Loan & EMI Calculator"
        description="Calculate your monthly EMI, total payment, and total interest on any loan. Supports years and months tenure. Free and instant."
        path="/loan-calculator"
      />
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <header className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-primary/20 text-primary">
            <i className="ri-bank-card-line text-3xl"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Loan & EMI <span className="text-gradient">Calculator</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto text-lg">
            Calculate your monthly EMI, total payment, and interest on your loan instantly.
          </p>
        </header>

        <div className="glass-panel p-6 md:p-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="loan-amount" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Loan Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">₹</div>
                  <input
                    type="number"
                    id="loan-amount"
                    className="glass-input w-full pl-8 px-4 py-3 bg-transparent"
                    placeholder="e.g. 100000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    min="1"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="interest-rate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Annual Interest Rate (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="interest-rate"
                    className="glass-input w-full px-4 py-3 bg-transparent pr-8"
                    placeholder="e.g. 10.5"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    min="0.1"
                    step="0.01"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">%</div>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="loan-tenure" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Loan Tenure
                </label>
                <input
                  type="number"
                  id="loan-tenure"
                  className="glass-input w-full px-4 py-3 bg-transparent"
                  placeholder={tenureType === "years" ? "e.g. 5" : "e.g. 60"}
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                  min="1"
                />
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Tenure Type
                </label>
                <div className="segmented-control">
                  <div 
                    className={`segmented-tab ${tenureType === 'years' ? 'active' : ''}`}
                    onClick={() => setTenureType('years')}
                    role="button"
                    tabIndex={0}
                  >
                    Years
                  </div>
                  <div 
                    className={`segmented-tab ${tenureType === 'months' ? 'active' : ''}`}
                    onClick={() => setTenureType('months')}
                    role="button"
                    tabIndex={0}
                  >
                    Months
                  </div>
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
              <div className="calculation-result p-6 rounded-xl bg-gradient-to-r from-primary/10 to-transparent border border-white/10">
                <h3 className="font-display font-semibold text-xl text-slate-900 dark:text-white mb-6 border-b border-black/10 dark:border-white/10 pb-4">
                  Loan Summary
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="result-item">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider">Monthly EMI</p>
                    <p className="text-3xl font-display font-bold text-primary drop-shadow-md">
                      ₹ {formatCurrency(monthlyEMI)}
                    </p>
                  </div>
                  
                  <div className="result-item">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider">Total Payment</p>
                    <p className="text-2xl font-display font-bold text-white">
                      ₹ {formatCurrency(totalPayment)}
                    </p>
                  </div>
                  
                  <div className="result-item">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider">Total Interest</p>
                    <p className="text-2xl font-display font-bold text-white">
                      ₹ {formatCurrency(totalInterest)}
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

export default LoanCalculator;