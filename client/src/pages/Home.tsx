import { useState } from "react";
import CalculatorTabs from "@/components/CalculatorTabs";
import PercentOfCalculator from "@/components/PercentOfCalculator";
import WhatPercentCalculator from "@/components/WhatPercentCalculator";
import PercentChangeCalculator from "@/components/PercentChangeCalculator";
import Examples from "@/components/Examples";
import SEOHead from "@/components/SEOHead";

function Home() {
  const [activeTab, setActiveTab] = useState<string>("percent-of");

  return (
    <>
      <SEOHead
        title="Percentage Calculator – Fast, Free & Easy"
        description="Calculate percentages instantly with real-time results. Find percent of a value, what percentage one number is of another, and percentage increases or decreases."
        path="/"
      />
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Stunning Hero Section */}
        <header className="text-center mb-16 mt-8 animate-slide-up">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-primary text-sm font-medium">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Supercharged Calculation Engine
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-6">
            Master Your <br/>
            <span className="text-gradient">Numbers Instantly</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            Beautifully designed, lightning-fast calculators built to solve your daily math problems with absolute precision and zero friction.
          </p>
        </header>

        {/* Main Calculator Glass Panel */}
        <div className="glass-panel p-6 md:p-8 max-w-4xl mx-auto mb-16 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CalculatorTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="mt-8 relative min-h-[300px]">
            {activeTab === "percent-of" && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <PercentOfCalculator />
              </div>
            )}
            
            {activeTab === "what-percent" && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <WhatPercentCalculator />
              </div>
            )}
            
            {activeTab === "percent-change" && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <PercentChangeCalculator />
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Examples Section */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Examples />
        </div>
      </div>
    </>
  );
}

export default Home;