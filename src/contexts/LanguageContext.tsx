import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ja";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    "header.title": "The Truth",
    "header.save": "Save",
    "header.share": "Share",
    "header.settings": "Feed Settings",
    "header.login": "Login",
    "header.logout": "Logout",
    "header.language": "English",
    
    // Hero Banner
    "banner.title": "Verify the Truth",
    "banner.subtitle": "Transparent news verification for a trustworthy information ecosystem",
    
    // Footer
    "footer.description": "Leading the way in transparent news verification and credible journalism. Building trust through evidence-based reporting.",
    "footer.quickLinks": "Quick Links",
    "footer.about": "About Us",
    "footer.howItWorks": "How It Works",
    "footer.verification": "Verification Process",
    "footer.careers": "Careers",
    "footer.resources": "Resources",
    "footer.guidelines": "Verification Guidelines",
    "footer.editorial": "Editorial Policy",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.contact": "Contact Us",
    "footer.copyright": "© 2024 The Truth. All rights reserved.",
    "footer.commitment": "Committed to transparency, accuracy, and journalistic integrity.",
    
    // Common
    "common.viewMore": "View More",
    "common.login": "Login",
    "common.logout": "Logout",
    
    // Login Dialog
    "login.title": "Login",
    "login.description": "Enter your credentials to access all features and content.",
    "login.email": "Email",
    "login.password": "Password",
    "login.emailPlaceholder": "your@email.com",
    "login.passwordPlaceholder": "••••••••",
    "login.error": "Invalid email or password. Please try again.",
    "login.errorGeneric": "An error occurred. Please try again.",
    "login.loggingIn": "Logging in...",
    
    // Tabs
    "tabs.discover": "Discover",
    "tabs.verify": "Verify",
    "tabs.world": "World",
    "tabs.favorites": "Favorites",
    
    // Discover View
    "discover.search": "Search by keyword...",
    "discover.limited": "You're viewing limited information.",
    "discover.loginPrompt": "to access all content, detailed articles, and verification details.",
    "discover.loginToView": "Login to view more articles and access detailed information",
    "discover.favoritesEmpty": "Login to save and personalize your favorite topics",
    "discover.addKeyword": "Add Keyword",
    "discover.viewMore": "View More",
    
    // Verify View
    "verify.title": "Verification Queue",
    "verify.subtitle": "Manage claims and evidence workflow",
    "verify.loginRequired": "Login required to access verification queue and detailed verification tools.",
    "verify.preview": "Verification Queue (Preview)",
    "verify.previewMessage": "Login to access the verification queue and manage verification workflows",
    "verify.previewNote": "This feature allows you to track claims, evidence, and verification status",
    "verify.cases": "Verification Cases",
    "verify.addCase": "Add New Case",
    "verify.priority": "Priority",
    "verify.claim": "Claim",
    "verify.evidence": "Evidence",
    "verify.assignee": "Assignee",
    "verify.status": "Status",
    "verify.actions": "Actions",
    "verify.details": "Details",
    "verify.timeline": "Timeline Reconstruction",
    "verify.timelineDesc": "Track timeline from emergence → reaction → correction → counter/confirmation",
    "verify.createTimeline": "Create Timeline",
    "verify.coordinated": "Coordinated Spread Map",
    "verify.coordinatedDesc": "Detect simultaneous posting, template reuse, image similarity",
    "verify.analyzePattern": "Analyze Pattern",
    
    // Testimonials
    "testimonials.title": "Trusted by Industry Leaders",
    "testimonials.subtitle": "Hear from journalists, editors, and media professionals who rely on The Truth for verified news and transparent information.",
    "testimonials.sectionTitle": "Customer Testimonials",
    "testimonials.sectionDesc": "Scroll through testimonials from our valued customers",
    
    // Article Detail
    "article.back": "Back",
    "article.save": "Save",
    "article.share": "Share",
    "article.published": "Published",
    "article.lastUpdated": "Last updated",
    "article.readTime": "Read time",
    "article.author": "Author",
    "article.correction": "Correction/Update",
    "article.update": "Update",
    "article.difference": "Difference",
  },
  ja: {
    // Header
    "header.title": "ザ・トゥルース",
    "header.save": "保存",
    "header.share": "共有",
    "header.settings": "フィード設定",
    "header.login": "ログイン",
    "header.logout": "ログアウト",
    "header.language": "日本語",
    
    // Hero Banner
    "banner.title": "真実を検証する",
    "banner.subtitle": "信頼できる情報エコシステムのための透明なニュース検証",
    
    // Footer
    "footer.description": "透明なニュース検証と信頼できるジャーナリズムの先駆け。証拠に基づく報道を通じて信頼を構築。",
    "footer.quickLinks": "クイックリンク",
    "footer.about": "私たちについて",
    "footer.howItWorks": "仕組み",
    "footer.verification": "検証プロセス",
    "footer.careers": "採用情報",
    "footer.resources": "リソース",
    "footer.guidelines": "検証ガイドライン",
    "footer.editorial": "編集方針",
    "footer.privacy": "プライバシーポリシー",
    "footer.terms": "利用規約",
    "footer.contact": "お問い合わせ",
    "footer.copyright": "© 2024 ザ・トゥルース。全著作権所有。",
    "footer.commitment": "透明性、正確性、ジャーナリズムの誠実さにコミットしています。",
    
    // Common
    "common.viewMore": "もっと見る",
    "common.login": "ログイン",
    "common.logout": "ログアウト",
    
    // Login Dialog
    "login.title": "ログイン",
    "login.description": "すべての機能とコンテンツにアクセスするには、認証情報を入力してください。",
    "login.email": "メールアドレス",
    "login.password": "パスワード",
    "login.emailPlaceholder": "your@email.com",
    "login.passwordPlaceholder": "••••••••",
    "login.error": "メールアドレスまたはパスワードが無効です。もう一度お試しください。",
    "login.errorGeneric": "エラーが発生しました。もう一度お試しください。",
    "login.loggingIn": "ログイン中...",
    
    // Tabs
    "tabs.discover": "発見",
    "tabs.verify": "検証",
    "tabs.world": "世の中",
    "tabs.favorites": "お気に入り",
    
    // Discover View
    "discover.search": "キーワードで検索...",
    "discover.limited": "限られた情報を表示しています。",
    "discover.loginPrompt": "すべてのコンテンツ、詳細記事、検証詳細にアクセスするには",
    "discover.loginToView": "ログインしてさらに記事を表示し、詳細情報にアクセス",
    "discover.favoritesEmpty": "お気に入りのトピックを登録してパーソナライズしましょう",
    "discover.addKeyword": "キーワードを追加",
    "discover.viewMore": "もっと見る",
    
    // Verify View
    "verify.title": "検証キュー",
    "verify.subtitle": "検証が必要な主張と証拠をワークフローで管理",
    "verify.loginRequired": "検証キューと詳細な検証ツールにアクセスするにはログインが必要です。",
    "verify.preview": "検証キュー（プレビュー）",
    "verify.previewMessage": "ログインして検証キューにアクセスし、検証ワークフローを管理",
    "verify.previewNote": "この機能では、主張、証拠、検証ステータスを追跡できます",
    "verify.cases": "検証案件",
    "verify.addCase": "新規案件を追加",
    "verify.priority": "優先度",
    "verify.claim": "主張",
    "verify.evidence": "根拠まとめ",
    "verify.assignee": "担当",
    "verify.status": "状態",
    "verify.actions": "操作",
    "verify.details": "詳細",
    "verify.timeline": "タイムライン・リコンストラクション",
    "verify.timelineDesc": "出現 → 反応 → 訂正 → 反証/確証 までの時系列を追跡",
    "verify.createTimeline": "タイムラインを作成",
    "verify.coordinated": "協調拡散マップ",
    "verify.coordinatedDesc": "一斉投稿、テンプレ再利用、画像類似性を検出",
    "verify.analyzePattern": "拡散パターンを分析",
    
    // Testimonials
    "testimonials.title": "業界リーダーから信頼されています",
    "testimonials.subtitle": "検証されたニュースと透明な情報のためにThe Truthを利用しているジャーナリスト、編集者、メディア専門家の声をお聞きください。",
    "testimonials.sectionTitle": "お客様の声",
    "testimonials.sectionDesc": "お客様からのお客様の声をスクロール",
    
    // Article Detail
    "article.back": "戻る",
    "article.save": "保存",
    "article.share": "共有",
    "article.published": "公開",
    "article.lastUpdated": "最終更新",
    "article.readTime": "読了",
    "article.author": "著者",
    "article.correction": "訂正/更新",
    "article.update": "更新",
    "article.difference": "差分",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("ja");

  const t = (key: string): string => {
    const langTranslations = translations[language] as Record<string, string>;
    return langTranslations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

