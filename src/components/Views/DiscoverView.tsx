import { useState, useRef } from "react";
import { NewsCard } from "@/components/Cards/NewsCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ArticleDetailView } from "@/components/Views/ArticleDetailView";
import { KeywordTimelineView } from "@/components/Views/KeywordTimelineView";
import { KeywordDialog } from "@/components/Dialogs/KeywordDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search, Lock, MoreHorizontal, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import articleImage from "@/assets/image (1).jpg";

// Mock data
export const mockNews = [
  {
    id: "1",
    title: "マリとウクライナの断交発表：何が確定で、何が未確定か",
    summary: "マリ政府がウクライナとの断交を発表。反政府勢力への支援疑惑が焦点となっているが、詳細な検証が進行中。",
    source: "国際ニュース",
    verificationLevel: "partial" as const,
    c2pa: true,
    primarySourceUrl: "https://example.com/source1",
    timestamp: "2時間前",
    imageUrl: articleImage,
    trending: true,
    ideology: { liberal: 35, neutral: 45, conservative: 20 },
    publishedDate: "2024年9月1日",
    lastUpdated: "2024年9月10日",
    readTime: "7分",
    author: "山田太郎",
    corrections: [
      { date: "2024年9月10日", note: "翻訳語句の不正確さを修正" }
    ],
    comparisonView: [
      {
        source: "マリ政府",
        confidence: "medium" as const,
        claim: "ウクライナが反政府勢力を支援した",
        supportingEvidence: [
          "政府声明と押収品の提示 [Mali Gov.]"
        ],
        counterEvidence: [
          "ウクライナ政府は全面否定 [MFA Ukraine]"
        ]
      },
      {
        source: "欧州主要紙A",
        confidence: "medium" as const,
        claim: "反政府側にウクライナ由来のドローン/情報支援が存在",
        supportingEvidence: [
          "現地取材・機体残骸写真 [Le Monde]"
        ],
        counterEvidence: [
          "シリアル未特定、出所特定に欠落 [CAR]"
        ]
      },
      {
        source: "ウクライナ政府",
        confidence: "medium" as const,
        claim: "国家としての関与はない",
        supportingEvidence: [
          "外交文書/国連での発言 [MFA Ukraine]"
        ],
        counterEvidence: [
          "地域紙・NGOからの疑義 [Le Monde]"
        ]
      }
    ],
    unverifiedItems: [
      "没収装備の製造ロットが未公開",
      "国家関与と私人の違法取引の切り分け不十分"
    ],
    timeline: [
      { date: "2024年8月12日", event: "マリ政府が断交を発表", type: "event" as const, reference: "1" },
      { date: "2024年8月20日", event: "欧州紙が現地取材を公開", type: "report" as const, reference: "1" }
    ],
    editorialLog: [
      { date: "2024年9月1日", action: "create", note: "初版公開" },
      { date: "2024年9月10日", action: "update", note: "クレームC2の確度評価を見直し" }
    ],
    coiFunding: {
      donors: ["寄付者X"],
      adRevenue: false
    },
    aiUsage: {
      summary: 60,
      body: 0,
      tools: ["LLM-JP vX", "MT-en-fr"]
    },
    footnotes: [
      {
        id: 1,
        source: "政府声明",
        country: "MLI",
        language: "fr",
        published: "2024年8月12日",
        originalUrl: "https://example.com/footnote1"
      },
      {
        id: 2,
        source: "外務省の否定",
        country: "UKR",
        language: "uk",
        published: "2024年8月13日",
        originalUrl: "https://example.com/footnote2"
      },
      {
        id: 3,
        source: "調査報道",
        country: "FRA",
        language: "fr",
        published: "2024年8月20日",
        originalUrl: "https://example.com/footnote3"
      },
      {
        id: 4,
        source: "独立調査機関年次報告",
        country: "GBR",
        language: "en",
        published: "2023年12月1日",
        originalUrl: "https://example.com/footnote4"
      }
    ],
    quickFacts: [
      { label: "断交発表", value: "2024年8月" },
      { label: "争点", value: "支援の有無 / 出所 / 横流しの有無" }
    ]
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
    imageUrl: articleImage,
    trending: false,
    ideology: { liberal: 40, neutral: 50, conservative: 10 },
    publishedDate: "2024年10月15日",
    lastUpdated: "2024年11月1日",
    readTime: "6分",
    author: "佐藤 健二",
    comparisonView: [
      {
        source: "製薬会社A",
        confidence: "high" as const,
        claim: "85%の有効性が確認された",
        supportingEvidence: [
          "第三相臨床試験データ [ClinicalTrials.gov]",
          "査読済み医学論文 [NEJM]"
        ],
        counterEvidence: [
          "長期データ不足の指摘 [FDA Review]"
        ]
      },
      {
        source: "独立研究機関B",
        confidence: "medium" as const,
        claim: "重篤な副作用は限定的",
        supportingEvidence: [
          "有害事象報告書 [Phase 3 Data]"
        ],
        counterEvidence: [
          "長期追跡調査が未完了 [WHO]"
        ]
      }
    ],
    unverifiedItems: [
      "5年以上の長期的な安全性データ",
      "特定の基礎疾患患者への影響"
    ],
    timeline: [
      { date: "2024年6月1日", event: "第三相試験開始", type: "event" as const, reference: "1" },
      { date: "2024年10月15日", event: "中間結果発表", type: "report" as const, reference: "2" },
      { date: "2024年11月1日", event: "査読論文公開", type: "report" as const, reference: "3" }
    ],
    editorialLog: [
      { date: "2024年10月15日", action: "create", note: "初版公開" },
      { date: "2024年11月1日", action: "update", note: "査読論文情報追加" }
    ],
    coiFunding: {
      donors: ["医学研究財団"],
      adRevenue: false
    },
    aiUsage: {
      summary: 50,
      body: 0,
      tools: ["LLM-Medical", "Stats-Analyzer"]
    },
    footnotes: [
      {
        id: 1,
        source: "臨床試験登録",
        country: "USA",
        language: "en",
        published: "2024年6月1日",
        originalUrl: "https://example.com/footnote1"
      },
      {
        id: 2,
        source: "中間結果報告",
        country: "JPN",
        language: "ja",
        published: "2024年10月15日",
        originalUrl: "https://example.com/footnote2"
      },
      {
        id: 3,
        source: "医学論文",
        country: "USA",
        language: "en",
        published: "2024年11月1日",
        originalUrl: "https://example.com/footnote3"
      }
    ],
    quickFacts: [
      { label: "有効性", value: "85%" },
      { label: "試験参加者", value: "30,000人" },
      { label: "試験期間", value: "6ヶ月（継続中）" }
    ]
  },
  {
    id: "3",
    title: "SNSで拡散中の情報について検証が進行中",
    summary: "複数のアカウントから同時投稿された情報について、一次ソースの確認と事実関係の検証を実施中。現時点では確証が得られていない。",
    source: "ソーシャルメディア監視",
    verificationLevel: "unverified" as const,
    c2pa: false,
    timestamp: "1時間前",
    imageUrl: articleImage,
    ideology: { liberal: 30, neutral: 55, conservative: 15 },
    publishedDate: "2024年11月1日",
    lastUpdated: "2024年11月1日",
    readTime: "4分",
    author: "検証チーム",
    comparisonView: [
      {
        source: "SNS投稿分析",
        confidence: "low" as const,
        claim: "協調的な拡散パターンが存在",
        supportingEvidence: [
          "同時刻投稿の検出 [SNS Analytics]",
          "テキスト類似度95% [NLP Analysis]"
        ],
        counterEvidence: [
          "一次ソース未特定",
          "公式発表なし"
        ]
      },
      {
        source: "ファクトチェック機関",
        confidence: "low" as const,
        claim: "内容の真偽は不明",
        supportingEvidence: [
          "継続調査中"
        ],
        counterEvidence: [
          "信頼できる証拠なし [FC Network]"
        ]
      }
    ],
    unverifiedItems: [
      "投稿内容の一次ソース",
      "拡散の意図・背景",
      "関連する公式声明"
    ],
    timeline: [
      { date: "2024年11月1日 09:00", event: "初回投稿確認", type: "event" as const, reference: "1" },
      { date: "2024年11月1日 12:00", event: "検証作業開始", type: "report" as const, reference: "2" },
      { date: "2024年11月1日 15:00", event: "拡散パターン分析完了", type: "report" as const, reference: "3" }
    ],
    editorialLog: [
      { date: "2024年11月1日", action: "create", note: "速報として公開" }
    ],
    coiFunding: {
      adRevenue: false
    },
    aiUsage: {
      summary: 40,
      body: 0,
      tools: ["NLP-Analyzer", "SNS-Monitor"]
    },
    footnotes: [
      {
        id: 1,
        source: "SNS投稿記録",
        country: "MULTI",
        language: "multi",
        published: "2024年11月1日",
        originalUrl: "https://example.com/footnote1"
      },
      {
        id: 2,
        source: "検証報告書",
        country: "JPN",
        language: "ja",
        published: "2024年11月1日",
        originalUrl: "https://example.com/footnote2"
      }
    ],
    quickFacts: [
      { label: "投稿数", value: "50以上" },
      { label: "検証状態", value: "継続中" },
      { label: "信頼度", value: "未確定" }
    ]
  },
  {
    id: "4",
    title: "経済政策の新たな転換点",
    summary: "中央銀行が金利政策を変更し、経済成長への新たなアプローチを打ち出した。市場への影響は今後数週間で明らかになる見込み。",
    source: "経済ニュース",
    verificationLevel: "verified" as const,
    c2pa: true,
    primarySourceUrl: "https://example.com/source4",
    timestamp: "3時間前",
    imageUrl: articleImage,
    ideology: { liberal: 25, neutral: 45, conservative: 30 },
    publishedDate: "2024年10月28日",
    lastUpdated: "2024年10月29日",
    readTime: "8分",
    author: "経済部 田中",
    comparisonView: [
      {
        source: "中央銀行",
        confidence: "high" as const,
        claim: "0.5%の利上げを実施",
        supportingEvidence: [
          "公式政策発表 [中銀HP]",
          "総裁記者会見 [Live]"
        ],
        counterEvidence: []
      },
      {
        source: "エコノミストA",
        confidence: "medium" as const,
        claim: "インフレ抑制に効果的",
        supportingEvidence: [
          "過去データ分析 [IMF Report]"
        ],
        counterEvidence: [
          "成長鈍化のリスク指摘 [World Bank]"
        ]
      },
      {
        source: "市場アナリスト",
        confidence: "medium" as const,
        claim: "市場への影響は限定的",
        supportingEvidence: [
          "事前織り込み済み [Market Watch]"
        ],
        counterEvidence: [
          "為替変動の可能性 [FX Analysis]"
        ]
      }
    ],
    unverifiedItems: [
      "長期的な経済成長への影響",
      "次回政策変更のタイミング"
    ],
    timeline: [
      { date: "2024年10月28日 14:00", event: "政策委員会決定", type: "event" as const, reference: "1" },
      { date: "2024年10月28日 15:30", event: "総裁記者会見", type: "report" as const, reference: "2" },
      { date: "2024年10月29日 09:00", event: "市場反応分析", type: "report" as const, reference: "3" }
    ],
    editorialLog: [
      { date: "2024年10月28日", action: "create", note: "速報公開" },
      { date: "2024年10月29日", action: "update", note: "市場反応追記" }
    ],
    coiFunding: {
      adRevenue: true
    },
    aiUsage: {
      summary: 30,
      body: 0,
      tools: ["Economic-AI"]
    },
    footnotes: [
      {
        id: 1,
        source: "中央銀行政策発表",
        country: "JPN",
        language: "ja",
        published: "2024年10月28日",
        originalUrl: "https://example.com/footnote1"
      },
      {
        id: 2,
        source: "総裁記者会見録",
        country: "JPN",
        language: "ja",
        published: "2024年10月28日",
        originalUrl: "https://example.com/footnote2"
      },
      {
        id: 3,
        source: "市場分析レポート",
        country: "JPN",
        language: "ja",
        published: "2024年10月29日",
        originalUrl: "https://example.com/footnote3"
      }
    ],
    quickFacts: [
      { label: "政策金利", value: "0.5%引き上げ" },
      { label: "実施日", value: "2024年11月1日" },
      { label: "目的", value: "インフレ抑制" }
    ]
  },
  {
    id: "5",
    title: "テクノロジー業界の最新動向",
    summary: "大手テック企業が新世代のAI技術を発表。この技術は業界に大きな変化をもたらすと予測されている。",
    source: "テクノロジー週刊",
    verificationLevel: "partial" as const,
    c2pa: false,
    timestamp: "6時間前",
    imageUrl: articleImage,
    ideology: { liberal: 45, neutral: 40, conservative: 15 },
    publishedDate: "2024年10月25日",
    lastUpdated: "2024年10月26日",
    readTime: "5分",
    author: "テック記者 鈴木",
    comparisonView: [
      {
        source: "テック企業X",
        confidence: "high" as const,
        claim: "処理速度が従来比3倍向上",
        supportingEvidence: [
          "技術発表会資料 [Company Blog]",
          "ベンチマークテスト結果 [Tech Review]"
        ],
        counterEvidence: [
          "独立検証は未実施"
        ]
      },
      {
        source: "業界アナリスト",
        confidence: "medium" as const,
        claim: "市場への影響は大きい",
        supportingEvidence: [
          "市場予測レポート [Gartner]"
        ],
        counterEvidence: [
          "競合技術の存在 [競合社発表]"
        ]
      }
    ],
    unverifiedItems: [
      "実環境での性能検証",
      "コスト効率の詳細",
      "プライバシー保護対策"
    ],
    timeline: [
      { date: "2024年10月25日 10:00", event: "技術発表会", type: "event" as const, reference: "1" },
      { date: "2024年10月25日 14:00", event: "デモンストレーション", type: "event" as const, reference: "2" },
      { date: "2024年10月26日", event: "業界反応まとめ", type: "report" as const, reference: "3" }
    ],
    editorialLog: [
      { date: "2024年10月25日", action: "create", note: "発表会レポート公開" },
      { date: "2024年10月26日", action: "update", note: "業界反応追加" }
    ],
    coiFunding: {
      donors: ["テック業界団体"],
      adRevenue: true
    },
    aiUsage: {
      summary: 55,
      body: 5,
      tools: ["GPT-4", "Tech-Analyzer"]
    },
    footnotes: [
      {
        id: 1,
        source: "企業プレスリリース",
        country: "USA",
        language: "en",
        published: "2024年10月25日",
        originalUrl: "https://example.com/footnote1"
      },
      {
        id: 2,
        source: "技術レビュー記事",
        country: "USA",
        language: "en",
        published: "2024年10月25日",
        originalUrl: "https://example.com/footnote2"
      }
    ],
    quickFacts: [
      { label: "性能向上", value: "従来比3倍" },
      { label: "リリース予定", value: "2025年第1四半期" },
      { label: "対象市場", value: "エンタープライズ" }
    ]
  },
  {
    id: "6",
    title: "教育制度改革の新提案",
    summary: "教育省が新たなカリキュラム改革案を発表。学生の創造性と批判的思考を重視する内容となっている。",
    source: "教育新聞",
    verificationLevel: "verified" as const,
    c2pa: true,
    primarySourceUrl: "https://example.com/source6",
    timestamp: "8時間前",
    imageUrl: articleImage,
    ideology: { liberal: 50, neutral: 35, conservative: 15 },
    publishedDate: "2024年10月20日",
    lastUpdated: "2024年10月22日",
    readTime: "7分",
    author: "教育部 山田",
    comparisonView: [
      {
        source: "教育省",
        confidence: "high" as const,
        claim: "創造性重視の新カリキュラム",
        supportingEvidence: [
          "公式発表資料 [文科省HP]",
          "審議会答申 [中教審]"
        ],
        counterEvidence: []
      },
      {
        source: "教育学者A",
        confidence: "high" as const,
        claim: "グローバルスタンダードに合致",
        supportingEvidence: [
          "OECD教育レポート [PISA]",
          "先進国比較分析 [研究論文]"
        ],
        counterEvidence: []
      },
      {
        source: "教員団体",
        confidence: "medium" as const,
        claim: "現場への影響は大きい",
        supportingEvidence: [
          "実施に課題あり [教組声明]"
        ],
        counterEvidence: [
          "段階的導入で対応可能 [文科省]"
        ]
      }
    ],
    unverifiedItems: [
      "具体的な実施スケジュール",
      "教員研修の詳細計画",
      "予算措置の規模"
    ],
    timeline: [
      { date: "2024年10月20日", event: "改革案発表", type: "event" as const, reference: "1" },
      { date: "2024年10月21日", event: "意見公募開始", type: "event" as const, reference: "2" },
      { date: "2024年10月22日", event: "専門家コメント集約", type: "report" as const, reference: "3" }
    ],
    editorialLog: [
      { date: "2024年10月20日", action: "create", note: "発表速報" },
      { date: "2024年10月22日", action: "update", note: "専門家意見追加" }
    ],
    coiFunding: {
      adRevenue: false
    },
    aiUsage: {
      summary: 35,
      body: 0,
      tools: ["Education-AI"]
    },
    footnotes: [
      {
        id: 1,
        source: "教育省発表資料",
        country: "JPN",
        language: "ja",
        published: "2024年10月20日",
        originalUrl: "https://example.com/footnote1"
      },
      {
        id: 2,
        source: "中央教育審議会答申",
        country: "JPN",
        language: "ja",
        published: "2024年10月20日",
        originalUrl: "https://example.com/footnote2"
      },
      {
        id: 3,
        source: "教育学会声明",
        country: "JPN",
        language: "ja",
        published: "2024年10月22日",
        originalUrl: "https://example.com/footnote3"
      }
    ],
    quickFacts: [
      { label: "実施予定", value: "2025年度から段階的" },
      { label: "対象", value: "小中高校" },
      { label: "重点", value: "創造性・批判的思考" }
    ]
  },
  {
    id: "7",
    title: "環境保護の新たな取り組み",
    summary: "複数の企業が環境保護のための新たなイニシアチブを開始。持続可能な未来への重要な一歩となる。",
    source: "環境時報",
    verificationLevel: "verified" as const,
    c2pa: false,
    timestamp: "12時間前",
    imageUrl: articleImage,
    ideology: { liberal: 55, neutral: 30, conservative: 15 },
    publishedDate: "2024年10月18日",
    lastUpdated: "2024年10月19日",
    readTime: "6分",
    author: "環境記者 伊藤",
    comparisonView: [
      {
        source: "参加企業連合",
        confidence: "high" as const,
        claim: "2050年カーボンニュートラル達成",
        supportingEvidence: [
          "共同声明 [企業連合]",
          "ロードマップ公開 [公式HP]"
        ],
        counterEvidence: []
      },
      {
        source: "環境NGO",
        confidence: "medium" as const,
        claim: "実効性には疑問も",
        supportingEvidence: [
          "過去の達成率分析 [NGO Report]"
        ],
        counterEvidence: [
          "今回は具体的目標設定 [企業側]"
        ]
      },
      {
        source: "政府環境局",
        confidence: "high" as const,
        claim: "政策目標と整合",
        supportingEvidence: [
          "環境基本計画 [環境省]"
        ],
        counterEvidence: []
      }
    ],
    unverifiedItems: [
      "具体的な投資額",
      "年次進捗の報告方法",
      "中間目標の達成可能性"
    ],
    timeline: [
      { date: "2024年10月18日", event: "イニシアチブ発表", type: "event" as const, reference: "1" },
      { date: "2024年10月18日", event: "共同記者会見", type: "event" as const, reference: "2" },
      { date: "2024年10月19日", event: "専門家評価公開", type: "report" as const, reference: "3" }
    ],
    editorialLog: [
      { date: "2024年10月18日", action: "create", note: "発表レポート" },
      { date: "2024年10月19日", action: "update", note: "専門家評価追加" }
    ],
    coiFunding: {
      donors: ["環境保護基金"],
      adRevenue: false
    },
    aiUsage: {
      summary: 40,
      body: 0,
      tools: ["Environment-AI"]
    },
    footnotes: [
      {
        id: 1,
        source: "企業連合共同声明",
        country: "JPN",
        language: "ja",
        published: "2024年10月18日",
        originalUrl: "https://example.com/footnote1"
      },
      {
        id: 2,
        source: "環境NGO評価レポート",
        country: "JPN",
        language: "ja",
        published: "2024年10月19日",
        originalUrl: "https://example.com/footnote2"
      },
      {
        id: 3,
        source: "環境省コメント",
        country: "JPN",
        language: "ja",
        published: "2024年10月19日",
        originalUrl: "https://example.com/footnote3"
      }
    ],
    quickFacts: [
      { label: "参加企業", value: "10社" },
      { label: "目標年", value: "2050年" },
      { label: "目標", value: "カーボンニュートラル" }
    ]
  },
  {
    id: "8",
    title: "医療技術の画期的進展",
    summary: "新しい医療技術が臨床試験で高い有効性を示した。多くの患者にとって希望となる可能性がある。",
    source: "医療ニュース",
    verificationLevel: "partial" as const,
    c2pa: true,
    primarySourceUrl: "https://example.com/source8",
    timestamp: "1日前",
    imageUrl: articleImage,
    ideology: { liberal: 38, neutral: 48, conservative: 14 },
    publishedDate: "2024年10月15日",
    lastUpdated: "2024年10月16日",
    readTime: "7分",
    author: "医療記者 渡辺",
    comparisonView: [
      {
        source: "研究チーム",
        confidence: "high" as const,
        claim: "従来治療の2倍の効果",
        supportingEvidence: [
          "臨床試験結果 [Medical Journal]",
          "患者データ分析 [Hospital Report]"
        ],
        counterEvidence: [
          "長期効果は未検証"
        ]
      },
      {
        source: "医療機関B",
        confidence: "medium" as const,
        claim: "実用化には時間が必要",
        supportingEvidence: [
          "追加試験が必要 [規制当局]"
        ],
        counterEvidence: [
          "早期承認の可能性 [研究側]"
        ]
      }
    ],
    unverifiedItems: [
      "実用化時期",
      "治療費用",
      "保険適用の見通し"
    ],
    timeline: [
      { date: "2024年10月15日", event: "試験結果発表", type: "event" as const, reference: "1" },
      { date: "2024年10月15日", event: "記者会見", type: "event" as const, reference: "2" },
      { date: "2024年10月16日", event: "専門家評価", type: "report" as const, reference: "3" }
    ],
    editorialLog: [
      { date: "2024年10月15日", action: "create", note: "試験結果速報" },
      { date: "2024年10月16日", action: "update", note: "専門家コメント追加" }
    ],
    coiFunding: {
      donors: ["医療研究基金"],
      adRevenue: false
    },
    aiUsage: {
      summary: 45,
      body: 0,
      tools: ["Medical-AI"]
    },
    footnotes: [
      {
        id: 1,
        source: "医学論文",
        country: "USA",
        language: "en",
        published: "2024年10月15日",
        originalUrl: "https://example.com/footnote1"
      },
      {
        id: 2,
        source: "病院プレスリリース",
        country: "JPN",
        language: "ja",
        published: "2024年10月15日",
        originalUrl: "https://example.com/footnote2"
      },
      {
        id: 3,
        source: "医学会評価",
        country: "JPN",
        language: "ja",
        published: "2024年10月16日",
        originalUrl: "https://example.com/footnote3"
      }
    ],
    quickFacts: [
      { label: "効果", value: "従来比2倍" },
      { label: "対象疾患", value: "特定の難病" },
      { label: "試験段階", value: "第二相完了" }
    ]
  },
  {
    id: "9",
    title: "国際協力の新展開",
    summary: "複数の国が新たな国際協力プロジェクトに合意。グローバルな課題解決への重要なステップ。",
    source: "国際ニュース",
    verificationLevel: "verified" as const,
    c2pa: false,
    timestamp: "2日前",
    imageUrl: articleImage,
    ideology: { liberal: 42, neutral: 40, conservative: 18 },
    publishedDate: "2024年10月10日",
    lastUpdated: "2024年10月11日",
    readTime: "6分",
    author: "国際部 加藤",
    comparisonView: [
      {
        source: "参加国政府",
        confidence: "high" as const,
        claim: "15カ国が新協定に署名",
        supportingEvidence: [
          "共同声明 [外務省]",
          "署名式典映像 [国際会議]"
        ],
        counterEvidence: []
      },
      {
        source: "国際機関A",
        confidence: "high" as const,
        claim: "重要な一歩",
        supportingEvidence: [
          "事務総長声明 [UN]",
          "専門家評価 [Think Tank]"
        ],
        counterEvidence: []
      },
      {
        source: "アナリストB",
        confidence: "medium" as const,
        claim: "実施には課題も",
        supportingEvidence: [
          "過去の協定分析 [Research]"
        ],
        counterEvidence: [
          "今回は具体的メカニズムあり [参加国]"
        ]
      }
    ],
    unverifiedItems: [
      "具体的な予算規模",
      "実施体制の詳細",
      "達成指標の設定"
    ],
    timeline: [
      { date: "2024年10月10日", event: "国際会議開催", type: "event" as const, reference: "1" },
      { date: "2024年10月10日", event: "協定署名", type: "event" as const, reference: "2" },
      { date: "2024年10月11日", event: "各国反応まとめ", type: "report" as const, reference: "3" }
    ],
    editorialLog: [
      { date: "2024年10月10日", action: "create", note: "署名式典速報" },
      { date: "2024年10月11日", action: "update", note: "国際反応追加" }
    ],
    coiFunding: {
      adRevenue: false
    },
    aiUsage: {
      summary: 35,
      body: 0,
      tools: ["International-AI"]
    },
    footnotes: [
      {
        id: 1,
        source: "共同声明文",
        country: "MULTI",
        language: "multi",
        published: "2024年10月10日",
        originalUrl: "https://example.com/footnote1"
      },
      {
        id: 2,
        source: "国際機関報告",
        country: "USA",
        language: "en",
        published: "2024年10月10日",
        originalUrl: "https://example.com/footnote2"
      },
      {
        id: 3,
        source: "各国外務省声明",
        country: "MULTI",
        language: "multi",
        published: "2024年10月11日",
        originalUrl: "https://example.com/footnote3"
      }
    ],
    quickFacts: [
      { label: "参加国", value: "15カ国" },
      { label: "署名日", value: "2024年10月10日" },
      { label: "発効予定", value: "2025年1月" }
    ]
  },
  {
    id: "10",
    title: "社会変革の新たな動き",
    summary: "社会変革を目指す新たな動きが各地で広がっている。若い世代が主導する変化の波が注目されている。",
    source: "社会時事",
    verificationLevel: "unverified" as const,
    c2pa: false,
    timestamp: "3日前",
    imageUrl: articleImage,
    ideology: { liberal: 60, neutral: 25, conservative: 15 },
    publishedDate: "2024年10月5日",
    lastUpdated: "2024年10月6日",
    readTime: "5分",
    author: "社会部 小林",
    comparisonView: [
      {
        source: "調査機関A",
        confidence: "medium" as const,
        claim: "若年層の意識変化が顕著",
        supportingEvidence: [
          "世論調査結果 [Survey Co.]",
          "SNS分析データ [Analytics]"
        ],
        counterEvidence: [
          "サンプル数に限界 [統計的課題]"
        ]
      },
      {
        source: "社会学者B",
        confidence: "low" as const,
        claim: "社会構造への影響は大きい",
        supportingEvidence: [
          "過去の事例分析 [研究論文]"
        ],
        counterEvidence: [
          "現時点では予測困難 [専門家C]"
        ]
      }
    ],
    unverifiedItems: [
      "運動の継続性",
      "具体的な成果の実現性",
      "社会への実質的影響度"
    ],
    timeline: [
      { date: "2024年10月5日", event: "各地で集会開催", type: "event" as const, reference: "1" },
      { date: "2024年10月5日", event: "SNSでトレンド化", type: "event" as const, reference: "2" },
      { date: "2024年10月6日", event: "専門家分析公開", type: "report" as const, reference: "3" }
    ],
    editorialLog: [
      { date: "2024年10月5日", action: "create", note: "動向レポート" },
      { date: "2024年10月6日", action: "update", note: "専門家見解追加" }
    ],
    coiFunding: {
      adRevenue: true
    },
    aiUsage: {
      summary: 50,
      body: 10,
      tools: ["Social-AI", "Trend-Analyzer"]
    },
    footnotes: [
      {
        id: 1,
        source: "現地レポート",
        country: "JPN",
        language: "ja",
        published: "2024年10月5日",
        originalUrl: "https://example.com/footnote1"
      },
      {
        id: 2,
        source: "SNS分析レポート",
        country: "JPN",
        language: "ja",
        published: "2024年10月5日",
        originalUrl: "https://example.com/footnote2"
      },
      {
        id: 3,
        source: "社会学専門誌",
        country: "JPN",
        language: "ja",
        published: "2024年10月6日",
        originalUrl: "https://example.com/footnote3"
      }
    ],
    quickFacts: [
      { label: "参加地域", value: "全国10都市以上" },
      { label: "中心世代", value: "20-30代" },
      { label: "検証状態", value: "継続観察中" }
    ]
  },
];

