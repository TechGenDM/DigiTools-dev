import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";

const GSTCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'add' | 'remove'>('add');
  
  // State for Add GST
  const [addAmount, setAddAmount] = useState<string>("");
  const [addRate, setAddRate] = useState<number>(18);
  const [addResult, setAddResult] = useState({ netAmount: 0, gstAmount: 0, totalAmount: 0, cgst: 0, sgst: 0 });

  // State for Remove GST
  const [removeAmount, setRemoveAmount] = useState<string>("");
  const [removeRate, setRemoveRate] = useState<number>(18);
  const [removeResult, setRemoveResult] = useState({ totalAmount: 0, gstAmount: 0, netAmount: 0, cgst: 0, sgst: 0 });

  const gstRates = [5, 12, 18, 28];

  useEffect(() => {
    // Calculate Add GST
    const netAmt = parseFloat(addAmount) || 0;
    if (netAmt > 0) {
      const gstAmt = (netAmt * addRate) / 100;
      setAddResult({
        netAmount: netAmt,
        gstAmount: gstAmt,
        totalAmount: netAmt + gstAmt,
        cgst: gstAmt / 2,
        sgst: gstAmt / 2
      });
    } else {
      setAddResult({ netAmount: 0, gstAmount: 0, totalAmount: 0, cgst: 0, sgst: 0 });
    }
  }, [addAmount, addRate]);

  useEffect(() => {
    // Calculate Remove GST
    const totalAmt = parseFloat(removeAmount) || 0;
    if (totalAmt > 0) {
      const netAmt = (totalAmt * 100) / (100 + removeRate);
      const gstAmt = totalAmt - netAmt;
      setRemoveResult({
        totalAmount: totalAmt,
        netAmount: netAmt,
        gstAmount: gstAmt,
        cgst: gstAmt / 2,
        sgst: gstAmt / 2
      });
    } else {
      setRemoveResult({ totalAmount: 0, netAmount: 0, gstAmount: 0, cgst: 0, sgst: 0 });
    }
  }, [removeAmount, removeRate]);

  return (
    <>
      <SEOHead
        title="GST Calculator – Add & Remove GST Instantly"
        description="Calculate GST in seconds. Add or remove GST from any amount with support for 5%, 12%, 18%, and 28% GST rates. Free, fast, and accurate."
        path="/gst-calculator"
      />
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <header className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-primary/20 text-primary">
            <i className="ri-receipt-line text-3xl"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            GST <span className="text-gradient">Calculator</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto text-lg">
            Add or remove Goods and Services Tax instantly with absolute precision.
          </p>
        </header>

        <div className="glass-panel p-6 md:p-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="segmented-control mb-8">
            <div 
              className={`segmented-tab ${activeTab === 'add' ? 'active' : ''}`}
              onClick={() => setActiveTab('add')}
              role="button"
              tabIndex={0}
            >
              Add GST (+Tax)
            </div>
            <div 
              className={`segmented-tab ${activeTab === 'remove' ? 'active' : ''}`}
              onClick={() => setActiveTab('remove')}
              role="button"
              tabIndex={0}
            >
              Remove GST (-Tax)
            </div>
          </div>

          <div className="relative min-h-[400px]">
            {activeTab === 'add' ? (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label htmlFor="add-amount" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Net Amount (Before Tax)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                        ₹
                      </div>
                      <input
                        type="number"
                        id="add-amount"
                        className="glass-input w-full pl-8 px-4 py-3 bg-transparent"
                        placeholder="e.g. 1000"
                        value={addAmount}
                        onChange={(e) => setAddAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="add-rate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      GST Rate
                    </label>
                    <div className="relative">
                      <select
                        id="add-rate"
                        className="glass-input w-full px-4 py-3 bg-black/5 dark:bg-white/5 appearance-none text-slate-900 dark:text-white text-slate-900 dark:text-white focus:bg-[#1a1b26]"
                        value={addRate}
                        onChange={(e) => setAddRate(Number(e.target.value))}
                      >
                        {gstRates.map(rate => (
                          <option key={`add-${rate}`} value={rate} className="text-black">{rate}%</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className={`result-box mt-8 ${addAmount ? 'opacity-100' : 'opacity-50'}`}>
                  <div className="calculation-result">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 font-light tracking-wide uppercase text-center">Calculation Result</p>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-white/10">
                        <span className="text-slate-400">Net Amount:</span>
                        <span className="font-medium text-white">₹ {addResult.netAmount.toLocaleString('en-IN', {maximumFractionDigits: 2})}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-white/10">
                        <span className="text-slate-400">GST Amount ({addRate}%):</span>
                        <span className="font-medium text-primary">₹ {addResult.gstAmount.toLocaleString('en-IN', {maximumFractionDigits: 2})}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-black/10 dark:border-white/10 pl-4 text-sm">
                        <span className="text-slate-500">CGST ({addRate/2}%):</span>
                        <span className="text-slate-300">₹ {addResult.cgst.toLocaleString('en-IN', {maximumFractionDigits: 2})}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-black/10 dark:border-white/10 pl-4 text-sm">
                        <span className="text-slate-500">SGST/UTGST ({addRate/2}%):</span>
                        <span className="text-slate-300">₹ {addResult.sgst.toLocaleString('en-IN', {maximumFractionDigits: 2})}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-lg font-medium text-white">Total Amount:</span>
                        <span className="text-3xl font-display font-bold text-slate-900 dark:text-white drop-shadow-md">₹ {addResult.totalAmount.toLocaleString('en-IN', {maximumFractionDigits: 2})}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label htmlFor="remove-amount" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Total Amount (Including Tax)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                        ₹
                      </div>
                      <input
                        type="number"
                        id="remove-amount"
                        className="glass-input w-full pl-8 px-4 py-3 bg-transparent"
                        placeholder="e.g. 1180"
                        value={removeAmount}
                        onChange={(e) => setRemoveAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="remove-rate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      GST Rate Included
                    </label>
                    <div className="relative">
                      <select
                        id="remove-rate"
                        className="glass-input w-full px-4 py-3 bg-black/5 dark:bg-white/5 appearance-none text-slate-900 dark:text-white text-slate-900 dark:text-white focus:bg-[#1a1b26]"
                        value={removeRate}
                        onChange={(e) => setRemoveRate(Number(e.target.value))}
                      >
                        {gstRates.map(rate => (
                          <option key={`remove-${rate}`} value={rate} className="text-black">{rate}%</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className={`result-box mt-8 ${removeAmount ? 'opacity-100' : 'opacity-50'}`}>
                  <div className="calculation-result">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 font-light tracking-wide uppercase text-center">Calculation Result</p>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-white/10">
                        <span className="text-slate-400">Total Amount:</span>
                        <span className="font-medium text-white">₹ {removeResult.totalAmount.toLocaleString('en-IN', {maximumFractionDigits: 2})}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-white/10">
                        <span className="text-slate-400">GST Removed ({removeRate}%):</span>
                        <span className="font-medium text-rose-400">-₹ {removeResult.gstAmount.toLocaleString('en-IN', {maximumFractionDigits: 2})}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-black/10 dark:border-white/10 pl-4 text-sm">
                        <span className="text-slate-500">CGST ({removeRate/2}%):</span>
                        <span className="text-slate-300">₹ {removeResult.cgst.toLocaleString('en-IN', {maximumFractionDigits: 2})}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-black/10 dark:border-white/10 pl-4 text-sm">
                        <span className="text-slate-500">SGST/UTGST ({removeRate/2}%):</span>
                        <span className="text-slate-300">₹ {removeResult.sgst.toLocaleString('en-IN', {maximumFractionDigits: 2})}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-lg font-medium text-white">Net Amount (Pre-Tax):</span>
                        <span className="text-3xl font-display font-bold text-slate-900 dark:text-white drop-shadow-md">₹ {removeResult.netAmount.toLocaleString('en-IN', {maximumFractionDigits: 2})}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GSTCalculator;