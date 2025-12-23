import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TabNavigationProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const TabNavigation = ({ value, onValueChange }: TabNavigationProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="border-b bg-background">
      <div className="container mx-auto px-4">
        <Tabs value={value} onValueChange={onValueChange} className="w-full">
          <TabsList className="w-full justify-start h-12 bg-transparent border-0 rounded-none">
            <TabsTrigger
              value="discover"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6"
            >
              {t("tabs.discover")}
            </TabsTrigger>
            <TabsTrigger
              value="verify"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6"
            >
              {t("tabs.verify")}
            </TabsTrigger>

            {/* Search button grouped with tabs on the left */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/search")}
              className="gap-1 sm:gap-2"
            >
              {/* <SearchIcon className="h-4 w-4" /> */}
              <span className="hidden sm:inline">{t("header.search")}</span>
            </Button>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};
