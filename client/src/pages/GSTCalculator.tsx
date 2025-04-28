import React, { useState, useEffect } from "react";
import { Link } from "wouter";

const GSTCalculator: React.FC = () => {
  // State for "Add GST" section
  const [originalAmount, setOriginalAmount] = useState<string>("");
  const [addGstRate, setAddGstRate] = useState<string>("18");
  const [addGstAmount, setAddGstAmount] = useState<number>(0);
  const [addTotalAmount, setAddTotalAmount] = useState<number>(0);
  const [showAddResult, setShowAddResult] = useState<boolean>(false);

  // State for "Remove GST" section
  const [inclusiveAmount, setInclusiveAmount] = useState<string>("");
  const [removeGstRate, setRemoveGstRate] = useState<string>("18");
  const [removeGstAmount, setRemoveGstAmount] = useState<number>(0);
  const [baseAmount, setBaseAmount] = useState<number>(0);
  const [showRemoveResult, setShowRemoveResult] = useState<boolean>(false);

  // Common GST rates
  const gstRates = [
    { value: "5", label: "5%" },
    { value: "12", label: "12%" },
    { value: "18", label: "18%" },
    { value: "28", label: "28%" },
  ];

  // Calculate Add GST
  useEffect(() => {
    calculateAddGST();
  }, [originalAmount, addGstRate]);

  // Calculate Remove GST
  useEffect(() => {
    calculateRemoveGST();
  }, [inclusiveAmount, removeGstRate]);

  const calculateAddGST = () => {
    const amount = parseFloat(originalAmount) || 0;
    const rate = parseFloat(addGstRate) || 0;

    if (amount && rate) {
      const gstAmount = (amount * rate) / 100;
      const total = amount + gstAmount;
      
      setAddGstAmount(gstAmount);
      setAddTotalAmount(total);
      setShowAddResult(true);
    } else {
      setAddGstAmount(0);
      setAddTotalAmount(0);
      setShowAddResult(false);
    }
  };

  const calculateRemoveGST = () => {
    const amount = parseFloat(inclusiveAmount) || 0;
    const rate = parseFloat(removeGstRate) || 0;

    if (amount && rate) {
      const baseAmt = amount / (1 + rate / 100);
      const gstAmt = amount - baseAmt;
      
      setRemoveGstAmount(gstAmt);
      setBaseAmount(baseAmt);
      setShowRemoveResult(true);
    } else {
      setRemoveGstAmount(0);
      setBaseAmount(0);
      setShowRemoveResult(false);
    }
  };

  const resetAddGST = () => {
    setOriginalAmount("");
    setAddGstRate("18");
    setShowAddResult(false);
  };

  const resetRemoveGST = () => {
    setInclusiveAmount("");
    setRemoveGstRate("18");
    setShowRemoveResult(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#4338ca] mb-2">
          GST Calculator
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto">
          Calculate GST in seconds - add or remove GST with real-time results.
        </p>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm mb-6 bg-slate-50 p-2 rounded-md">
        <Link href="/">
          <div className="text-[#4338ca] hover:underline cursor-pointer">Home</div>
        </Link>
        <i className="ri-arrow-right-s-line mx-2 text-slate-400"></i>
        <span className="text-slate-700">GST Calculator</span>
      </div>

      {/* Add GST Section */}
      <div className="calculator-card bg-white rounded-lg shadow-card p-6 mb-6">
        <h2 className="font-poppins text-xl font-semibold mb-4 flex items-center">
          <i className="ri-add-circle-line mr-2 text-[#4338ca]"></i>
          Add GST to Amount
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="original-amount" className="block text-sm font-medium text-slate-700 mb-1">
                Original Amount
              </label>
              <input
                type="number"
                id="original-amount"
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g. 100"
                value={originalAmount}
                onChange={(e) => setOriginalAmount(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="add-gst-rate" className="block text-sm font-medium text-slate-700 mb-1">
                GST Rate (%)
              </label>
              <select
                id="add-gst-rate"
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={addGstRate}
                onChange={(e) => setAddGstRate(e.target.value)}
              >
                {gstRates.map((rate) => (
                  <option key={`add-${rate.value}`} value={rate.value}>
                    {rate.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="result-box bg-slate-50 p-4 rounded-md">
            <p className="text-sm text-slate-500 mb-1">Results:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
              <div>
                <p className="text-xs text-slate-400">GST Amount:</p>
                <p className="text-[#4338ca] font-semibold">
                  {addGstAmount.toLocaleString('en-IN', {maximumFractionDigits: 2})}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Total Amount (with GST):</p>
                <p className="text-[#4338ca] font-semibold">
                  {addTotalAmount.toLocaleString('en-IN', {maximumFractionDigits: 2})}
                </p>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 mt-2">
              {showAddResult 
                ? `If you enter ${originalAmount} with ${addGstRate}% GST, you get GST: ${addGstAmount.toLocaleString('en-IN', {maximumFractionDigits: 2})} and Total: ${addTotalAmount.toLocaleString('en-IN', {maximumFractionDigits: 2})}`
                : "Enter values to see the calculation"}
            </p>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={resetAddGST}
              className="px-3 py-1 text-sm bg-slate-100 hover:bg-slate-200 text-slate-600 rounded transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Remove GST Section */}
      <div className="calculator-card bg-white rounded-lg shadow-card p-6 mb-6">
        <h2 className="font-poppins text-xl font-semibold mb-4 flex items-center">
          <i className="ri-subtract-line mr-2 text-[#4338ca]"></i>
          Remove GST from Amount
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="inclusive-amount" className="block text-sm font-medium text-slate-700 mb-1">
                GST-Inclusive Amount
              </label>
              <input
                type="number"
                id="inclusive-amount"
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g. 118"
                value={inclusiveAmount}
                onChange={(e) => setInclusiveAmount(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="remove-gst-rate" className="block text-sm font-medium text-slate-700 mb-1">
                GST Rate (%)
              </label>
              <select
                id="remove-gst-rate"
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={removeGstRate}
                onChange={(e) => setRemoveGstRate(e.target.value)}
              >
                {gstRates.map((rate) => (
                  <option key={`remove-${rate.value}`} value={rate.value}>
                    {rate.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="result-box bg-slate-50 p-4 rounded-md">
            <p className="text-sm text-slate-500 mb-1">Results:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
              <div>
                <p className="text-xs text-slate-400">GST Amount:</p>
                <p className="text-[#4338ca] font-semibold">
                  {removeGstAmount.toLocaleString('en-IN', {maximumFractionDigits: 2})}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Base Amount (excluding GST):</p>
                <p className="text-[#4338ca] font-semibold">
                  {baseAmount.toLocaleString('en-IN', {maximumFractionDigits: 2})}
                </p>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 mt-2">
              {showRemoveResult 
                ? `If you enter ${inclusiveAmount} with ${removeGstRate}% GST included, the base amount is ${baseAmount.toLocaleString('en-IN', {maximumFractionDigits: 2})} and GST is ${removeGstAmount.toLocaleString('en-IN', {maximumFractionDigits: 2})}`
                : "Enter values to see the calculation"}
            </p>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={resetRemoveGST}
              className="px-3 py-1 text-sm bg-slate-100 hover:bg-slate-200 text-slate-600 rounded transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GSTCalculator;