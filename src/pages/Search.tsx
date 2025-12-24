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
    summary: "NYTの記事要約：主要なニュースの要点を簡潔にまとめた内容。重要な事実と背景情報を含みます。",
    summary20: "NYT 20行要約：\n1. 主要なニュースの概要\n2. 重要な事実とデータ\n3. 関係者の見解\n4. 背景情報と文脈\n5. 今後の展開への影響\n6. 関連する政策や決定\n7. 市場や社会への影響\n8. 専門家の分析\n9. 過去の類似事例との比較\n10. 国際的な反応\n11. 地域的な影響\n12. 経済的な側面\n13. 社会的な側面\n14. 技術的な側面\n15. 環境への影響\n16. 法的な側面\n17. 政治的な側面\n18. 文化的な側面\n19. 今後の予測\n20. 結論とまとめ",
  },
  {
    source: "Wall Street Journal",
    text: "WSJ の想定記事・全文ダミーテキスト。ここにパラグラフが入ります。WSJの報道の例。経済的な視点から分析を行い、市場への影響を考察します。",
    summary: "WSJの記事要約：経済的な視点から市場への影響を分析。金融市場の動向と企業への影響を考察。",
    summary20: "WSJ 20行要約：\n1. 経済ニュースの概要\n2. 市場への即時的な影響\n3. 株価や為替の動向\n4. 企業業績への影響\n5. 業界全体への波及効果\n6. 投資家の反応\n7. アナリストの見解\n8. 過去の類似事例\n9. 長期的な影響の予測\n10. 規制への影響\n11. 消費者への影響\n12. 雇用への影響\n13. 貿易への影響\n14. インフレへの影響\n15. 金利への影響\n16. 国際的な経済関係\n17. 政策への影響\n18. 技術革新への影響\n19. 今後の市場予測\n20. 投資戦略への示唆",
  },
  {
    source: "Washington Post",
    text: "Washington Post の想定記事・全文ダミーテキスト。ここにパラグラフが入ります。Washington Postの報道の例。政治的な側面から詳細に分析を行います。",
    summary: "Washington Postの記事要約：政治的な側面から詳細に分析。政策決定とその影響を考察。",
    summary20: "Washington Post 20行要約：\n1. 政治ニュースの概要\n2. 政策決定の背景\n3. 関係者の立場\n4. 議会での議論\n5. 政党間の対立\n6. 有権者への影響\n7. 選挙への影響\n8. 国際関係への影響\n9. 過去の政策との比較\n10. 専門家の評価\n11. メディアの反応\n12. 世論の反応\n13. 市民団体の反応\n14. 業界団体の反応\n15. 州政府への影響\n16. 地方自治体への影響\n17. 法的な側面\n18. 憲法上の問題\n19. 今後の展開\n20. 長期的な影響",
  },
  {
    source: "The Times",
    text: "The Times の想定記事・全文ダミーテキスト。ここにパラグラフが入ります。The Timesの報道の例。英国の視点から国際情勢を分析します。",
    summary: "The Timesの記事要約：英国の視点から国際情勢を分析。EUとの関係や国際協力について考察。",
    summary20: "The Times 20行要約：\n1. 国際ニュースの概要\n2. 英国の立場\n3. EUとの関係\n4. 米国との関係\n5. アジア諸国との関係\n6. 中東情勢への影響\n7. 貿易協定への影響\n8. 安全保障への影響\n9. 移民政策への影響\n10. 経済協力への影響\n11. 文化的交流への影響\n12. 教育交流への影響\n13. 科学技術協力\n14. 環境問題への取り組み\n15. 人権問題への立場\n16. 国際機関での役割\n17. 多国間協定への参加\n18. 二国間関係の強化\n19. 今後の外交方針\n20. 国際社会への貢献",
  },
  {
    source: "Financial Times",
    text: "Financial Times の想定記事・全文ダミーテキスト。ここにパラグラフが入ります。Financial Timesの報道の例。金融市場への影響を詳細に分析します。",
    summary: "Financial Timesの記事要約：金融市場への影響を詳細に分析。銀行業界や投資環境への影響を考察。",
    summary20: "Financial Times 20行要約：\n1. 金融ニュースの概要\n2. 銀行業界への影響\n3. 証券市場への影響\n4. 為替市場への影響\n5. 債券市場への影響\n6. 商品市場への影響\n7. 不動産市場への影響\n8. 金融規制への影響\n9. 中央銀行の政策\n10. 金利政策への影響\n11. 通貨政策への影響\n12. 金融機関の業績\n13. 投資家の行動\n14. リスク管理への影響\n15. 金融技術への影響\n16. 国際金融市場\n17. 金融危機への対応\n18. 金融包摂への影響\n19. 持続可能な金融\n20. 今後の金融環境",
  },
  {
    source: "The Straits Times",
    text: "The Straits Times の想定記事・全文ダミーテキスト。ここにパラグラフが入ります。The Straits Timesの報道の例。アジアの視点から地域情勢を分析します。",
    summary: "The Straits Timesの記事要約：アジアの視点から地域情勢を分析。ASEAN諸国との関係や地域協力について考察。",
    summary20: "The Straits Times 20行要約：\n1. アジア地域ニュースの概要\n2. シンガポールの立場\n3. ASEAN諸国との関係\n4. 中国との関係\n5. 日本との関係\n6. インドとの関係\n7. オーストラリアとの関係\n8. 地域経済統合\n9. 貿易協定への影響\n10. 投資環境への影響\n11. 観光業への影響\n12. 技術協力への影響\n13. 教育協力への影響\n14. 安全保障協力\n15. 環境問題への取り組み\n16. 災害対策協力\n17. 文化交流の促進\n18. 人材交流の促進\n19. 地域の安定への貢献\n20. 今後の地域協力",
  },
  {
    source: "Le Monde",
    text: "Le Monde の想定記事・全文ダミーテキスト。ここにパラグラフが入ります。Le Mondeの報道の例。フランスの視点から国際情勢を分析します。",
    summary: "Le Mondeの記事要約：フランスの視点から国際情勢を分析。EU内での役割や国際協力について考察。",
    summary20: "Le Monde 20行要約：\n1. 国際ニュースの概要\n2. フランスの立場\n3. EU内での役割\n4. ドイツとの協力\n5. イタリアとの協力\n6. スペインとの協力\n7. アフリカ諸国との関係\n8. 中東情勢への立場\n9. 気候変動への取り組み\n10. 人権問題への立場\n11. 移民政策への影響\n12. 安全保障への影響\n13. 経済協力への影響\n14. 文化的影響力\n15. 言語政策への影響\n16. 教育協力への影響\n17. 科学技術協力\n18. 国際機関での役割\n19. 多国間主義の推進\n20. 今後の外交方針",
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

                            {activeTab === "full" && (
                              <>
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
                              </>
                            )}

                            {activeTab === "summary" && (
                              <div className="space-y-4">
                                <div className="mb-6">
                                  <h3 className="text-lg font-semibold mb-3">
                                    サマリー
                                  </h3>
                                  <div className="space-y-4 text-sm text-muted-foreground">
                                    <div>
                                      <h4 className="font-semibold mb-2">多数派の見解</h4>
                                      <p className="leading-relaxed">
                                        mRNAワクチンは重症化予防に有効であり、公的機関や主要査読誌の一次資料に基づいて評価されています。安全性については「利益がリスクを上回る」と評価されており、まれな副反応については継続的な監視と注意喚起が行われています。
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">少数派の見解</h4>
                                      <p className="leading-relaxed">
                                        有効性の持続性や副反応リスクの過小評価を批判する声があり、政策や報道の偏りを指摘しています。イベルメクチンなどの代替治療法や研究の再評価を求める主張もあります。ただし、これらの主張は証拠の質と再現性によって検証する必要があります。
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">主要な論点</h4>
                                      <p className="leading-relaxed">
                                        ファイザーとモデルナのmRNAワクチンの有効性と安全性に関する臨床試験データ、規制当局の評価、アジア各国の政策と実データ、アフリカ諸国の実施状況などが主要な論点となっています。
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {activeTab === "summary20" && (
                              <div className="space-y-4">
                                <div className="mb-6">
                                  <h3 className="text-lg font-semibold mb-3">
                                    20行要約
                                  </h3>
                                  <div className="space-y-2 text-sm text-muted-foreground">
                                    <p className="leading-relaxed">1. コロナ・ワクチンに関する主要な論点と見解の概要</p>
                                    <p className="leading-relaxed">2. mRNAワクチン（ファイザー・モデルナ）の有効性に関する多数派の見解</p>
                                    <p className="leading-relaxed">3. 公的機関や主要査読誌の一次資料に基づく評価</p>
                                    <p className="leading-relaxed">4. 重症化予防における有効性の確認</p>
                                    <p className="leading-relaxed">5. 安全性評価：「利益がリスクを上回る」という結論</p>
                                    <p className="leading-relaxed">6. まれな副反応の監視と注意喚起の仕組み</p>
                                    <p className="leading-relaxed">7. 少数派による有効性の持続性への疑問</p>
                                    <p className="leading-relaxed">8. 副反応リスクの過小評価をめぐる批判</p>
                                    <p className="leading-relaxed">9. 政策や報道の偏りを指摘する声</p>
                                    <p className="leading-relaxed">10. イベルメクチンなどの代替治療法の再評価を求める主張</p>
                                    <p className="leading-relaxed">11. ガリレオの教訓：少数説が後に主流となる可能性</p>
                                    <p className="leading-relaxed">12. 証拠の質と再現性による検証の重要性</p>
                                    <p className="leading-relaxed">13. ファイザー（BNT162b2）の臨床試験と追跡結果</p>
                                    <p className="leading-relaxed">14. モデルナ（mRNA-1273）の臨床試験と追跡結果</p>
                                    <p className="leading-relaxed">15. 規制当局（FDA/EU/PMDA）の評価資料</p>
                                    <p className="leading-relaxed">16. 薬剤安全性の継続的な監視とアップデート</p>
                                    <p className="leading-relaxed">17. 若年男性における心筋炎などのまれな副反応</p>
                                    <p className="leading-relaxed">18. アジア各国（日本・韓国・台湾）の政策と実データ</p>
                                    <p className="leading-relaxed">19. アフリカ諸国の接種率と感染動向の地域差</p>
                                    <p className="leading-relaxed">20. 今後の研究とデータ収集の重要性</p>
                                  </div>
                                </div>
                              </div>
                            )}
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
                            {activeTab === "full" && (
                              <p className="text-sm text-gray-700 leading-relaxed">
                                {article.text}
                              </p>
                            )}
                            {activeTab === "summary" && (
                              <p className="text-sm text-gray-700 leading-relaxed">
                                {article.summary}
                              </p>
                            )}
                            {activeTab === "summary20" && (
                              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                {article.summary20}
                              </div>
                            )}
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
