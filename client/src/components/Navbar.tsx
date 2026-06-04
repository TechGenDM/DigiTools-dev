import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "./ThemeProvider";

const Navbar: React.FC = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark" || (theme === "system" && typeof window !== 'undefined' && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const navLinks = [
    { path: "/", label: "Percent", icon: "ri-percent-fill" },
    { path: "/loan-calculator", label: "Loan", icon: "ri-bank-card-fill" },
    { path: "/profit-loss-calculator", label: "Profit", icon: "ri-line-chart-fill" },
    { path: "/date-calculator", label: "Date", icon: "ri-calendar-event-fill" },
    { path: "/more-tools", label: "More Tools", icon: "ri-apps-2-fill" },
  ];

  return (
    <nav className="fixed top-4 left-0 w-full z-50 flex justify-center px-4" aria-label="Main navigation">
      <div className="glass-pill px-6 py-3 w-full max-w-4xl flex justify-between items-center animate-slide-up">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer group">
            <div className="bg-primary/20 p-2 rounded-full group-hover:bg-primary/40 transition-colors">
              <i className="ri-percent-fill text-xl text-indigo-400 group-hover:text-indigo-300"></i>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white">
              Digi<span className="text-primary">Tools</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => {
            const isActive = location === link.path;
            return (
              <Link key={link.path} href={link.path}>
                <div
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary/20 text-slate-900 dark:text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] border border-primary/30"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                  {...(isActive ? { "aria-current": "page" as const } : {})}
                >
                  <i className={`${link.icon} mr-1.5 ${isActive ? "text-primary" : "text-slate-500 dark:text-slate-400"}`}></i>
                  {link.label}
                </div>
              </Link>
            );
          })}
          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-full text-slate-600 dark:text-slate-300 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <i className="ri-sun-fill text-amber-400 text-lg"></i>
            ) : (
              <i className="ri-moon-fill text-indigo-500 text-lg"></i>
            )}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none transition-all"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <i className="ri-sun-fill text-amber-400 text-lg"></i>
            ) : (
              <i className="ri-moon-fill text-indigo-500 text-lg"></i>
            )}
          </button>
          <button 
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-3-line'} text-xl`}></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 max-w-4xl mx-auto glass-panel p-4 md:hidden animate-slide-up flex flex-col space-y-2">
          {navLinks.map((link) => {
            const isActive = location === link.path;
            return (
              <Link key={link.path} href={link.path}>
                <div
                  className={`px-4 py-3 rounded-xl text-sm font-medium flex items-center transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary/20 text-slate-900 dark:text-white border border-primary/30"
                      : "text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className={`${link.icon} mr-3 text-lg ${isActive ? "text-primary" : "text-slate-500 dark:text-slate-400"}`}></i>
                  {link.label}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;