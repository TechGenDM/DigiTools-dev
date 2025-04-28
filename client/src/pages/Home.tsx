import { useState } from "react";
import CalculatorTabs from "@/components/CalculatorTabs";
import PercentOfCalculator from "@/components/PercentOfCalculator";
import WhatPercentCalculator from "@/components/WhatPercentCalculator";
import PercentChangeCalculator from "@/components/PercentChangeCalculator";
import Examples from "@/components/Examples";

function Home() {
  const [activeTab, setActiveTab] = useState<string>("percent-of");

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#4338ca] mb-2">
          Percentage Calculator
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto">
          Calculate percentages instantly with our easy-to-use tools. Get real-time results as you type.
        </p>
      </header>

      <CalculatorTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="calculator-container">
        {activeTab === "percent-of" && <PercentOfCalculator />}
        {activeTab === "x-is-what-percent" && <WhatPercentCalculator />}
        {activeTab === "percent-change" && <PercentChangeCalculator />}
      </div>

      <Examples />
    </div>
  );
}

export default Home;