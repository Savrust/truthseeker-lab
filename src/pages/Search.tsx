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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Header } from "@/components/Layout/Header";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronRight, Star } from "lucide-react";

const newsSources = [
  { id: "nyt", name: "New York Times", country: "US", checked: false },
  { id: "wsj", name: "Wall Street Journal", country: "US", checked: false },
  { id: "wapo", name: "Washington Post", country: "US", checked: false },
  { id: "times", name: "The Times", country: "UK", checked: false },
  { id: "ft", name: "Financial Times", country: "UK", checked: false },
  { id: "st", name: "The Straits Times", country: "SG", checked: false },
  { id: "lemonde", name: "Le Monde", country: "FR", checked: false },
  { id: "nzz", name: "Neue Zürcher Zeitung", country: "CH", checked: false },
  { id: "faz", name: "Frankfurter Allgemeine", country: "DE", checked: false },
  { id: "haaretz", name: "Haaretz", country: "IL", checked: false },
  { id: "toi", name: "The Times of India", country: "IN", checked: false },
  { id: "izvestia", name: "Izvestia", country: "RU", checked: false },
];

const opinionSources = [
  { id: "env", name: { ja: "環境新聞 (寄稿)", en: "Environmental News (Contribution)" }, badge: "OPINION", checked: false },
  { id: "analyst", name: { ja: "独立系アナリスト (例)", en: "Independent Analyst (Example)" }, badge: "MINOR", checked: false },
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedOpinions, setSelectedOpinions] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("full");
  const [showGalileoBanner, setShowGalileoBanner] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

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
    setSelectedOpinions(prev => {
      const newSelection = prev.includes(id) 
        ? prev.filter(s => s !== id) 
        : [...prev, id];
      
      // Check if any opinion/minor source is selected
      const hasMinor = newSelection.some(selId => 
        opinionSources.find(s => s.id === selId && s.badge === "MINOR")
      );
      setShowGalileoBanner(hasMinor);
      
      return newSelection;
    });
  };

  const handleExecute = () => {
    if (searchQuery.trim()) {
      setHasSearched(true);
      // Optionally still navigate, or just show content in results area
      // navigate(`/truth?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleExecute();
    }
  };

  // Get current date for demo build info
  const demoBuildDate = new Date().toISOString().split('T')[0].replace(/-/g, '-');
  const demoBuildTime = new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
  const headingText = language === "ja" ? "The Truthとは何か" : "What is The Truth";
  const sourcesHeading = language === "ja" ? "ニュース媒体" : "Sources";
  const opinionHeading = language === "ja" ? "その他 / 寄稿" : "Other / Opinion";
  const opinionBadgeLabel = language === "ja" ? "オピニオン" : "OPINION";
  const minorBadgeLabel = language === "ja" ? "少数派" : "MINOR";
  const searchPlaceholder = language === "ja" ? "調べたいニュース/疑問を入力" : "Enter news/query to search";
  const executeDemoText = language === "ja" ? "デモを実行" : "Run Demo";
  const galileoLessonText = language === "ja" ? "ガリレオの教訓" : "Galileo's Lesson";
  const sourcesSubheading = language === "ja" ? "(ニュース媒体)" : "(News Sources)";
  const resultsText = language === "ja" ? "結果" : "Results";
  const fullTextTab = language === "ja" ? "全文" : "Full Text";
  const summaryTab = language === "ja" ? "サマリー" : "Summary";
  const summary20Tab = language === "ja" ? "20行要約" : "20-line Summary";
  const sampleArticlesText = language === "ja" ? "チェックした媒体のサンプル記事がここに表示されます" : "Sample articles from checked media will be displayed here";
  const additionalCommandsText = language === "ja" ? "追加コマンド" : "Additional Commands";
  const deepSearchText = language === "ja" ? "Deep Search (課金)" : "Deep Search (Paid)";
  const expertViewText = language === "ja" ? "Expert View (課金)" : "Expert View (Paid)";
  const trendAnalysisText = language === "ja" ? "傾向分析 (課金)" : "Trend Analysis (Paid)";
  const affChairmanDesc = language === "ja" ? "(不定期更新)原丈人氏の寄稿や見解" : "(Irregularly Updated) Contributions and Views by Mr. Takehito Hara";
  const envNewsContribution = language === "ja" ? "環境新聞 寄稿 (冒頭プレビュー)" : "Environmental News Contribution (Preview)";
  const mockImageText = language === "ja" ? "モック画像 (PPTX)" : "Mock Image (PPTX)";
  const footerText = language === "ja" ? "© The Truth - デモサイト。医療・政策判断は必ず専門家・公的情報を参照ください。" : "© The Truth - Demo site. Please refer to experts and public information for medical and policy decisions.";
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Search Bar */}
      <div>
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleExecute(); }} 
            className="flex gap-3 max-w-4xl"
          >
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 text-base"
              placeholder={searchPlaceholder}
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6">
              {executeDemoText}
            </Button>
          </form>
        </div>
      </div>

      {/* Galileo Banner (shown when minor sources are selected) */}
      {showGalileoBanner && (
        <div className="bg-yellow-100 border-b border-yellow-300">
          <div className="container mx-auto px-4 sm:px-6 py-2">
            <p className="text-sm font-semibold text-yellow-800">{galileoLessonText}</p>
          </div>
        </div>
      )}

      {/* Main Content - Three Column Layout */}
      <div className="container mx-auto px-4 sm:px-6 py-5.5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Sources */}
          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-220px)] flex flex-col">
              <CardContent className="p-4 flex flex-col flex-1 min-h-0">
                <h3 className="font-semibold mb-2">{sourcesHeading} {sourcesSubheading}</h3>
                
                <ScrollArea className="flex-1 min-h-0">
                  <div className="space-y-2 mt-2">
                    {newsSources.map((source) => (
                      <div key={source.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={source.id}
                          checked={selectedSources.includes(source.id)}
                          onCheckedChange={() => handleSourceToggle(source.id)}
                        />
                        <Label
                          htmlFor={source.id}
                          className="text-sm font-normal cursor-pointer flex-1"
                        >
                          {source.name} ({source.country})
                        </Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <Separator className="my-4" />

                <div>
                  <h4 className="font-semibold text-sm mb-2">{opinionHeading}</h4>
                  <div className="space-y-2">
                    {opinionSources.map((source) => (
                      <div key={source.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={source.id}
                          checked={selectedOpinions.includes(source.id)}
                          onCheckedChange={() => handleOpinionToggle(source.id)}
                        />
                        <Label
                          htmlFor={source.id}
                          className="text-sm font-normal cursor-pointer flex-1 flex items-center gap-2"
                        >
                          {typeof source.name === 'object' ? source.name[language] : source.name}
                          <Badge 
                            variant={source.badge === "OPINION" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {source.badge === "OPINION" ? opinionBadgeLabel : minorBadgeLabel}
                          </Badge>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* <div className="mt-4 p-2 bg-gray-50 rounded text-xs text-gray-600">
                  ※少数派に分類した媒体/寄稿を表示する際は、画面上部に必ず「ガリレオの教訓」バナーが表示されます。
                </div> */}
              </CardContent>
            </Card>
          </div>

          {/* Center Column - Results */}
          <div className="lg:col-span-6">
            <Card className="h-[calc(100vh-220px)] flex flex-col">
              <CardContent className="p-4 flex flex-col flex-1 min-h-0">
                <h3 className="font-semibold mb-4">{resultsText}</h3>
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="full" className={activeTab === "full" ? "bg-blue-600 text-white" : ""}>
                      {fullTextTab}
                    </TabsTrigger>
                    <TabsTrigger value="summary" className={activeTab === "summary" ? "bg-blue-600 text-white" : ""}>
                      {summaryTab}
                    </TabsTrigger>
                    <TabsTrigger value="summary20" className={activeTab === "summary20" ? "bg-blue-600 text-white" : ""}>
                      {summary20Tab}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <ScrollArea className="flex-1 min-h-0">
                  {hasSearched ? (
                    <div className="max-w-4xl mx-auto">
                      {/* TruthPage Content */}
                      <div>
                        <Card>
                          <CardContent className="p-6">
                            <h2 className="text-2xl font-bold mb-4">
                              コロナ・ワクチンの真実は?
                            </h2>
                            
                           
                            <Separator className="my-6" />

                            {/* 多数派 (Majority View) */}
                            <div className="mb-6">
                              <h3 className="text-lg font-semibold mb-3">
                                多数派 (メインストリーム)
                              </h3>
                              <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="leading-relaxed">
                                  mRNAワクチンは重症化予防に有効とする公的機関・主要査読誌の一次資料が基軸。
                                </li>
                                <li className="leading-relaxed">
                                  安全性は「利益がリスクを上回る」と評価。まれな副反応は監視・注意喚起。
                                </li>
                              </ul>
                            </div>

                            {/* 少数派 (Minority View) */}
                            <div className="mb-6">
                              <h3 className="text-lg font-semibold mb-3">
                                少数派 (カウンタービュー)
                              </h3>
                              
                              <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                                <div className="flex items-start gap-2 mb-2">
                                  <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-100">
                                    ガリレオ・ガリレイの教訓
                                  </h4>
                                </div>
                                <p className="text-sm text-yellow-800 dark:text-yellow-200 leading-relaxed">
                                  地動説を唱え、宗教裁判で有罪に――少数説が後に主流へ。少数派の主張は証拠の質と再現性で検証しましょう。
                                </p>
                              </div>

                              <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="leading-relaxed">
                                  有効性の持続や副反応リスクの過小評価を批判、政策・報道の偏りを指摘。
                                </li>
                                <li className="leading-relaxed">
                                  イベルメクチン等の選択肢・研究を再評価すべきとの主張。
                                </li>
                              </ul>
                            </div>

                            <Separator className="my-6" />

                            {/* 一次資料・主要報道の一覧 */}
                            <div>
                              <h3 className="text-lg font-semibold mb-4">
                                一次資料・主要報道の一覧
                              </h3>
                              
                              <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="pfizer-effectiveness">
                                  <AccordionTrigger className="text-left">
                                    <div className="flex items-center gap-2">
                                      <span>ファイザー (BNT162b2) - 有効性</span>
                                      <Badge variant="outline">西洋</Badge>
                                      <Badge variant="outline">北米</Badge>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <p className="text-sm text-muted-foreground mb-3">
                                      一次資料(査読論文・公文書)と主要報道のリンク集。
                                    </p>
                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                      <li>• 臨床試験・追跡結果(NEJM等) ･･･ リンクを追加</li>
                                      <li>• 規制当局資料(FDA/EU/PMDA) ･･･ リンクを追加</li>
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="pfizer-safety">
                                  <AccordionTrigger className="text-left">
                                    <div className="flex items-center gap-2">
                                      <span>ファイザー (BNT162b2) - 安全性/副反応</span>
                                      <Badge variant="outline">西洋</Badge>
                                      <Badge variant="outline">北米</Badge>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                      <li>• 薬剤安全性アップデート(公的監視・追跡) ･･･ リンクを追加</li>
                                      <li>• まれな副反応(心筋炎等)の解析 ･･･ リンクを追加</li>
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="moderna-effectiveness">
                                  <AccordionTrigger className="text-left">
                                    <div className="flex items-center gap-2">
                                      <span>モデルナ (mRNA-1273) - 有効性</span>
                                      <Badge variant="outline">西洋</Badge>
                                      <Badge variant="outline">北米</Badge>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                      <li>• 臨床試験,追跡結果(NEJM等) ･･･ リンクを追加</li>
                                      <li>• 規制当局資料(FDA/EU/PMDA) ･･･ リンクを追加</li>
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="moderna-safety">
                                  <AccordionTrigger className="text-left">
                                    <div className="flex items-center gap-2">
                                      <span>モデルナ (mRNA-1273) - 安全性/副反応</span>
                                      <Badge variant="outline">西洋</Badge>
                                      <Badge variant="outline">北米</Badge>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                      <li>• 安全性年次報告,副反応頻度 ･･･ リンクを追加</li>
                                      <li>• 若年男性の心筋炎シグナル ･･･ リンクを追加</li>
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="asia-policies">
                                  <AccordionTrigger className="text-left">
                                    <div className="flex items-center gap-2">
                                      <span>アジア各国の政策・実データ</span>
                                      <Badge variant="outline">非欧米</Badge>
                                      <Badge variant="outline">アジア</Badge>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                      <li>• 日本:厚労省発表。副反応検討部会資料 ･･･ リンクを追加</li>
                                      <li>• 韓国・台湾:公開データ・政策レビュー ･･･ リンクを追加</li>
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="africa-trends">
                                  <AccordionTrigger className="text-left">
                                    <div className="flex items-center gap-2">
                                      <span>アフリカ諸国の実施状況と感染動向</span>
                                      <Badge variant="outline">非欧米</Badge>
                                      <Badge variant="outline">アフリカ</Badge>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                      <li>• 接種率・過剰死亡の地域差 ･･･ リンクを追加</li>
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ) : (
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
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {article.text}
                            </p>
                          </div>
                        ))}
                      {selectedSources.length === 0 && selectedOpinions.length === 0 && (
                        <div className="text-center text-gray-500 py-8">
                          {/* {sampleArticlesText} */}
                        </div>
                      )}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Additional Commands */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">{additionalCommandsText}</h3>
                
                <div className="space-y-3 mb-6">
                  <button
                    className="w-full h-10 items-center justify-center rounded-md bg-muted text-muted-foreground border border-border px-3 py-1.5 text-sm font-medium transition-all hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    onClick={() => {
                      // TODO: Implement Deep Search functionality
                      console.log("Deep Search clicked");
                    }}
                  >
                    {deepSearchText}
                  </button>
                  <button
                    className="w-full h-10 items-center justify-center rounded-md bg-muted text-muted-foreground border border-border px-3 py-1.5 text-sm font-medium transition-all hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    onClick={() => {
                      // TODO: Implement Expert View functionality
                      console.log("Expert View clicked");
                    }}
                  >
                    {expertViewText}
                  </button>
                  <button
                    className="w-full h-10 items-center justify-center rounded-md bg-muted text-muted-foreground border border-border px-3 py-1.5 text-sm font-medium transition-all hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    onClick={() => {
                      // TODO: Implement Trend Analysis functionality
                      console.log("Trend Analysis clicked");
                    }}
                  >
                    {trendAnalysisText}
                  </button>
                </div>

                {/* <div className="mb-6 p-3 bg-gray-50 rounded text-xs text-gray-600">
                  「Deep Search / Expert View / 傾向分析」は、一次資料PDFやメタ分析、メディア傾向の可視化など高度機能の想定です。
                </div> */}

                <Separator className="my-4" />

                <div>
                  <h4 className="font-semibold mb-2">AFF Chairman's View</h4>
                  <p className="text-xs text-gray-600 mb-3">
                    {affChairmanDesc}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-blue-600 cursor-pointer hover:underline">
                      <ChevronRight className="h-4 w-4" />
                      {envNewsContribution}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-600 cursor-pointer hover:underline">
                      <ChevronRight className="h-4 w-4" />
                      {mockImageText}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white mt-8">
        <div className="container mx-auto px-4 py-4">
          <p className="text-xs text-center text-gray-600">
            {footerText}
          </p>
        </div>
      </footer>
    </div>
  );
}
