import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { VerificationBadge, VerificationLevel } from "@/components/Badges/VerificationBadge";
import { SourceBadge } from "@/components/Badges/SourceBadge";
import { C2PABadge } from "@/components/Badges/C2PABadge";
import { IdeologyBadge, IdeologyData } from "@/components/Badges/IdeologyBadge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { 
  ExternalLink, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  FileText,
  User,
  ChevronLeft,
  Share2,
  Bookmark,
  Lock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Calendar,
  Edit3,
  DollarSign,
  Cpu,
  Send
} from "lucide-react";

interface ComparisonViewItem {
  source: string;
  confidence: "high" | "medium" | "low";
  claim: string;
  supportingEvidence: string[];
  counterEvidence: string[];
}

interface TimelineItem {
  date: string;
  event: string;
  type: "event" | "report";
  reference?: string;
}

interface Footnote {
  id: number;
  source: string;
  country: string;
  language: string;
  published: string;
  originalUrl?: string;
}

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
    ideology?: IdeologyData;
    fullContent?: string;
    publishedDate?: string;
    lastUpdated?: string;
    readTime?: string;
    author?: string;
    corrections?: Array<{ date: string; note: string }>;
    comparisonView?: ComparisonViewItem[];
    unverifiedItems?: string[];
    timeline?: TimelineItem[];
    editorialLog?: Array<{ date: string; action: string; note: string }>;
    coiFunding?: { donors?: string[]; adRevenue?: boolean };
    aiUsage?: { summary?: number; body?: number; tools?: string[] };
    footnotes?: Footnote[];
    quickFacts?: Array<{ label: string; value: string }>;
  };
  onBack: () => void;
}

const ConfidenceBadge = ({ level }: { level: "high" | "medium" | "low" }) => {
  const config = {
    high: { label: "高", color: "bg-green-500" },
    medium: { label: "中", color: "bg-yellow-500" },
    low: { label: "低", color: "bg-red-500" },
  }[level];
  
  return (
    <Badge className={`${config.color} text-white`}>
      {config.label}
    </Badge>
  );
};

