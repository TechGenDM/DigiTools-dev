import { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import Footer from "@/components/Footer";
import Navbar from "./components/Navbar";

// Lazy-load calculator pages for code splitting
const MoreTools = lazy(() => import("@/pages/MoreTools"));
const GSTCalculator = lazy(() => import("@/pages/GSTCalculator"));
const ProfitLossCalculator = lazy(() => import("@/pages/ProfitLossCalculator"));
const LoanCalculator = lazy(() => import("@/pages/LoanCalculator"));
const DateCalculator = lazy(() => import("@/pages/DateCalculator"));
const DiscountCalculator = lazy(() => import("@/pages/DiscountCalculator"));
const UnitConverter = lazy(() => import("@/pages/UnitConverter"));
const SIPCalculator = lazy(() => import("@/pages/SIPCalculator"));
const BMICalculator = lazy(() => import("@/pages/BMICalculator"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="animate-pulse text-slate-400 text-sm">Loading...</div>
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          
          <main className="flex-grow" role="main">
            <Suspense fallback={<PageLoader />}>
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
            </Suspense>
          </main>
          
          <Footer />
        </div>
      </TooltipProvider>
    </HelmetProvider>
  );
}

export default App;
