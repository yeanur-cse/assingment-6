import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t border-base-300 bg-base-200 px-4 py-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">

        {/* Logo */}
        <div className="flex items-center gap-2">
         
         <Image

         src= "/logo.png"
          alt="Fitlog Logo"
            width={32}
            height={32}
         />

          <span className="text-sm font-bold tracking-wide">
            FITLOG
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-base-content/50">
          © 2026 FitLog — Workout Library. Train hard, log honestly.
        </p>

      </div>
    </footer>
  );
};

export default Footer;