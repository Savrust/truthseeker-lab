import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabNavigationProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const TabNavigation = ({ value, onValueChange }: TabNavigationProps) => {
  return (
    <div className="border-b bg-background">
      <div className="container mx-auto px-4">
        <Tabs value={value} onValueChange={onValueChange} className="w-full">
          <TabsList className="w-full justify-start h-12 bg-transparent border-0 rounded-none">
            <TabsTrigger
              value="discover"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6"
            >
              Discover
            </TabsTrigger>
            <TabsTrigger
              value="verify"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6"
            >
              Verify
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};
