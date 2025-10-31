import { Button } from "@/components/ui/button";
import { Bookmark, Share2, Settings, Globe } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [language, setLanguage] = useState<"original" | "translated">("original");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            The Truth
          </h1>
        </div>

        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="icon" title="Save">
            <Bookmark className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" title="Share">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" title="Feed Settings">
            <Settings className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setLanguage(language === "original" ? "translated" : "original")
            }
            className="gap-2"
          >
            <Globe className="h-4 w-4" />
            {language === "original" ? "原文" : "翻訳"}
          </Button>
        </nav>
      </div>
    </header>
  );
};
