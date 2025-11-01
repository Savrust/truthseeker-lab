import { Button } from "@/components/ui/button";
import { Bookmark, Share2, Settings, Globe, LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LoginDialog } from "@/components/Dialogs/LoginDialog";
import { SignupDialog } from "@/components/Dialogs/SignupDialog";

export const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const { isAuthenticated, logout } = useAuth();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ja" : "en");
  };

  const handleSwitchToSignup = (email: string) => {
    setSignupEmail(email);
    setSignupOpen(true);
  };

  const handleBackToLogin = () => {
    setSignupOpen(false);
    setLoginOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/9391703.png" 
              alt="Logo" 
              className="h-10 w-10 object-contain"
            />
            <h1 className={`text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ${language === "en" ? "brand-font-en" : "brand-font-ja"}`}>
              {t("header.title")}
            </h1>
          </div>

          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="icon" title={t("header.save")}>
              <Bookmark className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" title={t("header.share")}>
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" title={t("header.settings")}>
              <Settings className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="gap-2"
            >
              <Globe className="h-4 w-4" />
              {t("header.language")}
            </Button>
            {isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="gap-2 hover:bg-sky-400 hover:text-white hover:border-sky-500 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                {t("header.logout")}
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => setLoginOpen(true)}
                className="gap-2"
                aria-label={t("header.login")}
              >
                <LogIn className="h-4 w-4" />
                {t("header.login")}
              </Button>
            )}
          </nav>
        </div>
      </header>
      <LoginDialog 
        open={loginOpen} 
        onOpenChange={setLoginOpen}
        onSwitchToSignup={handleSwitchToSignup}
      />
      <SignupDialog 
        open={signupOpen} 
        onOpenChange={setSignupOpen}
        onBackToLogin={handleBackToLogin}
        prefillEmail={signupEmail}
      />
    </>
  );
};
