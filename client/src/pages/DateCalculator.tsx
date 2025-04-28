import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { format, differenceInYears, differenceInMonths, differenceInDays, addMonths, isValid } from "date-fns";

// Interface for age calculation result
interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
}

const DateCalculator: React.FC = () => {
  // Date Difference Calculator states
  const [startDate, setStartDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [dateDifference, setDateDifference] = useState<AgeResult | null>(null);
  
  // Love Age Calculator states
  const [loveBirthDate, setLoveBirthDate] = useState<string>("");
  const [loveName, setLoveName] = useState<string>("");
  const [loveAge, setLoveAge] = useState<AgeResult | null>(null);
  
  // Your Age Calculator states
  const [yourBirthDate, setYourBirthDate] = useState<string>("");
  const [yourName, setYourName] = useState<string>("");
  const [yourAge, setYourAge] = useState<AgeResult | null>(null);
  
  // Pet Age Calculator states
  const [petBirthDate, setPetBirthDate] = useState<string>("");
  const [petName, setPetName] = useState<string>("");
  const [petAge, setPetAge] = useState<AgeResult | null>(null);
  
  // Error state
  const [error, setError] = useState<string>("");

  // Calculate date difference - Generic age calculation function
  const calculateAge = (birthDateStr: string): AgeResult | null => {
    try {
      const birthDate = new Date(birthDateStr);
      const currentDate = new Date();
      
      if (!isValid(birthDate)) {
        return null;
      }
      
      if (birthDate > currentDate) {
        return null;
      }
      
      // Calculate total days difference
      const totalDaysDiff = differenceInDays(currentDate, birthDate);
      
      // Calculate years difference
      const yearsDiff = differenceInYears(currentDate, birthDate);
      
      // Calculate months difference (after subtracting years)
      const birthDatePlusYears = addMonths(birthDate, yearsDiff * 12);
      const monthsDiff = differenceInMonths(currentDate, birthDatePlusYears);
      
      // Calculate remaining days (after subtracting years and months)
      const birthDatePlusYearsAndMonths = addMonths(birthDatePlusYears, monthsDiff);
      const daysDiff = differenceInDays(currentDate, birthDatePlusYearsAndMonths);
      
      return {
        years: yearsDiff,
        months: monthsDiff,
        days: daysDiff,
        totalDays: totalDaysDiff
      };
    } catch (error) {
      return null;
    }
  };

  // Calculate date difference between two selected dates
  const calculateDateDifference = () => {
    try {
      setError("");
      
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (!isValid(start) || !isValid(end)) {
        setError("Please enter valid dates");
        setDateDifference(null);
        return;
      }
      
      // Calculate total days difference
      const totalDaysDiff = differenceInDays(end, start);
      
      // Calculate years difference
      const yearsDiff = differenceInYears(end, start);
      
      // Calculate months difference (after subtracting years)
      const startPlusYears = addMonths(start, yearsDiff * 12);
      const monthsDiff = differenceInMonths(end, startPlusYears);
      
      // Calculate remaining days (after subtracting years and months)
      const startPlusYearsAndMonths = addMonths(startPlusYears, monthsDiff);
      const daysDiff = differenceInDays(end, startPlusYearsAndMonths);
      
      setDateDifference({
        years: yearsDiff,
        months: monthsDiff,
        days: daysDiff,
        totalDays: totalDaysDiff
      });
    } catch (error) {
      setError("Error calculating date difference. Please check your inputs.");
      setDateDifference(null);
    }
  };

  // Reset all fields for Date Difference
  const resetDateDifference = () => {
    setStartDate(format(new Date(), "yyyy-MM-dd"));
    setEndDate(format(new Date(), "yyyy-MM-dd"));
    setDateDifference(null);
    setError("");
  };

  // Reset for Love Age
  const resetLoveAge = () => {
    setLoveBirthDate("");
    setLoveName("");
    setLoveAge(null);
  };

  // Reset for Your Age
  const resetYourAge = () => {
    setYourBirthDate("");
    setYourName("");
    setYourAge(null);
  };

  // Reset for Pet Age
  const resetPetAge = () => {
    setPetBirthDate("");
    setPetName("");
    setPetAge(null);
  };

  // Calculate on input change for date difference
  useEffect(() => {
    calculateDateDifference();
  }, [startDate, endDate]);

  // Calculate love age when birth date changes
  useEffect(() => {
    if (loveBirthDate) {
      setLoveAge(calculateAge(loveBirthDate));
    }
  }, [loveBirthDate]);

  // Calculate your age when birth date changes
  useEffect(() => {
    if (yourBirthDate) {
      setYourAge(calculateAge(yourBirthDate));
    }
  }, [yourBirthDate]);

  // Calculate pet age when birth date changes
  useEffect(() => {
    if (petBirthDate) {
      setPetAge(calculateAge(petBirthDate));
    }
  }, [petBirthDate]);

  // Format date for display
  const formatDate = (date: Date): string => {
    return format(date, "EEEE, MMMM do, yyyy");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#4338ca] mb-2">
          Age Calculator
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto">
          Calculate the difference between dates or find out how old you, your love, or your pet is.
        </p>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm mb-6 bg-slate-50 p-2 rounded-md">
        <Link href="/">
          <div className="text-[#4338ca] hover:underline cursor-pointer">Home</div>
        </Link>
        <i className="ri-arrow-right-s-line mx-2 text-slate-400"></i>
        <span className="text-slate-700">Date Calculator</span>
      </div>

      {/* Date Difference Calculator */}
      <div className="bg-white rounded-lg shadow-card p-6 mb-6">
        <h2 className="text-xl font-bold text-[#4338ca] mb-4 flex items-center">
          <i className="ri-calendar-event-line mr-2"></i>
          Date Difference
        </h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="start-date" className="block text-sm font-medium text-slate-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                id="start-date"
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="end-date" className="block text-sm font-medium text-slate-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                id="end-date"
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          
          {/* Results */}
          {dateDifference && !error && (
            <div className="result-box bg-indigo-50 p-5 rounded-md border border-indigo-100 animate-in slide-in-from-bottom duration-500">
              <h3 className="font-semibold text-lg text-[#4338ca] mb-4">
                Date Difference Result
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="result-item bg-white p-4 rounded-md shadow-sm">
                  <p className="text-xs text-slate-500 mb-1">
                    Detailed Difference:
                  </p>
                  <p className="text-lg font-bold text-[#4338ca]">
                    {dateDifference.years} {dateDifference.years === 1 ? "Year" : "Years"}, {dateDifference.months} {dateDifference.months === 1 ? "Month" : "Months"}, {dateDifference.days} {dateDifference.days === 1 ? "Day" : "Days"}
                  </p>
                </div>
                
                <div className="result-item bg-white p-4 rounded-md shadow-sm">
                  <p className="text-xs text-slate-500 mb-1">
                    Total Days:
                  </p>
                  <p className="text-lg font-bold text-[#4338ca]">
                    {dateDifference.totalDays} {dateDifference.totalDays === 1 ? "Day" : "Days"}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 text-xs text-slate-600">
                <p className="mb-1">Start Date: {format(new Date(startDate), "EEEE, MMMM do, yyyy")}</p>
                <p>End Date: {format(new Date(endDate), "EEEE, MMMM do, yyyy")}</p>
              </div>
            </div>
          )}
          
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
          <div className="flex justify-end">
            <button 
              onClick={resetDateDifference}
              className="px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
            >
              <i className="ri-refresh-line mr-1"></i> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Love Age Calculator */}
      <div className="bg-white rounded-lg shadow-card p-6 mb-6">
        <h2 className="text-xl font-bold text-pink-500 mb-4 flex items-center">
          <i className="ri-heart-fill mr-2 text-pink-500"></i>
          Love Age
        </h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="love-name" className="block text-sm font-medium text-slate-700 mb-1">
                Name (Optional)
              </label>
              <input
                type="text"
                id="love-name"
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter name"
                value={loveName}
                onChange={(e) => setLoveName(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="love-birth-date" className="block text-sm font-medium text-slate-700 mb-1">
                Birth Date
              </label>
              <input
                type="date"
                id="love-birth-date"
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={loveBirthDate}
                onChange={(e) => setLoveBirthDate(e.target.value)}
              />
            </div>
          </div>
          
          {/* Results */}
          {loveAge && (
            <div className="result-box bg-pink-50 p-5 rounded-md border border-pink-100 animate-in slide-in-from-bottom duration-500">
              <h3 className="font-semibold text-lg text-pink-600 mb-4 flex items-center">
                <i className="ri-heart-pulse-fill mr-2"></i>
                Age Result
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="result-item bg-white p-4 rounded-md shadow-sm">
                  <p className="text-sm text-pink-500 mb-1">
                    {loveName ? `${loveName} is` : "Age"}:
                  </p>
                  <p className="text-2xl font-bold text-pink-600">
                    {loveAge.years} {loveAge.years === 1 ? "Year" : "Years"}, {loveAge.months} {loveAge.months === 1 ? "Month" : "Months"}, {loveAge.days} {loveAge.days === 1 ? "Day" : "Days"}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    {loveName ? `${loveName} was` : "Born"} born on {format(new Date(loveBirthDate), "EEEE, MMMM do, yyyy")}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-pink-500 text-center">
                <p>{loveName ? `${loveName} has been` : "You have been"} on this beautiful planet for {loveAge.totalDays.toLocaleString()} days! 💕</p>
              </div>
            </div>
          )}
          
          {/* Reset Button */}
          <div className="flex justify-end">
            <button 
              onClick={resetLoveAge}
              className="px-4 py-2 text-sm bg-pink-50 hover:bg-pink-100 text-pink-600 rounded transition-colors"
            >
              <i className="ri-refresh-line mr-1"></i> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Your Age Calculator */}
      <div className="bg-white rounded-lg shadow-card p-6 mb-6">
        <h2 className="text-xl font-bold text-blue-500 mb-4 flex items-center">
          <i className="ri-user-fill mr-2 text-blue-500"></i>
          Your Age
        </h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="your-name" className="block text-sm font-medium text-slate-700 mb-1">
                Name (Optional)
              </label>
              <input
                type="text"
                id="your-name"
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="your-birth-date" className="block text-sm font-medium text-slate-700 mb-1">
                Birth Date
              </label>
              <input
                type="date"
                id="your-birth-date"
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={yourBirthDate}
                onChange={(e) => setYourBirthDate(e.target.value)}
              />
            </div>
          </div>
          
          {/* Results */}
          {yourAge && (
            <div className="result-box bg-blue-50 p-5 rounded-md border border-blue-100 animate-in slide-in-from-bottom duration-500">
              <h3 className="font-semibold text-lg text-blue-600 mb-4 flex items-center">
                <i className="ri-calendar-check-fill mr-2"></i>
                Age Result
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="result-item bg-white p-4 rounded-md shadow-sm">
                  <p className="text-sm text-blue-500 mb-1">
                    {yourName ? `${yourName}, you are` : "You are"}:
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {yourAge.years} {yourAge.years === 1 ? "Year" : "Years"}, {yourAge.months} {yourAge.months === 1 ? "Month" : "Months"}, {yourAge.days} {yourAge.days === 1 ? "Day" : "Days"} old
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Born on {format(new Date(yourBirthDate), "EEEE, MMMM do, yyyy")}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-blue-500 text-center">
                <p>You've experienced {yourAge.totalDays.toLocaleString()} days of adventure on this planet! 🌎</p>
              </div>
            </div>
          )}
          
          {/* Reset Button */}
          <div className="flex justify-end">
            <button 
              onClick={resetYourAge}
              className="px-4 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 rounded transition-colors"
            >
              <i className="ri-refresh-line mr-1"></i> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Pet Age Calculator */}
      <div className="bg-white rounded-lg shadow-card p-6 mb-6">
        <h2 className="text-xl font-bold text-amber-500 mb-4 flex items-center">
          <i className="ri-footprint-fill mr-2 text-amber-500"></i>
          Pet Age
        </h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="pet-name" className="block text-sm font-medium text-slate-700 mb-1">
                Pet's Name (Optional)
              </label>
              <input
                type="text"
                id="pet-name"
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter pet's name"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="pet-birth-date" className="block text-sm font-medium text-slate-700 mb-1">
                Birth Date
              </label>
              <input
                type="date"
                id="pet-birth-date"
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={petBirthDate}
                onChange={(e) => setPetBirthDate(e.target.value)}
              />
            </div>
          </div>
          
          {/* Results */}
          {petAge && (
            <div className="result-box bg-amber-50 p-5 rounded-md border border-amber-100 animate-in slide-in-from-bottom duration-500">
              <h3 className="font-semibold text-lg text-amber-600 mb-4 flex items-center">
                <i className="ri-paw-print-fill mr-2"></i>
                Pet Age Result
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="result-item bg-white p-4 rounded-md shadow-sm">
                  <p className="text-sm text-amber-500 mb-1">
                    {petName ? `${petName} is` : "Your pet is"}:
                  </p>
                  <p className="text-2xl font-bold text-amber-600">
                    {petAge.years} {petAge.years === 1 ? "Year" : "Years"}, {petAge.months} {petAge.months === 1 ? "Month" : "Months"}, {petAge.days} {petAge.days === 1 ? "Day" : "Days"} old
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Born on {format(new Date(petBirthDate), "EEEE, MMMM do, yyyy")}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-amber-500 text-center">
                <p>{petName ? `${petName} has shared` : "Your pet has shared"} {petAge.totalDays.toLocaleString()} wonderful days with you! 🐾</p>
              </div>
            </div>
          )}
          
          {/* Reset Button */}
          <div className="flex justify-end">
            <button 
              onClick={resetPetAge}
              className="px-4 py-2 text-sm bg-amber-50 hover:bg-amber-100 text-amber-600 rounded transition-colors"
            >
              <i className="ri-refresh-line mr-1"></i> Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateCalculator;