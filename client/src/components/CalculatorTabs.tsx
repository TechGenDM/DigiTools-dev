import React from "react";

interface CalculatorTabsProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const CalculatorTabs: React.FC<CalculatorTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      id: "percent-of",
      label: "Percent of Value",
      icon: "ri-percent-line"
    },
    {
      id: "x-is-what-percent",
      label: "What Percent",
      icon: "ri-question-line"
    },
    {
      id: "percent-change",
      label: "Percent Change",
      icon: "ri-arrow-up-down-line"
    }
  ];

  return (
    <div className="mb-6 border-b border-slate-200">
      <div className="flex flex-wrap -mb-px text-sm font-medium text-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            className={`inline-block p-4 border-b-2 rounded-t-lg flex-1 sm:flex-none ${
              activeTab === tab.id
                ? "tab-active"
                : "text-slate-500 hover:text-[#4338ca] border-transparent"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <i className={`${tab.icon} mr-2`}></i>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalculatorTabs;