interface DiscoverViewProps {
  onTabChange?: (tab: string) => void;
}

export const DiscoverView = ({ onTabChange }: DiscoverViewProps = {}) => {
  const [selectedArticle, setSelectedArticle] = useState<typeof mockNews[0] | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [keywordDialogOpen, setKeywordDialogOpen] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [activeDiscoverTab, setActiveDiscoverTab] = useState("world");
  const { isSubscribed } = useSubscription();
  const { language, t } = useLanguage();
  const { keywords, favoriteArticles } = useFavorites();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (value: string) => {
    setActiveDiscoverTab(value);
    if (onTabChange) {
      onTabChange(value);
    }
  };

  const handleScrollDown = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollBy({
          top: 300,
          behavior: 'smooth'
        });
      }
    }
  };

  // Handle keyword timeline view
  if (selectedKeyword) {
    return (
      <KeywordTimelineView 
        keyword={selectedKeyword}
        onBack={() => setSelectedKeyword(null)}
      />
    );
  }

  if (selectedArticle) {
    return (
      <ArticleDetailView 
        article={selectedArticle} 
        onBack={() => setSelectedArticle(null)} 
      />
    );
  }

  // Filter articles based on favorites
  const favoriteNews = mockNews.filter(article => 
    favoriteArticles.some(fav => fav.articleId === article.id)
  );

  // Display logic: show 3 initially, or all if "View More" is clicked
  const displayedArticles = showAll ? mockNews : mockNews.slice(0, 3);
  const hasMoreArticles = mockNews.length > 3 && !showAll;

  return (
    <div className="container mx-auto px-4 py-6">
      <Tabs value={activeDiscoverTab} onValueChange={handleTabChange} className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="world">{t("tabs.world")}</TabsTrigger>
            <TabsTrigger value="favorites">{t("tabs.favorites")}</TabsTrigger>
          </TabsList>

          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("discover.search")}
              className="pl-10 w-full md:w-64"
            />
          </div>
        </div>

        <TabsContent value="world" className="relative">
          <div className="h-[600px] flex flex-col relative" ref={scrollAreaRef}>
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {displayedArticles.map((news) => (
                  <NewsCard 
                    key={news.id} 
                    {...news} 
                    onClick={() => setSelectedArticle(news)}
                  />
                ))}
                {hasMoreArticles && (
                  <div className="flex items-center justify-center py-4">
                    <MoreHorizontal className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            </ScrollArea>
            {hasMoreArticles && (
              <div className="pt-4 border-t flex justify-center">
                <Button 
                  onClick={() => setShowAll(true)}
                  variant="outline"
                  className="hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-colors"
                >
                  {t("discover.viewMore")}
                </Button>
              </div>
            )}
          </div>
          {/* Scroll down button - SP mode only */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 md:hidden z-10">
            <Button
              onClick={handleScrollDown}
              variant="ghost"
              size="icon"
              className="rounded-full bg-white hover:bg-gray-50 active:bg-white focus:bg-white focus-visible:outline-none h-20 w-20 border-none shadow-none transition-none"
              style={{ backgroundColor: 'white' }}
              aria-label="Scroll down"
            >
              <ChevronDown className="h-8 w-8" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <div className="h-[600px] flex flex-col">
            <ScrollArea className="flex-1 pr-4">
              <>
                {/* Keywords Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      {t("") || (language === "en" ? "Your Keywords" : "登録キーワード")}
                    </h3>
                    <Button onClick={() => setKeywordDialogOpen(true)}>
                      {t("") || (language === "en" ? "Manage Keywords" : "キーワード管理")}
                    </Button>
                  </div>
                  {keywords.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {keywords.map((kw) => (
                        <Badge
                          key={kw.id}
                          variant="secondary"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => setSelectedKeyword(kw.text)}
                        >
                          {kw.text}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {language === "en" 
                        ? "No keywords yet. Add some to track topics over time." 
                        : "キーワードがまだ登録されていません。トピックを時系列で追跡するには追加してください。"}
                    </p>
                  )}
                </div>

                {/* Favorite Articles Section */}
                <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-6 min-h-[400px] flex flex-col">
                  <h3 className="text-lg font-semibold mb-4 text-blue-900 dark:text-blue-100">
                    {t("") || (language === "en" ? "Saved Articles" : "保存した記事")}
                  </h3>
                  <div className="flex-1">
                    {favoriteNews.length > 0 ? (
                      <div className="space-y-4">
                        {favoriteNews.map((news) => (
                          <NewsCard
                            key={news.id}
                            {...news}
                            onClick={() => setSelectedArticle(news)}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 h-full flex items-center justify-center">
                        <p className="text-muted-foreground">
                          {language === "en" 
                            ? "No saved articles yet. Save articles by clicking the bookmark icon." 
                            : "保存した記事がまだありません。ブックマークアイコンをクリックして記事を保存してください。"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            </ScrollArea>
          </div>
        </TabsContent>
      </Tabs>
      
      <KeywordDialog 
        open={keywordDialogOpen} 
        onOpenChange={setKeywordDialogOpen}
      />
    </div>
  );
};
