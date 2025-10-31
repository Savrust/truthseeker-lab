import { NewsCard } from "@/components/Cards/NewsCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
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
  },
  {
    id: "3",
    title: "SNSで拡散中の情報について検証が進行中",
    summary: "複数のアカウントから同時投稿された情報について、一次ソースの確認と事実関係の検証を実施中。現時点では確証が得られていない。",
    source: "ソーシャルメディア監視",
    verificationLevel: "unverified" as const,
    c2pa: false,
    timestamp: "1時間前",
  },
];

export const DiscoverView = () => {
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
            <NewsCard key={news.id} {...news} />
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
