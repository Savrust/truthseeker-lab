import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/Layout/Header";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useLanguage } from "@/contexts/LanguageContext";

const newsSources = [
  { id: "nyt", name: "New York Times", country: "US", checked: true },
  { id: "wsj", name: "Wall Street Journal", country: "US", checked: true },
  { id: "wapo", name: "Washington Post", country: "US", checked: true },
  { id: "times", name: "The Times", country: "UK", checked: true },
  { id: "ft", name: "Financial Times", country: "UK", checked: true },
  { id: "st", name: "The Straits Times", country: "SG", checked: true },
  { id: "lemonde", name: "Le Monde", country: "FR", checked: true },
  { id: "nzz", name: "Neue Zürcher Zeitung", country: "CH", checked: false },
  { id: "faz", name: "Frankfurter Allgemeine", country: "DE", checked: false },
  { id: "haaretz", name: "Haaretz", country: "IL", checked: false },
  { id: "toi", name: "The Times of India", country: "IN", checked: false },
  { id: "izvestia", name: "Izvestia", country: "RU", checked: false },
];

const opinionSources = [
  { id: "env", name: "環境新聞 (寄稿)", badge: "OPINION", checked: false },
  { id: "analyst", name: "独立系アナリスト (例)", badge: "MINOR", checked: false },
];

const mockArticles = [
  {
    source: "New York Times",
    text: "NYT の想定記事・全文ダミーテキスト。ここにパラグラフが入ります。NYTの報道の例。記事本文は複数のパラグラフで構成され、詳細な情報提供を行います。各パラグラフは関連する情報を提供し、読者に包括的な理解を提供します。",
  },
  {
    source: "Wall Street Journal",
    text: "WSJ の想定記事・全文ダミーテキスト。ここにパラグラフが入ります。WSJの報道の例。経済的な視点から分析を行い、市場への影響を考察します。",
  },
  {
    source: "Washington Post",
    text: "Washington Post の想定記事・全文ダミーテキスト。ここにパラグラフが入ります。Washington Postの報道の例。政治的な側面から詳細に分析を行います。",
  },
  {
    source: "The Times",
    text: "The Times の想定記事・全文ダミーテキスト。ここにパラグラフが入ります。The Timesの報道の例。英国の視点から国際情勢を分析します。",
  },
  {
    source: "Financial Times",
    text: "Financial Times の想定記事・全文ダミーテキスト。ここにパラグラフが入ります。Financial Timesの報道の例。金融市場への影響を詳細に分析します。",
  },
  {
    source: "The Straits Times",
    text: "The Straits Times の想定記事・全文ダミーテキスト。ここにパラグラフが入ります。The Straits Timesの報道の例。アジアの視点から地域情勢を分析します。",
  },
  {
    source: "Le Monde",
    text: "Le Monde の想定記事・全文ダミーテキスト。ここにパラグラフが入ります。Le Mondeの報道の例。フランスの視点から国際情勢を分析します。",
  },
];

export default function Search() {
  const navigate = useNavigate();
  const { isSubscribed } = useSubscription();
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("fgfdf");
  const [selectedSources, setSelectedSources] = useState<string[]>(
    newsSources.filter(s => s.checked).map(s => s.id)
  );
  const [selectedOpinions, setSelectedOpinions] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("full");

  // Redirect to subscription if not subscribed
  if (!isSubscribed) {
    navigate("/subscription");
    return null;
  }

  const handleSourceToggle = (id: string) => {
    setSelectedSources(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleOpinionToggle = (id: string) => {
    setSelectedOpinions(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleExecute = () => {
    if (searchQuery.trim()) {
      navigate(`/truth?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleExecute();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Top Bar */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-3">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* <div className="text-sm text-muted-foreground">
              What is The TRUTH Demo build | 2025-11-12 07:24
            </div> */}
            <form onSubmit={(e) => { e.preventDefault(); handleExecute(); }} className="flex-1 flex gap-2 max-w-2xl">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 text-sm sm:text-base"
                placeholder="検索クエリを入力..."
              />
              <Button type="submit" size="sm" className="text-xs sm:text-sm whitespace-nowrap">
                デモを実行
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content - Single Column (sidebars removed) */}
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto">
          {/* Results (center content, full width) */}
          <div>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">結果</h3>
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
                  <TabsList>
                    <TabsTrigger value="full">全文</TabsTrigger>
                    <TabsTrigger value="summary">サマリー</TabsTrigger>
                    <TabsTrigger value="summary20">20行要約</TabsTrigger>
                  </TabsList>
                </Tabs>

                <ScrollArea className="h-[calc(100vh-300px)]">
                  <div className="space-y-4">
                    {mockArticles
                      .filter(article => 
                        selectedSources.some(id => 
                          newsSources.find(s => s.id === id)?.name === article.source
                        )
                      )
                      .map((article, idx) => (
                        <div key={idx} className="border-b pb-4 last:border-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{article.source}</span>
                            <Badge variant="default">Major</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {article.text}
                          </p>
                        </div>
                      ))}
                  </div>
                </ScrollArea>

                <div className="mt-4 p-3 bg-muted rounded-md">
                  <p className="text-xs text-muted-foreground">
                    このデモはUI挙動の確認用です。記事本文・要約はダミーであり、出典媒体の見解・主張を代表するものではありません。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-background mt-8">
        <div className="container mx-auto px-4 py-4">
          <p className="text-xs text-center text-muted-foreground">
            © The Truth -デモサイト。医療・政策判断は必ず専門家・公的情報を参照ください。
          </p>
        </div>
      </footer>
    </div>
  );
}
