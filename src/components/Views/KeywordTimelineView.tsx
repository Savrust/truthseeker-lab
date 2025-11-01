import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, TrendingUp, Calendar } from "lucide-react";

interface KeywordTimelineViewProps {
  keyword: string;
  onBack: () => void;
}

export const KeywordTimelineView = ({ keyword, onBack }: KeywordTimelineViewProps) => {
  const { language } = useLanguage();
  
  // Mock timeline data - this would come from your backend
  const timelineData = [
    {
      date: "2024-11-01",
      articleCount: 5,
      trend: "up" as const,
      articles: [
        { id: "1", title: language === "en" ? "Major Development in..." : "重要な進展...", source: "News Source A" },
        { id: "2", title: language === "en" ? "Analysis: Understanding..." : "分析：理解する...", source: "News Source B" },
      ]
    },
    {
      date: "2024-10-31",
      articleCount: 3,
      trend: "stable" as const,
      articles: [
        { id: "3", title: language === "en" ? "Update on..." : "最新情報...", source: "News Source C" },
      ]
    },
    {
      date: "2024-10-30",
      articleCount: 7,
      trend: "down" as const,
      articles: [
        { id: "4", title: language === "en" ? "Breaking News..." : "速報...", source: "News Source D" },
        { id: "5", title: language === "en" ? "In-depth Report..." : "詳細レポート...", source: "News Source E" },
      ]
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        {language === "en" ? "Back" : "戻る"}
      </Button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {language === "en" ? "Keyword Timeline" : "キーワード時系列ビュー"}
        </h1>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {keyword}
          </Badge>
          <span className="text-muted-foreground">
            {language === "en" 
              ? `${timelineData.reduce((acc, day) => acc + day.articleCount, 0)} articles found`
              : `${timelineData.reduce((acc, day) => acc + day.articleCount, 0)} 件の記事`}
          </span>
        </div>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-6">
          {timelineData.map((day, idx) => (
            <Card key={idx}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {day.date}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={
                        day.trend === "up" ? "success" : 
                        day.trend === "down" ? "destructive" : 
                        "secondary"
                      }
                      className="gap-1"
                    >
                      {day.trend === "up" && <TrendingUp className="h-3 w-3" />}
                      {day.articleCount} {language === "en" ? "articles" : "件"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {day.articles.map((article) => (
                    <div 
                      key={article.id} 
                      className="p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <h4 className="font-semibold mb-1">{article.title}</h4>
                      <p className="text-sm text-muted-foreground">{article.source}</p>
                    </div>
                  ))}
                  {day.articleCount > day.articles.length && (
                    <Button variant="ghost" className="w-full text-sm">
                      {language === "en" 
                        ? `View ${day.articleCount - day.articles.length} more articles`
                        : `さらに ${day.articleCount - day.articles.length} 件の記事を表示`}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

