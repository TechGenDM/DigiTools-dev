import React, { useState, useEffect } from "react";
import { Link } from "wouter";

const BMICalculator: React.FC = () => {
  // Unit selection state
  type UnitSystem = "metric" | "imperial";
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");

  // Input states
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");

  // Result states
  const [bmi, setBMI] = useState<number | null>(null);
  const [bmiCategory, setBMICategory] = useState<string>("");
  const [healthyWeightRange, setHealthyWeightRange] = useState<{min: number, max: number} | null>(null);

  // Animation state
  const [animate, setAnimate] = useState<boolean>(false);

  // Error state
  const [error, setError] = useState<string>("");

  // Calculate BMI
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
        // BMI = weight (kg) ÷ (height (m) × height (m))
        heightInMeters = heightValue / 100; // convert cm to m
        bmiValue = weightValue / (heightInMeters * heightInMeters);
        
        // Calculate healthy weight range
        const minWeight = 18.5 * (heightInMeters * heightInMeters);
        const maxWeight = 24.9 * (heightInMeters * heightInMeters);
        setHealthyWeightRange({ min: minWeight, max: maxWeight });
      } else {
        // BMI = (weight (lbs) ÷ height (inches)²) × 703
        bmiValue = (weightValue / (heightValue * heightValue)) * 703;
        
        // Calculate healthy weight range (in lbs)
        const minWeight = (18.5 * (heightValue * heightValue)) / 703;
        const maxWeight = (24.9 * (heightValue * heightValue)) / 703;
        setHealthyWeightRange({ min: minWeight, max: maxWeight });
      }
      
      setBMI(bmiValue);
      determineCategory(bmiValue);
      
      // Trigger animation
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1000);
      
    } catch (error) {
      setError("Error calculating BMI. Please check your inputs.");
      resetResults();
    }
  };

  // Health risk states
  const [riskLevel, setRiskLevel] = useState<"Low" | "Medium" | "High" | "">("");
  const [riskDescription, setRiskDescription] = useState<string>("");
  
  // Determine BMI category
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

  // Get category description
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
  
  // Get risk level color
  const getRiskLevelColor = (): string => {
    switch (riskLevel) {
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      case "Medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };
  
  // Get risk level icon
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

  // Reset calculated results
  const resetResults = () => {
    setBMI(null);
    setBMICategory("");
    setRiskLevel("");
    setRiskDescription("");
    setHealthyWeightRange(null);
  };

  // Reset all fields
  const resetAll = () => {
    setWeight("");
    setHeight("");
    resetResults();
    setError("");
  };

  // Change unit system
  const handleUnitSystemChange = (system: UnitSystem) => {
    setUnitSystem(system);
    setWeight("");
    setHeight("");
    resetResults();
  };

  // Calculate when inputs change
  useEffect(() => {
    if (weight && height) {
      calculateBMI();
    } else {
      resetResults();
    }
  }, [weight, height, unitSystem]);

  // Round number to 1 decimal place
  const roundToOneDecimal = (num: number): number => {
    return Math.round(num * 10) / 10;
  };

  // Get the health status color
  const getStatusColor = (): string => {
    switch (bmiCategory) {
      case "Underweight":
        return "text-blue-600";
      case "Normal weight":
        return "text-green-600";
      case "Overweight":
        return "text-amber-500";
      case "Obese":
        return "text-red-600";
      default:
        return "text-slate-600";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#4338ca] mb-2">
          BMI Calculator
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto">
          Calculate your Body Mass Index and check if your weight is in a healthy range for your height.
        </p>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm mb-6 bg-slate-50 p-2 rounded-md">
        <Link href="/">
          <div className="text-[#4338ca] hover:underline cursor-pointer">Home</div>
        </Link>
        <i className="ri-arrow-right-s-line mx-2 text-slate-400"></i>
        <span className="text-slate-700">BMI Calculator</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-xl font-semibold text-[#4338ca] mb-4 flex items-center">
            <i className="ri-heart-pulse-fill mr-2"></i>
            Enter Your Details
          </h2>
          
          {/* Unit System Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Unit System
            </label>
            <div className="flex border border-slate-300 rounded-md overflow-hidden">
              <button
                className={`flex-1 py-2 text-sm font-medium transition-colors ${
                  unitSystem === "metric"
                    ? "bg-[#4338ca] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
                onClick={() => handleUnitSystemChange("metric")}
              >
                Metric (kg, cm)
              </button>
              <button
                className={`flex-1 py-2 text-sm font-medium transition-colors ${
                  unitSystem === "imperial"
                    ? "bg-[#4338ca] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
                onClick={() => handleUnitSystemChange("imperial")}
              >
                Imperial (lbs, in)
              </button>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="form-group">
              <label htmlFor="weight" className="block text-sm font-medium text-slate-700 mb-1">
                Weight {unitSystem === "metric" ? "(kg)" : "(lbs)"}
              </label>
              <input
                type="number"
                id="weight"
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder={unitSystem === "metric" ? "e.g. 70" : "e.g. 154"}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min="0"
                step="0.1"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="height" className="block text-sm font-medium text-slate-700 mb-1">
                Height {unitSystem === "metric" ? "(cm)" : "(in)"}
              </label>
              <input
                type="number"
                id="height"
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder={unitSystem === "metric" ? "e.g. 175" : "e.g. 65"}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min="0"
                step="0.1"
              />
            </div>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md mb-4">
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
              onClick={resetAll}
              className="px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
            >
              <i className="ri-refresh-line mr-1"></i> Reset
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-xl font-semibold text-[#4338ca] mb-4 flex items-center">
            <i className="ri-file-list-3-fill mr-2"></i>
            Your BMI Results
          </h2>
          
          {bmi ? (
            <div className="space-y-6">
              {/* BMI Result */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 text-center">
                <p className="text-sm text-slate-600 mb-1">Your BMI</p>
                <p className={`text-4xl font-bold text-[#4338ca] mb-2 ${animate ? 'animate-pulse' : ''}`}>
                  {roundToOneDecimal(bmi)}
                </p>
                <div className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
                  {bmiCategory}
                </div>
              </div>
              
              {/* Health Risk Section */}
              {riskLevel && (
                <div className={`p-5 rounded-lg border ${getRiskLevelColor()} animate-in fade-in`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">Health Risk Level</h3>
                    <div className="flex items-center space-x-1">
                      <i className={`${getRiskLevelIcon()} text-lg`}></i>
                      <span className="font-medium">{riskLevel}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <i className="ri-information-line"></i>
                    </div>
                    <p className="text-sm">{riskDescription}</p>
                  </div>
                  
                  {riskLevel === "High" && (
                    <div className="mt-3 pt-3 border-t border-red-200">
                      <p className="text-sm flex items-center text-red-700">
                        <i className="ri-service-line mr-2"></i>
                        Consider consulting with a healthcare professional for personalized advice.
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Category explanation */}
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-slate-700">
                  {getCategoryDescription()}
                </p>
              </div>
              
              {/* Healthy Weight Range */}
              {healthyWeightRange && (
                <div className="border border-slate-200 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-700 mb-2 text-sm">Healthy Weight Range</h3>
                  <p className="text-slate-600 text-sm">
                    For your height of {height} {unitSystem === "metric" ? "cm" : "in"}, 
                    a healthy weight range (BMI 18.5-24.9) would be approximately:
                  </p>
                  <p className="mt-2 font-medium text-[#4338ca]">
                    {roundToOneDecimal(healthyWeightRange.min)} - {roundToOneDecimal(healthyWeightRange.max)} {unitSystem === "metric" ? "kg" : "lbs"}
                  </p>
                </div>
              )}
              
              {/* BMI Scale */}
              <div className="mt-4">
                <h3 className="font-semibold text-slate-700 mb-2 text-sm">BMI Categories</h3>
                <div className="h-6 rounded-lg overflow-hidden flex mb-1">
                  <div className="bg-blue-500 w-1/4 h-full" title="Underweight"></div>
                  <div className="bg-green-500 w-1/4 h-full" title="Normal weight"></div>
                  <div className="bg-amber-500 w-1/4 h-full" title="Overweight"></div>
                  <div className="bg-red-500 w-1/4 h-full" title="Obese"></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <div>Underweight<br/>&lt;18.5</div>
                  <div>Normal<br/>18.5-24.9</div>
                  <div>Overweight<br/>25-29.9</div>
                  <div>Obese<br/>&ge;30</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="min-h-48 flex items-center justify-center">
              <div className="text-center p-8">
                <i className="ri-scales-3-line text-4xl text-slate-300 mb-2"></i>
                <p className="text-slate-400">Enter your weight and height to see your BMI</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-md border border-indigo-100">
          <h3 className="font-semibold text-md text-[#4338ca] mb-2 flex items-center">
            <i className="ri-scales-3-line mr-2"></i>
            What is Body Mass Index (BMI)?
          </h3>
          <p className="text-sm text-slate-600">
            BMI is a simple calculation using a person's height and weight. The formula is BMI = kg/m² where kg is a person's weight in kilograms and m² is their height in meters squared. 
            BMI is used as a screening tool to indicate whether a person is underweight, healthy weight, overweight, or obese.
          </p>
          <p className="text-sm text-slate-600 mt-2">
            <strong>Note:</strong> BMI is a screening tool but not a diagnostic tool. Factors like muscle mass, ethnic background, age, and sex can influence the relationship between BMI and body fat. 
            Always consult with healthcare professionals for a complete assessment of your health.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-5 rounded-md border border-pink-100">
          <h3 className="font-semibold text-md text-rose-600 mb-2 flex items-center">
            <i className="ri-heart-pulse-fill mr-2"></i>
            Understanding Health Risks
          </h3>
          <p className="text-sm text-slate-600">
            BMI categories can help identify potential health risks. While individual health varies, 
            maintaining a BMI in the normal range (18.5-24.9) generally indicates lower health risks.
          </p>
          <ul className="mt-2 space-y-2 text-sm text-slate-600">
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mt-0.5">Underweight</span>
              <span>May lead to nutritional deficiencies, weaker immune system, and fragile bones.</span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2 mt-0.5">Normal</span>
              <span>Associated with better overall health and lower risk of weight-related health issues.</span>
            </li>
            <li className="flex items-start">
              <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full mr-2 mt-0.5">Overweight</span>
              <span>Increased risk of developing type 2 diabetes, heart disease, and high blood pressure.</span>
            </li>
            <li className="flex items-start">
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mr-2 mt-0.5">Obese</span>
              <span>Higher risk of serious health conditions including heart disease, stroke, sleep apnea, and certain cancers.</span>
            </li>
          </ul>
          <div className="mt-3 pt-3 border-t border-pink-200">
            <a href="https://www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/index.html" target="_blank" rel="noopener noreferrer" className="text-sm text-rose-600 hover:underline flex items-center">
              <i className="ri-external-link-line mr-1"></i> Learn more about BMI and health risks
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;