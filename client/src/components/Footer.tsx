import React, { useEffect, useState } from "react";

const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="text-center py-4 text-sm text-slate-500">
      <p>&copy; {currentYear} Percentage Calculator. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
