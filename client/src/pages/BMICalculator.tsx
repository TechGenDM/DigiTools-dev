import React, { useState, useEffect } from "react";
import SEOHead from "@/components/SEOHead";

const BMICalculator: React.FC = () => {
  type UnitSystem = "metric" | "imperial";
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");

  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");

  const [bmi, setBMI] = useState<number | null>(null);
  const [bmiCategory, setBMICategory] = useState<string>("");
  const [healthyWeightRange, setHealthyWeightRange] = useState<{min: number, max: number} | null>(null);

  const [animate, setAnimate] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const calculateBMI = () => {
    try {
      setError("");
      
      const weightValue = parseFloat(weight);
      const heightValue = parseFloat(height);
      
      if (isNaN(weightValue) || weightValue <= 0) {
        setError("Please enter a valid weight greater than 0");
        resetResults();
        return;
      }
      
      if (isNaN(heightValue) || heightValue <= 0) {
        setError("Please enter a valid height greater than 0");
        resetResults();
        return;
      }
      
      let bmiValue: number;
      let heightInMeters: number;
      
      if (unitSystem === "metric") {
        heightInMeters = heightValue / 100;
        bmiValue = weightValue / (heightInMeters * heightInMeters);
        
        const minWeight = 18.5 * (heightInMeters * heightInMeters);
        const maxWeight = 24.9 * (heightInMeters * heightInMeters);
        setHealthyWeightRange({ min: minWeight, max: maxWeight });
      } else {
        bmiValue = (weightValue / (heightValue * heightValue)) * 703;
        
        const minWeight = (18.5 * (heightValue * heightValue)) / 703;
        const maxWeight = (24.9 * (heightValue * heightValue)) / 703;
        setHealthyWeightRange({ min: minWeight, max: maxWeight });
      }
      
      setBMI(bmiValue);
      determineCategory(bmiValue);
      
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1000);
      
    } catch (error) {
      setError("Error calculating BMI. Please check your inputs.");
      resetResults();
    }
  };

  const [riskLevel, setRiskLevel] = useState<"Low" | "Medium" | "High" | "">("");
  const [riskDescription, setRiskDescription] = useState<string>("");
  
  const determineCategory = (bmiValue: number) => {
    if (bmiValue < 18.5) {
      setBMICategory("Underweight");
      setRiskLevel("Medium");
      setRiskDescription("Underweight individuals may have a higher risk of nutrient deficiencies and weaker immune systems.");
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setBMICategory("Normal weight");
      setRiskLevel("Low");
      setRiskDescription("A normal BMI indicates a lower risk for heart disease and other health issues.");
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setBMICategory("Overweight");
      setRiskLevel("Medium");
      setRiskDescription("Being overweight can increase the risk of chronic diseases such as heart disease and diabetes.");
    } else {
      setBMICategory("Obese");
      setRiskLevel("High");
      setRiskDescription("Obesity is associated with a high risk of serious conditions like heart disease, stroke, and hypertension.");
    }
  };

  const getCategoryDescription = (): string => {
    switch (bmiCategory) {
      case "Underweight":
        return "Being underweight may indicate nutritional deficiencies or other health issues. Consider consulting with a healthcare provider.";
      case "Normal weight":
        return "Your weight is within the healthy range for your height. Maintain a balanced diet and regular exercise.";
      case "Overweight":
        return "Being overweight may increase the risk of heart disease, diabetes, and other health conditions. Consider a healthy diet and more physical activity.";
      case "Obese":
        return "Obesity is associated with higher risks of cardiovascular disease, diabetes, and other health issues. It's recommended to consult with a healthcare provider.";
      default:
        return "";
    }
  };
  
  const getRiskLevelColor = (): string => {
    switch (riskLevel) {
      case "Low":
        return "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
      case "Medium":
        return "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30";
      case "High":
        return "bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30";
      default:
        return "bg-slate-500/20 text-slate-700 dark:text-slate-300 border-slate-500/30";
    }
  };
  
  const getRiskLevelIcon = (): string => {
    switch (riskLevel) {
      case "Low":
        return "ri-emotion-happy-line";
      case "Medium":
        return "ri-emotion-normal-line";
      case "High":
        return "ri-emotion-unhappy-line";
      default:
        return "ri-question-line";
    }
  };

  const resetResults = () => {
    setBMI(null);
    setBMICategory("");
    setRiskLevel("");
    setRiskDescription("");
    setHealthyWeightRange(null);
  };

  const resetAll = () => {
    setWeight("");
    setHeight("");
    resetResults();
    setError("");
  };

  const handleUnitSystemChange = (system: UnitSystem) => {
    setUnitSystem(system);
    setWeight("");
    setHeight("");
    resetResults();
  };

  useEffect(() => {
    if (weight && height) {
      calculateBMI();
    } else {
      resetResults();
    }
  }, [weight, height, unitSystem]);

  const roundToOneDecimal = (num: number): number => {
    return Math.round(num * 10) / 10;
  };

  const getStatusColor = (): string => {
    switch (bmiCategory) {
      case "Underweight":
        return "text-blue-400";
      case "Normal weight":
        return "text-emerald-400";
      case "Overweight":
        return "text-amber-400";
      case "Obese":
        return "text-rose-400";
      default:
        return "text-slate-400";
    }
  };

  return (
    <>
      <SEOHead
        title="BMI Calculator – Check Your Body Mass Index"
        description="Calculate your Body Mass Index and check if your weight is in a healthy range. Supports metric and imperial units with health risk assessment."
        path="/bmi-calculator"
      />
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <header className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-cyan-500/20 text-cyan-400">
            <i className="ri-heart-pulse-fill text-3xl"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            BMI <span className="text-gradient text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Calculator</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto text-lg">
            Check if your weight is in a healthy range for your height.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-6 md:p-8 animate-slide-up shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <h2 className="text-xl font-display font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
              <i className="ri-user-smile-line text-cyan-600 dark:text-cyan-400 mr-3"></i>
              Enter Your Details
            </h2>
            
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Unit System
              </label>
              <div className="segmented-control">
                <div 
                  className={`segmented-tab ${unitSystem === 'metric' ? 'active !bg-cyan-500/20' : ''}`}
                  onClick={() => handleUnitSystemChange('metric')}
                  role="button"
                  tabIndex={0}
                >
                  Metric (kg, cm)
                </div>
                <div 
                  className={`segmented-tab ${unitSystem === 'imperial' ? 'active !bg-cyan-500/20' : ''}`}
                  onClick={() => handleUnitSystemChange('imperial')}
                  role="button"
                  tabIndex={0}
                >
                  Imperial (lbs, in)
                </div>
              </div>
            </div>
            
            <div className="space-y-6 mb-8">
              <div className="form-group">
                <label htmlFor="weight" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Weight {unitSystem === "metric" ? "(kg)" : "(lbs)"}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="weight"
                    className="glass-input w-full px-4 py-3 bg-transparent pr-12"
                    placeholder={unitSystem === "metric" ? "e.g. 70" : "e.g. 154"}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    min="0"
                    step="0.1"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500 text-sm">
                    {unitSystem === "metric" ? "kg" : "lbs"}
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="height" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Height {unitSystem === "metric" ? "(cm)" : "(in)"}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="height"
                    className="glass-input w-full px-4 py-3 bg-transparent pr-12"
                    placeholder={unitSystem === "metric" ? "e.g. 175" : "e.g. 65"}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    min="0"
                    step="0.1"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500 text-sm">
                    {unitSystem === "metric" ? "cm" : "in"}
                  </div>
                </div>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center mb-6">
                <i className="ri-error-warning-line text-red-400 text-xl mr-3"></i>
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}
            
            <div className="flex justify-end">
              <button 
                onClick={resetAll}
                className="px-6 py-2.5 text-sm bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-black/10 dark:border-white/10 rounded-xl transition-all"
              >
                <i className="ri-refresh-line mr-2"></i> Reset
              </button>
            </div>
          </div>

          <div className="bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-6 md:p-8 animate-slide-up shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <h2 className="text-xl font-display font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
              <i className="ri-file-list-3-fill text-cyan-600 dark:text-cyan-400 mr-3"></i>
              Your BMI Results
            </h2>
            
            {bmi ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-200 dark:border-cyan-500/20 rounded-2xl p-8 text-center shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                  <p className="text-sm text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-3">Your BMI</p>
                  <p className={`text-6xl font-display font-bold text-slate-900 dark:text-white drop-shadow-lg mb-4 ${animate ? 'animate-pulse' : ''}`}>
                    {roundToOneDecimal(bmi)}
                  </p>
                  <div className={`inline-block px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wider ${getStatusColor()} bg-black/5 dark:bg-white/5 border border-white/10`}>
                    {bmiCategory}
                  </div>
                </div>
                
                {riskLevel && (
                  <div className={`p-5 rounded-xl border ${getRiskLevelColor()} animate-in fade-in`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg text-white">Health Risk Level</h3>
                      <div className="flex items-center space-x-2">
                        <i className={`${getRiskLevelIcon()} text-xl`}></i>
                        <span className="font-medium tracking-wide">{riskLevel}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 text-sm opacity-90 leading-relaxed">
                      <i className="ri-information-line mt-0.5"></i>
                      <p>{riskDescription}</p>
                    </div>
                  </div>
                )}
                
                <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-5 rounded-xl">
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {getCategoryDescription()}
                  </p>
                </div>
                
                {healthyWeightRange && (
                  <div className="border border-black/10 dark:border-white/10 rounded-xl p-5 bg-white/5">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">Healthy Weight Range</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      For your height of <span className="text-white">{height} {unitSystem === "metric" ? "cm" : "in"}</span>, 
                      a healthy weight range (BMI 18.5-24.9) would be approximately:
                    </p>
                    <p className="mt-3 text-lg font-bold text-cyan-400">
                      {roundToOneDecimal(healthyWeightRange.min)} - {roundToOneDecimal(healthyWeightRange.max)} {unitSystem === "metric" ? "kg" : "lbs"}
                    </p>
                  </div>
                )}
                
                <div className="pt-4 border-t border-white/10">
                  <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-4 text-sm">BMI Scale Overview</h3>
                  <div className="h-3 rounded-full overflow-hidden flex mb-3 opacity-90">
                    <div className="bg-blue-400 w-1/4 h-full" title="Underweight"></div>
                    <div className="bg-emerald-400 w-1/4 h-full" title="Normal weight"></div>
                    <div className="bg-amber-400 w-1/4 h-full" title="Overweight"></div>
                    <div className="bg-rose-400 w-1/4 h-full" title="Obese"></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 text-center">
                    <div className="w-1/4">&lt;18.5</div>
                    <div className="w-1/4">18.5-24.9</div>
                    <div className="w-1/4">25-29.9</div>
                    <div className="w-1/4">&ge;30</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8 opacity-50">
                <i className="ri-scales-3-line text-7xl text-slate-600 mb-6"></i>
                <p className="text-slate-600 dark:text-slate-400 text-lg">Enter your weight and height to see your BMI calculation</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BMICalculator;