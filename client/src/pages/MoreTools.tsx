import React from "react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";

// Tool card component
const ToolCard: React.FC<{
  title: string;
  description: string;
  path: string;
  icon: string;
  colorClass: string;
}> = ({ title, description, path, icon, colorClass }) => {
  return (
    <Link href={path}>
      <div className="glass-panel glass-card-hover h-full flex flex-col p-6 cursor-pointer relative overflow-hidden group">
        <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-2xl opacity-20 transition-all duration-500 group-hover:scale-150 ${colorClass}`}></div>
        <div className="flex items-center mb-4 relative z-10">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${colorClass} bg-opacity-20 backdrop-blur-md border border-white/10`}>
            <i className={`${icon} text-2xl text-slate-900 dark:text-white drop-shadow-md`}></i>
          </div>
          <h2 className="text-xl font-display font-semibold text-slate-900 dark:text-white tracking-wide">{title}</h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm flex-grow relative z-10 font-light leading-relaxed group-hover:text-slate-300 transition-colors">
          {description}
        </p>
        <div className="mt-6 flex items-center text-sm font-medium text-white/50 group-hover:text-primary transition-colors relative z-10">
          <span>Try now</span>
          <i className="ri-arrow-right-line ml-1 group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>
    </Link>
  );
};

function MoreTools() {
  return (
    <>
      <SEOHead
        title="More Calculation Tools"
        description="Explore our collection of free calculation tools: GST, Loan EMI, SIP, BMI, Unit Converter, Discount, Profit/Loss, and more."
        path="/more-tools"
      />
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-primary text-sm font-medium">
            <i className="ri-apps-2-line mr-2"></i> Toolbox
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">
            Explore All <span className="text-gradient">Tools</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light text-lg">
            A premium suite of calculators designed for speed, accuracy, and beauty.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <ToolCard 
            title="GST Calculator" 
            description="Add or remove GST from any amount instantly with standard rates." 
            path="/gst-calculator" 
            icon="ri-receipt-line"
            colorClass="bg-blue-500"
          />
          <ToolCard 
            title="Loan & EMI" 
            description="Calculate your monthly EMI, total interest and total payment for any loan." 
            path="/loan-calculator" 
            icon="ri-bank-card-line"
            colorClass="bg-purple-500"
          />
          <ToolCard 
            title="Profit & Loss" 
            description="Determine profit or loss amounts and percentages based on cost and selling price." 
            path="/profit-loss-calculator" 
            icon="ri-line-chart-line"
            colorClass="bg-emerald-500"
          />
          <ToolCard 
            title="Date Calculator" 
            description="Find the exact duration between two dates or calculate age in years, months and days." 
            path="/date-calculator" 
            icon="ri-calendar-event-line"
            colorClass="bg-orange-500"
          />
          <ToolCard 
            title="Discount Calculator" 
            description="Calculate the final price after discount and see exactly how much you save." 
            path="/discount-calculator" 
            icon="ri-price-tag-3-line"
            colorClass="bg-rose-500"
          />
          <ToolCard 
            title="Unit Converter" 
            description="Convert between various units of length, weight, temperature, and volume." 
            path="/unit-converter" 
            icon="ri-exchange-box-line"
            colorClass="bg-cyan-500"
          />
          <ToolCard 
            title="SIP Calculator" 
            description="Plan your mutual fund investments and calculate potential returns via SIP." 
            path="/sip-calculator" 
            icon="ri-funds-line"
            colorClass="bg-indigo-500"
          />
          <ToolCard 
            title="BMI Calculator" 
            description="Check your Body Mass Index and see if your weight falls within a healthy range." 
            path="/bmi-calculator" 
            icon="ri-heart-pulse-line"
            colorClass="bg-red-500"
          />
        </div>
      </div>
    </>
  );
}

export default MoreTools;