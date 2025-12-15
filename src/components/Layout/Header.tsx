import { Button } from "@/components/ui/button";
import { Bookmark, Share2, Settings, Globe, Search, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { isSubscribed } = useSubscription();
  const { isAuthenticated, logout } = useAuth();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ja" : "en");
  };

  const handleLogout = () => {
    logout();
    // After logout (L=0), automatically go to home page
    navigate("/");
  };

  const handleSubscriptionClick = () => {
    if (isAuthenticated) {
      navigate("/subscription");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
          >
            <img 
              src="/9391703.png" 
              alt="Logo" 
              className="h-10 w-10 object-contain"
            />
            <h1 className={`text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ${language === "en" ? "brand-font-en" : "brand-font-ja"}`}>
              {t("header.title")}
            </h1>
          </div>

          <nav className="flex items-center gap-1 sm:gap-2">
            {isSubscribed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/search")}
                className="gap-1 sm:gap-2"
              >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">{t("header.search")}</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="gap-1 sm:gap-2"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{t("header.language")}</span>
            </Button>
            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="transition-colors border border-gray-200 bg-gray-100 text-gray-800 hover:bg-gray-200 hover:border-gray-300 active:bg-gray-300 active:border-gray-400 text-xs sm:text-sm px-2 sm:px-3"
                title={t("header.logout")}
              >
                <span className="hidden sm:inline">{t("header.logout")}</span>
                <span className="sm:hidden">Logout</span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/login")}
                className="transition-colors border border-gray-200 bg-gray-100 text-gray-800 hover:bg-gray-200 hover:border-gray-300 active:bg-gray-300 active:border-gray-400 text-xs sm:text-sm px-2 sm:px-3"
                title={t("header.login")}
              >
                <span className="hidden sm:inline">{t("header.login")}</span>
                <span className="sm:hidden">Login</span>
              </Button>
            )}
            {!isSubscribed && (
              <Button
                variant="default"
                size="sm"
                onClick={handleSubscriptionClick}
                className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3"
              >
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">{t("header.subscribe")}</span>
              </Button>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};
