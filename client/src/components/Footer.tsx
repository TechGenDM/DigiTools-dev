const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 mt-12 border-t border-black/5 dark:border-white/5 relative z-10 bg-black/20 backdrop-blur-md" role="contentinfo">
      <div className="container mx-auto px-4 text-center flex flex-col items-center justify-center">
        <div className="flex items-center space-x-2 mb-4 opacity-70">
          <i className="ri-percent-fill text-xl text-primary"></i>
          <span className="font-display font-semibold text-lg text-white">DigiTools</span>
        </div>
        <p className="text-sm text-slate-400">
          &copy; {new Date().getFullYear()} DigiTools. Designed with precision & elegance.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
