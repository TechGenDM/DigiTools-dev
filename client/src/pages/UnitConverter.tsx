import React, { useState, useEffect } from "react";
import SEOHead from "@/components/SEOHead";

type Category = "length" | "weight" | "temperature" | "volume";
type Unit = string;

interface ConversionCategory {
  name: string;
  units: {
    [key: string]: {
      label: string;
      conversion: number;
    };
  };
}

const UnitConverter: React.FC = () => {
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

  const [category, setCategory] = useState<Category>("length");
  const [fromUnit, setFromUnit] = useState<Unit>("");
  const [toUnit, setToUnit] = useState<Unit>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [unitExplanation, setUnitExplanation] = useState<string>("");

  useEffect(() => {
    const unitKeys = Object.keys(conversionData[category].units);
    setFromUnit(unitKeys[0]);
    setToUnit(unitKeys[1]);
    setInputValue("");
    setResult(null);
    setUnitExplanation("");
  }, [category]);

  useEffect(() => {
    if (fromUnit && toUnit && inputValue !== "") {
      convertValue();
    } else {
      setResult(null);
      setUnitExplanation("");
    }
  }, [category, fromUnit, toUnit, inputValue]);

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
      if (category === "temperature") {
        convertedValue = convertTemperature(value, fromUnit, toUnit);
      } else {
        const fromFactor = conversionData[category].units[fromUnit].conversion;
        const toFactor = conversionData[category].units[toUnit].conversion;
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

  const convertTemperature = (value: number, from: Unit, to: Unit): number => {
    let celsius: number;
    if (from === "celsius") celsius = value;
    else if (from === "fahrenheit") celsius = (value - 32) * (5/9);
    else celsius = value - 273.15;
    
    if (to === "celsius") return celsius;
    else if (to === "fahrenheit") return (celsius * (9/5)) + 32;
    else return celsius + 273.15;
  };

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

  const resetConverter = () => {
    setInputValue("");
    const unitKeys = Object.keys(conversionData[category].units);
    setFromUnit(unitKeys[0]);
    setToUnit(unitKeys[1]);
    setResult(null);
    setError("");
    setUnitExplanation("");
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const formatResult = (value: number): string => {
    if (category === "temperature") return value.toFixed(2);
    if (value === Math.floor(value)) return value.toString();
    if (value < 0.001 || value > 10000) return value.toExponential(6);
    if (value < 0.1) return value.toFixed(6);
    return value.toFixed(4);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "length": return "from-blue-500/20 to-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/30";
      case "weight": return "from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
      case "temperature": return "from-orange-500/20 to-rose-500/20 text-orange-400 border-orange-500/30";
      case "volume": return "from-purple-500/20 to-indigo-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30";
      default: return "from-white/10 to-white/5 text-slate-900 dark:text-white border-white/10";
    }
  };

  return (
    <>
      <SEOHead
        title="Universal Unit Converter"
        description="Convert between units of length, weight, temperature, and volume with precision. Free, instant, and easy to use."
        path="/unit-converter"
      />
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <header className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-cyan-500/20 text-cyan-400">
            <i className="ri-arrow-left-right-fill text-3xl"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Unit <span className="text-gradient">Converter</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto text-lg">
            Convert between length, weight, temperature, and volume effortlessly.
          </p>
        </header>

        <div className="glass-panel p-6 md:p-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.keys(conversionData).map((cat) => (
                <button
                  key={cat}
                  className={`py-3 px-4 rounded-xl transition-all duration-300 text-sm font-medium flex flex-col items-center justify-center gap-2 border ${
                    category === cat
                      ? `bg-gradient-to-br ${getCategoryColor(cat)} shadow-lg scale-105`
                      : "bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10 hover:text-white"
                  }`}
                  onClick={() => setCategory(cat as Category)}
                >
                  <i className={`text-xl
                    ${cat === "length" ? "ri-ruler-2-fill" : 
                      cat === "weight" ? "ri-scales-fill" : 
                      cat === "temperature" ? "ri-temp-hot-fill" : 
                      "ri-drop-fill"}
                  `}></i>
                  <span>{conversionData[cat as Category].name}</span>
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
              <div className="md:col-span-5">
                <label htmlFor="from-unit" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  From
                </label>
                <div className="relative">
                  <select
                    id="from-unit"
                    className="glass-input w-full px-4 py-3 bg-transparent text-slate-900 dark:text-white appearance-none"
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                  >
                    {fromUnit && Object.keys(conversionData[category].units).map((unit) => (
                      <option key={`from-${unit}`} value={unit} className="bg-slate-900 text-white">
                        {conversionData[category].units[unit].label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <i className="ri-arrow-down-s-line"></i>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center md:col-span-1 pt-6 md:pt-0">
                <button
                  onClick={swapUnits}
                  className="p-3 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-slate-900 dark:text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  title="Swap units"
                >
                  <i className="ri-arrow-left-right-line text-lg"></i>
                </button>
              </div>
              
              <div className="md:col-span-5">
                <label htmlFor="to-unit" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  To
                </label>
                <div className="relative">
                  <select
                    id="to-unit"
                    className="glass-input w-full px-4 py-3 bg-transparent text-slate-900 dark:text-white appearance-none"
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                  >
                    {toUnit && Object.keys(conversionData[category].units).map((unit) => (
                      <option key={`to-${unit}`} value={unit} className="bg-slate-900 text-white">
                        {conversionData[category].units[unit].label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <i className="ri-arrow-down-s-line"></i>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-group pt-4 border-t border-white/5">
              <label htmlFor="input-value" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 text-center">
                Enter Value to Convert
              </label>
              <input
                type="number"
                id="input-value"
                className="glass-input w-full px-4 py-4 bg-transparent text-center text-2xl font-bold font-display"
                placeholder="0.00"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                step="any"
              />
            </div>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center">
                <i className="ri-error-warning-fill text-red-400 text-xl mr-3"></i>
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}
            
            {result !== null && (
              <div className={`bg-gradient-to-br ${getCategoryColor(category)} p-6 rounded-2xl animate-in fade-in duration-300 text-center shadow-lg backdrop-blur-md`}>
                <p className="text-sm opacity-80 mb-2 font-medium tracking-wide">Conversion Result</p>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-4xl font-display font-bold text-slate-900 dark:text-white drop-shadow-md break-all">
                    {formatResult(result)}
                  </p>
                  <p className="text-lg opacity-90 mt-1">
                    {toUnit && toUnit in conversionData[category].units ? 
                      conversionData[category].units[toUnit].label : ''}
                  </p>
                </div>
                
                {unitExplanation && (
                  <div className="mt-4 pt-3 border-t border-black/20 dark:border-white/20 text-xs font-medium opacity-80">
                    {unitExplanation}
                  </div>
                )}
              </div>
            )}
            
            <div className="flex justify-end pt-2">
              <button 
                onClick={resetConverter}
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

export default UnitConverter;