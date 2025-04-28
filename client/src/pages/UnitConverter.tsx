import React, { useState, useEffect } from "react";
import { Link } from "wouter";

// Define conversion unit types
type Category = "length" | "weight" | "temperature" | "volume";
type Unit = string;

// Define the conversion data structure
interface ConversionCategory {
  name: string;
  units: {
    [key: string]: {
      label: string;
      conversion: number;  // Factor to convert to base unit (first unit in the list)
    };
  };
}

const UnitConverter: React.FC = () => {
  // Conversion data for all categories
  const conversionData: { [key in Category]: ConversionCategory } = {
    length: {
      name: "Length",
      units: {
        meters: { label: "Meters (m)", conversion: 1 },
        kilometers: { label: "Kilometers (km)", conversion: 1000 },
        miles: { label: "Miles (mi)", conversion: 1609.34 },
        feet: { label: "Feet (ft)", conversion: 0.3048 },
        inches: { label: "Inches (in)", conversion: 0.0254 }
      }
    },
    weight: {
      name: "Weight",
      units: {
        kilograms: { label: "Kilograms (kg)", conversion: 1 },
        grams: { label: "Grams (g)", conversion: 0.001 },
        pounds: { label: "Pounds (lb)", conversion: 0.453592 },
        ounces: { label: "Ounces (oz)", conversion: 0.0283495 }
      }
    },
    temperature: {
      name: "Temperature",
      units: {
        celsius: { label: "Celsius (°C)", conversion: 1 },
        fahrenheit: { label: "Fahrenheit (°F)", conversion: 1 },
        kelvin: { label: "Kelvin (K)", conversion: 1 }
      }
    },
    volume: {
      name: "Volume",
      units: {
        liters: { label: "Liters (L)", conversion: 1 },
        milliliters: { label: "Milliliters (mL)", conversion: 0.001 },
        gallons: { label: "Gallons (gal)", conversion: 3.78541 },
        cups: { label: "Cups", conversion: 0.236588 }
      }
    }
  };

  // State for user inputs
  const [category, setCategory] = useState<Category>("length");
  const [fromUnit, setFromUnit] = useState<Unit>("");
  const [toUnit, setToUnit] = useState<Unit>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [unitExplanation, setUnitExplanation] = useState<string>("");

  // Initialize default units on category change
  useEffect(() => {
    const unitKeys = Object.keys(conversionData[category].units);
    setFromUnit(unitKeys[0]);
    setToUnit(unitKeys[1]);
    setInputValue(""); // Reset input when category changes
    setResult(null);
    setUnitExplanation("");
  }, [category]);

  // Convert units when inputs change
  useEffect(() => {
    if (fromUnit && toUnit && inputValue !== "") {
      convertValue();
    } else {
      setResult(null);
      setUnitExplanation("");
    }
  }, [category, fromUnit, toUnit, inputValue]);

  // Function to handle unit conversion
  const convertValue = () => {
    setError("");
    
    const value = parseFloat(inputValue);
    
    if (isNaN(value)) {
      setError("Please enter a valid number");
      setResult(null);
      setUnitExplanation("");
      return;
    }

    try {
      let convertedValue: number;
      
      // Temperature conversions require special formulas
      if (category === "temperature") {
        convertedValue = convertTemperature(value, fromUnit, toUnit);
      } else {
        // Standard conversion for other categories
        const fromFactor = conversionData[category].units[fromUnit].conversion;
        const toFactor = conversionData[category].units[toUnit].conversion;
        
        // Convert to base unit then to target unit
        const valueInBaseUnit = value * fromFactor;
        convertedValue = valueInBaseUnit / toFactor;
      }
      
      setResult(convertedValue);
      createUnitExplanation(value, fromUnit, toUnit, convertedValue);
    } catch (err) {
      setError("Error during conversion. Please check your inputs.");
      setResult(null);
      setUnitExplanation("");
    }
  };

  // Function to handle temperature conversions
  const convertTemperature = (value: number, from: Unit, to: Unit): number => {
    // Convert to Celsius first (as base unit)
    let celsius: number;
    
    if (from === "celsius") {
      celsius = value;
    } else if (from === "fahrenheit") {
      celsius = (value - 32) * (5/9);
    } else { // kelvin
      celsius = value - 273.15;
    }
    
    // Convert from Celsius to target unit
    if (to === "celsius") {
      return celsius;
    } else if (to === "fahrenheit") {
      return (celsius * (9/5)) + 32;
    } else { // kelvin
      return celsius + 273.15;
    }
  };

  // Create explanation of the conversion
  const createUnitExplanation = (value: number, from: Unit, to: Unit, result: number) => {
    if (category === "temperature") {
      setUnitExplanation(`Temperature conversion uses specific formulas, not a simple ratio.`);
    } else {
      const conversionRate = result / value;
      const fromLabel = conversionData[category].units[from].label.split(' ')[0];
      const toLabel = conversionData[category].units[to].label.split(' ')[0];
      setUnitExplanation(`1 ${fromLabel} = ${conversionRate.toFixed(6)} ${toLabel}`);
    }
  };

  // Function to reset all inputs
  const resetConverter = () => {
    setInputValue("");
    const unitKeys = Object.keys(conversionData[category].units);
    setFromUnit(unitKeys[0]);
    setToUnit(unitKeys[1]);
    setResult(null);
    setError("");
    setUnitExplanation("");
  };

  // Function to swap from and to units
  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  // Format result for display with appropriate precision
  const formatResult = (value: number): string => {
    if (category === "temperature") {
      // Temperature typically shown with 1-2 decimal places
      return value.toFixed(2);
    } else if (value === Math.floor(value)) {
      // Whole numbers don't need decimals
      return value.toString();
    } else if (value < 0.001 || value > 10000) {
      // Scientific notation for very small or large numbers
      return value.toExponential(6);
    } else if (value < 0.1) {
      // More precision for small values
      return value.toFixed(6);
    } else {
      // Standard precision
      return value.toFixed(4);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#4338ca] mb-2">
          Universal Unit Converter
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto">
          Convert between different units of measurement with precision and ease.
        </p>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm mb-6 bg-slate-50 p-2 rounded-md">
        <Link href="/">
          <div className="text-[#4338ca] hover:underline cursor-pointer">Home</div>
        </Link>
        <i className="ri-arrow-right-s-line mx-2 text-slate-400"></i>
        <span className="text-slate-700">Unit Converter</span>
      </div>

      {/* Converter Card */}
      <div className="converter-card bg-white rounded-lg shadow-card p-6 mb-6">
        <div className="space-y-6">
          {/* Category Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.keys(conversionData).map((cat) => (
              <button
                key={cat}
                className={`py-3 px-4 rounded-md transition-colors text-sm font-medium ${
                  category === cat
                    ? "bg-[#4338ca] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
                onClick={() => setCategory(cat as Category)}
              >
                <i className={`
                  ${cat === "length" ? "ri-ruler-2-fill" : 
                    cat === "weight" ? "ri-scales-fill" : 
                    cat === "temperature" ? "ri-temp-hot-fill" : 
                    "ri-drop-fill"} mr-2
                `}></i>
                {conversionData[cat as Category].name}
              </button>
            ))}
          </div>
          
          {/* Conversion Controls */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-2">
              <label htmlFor="from-unit" className="block text-sm font-medium text-slate-700 mb-1">
                From
              </label>
              <select
                id="from-unit"
                className="w-full px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
              >
                {fromUnit && Object.keys(conversionData[category].units).map((unit) => (
                  <option key={`from-${unit}`} value={unit}>
                    {conversionData[category].units[unit].label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={swapUnits}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
                title="Swap units"
              >
                <i className="ri-arrow-left-right-fill text-lg"></i>
              </button>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="to-unit" className="block text-sm font-medium text-slate-700 mb-1">
                To
              </label>
              <select
                id="to-unit"
                className="w-full px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
              >
                {toUnit && Object.keys(conversionData[category].units).map((unit) => (
                  <option key={`to-${unit}`} value={unit}>
                    {conversionData[category].units[unit].label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Input Value */}
          <div className="grid grid-cols-1 gap-4">
            <div className="form-group">
              <label htmlFor="input-value" className="block text-sm font-medium text-slate-700 mb-1">
                Enter Value
              </label>
              <input
                type="number"
                id="input-value"
                className="w-full px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder={`Enter value in ${fromUnit && fromUnit in conversionData[category].units ? 
                  conversionData[category].units[fromUnit].label.split(' ')[0] : 'selected unit'}`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                step="any"
              />
            </div>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className="ri-error-warning-fill text-red-400"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Results Section */}
          {result !== null && (
            <div className="result-box bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-md border border-indigo-100 animate-in slide-in-from-bottom duration-300">
              <h3 className="font-semibold text-lg text-[#4338ca] mb-4">
                Conversion Result
              </h3>
              
              <div className="bg-white p-4 rounded-md shadow-sm mb-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">
                      {inputValue} {fromUnit && fromUnit in conversionData[category].units ? 
                        conversionData[category].units[fromUnit].label.split(' ')[0] : ''}
                    </p>
                    <div className="flex items-center">
                      <i className="ri-arrow-right-line text-[#4338ca] mr-2"></i>
                      <p className="text-2xl font-bold text-[#4338ca]">
                        {formatResult(result)} {toUnit && toUnit in conversionData[category].units ? 
                          conversionData[category].units[toUnit].label.split(' ')[0] : ''}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {unitExplanation && (
                <div className="text-xs text-slate-600 bg-white p-3 rounded-md">
                  <p>{unitExplanation}</p>
                </div>
              )}
            </div>
          )}
          
          {/* Reset Button */}
          <div className="flex justify-end">
            <button 
              onClick={resetConverter}
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

export default UnitConverter;