export const ArticleDetailView = ({ article, onBack }: ArticleDetailViewProps) => {
  const { isAuthenticated } = useAuth();
  const { language, t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sourceUrl, setSourceUrl] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<"source" | "error" | "bias">("source");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: Just set submitted state
    setIsSubmitted(true);
    // In a real implementation, you would send the data to an API here
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-6 gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        {t("article.back")}
      </Button>

      {!isAuthenticated && (
        <Alert className="mb-6">
          <Lock className="h-4 w-4" />
          <AlertDescription>
            {language === "en" 
              ? "You're viewing limited information. Login to access full content, claims, expert comments, and timeline details."
              : "限られた情報を表示しています。完全なコンテンツ、主張、専門家コメント、タイムラインの詳細にアクセスするにはログインしてください。"}
          </AlertDescription>
        </Alert>
      )}

      {/* Article Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight flex-1">
            {article.title}
          </h1>
          {article.trending && (
            <TrendingUp className="h-6 w-6 text-warning flex-shrink-0" />
          )}
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
          {article.publishedDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{t("article.published")}: {article.publishedDate}</span>
            </div>
          )}
          {article.lastUpdated && (
            <div className="flex items-center gap-1">
              <Edit3 className="h-4 w-4" />
              <span>{t("article.lastUpdated")}: {article.lastUpdated}</span>
            </div>
          )}
          {article.readTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{t("article.readTime")}: {article.readTime}</span>
            </div>
          )}
          {article.author && (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{t("article.author")}: {article.author}</span>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <SourceBadge source={article.source} />
          <VerificationBadge level={article.verificationLevel} size="md" />
          <C2PABadge verified={article.c2pa} />
          {article.ideology && <IdeologyBadge ideology={article.ideology} size="md" />}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            variant={isFavorite(article.id) ? "default" : "outline"} 
            size="sm" 
            className="gap-2"
            onClick={() => toggleFavorite(article.id)}
          >
            <Bookmark className={`h-4 w-4 ${isFavorite(article.id) ? "fill-current" : ""}`} />
            {isFavorite(article.id) 
              ? (language === "en" ? "Saved" : "保存済み")
              : t("article.save")}
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            {t("article.share")}
          </Button>
        </div>
      </div>

      {/* Row 1: Comparison View (70%) and Timeline (30%) side by side */}
      <div className="grid lg:grid-cols-10 gap-6 mb-6">
        {/* Comparison View - 7 columns (70%) */}
        {article.comparisonView && article.comparisonView.length > 0 && (
          <Card className="lg:col-span-7">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {language === "en" ? "Comparison View" : "比較ビュー"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[350px] pr-4">
                <div className="space-y-6">
                  {article.comparisonView.map((item, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{item.source}</h3>
                        <span className="text-sm text-muted-foreground">
                          {language === "en" ? "Confidence" : "確度"}: 
                        </span>
                        <ConfidenceBadge level={item.confidence} />
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">{item.claim}</h4>
                        
                        {item.supportingEvidence.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-green-700 dark:text-green-400 mb-1">
                              {language === "en" ? "Supporting Evidence" : "根拠"}
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              {item.supportingEvidence.map((evidence, i) => (
                                <li key={i} className="text-muted-foreground">{evidence}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {item.counterEvidence.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-red-700 dark:text-red-400 mb-1">
                              {language === "en" ? "Counter Evidence" : "反証"}
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              {item.counterEvidence.map((evidence, i) => (
                                <li key={i} className="text-muted-foreground">{evidence}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        {/* Timeline - 3 columns (30%) */}
        {article.timeline && article.timeline.length > 0 && (
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="h-4 w-4" />
                {language === "en" ? "Timeline" : "タイムライン"}
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                ({language === "en" ? "Events / Reports" : "出来事 / 報道"})
              </p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[350px] pr-4">
                <div className="space-y-4">
                  {article.timeline.map((item, index) => (
                    <div key={index} className="relative pl-6 pb-4 border-l-2 border-border last:border-l-0">
                      <div className={`absolute left-[-5px] top-0 w-2 h-2 rounded-full ${
                        item.type === "event" ? "bg-primary" : "bg-accent"
                      }`} />
                      <div className="space-y-1">
                        <Badge variant="outline" className="mb-1 text-xs">{item.date}</Badge>
                        <p className="text-sm font-medium">{item.event}</p>
                        <Badge variant="secondary" className="text-xs">
                          {item.type === "event" 
                            ? (language === "en" ? "Event" : "出来事")
                            : (language === "en" ? "Report" : "報道")}
                        </Badge>
                        {item.reference && (
                          <p className="text-xs text-muted-foreground">
                            {language === "en" ? "Reference" : "参照"}: [{item.reference}]
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>

      

      {/* Row 2: Transparency & Disclosure (70%) and Quick Facts (30%) side by side */}
      <div className="grid lg:grid-cols-10 gap-6 mb-6">
        {/* Transparency & Disclosure - 7 columns (70%) */}
        <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              {language === "en" ? "Transparency & Disclosure" : "透明性・開示"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Editorial Decision Log */}
              {article.editorialLog && article.editorialLog.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Edit3 className="h-4 w-4" />
                    {language === "en" ? "Editorial Decision Log" : "編集判断ログ"}
                  </h4>
                  <div className="space-y-2">
                    {article.editorialLog.map((log, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-medium">{log.date}</span>
                        <span className="mx-2">—</span>
                        <span className="text-muted-foreground">{log.action}</span>
                        {log.note && (
                          <span className="text-muted-foreground">: {log.note}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {article.editorialLog && article.editorialLog.length > 0 && <Separator />}

              {/* COI & Funding */}
              {article.coiFunding && (
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    {language === "en" ? "COI / Funding" : "利害関係(COI)・資金"}
                  </h4>
                  <div className="space-y-2 text-sm">
                    {article.coiFunding.donors && article.coiFunding.donors.length > 0 && (
                      <div>
                        <p className="text-muted-foreground">
                          {language === "en" ? "Grant from" : "寄付者"} {article.coiFunding.donors.join(", ")} ({language === "en" ? "2023" : "2023年"})
                        </p>
                      </div>
                    )}
                    {article.coiFunding.adRevenue !== undefined && (
                      <p className="text-muted-foreground">
                        {language === "en" 
                          ? "No ad revenue associated with this article production."
                          : "本記事制作に広告収入は紐づかない"}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {article.coiFunding && <Separator />}

              {/* AI Usage */}
              {article.aiUsage && (
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Cpu className="h-4 w-4" />
                    {language === "en" ? "AI Usage" : "AI利用"}
                  </h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {article.aiUsage.summary !== undefined && (
                      <p>
                        {language === "en" ? "Summary" : "要約"}: {article.aiUsage.summary}% / {language === "en" ? "Body" : "本文"}: {article.aiUsage.body || 0}%
                      </p>
                    )}
                    {article.aiUsage.tools && article.aiUsage.tools.length > 0 && (
                      <p>
                        {language === "en" ? "Tools" : "ツール"}: {article.aiUsage.tools.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Facts - 3 columns (30%) */}
        {article.quickFacts && article.quickFacts.length > 0 && (
          <Card className="lg:col-span-3 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-base">{language === "en" ? "QUICK FACTS" : "QUICK FACTS"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {article.quickFacts.map((fact, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-sm font-semibold">{fact.label}</p>
                    <p className="text-sm text-muted-foreground">{fact.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      {/* Row 3: Unverified Items (full width) */}
      {article.unverifiedItems && article.unverifiedItems.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              {language === "en" ? "Unverified Items" : "未確定事項"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {article.unverifiedItems.map((item, index) => (
                <li key={index} className="text-muted-foreground">{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      {/* Row 4: Footnotes (full width) */}
      {article.footnotes && article.footnotes.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{language === "en" ? "Footnotes" : "脚注"}</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {article.footnotes.map((fn) => (
                  <div key={fn.id} className="text-sm space-y-1">
                    <div className="flex items-start gap-2">
                      <span className="font-semibold">{fn.id}.</span>
                      <div className="flex-1">
                        <p className="font-medium">{fn.source}</p>
                        <p className="text-muted-foreground">
                          {fn.country}・{fn.language}・{language === "en" ? "Published" : "公開"} {fn.published}
                        </p>
                        {fn.originalUrl && (
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0 gap-1 mt-1"
                            onClick={() => window.open(fn.originalUrl, "_blank")}
                          >
                            {language === "en" ? "Original" : "原文"}
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
      
      {/* Row 5: Reader Meta-Review (full width) */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{language === "en" ? "Reader Meta-Review" : "読者メタレビュー"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* URL Field */}
              <div className="space-y-2">
                <Input 
                  id="sourceUrl"
                  type="url"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder={language === "en" ? "https://example.com/source" : "https://example.com/source"} 
                />
              </div>
              {/* Feedback Textarea */}
              <div className="space-y-2">
                <Textarea 
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder={language === "en" ? "Enter your feedback..." : "フィードバックを入力..."} 
                  className="h-[200px] resize-none"
                />
              </div>
              <div>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="feedbackType" 
                      value="source" 
                      className="w-4 h-4" 
                      checked={feedbackType === "source"}
                      onChange={() => setFeedbackType("source")}
                    />
                    <span>{language === "en" ? "Suggest Source" : "出典提案"}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="feedbackType" 
                      value="error" 
                      className="w-4 h-4"
                      checked={feedbackType === "error"}
                      onChange={() => setFeedbackType("error")}
                    />
                    <span>{language === "en" ? "Report Error" : "誤り指摘"}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="feedbackType" 
                      value="bias" 
                      className="w-4 h-4"
                      checked={feedbackType === "bias"}
                      onChange={() => setFeedbackType("bias")}
                    />
                    <span>{language === "en" ? "Report Bias" : "バイアス申告"}</span>
                  </label>
                </div>
              </div>
              {/* Submit Button */}
              <div className="flex justify-end">
                <Button type="submit" className="gap-2">
                  <Send className="h-4 w-4" />
                  {language === "en" ? "Submit" : "送信"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                {language === "en" 
                  ? "Thank you. Your submission has been received (demo)."
                  : "ありがとうございます。ご提案を受け付けました（デモ）。"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Footer Note */}
      <div className="text-center text-sm text-muted-foreground pb-6">
        {/* <p>© 2025 The Truth — {language === "en" ? "Static Site Demo" : "静的サイトデモ"}</p> */}
      </div>
    </div>
  );
};
