import React, { useState, useEffect } from "react";
import SEOHead from "@/components/SEOHead";

const DiscountCalculator: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState<string>("");
  const [discountPercentage, setDiscountPercentage] = useState<string>("");
  const [taxPercentage, setTaxPercentage] = useState<string>("");
  
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [finalPriceWithTax, setFinalPriceWithTax] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    calculateDiscount();
  }, [originalPrice, discountPercentage, taxPercentage]);

  const calculateDiscount = () => {
    setHasError(false);
    setErrorMessage("");
    
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercentage);
    const tax = taxPercentage ? parseFloat(taxPercentage) : 0;
    
    if (originalPrice === "" || discountPercentage === "") {
      setShowResult(false);
      return;
    }

    if (isNaN(price) || isNaN(discount)) {
      setHasError(true);
      setErrorMessage("Please enter valid numbers.");
      setShowResult(false);
      return;
    }

    if (price <= 0) {
      setHasError(true);
      setErrorMessage("Original price must be greater than zero.");
      setShowResult(false);
      return;
    }

    if (discount < 0 || discount > 100) {
      setHasError(true);
      setErrorMessage("Discount percentage must be between 0 and 100.");
      setShowResult(false);
      return;
    }

    if (tax < 0 || tax > 100) {
      setHasError(true);
      setErrorMessage("Tax percentage must be between 0 and 100.");
      setShowResult(false);
      return;
    }
    
    try {
      const discountValue = (price * discount) / 100;
      const priceAfterDiscount = price - discountValue;
      const priceWithTax = priceAfterDiscount + (priceAfterDiscount * tax) / 100;
      
      setDiscountAmount(discountValue);
      setFinalPrice(priceAfterDiscount);
      setFinalPriceWithTax(priceWithTax);
      setShowResult(true);
    } catch (error) {
      setHasError(true);
      setErrorMessage("An error occurred during calculation. Please check your inputs.");
      setShowResult(false);
    }
  };

  const resetCalculator = () => {
    setOriginalPrice("");
    setDiscountPercentage("");
    setTaxPercentage("");
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
        title="Instant Discount Calculator"
        description="Calculate discounts and sale prices instantly. See how much you save with optional tax calculation. Free and easy to use."
        path="/discount-calculator"
      />
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <header className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-rose-500/20 text-rose-400">
            <i className="ri-price-tag-3-line text-3xl"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Discount <span className="text-gradient">Calculator</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto text-lg">
            Calculate sale prices and see how much you save instantly.
          </p>
        </header>

        <div className="glass-panel p-6 md:p-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="original-price" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Original Price
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">₹</span>
                  <input
                    type="number"
                    id="original-price"
                    className="glass-input w-full pl-8 px-4 py-3 bg-transparent"
                    placeholder="e.g. 1000"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    min="0.01"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="discount-percentage" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Discount Percentage
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="discount-percentage"
                    className="glass-input w-full pr-8 px-4 py-3 bg-transparent"
                    placeholder="e.g. 20"
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(e.target.value)}
                    min="0"
                    max="100"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">%</span>
                </div>
              </div>
              
              <div className="form-group md:col-span-2">
                <label htmlFor="tax-percentage" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Tax Percentage (Optional)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="tax-percentage"
                    className="glass-input w-full pr-8 px-4 py-3 bg-transparent"
                    placeholder="e.g. 18"
                    value={taxPercentage}
                    onChange={(e) => setTaxPercentage(e.target.value)}
                    min="0"
                    max="100"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">%</span>
                </div>
              </div>
            </div>
            
            {hasError && (
              <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center">
                <i className="ri-error-warning-fill text-red-400 text-xl mr-3"></i>
                <p className="text-sm text-red-200">{errorMessage}</p>
              </div>
            )}
            
            <div className={`result-box mt-8 ${showResult ? 'opacity-100' : 'opacity-0 hidden'} transition-opacity duration-500`}>
              <div className="calculation-result p-6 rounded-xl bg-gradient-to-r from-rose-500/10 to-transparent border border-white/10">
                <h3 className="font-display font-semibold text-xl text-slate-900 dark:text-white mb-6 border-b border-black/10 dark:border-white/10 pb-4">
                  Discount Summary
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="result-item">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider">
                      You Save
                    </p>
                    <p className="text-3xl font-display font-bold text-emerald-600 dark:text-emerald-400 drop-shadow-md">
                      ₹ {formatCurrency(discountAmount)}
                    </p>
                  </div>
                  
                  <div className="result-item">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider">
                      Final Price
                    </p>
                    <p className="text-3xl font-display font-bold text-slate-900 dark:text-white drop-shadow-md">
                      ₹ {formatCurrency(finalPrice)}
                    </p>
                  </div>
                  
                  {taxPercentage && taxPercentage !== "0" && (
                    <div className="result-item md:col-span-2 pt-4 border-t border-white/10">
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider">
                        Final Price Including Tax ({taxPercentage}%)
                      </p>
                      <p className="text-3xl font-display font-bold text-primary drop-shadow-md">
                        ₹ {formatCurrency(finalPriceWithTax)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <button 
                onClick={resetCalculator}
                className="px-6 py-2.5 text-sm bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-black/10 dark:border-white/10 rounded-xl transition-all"
              >
                <i className="ri-refresh-fill mr-2"></i> Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscountCalculator;