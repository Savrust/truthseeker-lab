import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/Layout/Header";
import { Star } from "lucide-react";

export default function TruthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [basicView, setBasicView] = useState("western");
  const [granularity, setGranularity] = useState("precise");
  const [viewType, setViewType] = useState("majority");

  const sources = ["NYT", "WSJ", "WP", "TIMES", "FT", "S.T."];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Custom Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
            <h1 className="text-lg sm:text-xl font-semibold">What is The TRUTH</h1>
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
              <Button variant="ghost" size="sm" className="text-xs sm:text-sm">Health</Button>
              <Button variant="ghost" size="sm" className="text-xs sm:text-sm">Policy</Button>
              <Button variant="ghost" size="sm" className="text-xs sm:text-sm">Evidence</Button>
              {/* <span className="text-sm text-muted-foreground">
                Build: GPT-5 Pro/Light + Galileo | 2025-11-12 02:40
              </span> */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Three Column Layout */}
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
          {/* Left Sidebar - Classification Axis */}
          <div className="md:col-span-3 order-1">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">分類軸</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  ※複数選択でハイライト
                </p>
                
                <ScrollArea className="h-[calc(100vh-250px)]">
                  <div className="space-y-6">
                    {/* 基本 (Basic) */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">基本</Label>
                      <div className="flex gap-2">
                        <Button
                          variant={basicView === "western" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setBasicView("western")}
                          className="flex-1"
                        >
                          欧米
                        </Button>
                        <Button
                          variant={basicView === "non-western" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setBasicView("non-western")}
                          className="flex-1"
                        >
                          非欧米
                        </Button>
                      </div>
                    </div>

                    {/* リージョン (Region) */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">リージョン</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["アジア", "欧州", "オセアニア", "中東", "アフリカ", "北米/中南米"].map((region) => (
                          <Button
                            key={region}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            {region}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* 粒度 (Granularity) */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">粒度</Label>
                      <div className="flex gap-2">
                        <Button
                          variant={granularity === "coarse" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setGranularity("coarse")}
                          className="flex-1"
                        >
                          粗い
                        </Button>
                        <Button
                          variant={granularity === "precise" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setGranularity("precise")}
                          className="flex-1"
                        >
                          精密
                        </Button>
                      </div>
                    </div>

                    {/* ビュー切替 (View Switch) */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">ビュー切替</Label>
                      <RadioGroup value={viewType} onValueChange={setViewType}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="majority" id="majority" />
                          <Label htmlFor="majority" className="cursor-pointer">多数派</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="minority" id="minority" />
                          <Label htmlFor="minority" className="cursor-pointer">少数派</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Separator />

                    <p className="text-xs text-muted-foreground">
                      医療情報の一般的なまとめです。個別の判断は医療専門家にご相談ください。
                    </p>

                    <div className="pt-4">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        ▶画像を表示
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1">設計スケッチ</p>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Center - Main Article */}
          <div className="md:col-span-6 order-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">
                  コロナ・ワクチンの真実は?
                </h2>
                
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  本ページは、主要製薬会社（ファイザー/モデルナ）の「有効性・安全性」に関する一次資料・主要報道、および大村智教授（イベルメクチン）関連の見解・報道を、欧米/非欧米・リージョン別の視点から整理し、複数の視点を提示し、証拠の所在を明確化することを目的としています。
                </p>

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

          {/* Right Sidebar - Sources & Edit Memo */}
          <div className="md:col-span-3 order-3">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Sources (媒体)</h3>
                
                <div className="space-y-2 mb-6">
                  {sources.map((source) => (
                    <Button
                      key={source}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                    >
                      {source}
                    </Button>
                  ))}
                </div>

                <Separator className="my-4" />

                <div>
                  <h4 className="font-semibold mb-3">編集メモ</h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="leading-relaxed">
                      各リストの「リンクを追加」にURLを入れてください。
                    </li>
                    <li className="leading-relaxed">
                      一次資料優先(論文・公的機関・規制当局)。
                    </li>
                    <li className="leading-relaxed">
                      対立する結果は並置し見出しで立場を明示。
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

