import React from "react";
import PercentOfCalculator from "./PercentOfCalculator";
import WhatPercentCalculator from "./WhatPercentCalculator";
import PercentChangeCalculator from "./PercentChangeCalculator";

interface CalculatorProps {
  activeTab: string;
}

/**
 * Calculator component that renders the appropriate calculator based on the active tab
 * This is a wrapper component that conditionally displays one of the three calculator types
 */
const Calculator: React.FC<CalculatorProps> = ({ activeTab }) => {
  return (
    <div className="calculator-container">
      {activeTab === "percent-of" && <PercentOfCalculator />}
      {activeTab === "x-is-what-percent" && <WhatPercentCalculator />}
      {activeTab === "percent-change" && <PercentChangeCalculator />}
    </div>
  );
};

export default Calculator;
