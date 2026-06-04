import React from "react";

interface CalculatorTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const CalculatorTabs: React.FC<CalculatorTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="segmented-control w-full max-w-2xl mx-auto overflow-hidden">
      <div 
        className={`segmented-tab ${activeTab === 'percent-of' ? 'active' : ''}`}
        onClick={() => setActiveTab('percent-of')}
        role="button"
        tabIndex={0}
      >
        % of Value
      </div>
      <div 
        className={`segmented-tab ${activeTab === 'what-percent' ? 'active' : ''}`}
        onClick={() => setActiveTab('what-percent')}
        role="button"
        tabIndex={0}
      >
        What % is X of Y?
      </div>
      <div 
        className={`segmented-tab ${activeTab === 'percent-change' ? 'active' : ''}`}
        onClick={() => setActiveTab('percent-change')}
        role="button"
        tabIndex={0}
      >
        % Change
      </div>
    </div>
  );
};

export default CalculatorTabs;
