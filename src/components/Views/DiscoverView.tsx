import { useState } from "react";
import { NewsCard } from "@/components/Cards/NewsCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ArticleDetailView } from "@/components/Views/ArticleDetailView";
import { Search } from "lucide-react";

// Mock data
const mockNews = [
  {
    id: "1",
    title: "気候変動対策の新しい国際協定が合意",
    summary: "主要国が2030年までに炭素排出量を50%削減する目標で合意。ただし、実施の詳細については今後の協議が必要。",
    source: "国際ニュース社",
    verificationLevel: "verified" as const,
    c2pa: true,
    primarySourceUrl: "https://example.com/source1",
    timestamp: "2時間前",
    trending: true,
    fullContent: "2025年の気候サミットにおいて、主要30カ国が2030年までに炭素排出量を2020年比で50%削減することで合意しました。この協定には、再生可能エネルギーへの移行、森林保護、産業部門の脱炭素化が含まれています。ただし、各国の実施計画の詳細や資金調達メカニズムについては、今後6ヶ月以内に開催される追加協議で決定される予定です。",
    claims: [
      { claim: "2030年までに50%削減目標", evidence: "公式協定文書、各国首脳の共同声明", status: "検証済み" },
      { claim: "実施の詳細は今後協議", evidence: "協定付属書、議事録", status: "検証済み" },
    ],
    expertComments: [
      { expert: "環境経済学者 山田太郎", comment: "野心的な目標だが、実施メカニズムの具体化が課題", sourceUrl: "https://example.com/expert1" },
    ],
    timeline: [
      { date: "2025-03-15", event: "気候サミット開催", type: "イベント" },
      { date: "2025-03-17", event: "50%削減目標で合意", type: "合意" },
      { date: "2025-03-18", event: "各国首脳が共同声明", type: "発表" },
    ],
    relatedArticles: [
      { title: "過去の気候協定との比較分析", url: "https://example.com/related1" },
      { title: "各国の削減計画の詳細", url: "https://example.com/related2" },
    ],
    updateHistory: [
      { date: "2025-03-18", change: "初版公開" },
      { date: "2025-03-19", change: "専門家コメント追加" },
    ],
  },
  {
    id: "2",
    title: "新型ワクチンの臨床試験で予想以上の効果",
    summary: "第三相臨床試験の中間結果が発表され、85%の有効性が確認された。ただし、長期的な副作用についてはさらなる観察が必要。",
    source: "医療ジャーナル",
    verificationLevel: "partial" as const,
    c2pa: false,
    primarySourceUrl: "https://example.com/source2",
    timestamp: "5時間前",
    fullContent: "大手製薬会社が開発中の新型ワクチンについて、第三相臨床試験の中間結果が医学誌に発表されました。試験参加者30,000人のデータ分析の結果、85%の有効性が確認されました。重篤な副作用の報告は少数にとどまっていますが、長期的な安全性については引き続き観察が必要とされています。",
    claims: [
      { claim: "85%の有効性", evidence: "臨床試験データ、査読済み論文", status: "検証済み" },
      { claim: "長期的副作用は不明", evidence: "試験期間の制約、継続観察中", status: "部分検証" },
    ],
    timeline: [
      { date: "2024-06-01", event: "第三相試験開始", type: "イベント" },
      { date: "2025-03-10", event: "中間結果発表", type: "発表" },
    ],
  },
  {
    id: "3",
    title: "SNSで拡散中の情報について検証が進行中",
    summary: "複数のアカウントから同時投稿された情報について、一次ソースの確認と事実関係の検証を実施中。現時点では確証が得られていない。",
    source: "ソーシャルメディア監視",
    verificationLevel: "unverified" as const,
    c2pa: false,
    timestamp: "1時間前",
    fullContent: "過去24時間以内に複数のSNSアカウントから同時投稿された情報について、当編集部が検証作業を進めています。投稿内容の一次ソースを特定する試みが続いていますが、現時点では信頼できる確証が得られていません。読者の皆様には、この情報を共有する前に公式発表を待つことをお勧めします。",
    claims: [
      { claim: "協調的な拡散パターン", evidence: "投稿タイミング分析、テキスト類似性", status: "確認中" },
      { claim: "一次ソースが不明", evidence: "ソース追跡調査中", status: "未検証" },
    ],
    timeline: [
      { date: "2025-03-20 09:00", event: "初回投稿確認", type: "発見" },
      { date: "2025-03-20 12:00", event: "検証作業開始", type: "検証" },
    ],
  },
];

export const DiscoverView = () => {
  const [selectedArticle, setSelectedArticle] = useState<typeof mockNews[0] | null>(null);

  if (selectedArticle) {
    return (
      <ArticleDetailView 
        article={selectedArticle} 
        onBack={() => setSelectedArticle(null)} 
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Tabs defaultValue="world" className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="world">世の中</TabsTrigger>
            <TabsTrigger value="favorites">お気に入り</TabsTrigger>
          </TabsList>

          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="キーワードで検索..."
              className="pl-10 w-full md:w-64"
            />
          </div>
        </div>

        <TabsContent value="world" className="space-y-4">
          {mockNews.map((news) => (
            <NewsCard 
              key={news.id} 
              {...news} 
              onClick={() => setSelectedArticle(news)}
            />
          ))}
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              お気に入りのトピックを登録してパーソナライズしましょう
            </p>
            <Button className="mt-4">キーワードを追加</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
