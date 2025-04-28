import React from "react";
import { Link } from "wouter";

// Tool card component
const ToolCard: React.FC<{
  icon: string;
  title: string;
  description: string;
  comingSoon?: boolean;
  path?: string;
}> = ({ icon, title, description, comingSoon = false, path = "/" }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 p-6">
      <div className="flex items-center mb-3">
        <i className={`${icon} text-xl text-[#4338ca] mr-2`}></i>
        <h3 className="font-poppins text-lg font-semibold">{title}</h3>
        {comingSoon && (
          <span className="ml-2 text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
            Coming Soon
          </span>
        )}
      </div>
      <p className="text-slate-600 text-sm mb-4">{description}</p>
      {!comingSoon ? (
        <Link href={path}>
          <div className="inline-flex items-center text-[#4338ca] hover:underline cursor-pointer">
            Use Tool <i className="ri-arrow-right-line ml-1"></i>
          </div>
        </Link>
      ) : (
        <span className="text-slate-400 text-sm">Available soon</span>
      )}
    </div>
  );
};

function MoreTools() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-8 px-4">
        <h1 className="text-2xl md:text-4xl font-bold text-[#4338ca] mb-2">
          More Calculation Tools
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto text-sm md:text-base">
          Explore our expanding collection of free calculation tools designed to help with various math and conversion needs.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Active Tools */}
        <ToolCard
          icon="ri-percent-fill"
          title="Percentage Calculator"
          description="Calculate percentages, find what percent one number is of another, and determine percentage increases or decreases."
          path="/"
        />
        
        <ToolCard
          icon="ri-line-chart-fill"
          title="Profit and Loss Calculator"
          description="Calculate profit or loss amount and percentage based on cost price and selling price."
          path="/profit-loss-calculator"
        />
        
        <ToolCard
          icon="ri-tax-fill"
          title="GST Calculator"
          description="Add or remove GST from amounts. Calculate GST inclusive and exclusive prices with different tax rates."
          path="/gst-calculator"
        />
        
        <ToolCard
          icon="ri-ruler-2-fill"
          title="Unit Converter"
          description="Convert between different units of measurement including length, weight, volume, and temperature."
          path="/unit-converter"
        />
        
        <ToolCard
          icon="ri-calendar-event-fill"
          title="Date Calculator"
          description="Calculate the difference between dates or add/subtract days, weeks, or months from a specific date."
          path="/date-calculator"
        />
        
        <ToolCard
          icon="ri-price-tag-3-fill"
          title="Discount Calculator"
          description="Calculate sale prices and savings when applying various discounts."
          path="/discount-calculator"
        />
        
        <ToolCard
          icon="ri-money-dollar-circle-fill"
          title="SIP Calculator"
          description="Calculate how your systematic investments can grow over time with the power of compounding."
          path="/sip-calculator"
        />
        
        <ToolCard
          icon="ri-heart-pulse-fill"
          title="BMI Calculator"
          description="Calculate your Body Mass Index and check if your weight is in a healthy range for your height."
          path="/bmi-calculator"
        />

      </div>
      
      <div className="text-center mb-8">
        <Link href="/">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-[#4338ca] text-white rounded-md hover:bg-[#3730a3] transition-colors cursor-pointer">
            <i className="ri-arrow-left-fill mr-2"></i> Back to Percentage Calculator
          </div>
        </Link>
      </div>
    </div>
  );
}

export default MoreTools;