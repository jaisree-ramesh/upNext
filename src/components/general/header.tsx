import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Bookmark, Home } from "lucide-react";
import { Link} from "react-router-dom";
import LanguageToggle from "./languageToggle";

const Header = () => {

  return (
    <header className="border-b">
      <div className="flex items-start justify-between px-6 py-4">
        <span className="text-lg font-semibold">Up Next</span>
        <div className="flex items-center gap-4">
          {/* Home Icon */}
          <Link to="/">
            <Home className="w-6 h-6 cursor-pointer hover:text-indigo-500 transition" />
          </Link>

          {/* Watchlist Icon */}
          <Link to="/watchlist">
            <Bookmark className="w-6 h-6 cursor-pointer hover:text-indigo-500 transition" />
          </Link>

          {/* Theme Toggler */}
          <AnimatedThemeToggler className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition" />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
