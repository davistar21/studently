import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import ThemeToggle from "./ThemeToggle";
import { SidebarTrigger } from "./ui/sidebar";
import Logo from "./logo";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const noSidebarPaths = ["/", "/auth"];
  const location = useLocation();
  const isSidebarVisible = !noSidebarPaths.includes(location.pathname);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // Trigger after scrolling 10px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`flex items-center px-6 py-4 md:py-6 sticky top-0 z-11 transition-colors duration-300 justify-center ${
        isScrolled
          ? "bg-glass shadow-md backdrop-blur-xl"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      {isSidebarVisible && (
        <SidebarTrigger className="text-black dark:text-white" />
      )}

      <Link to="/dashboard">
        <Logo className="ml-2 md:text-4xl text-3xl" />
      </Link>

      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
