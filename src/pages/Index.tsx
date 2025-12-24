import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Header } from "@/components/Layout/Header";
import { HeroBanner } from "@/components/Layout/HeroBanner";
import { TabNavigation } from "@/components/Layout/TabNavigation";
import { DiscoverView, mockNews } from "@/components/Views/DiscoverView";
import { VerifyView } from "@/components/Views/VerifyView";
import { Testimonials } from "@/components/Layout/Testimonials";
import { Footer } from "@/components/Layout/Footer";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { NewsCard } from "@/components/Cards/NewsCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const [discoverActiveTab, setDiscoverActiveTab] = useState("world");
  const { isSubscribed } = useSubscription();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Hide testimonials on verify tab, search page, or favorites tab
  const shouldHideTestimonials = 
    activeTab === "verify" || 
    location.pathname === "/search" ||
    (activeTab === "discover" && discoverActiveTab === "favorites");
  
  const featuredArticlesText = language === "ja" ? "注目記事" : "Featured Articles";

  const handleArticleClick = () => {
    if (!isSubscribed) {
      navigate("/subscription");
    }
  };

  const handleScrollDown = () => {
      if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollBy({
          top: 300,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroBanner />

      {isSubscribed ? (
        <>
          <TabNavigation value={activeTab} onValueChange={setActiveTab} />
          <main>
            {activeTab === "discover" ? (
              <DiscoverView onTabChange={setDiscoverActiveTab} />
            ) : (
              <VerifyView />
            )}
          </main>
        </>
      ) : (
        <>
          {/* Article list - visible when S=0, clicking navigates to subscription */}
          <section className="bg-muted/10 border-b relative">
            <div className="container mx-auto px-4 py-10 relative">
              <h2 className="text-2xl font-bold mb-6">{featuredArticlesText}</h2>
              <div className="h-[600px] flex flex-col relative" ref={scrollAreaRef}>
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {mockNews.map((news) => (
                      <NewsCard
                        key={news.id}
                        {...news}
                        onClick={handleArticleClick}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>           
            </div>
          </section>
          {/* Scroll down button - SP mode only */}
          <div className="fixed buttom-10px left-1/2 transform -translate-x-1/2 md:hidden z-10">
              <Button
                onClick={handleScrollDown}
                variant="ghost"
                size="icon"
                className="h-20 w-20 transition-none"
                aria-label="Scroll down"
              >
                <ChevronDown className="h-0 w-0" />
              </Button>
          </div>
        </>
      )}

      {!shouldHideTestimonials && <Testimonials />}
      <Footer />
    </div>
  );
};

export default Index;
