import React, { useState, useEffect } from "react";
import { Link } from "wouter";

const DiscountCalculator: React.FC = () => {
  // State for input values
  const [originalPrice, setOriginalPrice] = useState<string>("");
  const [discountPercentage, setDiscountPercentage] = useState<string>("");
  const [taxPercentage, setTaxPercentage] = useState<string>("");
  
  // State for calculation results
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [finalPriceWithTax, setFinalPriceWithTax] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Calculate discount whenever inputs change
  useEffect(() => {
    calculateDiscount();
  }, [originalPrice, discountPercentage, taxPercentage]);

  const calculateDiscount = () => {
    // Reset error state
    setHasError(false);
    setErrorMessage("");
    
    // Parse input values
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercentage);
    const tax = taxPercentage ? parseFloat(taxPercentage) : 0;
    
    // Validate inputs
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
    
    // Calculate results
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
          Instant Discount Calculator
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto">
          Calculate discounts and sale prices instantly with our easy-to-use tool.
        </p>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm mb-6 bg-slate-50 p-2 rounded-md">
        <Link href="/">
          <div className="text-[#4338ca] hover:underline cursor-pointer">Home</div>
        </Link>
        <i className="ri-arrow-right-s-line mx-2 text-slate-400"></i>
        <span className="text-slate-700">Discount Calculator</span>
      </div>

      {/* Calculator Card */}
      <div className="calculator-card bg-white rounded-lg shadow-card p-6 mb-6">
        <div className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="original-price" className="block text-sm font-medium text-slate-700 mb-1">
                Original Price
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">₹</span>
                <input
                  type="number"
                  id="original-price"
                  className="w-full pl-8 px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g. 1000"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  min="0.01"
                  step="any"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="discount-percentage" className="block text-sm font-medium text-slate-700 mb-1">
                Discount Percentage
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="discount-percentage"
                  className="w-full pr-8 px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g. 20"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                  min="0"
                  max="100"
                  step="any"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">%</span>
              </div>
            </div>
            
            <div className="form-group md:col-span-2">
              <label htmlFor="tax-percentage" className="block text-sm font-medium text-slate-700 mb-1">
                Tax Percentage (Optional)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="tax-percentage"
                  className="w-full pr-8 px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g. 18"
                  value={taxPercentage}
                  onChange={(e) => setTaxPercentage(e.target.value)}
                  min="0"
                  max="100"
                  step="any"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">%</span>
              </div>
            </div>
          </div>
          
          {/* Error Message */}
          {hasError && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className="ri-error-warning-fill text-red-400"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Results Section */}
          {showResult && (
            <div className="result-box bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-md border border-indigo-100 animate-in slide-in-from-bottom duration-300">
              <h3 className="font-semibold text-lg text-[#4338ca] mb-4">
                Discount Summary
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="result-item bg-white p-4 rounded-md shadow-sm">
                  <p className="text-xs text-slate-500 mb-1">
                    You Save:
                  </p>
                  <p className="text-2xl font-bold text-emerald-600 calculation-result">
                    ₹ {formatCurrency(discountAmount)}
                  </p>
                  <p className="text-xs text-emerald-600 mt-1">
                    {discountPercentage}% off the original price
                  </p>
                </div>
                
                <div className="result-item bg-white p-4 rounded-md shadow-sm">
                  <p className="text-xs text-slate-500 mb-1">
                    Final Price:
                  </p>
                  <p className="text-2xl font-bold text-[#4338ca] calculation-result">
                    ₹ {formatCurrency(finalPrice)}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    After applying the discount
                  </p>
                </div>
                
                {taxPercentage && taxPercentage !== "0" && (
                  <div className="result-item bg-white p-4 rounded-md shadow-sm md:col-span-2">
                    <p className="text-xs text-slate-500 mb-1">
                      Final Price Including Tax ({taxPercentage}%):
                    </p>
                    <p className="text-2xl font-bold text-[#4338ca] calculation-result">
                      ₹ {formatCurrency(finalPriceWithTax)}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      Price after discount and tax
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-xs text-slate-600 bg-white p-3 rounded-md">
                <p className="font-medium mb-1">How the discount is calculated:</p>
                <div className="space-y-1">
                  <p>Original Price: ₹{formatCurrency(parseFloat(originalPrice))}</p>
                  <p>Discount Amount = Original Price × (Discount% ÷ 100)</p>
                  <p>Final Price = Original Price - Discount Amount</p>
                  {taxPercentage && taxPercentage !== "0" && (
                    <p>Final Price with Tax = Final Price + (Final Price × Tax% ÷ 100)</p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Reset Button */}
          <div className="flex justify-end">
            <button 
              onClick={resetCalculator}
              className="px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
            >
              <i className="ri-refresh-fill mr-1"></i> Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountCalculator;