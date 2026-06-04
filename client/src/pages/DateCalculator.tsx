import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { format, differenceInYears, differenceInMonths, differenceInDays, addMonths, isValid } from "date-fns";
import SEOHead from "@/components/SEOHead";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
}

const DateCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [dateDifference, setDateDifference] = useState<AgeResult | null>(null);
  
  const [loveBirthDate, setLoveBirthDate] = useState<string>("");
  const [loveName, setLoveName] = useState<string>("");
  const [loveAge, setLoveAge] = useState<AgeResult | null>(null);
  
  const [yourBirthDate, setYourBirthDate] = useState<string>("");
  const [yourName, setYourName] = useState<string>("");
  const [yourAge, setYourAge] = useState<AgeResult | null>(null);
  
  const [petBirthDate, setPetBirthDate] = useState<string>("");
  const [petName, setPetName] = useState<string>("");
  const [petAge, setPetAge] = useState<AgeResult | null>(null);
  
  const [error, setError] = useState<string>("");

  const calculateAge = (birthDateStr: string): AgeResult | null => {
    try {
      const birthDate = new Date(birthDateStr);
      const currentDate = new Date();
      
      if (!isValid(birthDate)) return null;
      if (birthDate > currentDate) return null;
      
      const totalDaysDiff = differenceInDays(currentDate, birthDate);
      const yearsDiff = differenceInYears(currentDate, birthDate);
      
      const birthDatePlusYears = addMonths(birthDate, yearsDiff * 12);
      const monthsDiff = differenceInMonths(currentDate, birthDatePlusYears);
      
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
      
      const totalDaysDiff = differenceInDays(end, start);
      const yearsDiff = differenceInYears(end, start);
      
      const startPlusYears = addMonths(start, yearsDiff * 12);
      const monthsDiff = differenceInMonths(end, startPlusYears);
      
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

  const resetDateDifference = () => {
    setStartDate(format(new Date(), "yyyy-MM-dd"));
    setEndDate(format(new Date(), "yyyy-MM-dd"));
    setDateDifference(null);
    setError("");
  };

  const resetLoveAge = () => {
    setLoveBirthDate("");
    setLoveName("");
    setLoveAge(null);
  };

  const resetYourAge = () => {
    setYourBirthDate("");
    setYourName("");
    setYourAge(null);
  };

  const resetPetAge = () => {
    setPetBirthDate("");
    setPetName("");
    setPetAge(null);
  };

  useEffect(() => {
    calculateDateDifference();
  }, [startDate, endDate]);

  useEffect(() => {
    if (loveBirthDate) setLoveAge(calculateAge(loveBirthDate));
  }, [loveBirthDate]);

  useEffect(() => {
    if (yourBirthDate) setYourAge(calculateAge(yourBirthDate));
  }, [yourBirthDate]);

  useEffect(() => {
    if (petBirthDate) setPetAge(calculateAge(petBirthDate));
  }, [petBirthDate]);

  const formatDate = (date: Date): string => {
    return format(date, "EEEE, MMMM do, yyyy");
  };

  return (
    <>
      <SEOHead
        title="Age & Date Calculator"
        description="Calculate the difference between dates, find your age, your loved one's age, or your pet's age with precision. Free and instant."
        path="/date-calculator"
      />
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <header className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-primary/20 text-primary">
            <i className="ri-calendar-event-fill text-3xl"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Age & Date <span className="text-gradient">Calculator</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto text-lg">
            Calculate the difference between dates or find out how old you, your love, or your pet is.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Date Difference Calculator */}
          <div className="glass-panel p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-xl font-display font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
              <i className="ri-calendar-event-line mr-3 text-indigo-400"></i>
              Date Difference
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="start-date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="start-date"
                    className="glass-input w-full px-4 py-3 bg-transparent text-slate-900 dark:text-white [color-scheme:dark]"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="end-date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="end-date"
                    className="glass-input w-full px-4 py-3 bg-transparent text-slate-900 dark:text-white [color-scheme:dark]"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              
              {dateDifference && !error && (
                <div className="result-box bg-indigo-500/10 dark:bg-indigo-500/20 p-5 rounded-xl border border-indigo-500/20">
                  <h3 className="font-semibold text-lg text-indigo-700 dark:text-indigo-300 mb-4">
                    Difference Result
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Detailed Difference</p>
                      <p className="text-lg font-bold text-white">
                        {dateDifference.years} Yrs, {dateDifference.months} Mos, {dateDifference.days} Days
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Total Days</p>
                      <p className="text-lg font-bold text-indigo-400">
                        {dateDifference.totalDays} Days
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center">
                  <i className="ri-error-warning-line text-red-400 mr-3"></i>
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}
              
              <div className="flex justify-end pt-2">
                <button 
                  onClick={resetDateDifference}
                  className="px-4 py-2 text-sm bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-black/10 dark:border-white/10 rounded-xl transition-all"
                >
                  <i className="ri-refresh-line mr-2"></i> Reset
                </button>
              </div>
            </div>
          </div>

          {/* Your Age Calculator */}
          <div className="glass-panel p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-xl font-display font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
              <i className="ri-user-smile-line mr-3 text-emerald-400"></i>
              Your Age
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="your-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="your-name"
                    className="glass-input w-full px-4 py-3 bg-transparent"
                    placeholder="Enter your name"
                    value={yourName}
                    onChange={(e) => setYourName(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="your-birth-date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    id="your-birth-date"
                    className="glass-input w-full px-4 py-3 bg-transparent text-slate-900 dark:text-white [color-scheme:dark]"
                    value={yourBirthDate}
                    onChange={(e) => setYourBirthDate(e.target.value)}
                  />
                </div>
              </div>
              
              {yourAge && (
                <div className="result-box bg-emerald-500/10 dark:bg-emerald-500/20 p-5 rounded-xl border border-emerald-500/20">
                  <h3 className="font-semibold text-lg text-emerald-700 dark:text-emerald-300 mb-4 flex items-center">
                    <i className="ri-calendar-check-fill mr-2"></i> Age Result
                  </h3>
                  
                  <div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mb-1">
                      {yourName ? `${yourName}, you are` : "You are"}:
                    </p>
                    <p className="text-2xl font-bold text-emerald-400">
                      {yourAge.years} {yourAge.years === 1 ? "Year" : "Years"}, {yourAge.months} {yourAge.months === 1 ? "Month" : "Months"}, {yourAge.days} {yourAge.days === 1 ? "Day" : "Days"} old
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                      You've experienced {yourAge.totalDays.toLocaleString()} days of adventure! 🌎
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end pt-2">
                <button 
                  onClick={resetYourAge}
                  className="px-4 py-2 text-sm bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-black/10 dark:border-white/10 rounded-xl transition-all"
                >
                  <i className="ri-refresh-line mr-2"></i> Reset
                </button>
              </div>
            </div>
          </div>

          {/* Love Age Calculator */}
          <div className="glass-panel p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-xl font-display font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
              <i className="ri-heart-fill mr-3 text-rose-400"></i>
              Love Age
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="love-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="love-name"
                    className="glass-input w-full px-4 py-3 bg-transparent"
                    placeholder="Enter name"
                    value={loveName}
                    onChange={(e) => setLoveName(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="love-birth-date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    id="love-birth-date"
                    className="glass-input w-full px-4 py-3 bg-transparent text-slate-900 dark:text-white [color-scheme:dark]"
                    value={loveBirthDate}
                    onChange={(e) => setLoveBirthDate(e.target.value)}
                  />
                </div>
              </div>
              
              {loveAge && (
                <div className="result-box bg-rose-500/10 dark:bg-rose-500/20 p-5 rounded-xl border border-rose-500/20">
                  <h3 className="font-semibold text-lg text-rose-700 dark:text-rose-300 mb-4 flex items-center">
                    <i className="ri-heart-pulse-fill mr-2"></i> Age Result
                  </h3>
                  
                  <div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mb-1">
                      {loveName ? `${loveName} is` : "Age"}:
                    </p>
                    <p className="text-2xl font-bold text-rose-400">
                      {loveAge.years} {loveAge.years === 1 ? "Year" : "Years"}, {loveAge.months} {loveAge.months === 1 ? "Month" : "Months"}, {loveAge.days} {loveAge.days === 1 ? "Day" : "Days"} old
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                      {loveName ? `${loveName} has been` : "You have been"} on this planet for {loveAge.totalDays.toLocaleString()} days! 💕
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end pt-2">
                <button 
                  onClick={resetLoveAge}
                  className="px-4 py-2 text-sm bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-black/10 dark:border-white/10 rounded-xl transition-all"
                >
                  <i className="ri-refresh-line mr-2"></i> Reset
                </button>
              </div>
            </div>
          </div>

          {/* Pet Age Calculator */}
          <div className="glass-panel p-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-xl font-display font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
              <i className="ri-footprint-fill mr-3 text-amber-400"></i>
              Pet Age
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="pet-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Pet's Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="pet-name"
                    className="glass-input w-full px-4 py-3 bg-transparent"
                    placeholder="Enter pet's name"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="pet-birth-date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    id="pet-birth-date"
                    className="glass-input w-full px-4 py-3 bg-transparent text-slate-900 dark:text-white [color-scheme:dark]"
                    value={petBirthDate}
                    onChange={(e) => setPetBirthDate(e.target.value)}
                  />
                </div>
              </div>
              
              {petAge && (
                <div className="result-box bg-amber-500/10 dark:bg-amber-500/20 p-5 rounded-xl border border-amber-500/20">
                  <h3 className="font-semibold text-lg text-amber-700 dark:text-amber-300 mb-4 flex items-center">
                    <i className="ri-paw-print-fill mr-2"></i> Age Result
                  </h3>
                  
                  <div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mb-1">
                      {petName ? `${petName} is` : "Your pet is"}:
                    </p>
                    <p className="text-2xl font-bold text-amber-400">
                      {petAge.years} {petAge.years === 1 ? "Year" : "Years"}, {petAge.months} {petAge.months === 1 ? "Month" : "Months"}, {petAge.days} {petAge.days === 1 ? "Day" : "Days"} old
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                      {petName ? `${petName} has shared` : "Your pet has shared"} {petAge.totalDays.toLocaleString()} wonderful days with you! 🐾
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end pt-2">
                <button 
                  onClick={resetPetAge}
                  className="px-4 py-2 text-sm bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-black/10 dark:border-white/10 rounded-xl transition-all"
                >
                  <i className="ri-refresh-line mr-2"></i> Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DateCalculator;