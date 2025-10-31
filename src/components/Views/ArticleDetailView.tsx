import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VerificationBadge, VerificationLevel } from "@/components/Badges/VerificationBadge";
import { SourceBadge } from "@/components/Badges/SourceBadge";
import { C2PABadge } from "@/components/Badges/C2PABadge";
import { 
  ExternalLink, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  FileText,
  User,
  ChevronLeft,
  Share2,
  Bookmark
} from "lucide-react";

interface ArticleDetailViewProps {
  article: {
    id: string;
    title: string;
    summary: string;
    source: string;
    verificationLevel: VerificationLevel;
    c2pa: boolean;
    primarySourceUrl?: string;
    timestamp: string;
    trending?: boolean;
    fullContent?: string;
    claims?: Array<{ claim: string; evidence: string; status: string }>;
    expertComments?: Array<{ expert: string; comment: string; sourceUrl: string }>;
    timeline?: Array<{ date: string; event: string; type: string }>;
    relatedArticles?: Array<{ title: string; url: string }>;
    updateHistory?: Array<{ date: string; change: string }>;
  };
  onBack: () => void;
}

export const ArticleDetailView = ({ article, onBack }: ArticleDetailViewProps) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-4 gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        戻る
      </Button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-3xl font-bold leading-tight flex-1">{article.title}</h1>
                {article.trending && (
                  <TrendingUp className="h-6 w-6 text-warning flex-shrink-0" />
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <SourceBadge source={article.source} />
                <VerificationBadge level={article.verificationLevel} size="md" />
                <C2PABadge verified={article.c2pa} />
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  {article.timestamp}
                </Badge>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Bookmark className="h-4 w-4" />
                  保存
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  共有
                </Button>
                {article.primarySourceUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => window.open(article.primarySourceUrl, "_blank")}
                  >
                    一次ソース
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Summary */}
              <div>
                <h3 className="text-lg font-semibold mb-2">要約</h3>
                <p className="text-muted-foreground">{article.summary}</p>
              </div>

              <Separator />

              {/* Full Content */}
              {article.fullContent && (
                <>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">詳細</h3>
                    <p className="text-foreground leading-relaxed">{article.fullContent}</p>
                  </div>
                  <Separator />
                </>
              )}

              {/* Claims and Evidence */}
              {article.claims && article.claims.length > 0 && (
                <>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">主張と証拠</h3>
                    <div className="space-y-4">
                      {article.claims.map((item, index) => (
                        <Card key={index} className="bg-muted/50">
                          <CardContent className="pt-4">
                            <div className="flex items-start gap-3">
                              <FileText className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                              <div className="flex-1 space-y-2">
                                <p className="font-medium">{item.claim}</p>
                                <p className="text-sm text-muted-foreground">{item.evidence}</p>
                                <Badge variant="outline">{item.status}</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  <Separator />
                </>
              )}

              {/* Expert Comments */}
              {article.expertComments && article.expertComments.length > 0 && (
                <>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">専門家の見解</h3>
                    <div className="space-y-4">
                      {article.expertComments.map((comment, index) => (
                        <Card key={index} className="bg-muted/50">
                          <CardContent className="pt-4">
                            <div className="flex items-start gap-3">
                              <User className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                              <div className="flex-1 space-y-2">
                                <p className="font-semibold">{comment.expert}</p>
                                <p className="text-sm text-foreground">{comment.comment}</p>
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="h-auto p-0 gap-1"
                                  onClick={() => window.open(comment.sourceUrl, "_blank")}
                                >
                                  出典を確認
                                  <ExternalLink className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  <Separator />
                </>
              )}

              {/* AI Disclosure */}
              <div className="bg-muted/30 border border-border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0 text-info" />
                  <div>
                    <p className="font-medium mb-1">AI使用について</p>
                    <p className="text-sm text-muted-foreground">
                      この記事の要約と分析の一部にAIを使用しています。すべての主張は人間によって検証されています。
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Update History */}
          {article.updateHistory && article.updateHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>更新履歴</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {article.updateHistory.map((update, index) => (
                    <div key={index} className="flex gap-3">
                      <Badge variant="outline" className="shrink-0">
                        {update.date}
                      </Badge>
                      <p className="text-sm text-muted-foreground">{update.change}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Timeline */}
          {article.timeline && article.timeline.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>タイムライン</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {article.timeline.map((event, index) => (
                      <div key={index} className="relative pl-6 pb-4 border-l-2 border-border last:border-l-0">
                        <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-primary" />
                        <div className="space-y-1">
                          <Badge variant="outline" className="mb-1">{event.date}</Badge>
                          <p className="text-sm font-medium">{event.event}</p>
                          <Badge variant="secondary" className="text-xs">{event.type}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}

          {/* Related Articles */}
          {article.relatedArticles && article.relatedArticles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>関連記事</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {article.relatedArticles.map((related, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => window.open(related.url, "_blank")}
                    >
                      <span className="text-sm line-clamp-2">{related.title}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Report Issue */}
          <Card>
            <CardHeader>
              <CardTitle>問題の報告</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                誤りや不正確な情報を発見しましたか？
              </p>
              <Button variant="outline" className="w-full">
                訂正を申請
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
