import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { TabNavigation } from "@/components/Layout/TabNavigation";
import { DiscoverView } from "@/components/Views/DiscoverView";
import { VerifyView } from "@/components/Views/VerifyView";

const Index = () => {
  const [activeTab, setActiveTab] = useState("discover");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation value={activeTab} onValueChange={setActiveTab} />
      
      <main>
        {activeTab === "discover" ? <DiscoverView /> : <VerifyView />}
      </main>
    </div>
  );
};

export default Index;
