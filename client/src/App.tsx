import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";
import Home from "@/pages/Home";
import MoreTools from "@/pages/MoreTools";
import GSTCalculator from "@/pages/GSTCalculator";
import ProfitLossCalculator from "@/pages/ProfitLossCalculator";
import LoanCalculator from "@/pages/LoanCalculator";
import DateCalculator from "@/pages/DateCalculator";
import DiscountCalculator from "@/pages/DiscountCalculator";
import UnitConverter from "@/pages/UnitConverter";
import SIPCalculator from "@/pages/SIPCalculator";
import BMICalculator from "@/pages/BMICalculator";
import NotFound from "@/pages/not-found";
import Footer from "@/components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          
          <main className="flex-grow">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/more-tools" component={MoreTools} />
              <Route path="/gst-calculator" component={GSTCalculator} />
              <Route path="/profit-loss-calculator" component={ProfitLossCalculator} />
              <Route path="/loan-calculator" component={LoanCalculator} />
              <Route path="/date-calculator" component={DateCalculator} />
              <Route path="/discount-calculator" component={DiscountCalculator} />
              <Route path="/unit-converter" component={UnitConverter} />
              <Route path="/sip-calculator" component={SIPCalculator} />
              <Route path="/bmi-calculator" component={BMICalculator} />
              <Route component={NotFound} />
            </Switch>
          </main>
          
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
