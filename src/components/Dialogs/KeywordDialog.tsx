import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface KeywordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const KeywordDialog = ({ open, onOpenChange }: KeywordDialogProps) => {
  const [keywordText, setKeywordText] = useState("");
  const { keywords, addKeyword, removeKeyword } = useFavorites();
  const { language } = useLanguage();

  const handleAdd = () => {
    if (keywordText.trim()) {
      addKeyword(keywordText);
      setKeywordText("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {language === "en" ? "Manage Keywords" : "キーワード管理"}
          </DialogTitle>
          <DialogDescription>
            {language === "en" 
              ? "Add keywords to personalize your news feed and track topics over time."
              : "キーワードを追加してニュースフィードをパーソナライズし、トピックを時系列で追跡します。"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 space-y-2">
              <Label htmlFor="keyword">
                {language === "en" ? "Keyword" : "キーワード"}
              </Label>
              <Input
                id="keyword"
                placeholder={language === "en" ? "Enter keyword..." : "キーワードを入力..."}
                value={keywordText}
                onChange={(e) => setKeywordText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAdd()}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleAdd} className="gap-2">
                <Plus className="h-4 w-4" />
                {language === "en" ? "Add" : "追加"}
              </Button>
            </div>
          </div>

          <div>
            <Label className="mb-2 block">
              {language === "en" ? "Your Keywords" : "登録済みキーワード"} ({keywords.length})
            </Label>
            {keywords.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                {language === "en" 
                  ? "No keywords yet. Add some to get started!" 
                  : "まだキーワードがありません。追加してください！"}
              </p>
            ) : (
              <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto p-2 border rounded-md">
                {keywords.map((kw) => (
                  <Badge 
                    key={kw.id} 
                    variant="secondary"
                    className="gap-2 pr-1"
                  >
                    {kw.text}
                    <button
                      onClick={() => removeKeyword(kw.id)}
                      className="hover:text-destructive transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

