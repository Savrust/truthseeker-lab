import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { HeroBanner } from "@/components/Layout/HeroBanner";
import { TabNavigation } from "@/components/Layout/TabNavigation";
import { DiscoverView } from "@/components/Views/DiscoverView";
import { VerifyView } from "@/components/Views/VerifyView";
import { Testimonials } from "@/components/Layout/Testimonials";
import { Footer } from "@/components/Layout/Footer";

const Index = () => {
  const [activeTab, setActiveTab] = useState("discover");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroBanner />
      <TabNavigation value={activeTab} onValueChange={setActiveTab} />
      
      <main>
        {activeTab === "discover" ? <DiscoverView /> : <VerifyView />}
      </main>

      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
