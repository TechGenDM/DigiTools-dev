import React, { useState } from "react";
import { Link, useLocation } from "wouter";

const Navbar: React.FC = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Percentage Calculator", icon: "ri-percent-fill" },
    { path: "/loan-calculator", label: "Loan & EMI", icon: "ri-bank-card-fill" },
    { path: "/profit-loss-calculator", label: "Profit & Loss", icon: "ri-line-chart-fill" },
    { path: "/date-calculator", label: "Date Calculator", icon: "ri-calendar-event-fill" },
    { path: "/more-tools", label: "More Tools", icon: "ri-tools-fill" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 max-w-4xl">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <i className="ri-percent-fill text-xl text-[#4338ca]"></i>
              <span className="font-poppins font-semibold text-lg">Digitools</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <div
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors cursor-pointer ${
                    location === link.path
                      ? "bg-indigo-50 text-[#4338ca]"
                      : "text-slate-600 hover:bg-indigo-50 hover:text-[#4338ca]"
                  }`}
                >
                  <i className={`${link.icon} mr-1`}></i>
                  {link.label}
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="p-2 rounded-md text-slate-600 hover:bg-indigo-50 hover:text-[#4338ca] focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 py-2 border-t border-slate-200 animate-in fade-in duration-150">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <div
                  className={`block px-3 py-2.5 my-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    location === link.path
                      ? "bg-indigo-50 text-[#4338ca]"
                      : "text-slate-600 hover:bg-indigo-50 hover:text-[#4338ca]"
                  }`}
                  onClick={closeMobileMenu}
                >
                  <i className={`${link.icon} mr-2`}></i>
                  {link.label}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;