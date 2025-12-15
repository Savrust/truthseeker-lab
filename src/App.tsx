import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Subscription from "./pages/Subscription";
import Search from "./pages/Search";
import Payment from "./pages/Payment";
import TruthPage from "./pages/TruthPage";
import { Chatbot } from "./components/Chatbot";

const queryClient = new QueryClient();

const LanguageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
    document.body.setAttribute('lang', language);
  }, [language]);

  return <>{children}</>;
};

const App = () => {
  const [showIntro, setShowIntro] = useState(false);

  // Show intro video once per tab/session
  useEffect(() => {
    const alreadyPlayed = sessionStorage.getItem("introVideoPlayed");
    if (!alreadyPlayed) {
      setShowIntro(true);
    }
  }, []);

  const handleIntroEnd = () => {
    sessionStorage.setItem("introVideoPlayed", "true");
    setShowIntro(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <LanguageWrapper>
          <AuthProvider>
            <FavoritesProvider>
              <SubscriptionProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />

                  {/* Intro Video Overlay */}
                  {showIntro && (
                    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
                      <video
                        src="/start.mp4"
                        autoPlay
                        playsInline
                        muted
                        controls={false}
                        className="w-full h-full object-cover"
                        onEnded={handleIntroEnd}
                        onError={handleIntroEnd}
                      />
                      <button
                        className="absolute top-4 right-4 rounded-md bg-black/60 text-white px-3 py-2 text-sm hover:bg-black/80 transition-colors"
                        onClick={handleIntroEnd}
                        aria-label="Skip intro video"
                      >
                        Skip
                      </button>
                    </div>
                  )}

                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/subscription" element={<Subscription />} />
                      <Route path="/payment" element={<Payment />} />
                      <Route path="/search" element={<Search />} />
                      <Route path="/truth" element={<TruthPage />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Chatbot showIntro={showIntro} />
                  </BrowserRouter>
                </TooltipProvider>
              </SubscriptionProvider>
            </FavoritesProvider>
          </AuthProvider>
        </LanguageWrapper>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
