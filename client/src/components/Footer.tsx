const Footer: React.FC = () => {
  return (
    <footer className="text-center py-4 text-sm text-slate-500" role="contentinfo">
      <p>&copy; {new Date().getFullYear()} DigiTools. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
