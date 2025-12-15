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
    "header.subscribe": "Subscribe",
    "header.search": "Search",
    
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
    
    // Subscription
    "subscription.title": "Choose Your Plan",
    "subscription.subtitle": "Unlock the power of AI-powered search with our flexible subscription plans",
    "subscription.plan.vantage": "Vantage",
    "subscription.plan.premium": "Premium",
    "subscription.plan.pro": "Pro",
    "subscription.plan.perMonth": "per month",
    "subscription.plan.vantageDesc": "Perfect for individuals getting started with AI-powered search. Access to core search features and basic result analysis.",
    "subscription.plan.premiumDesc": "Ideal for professionals and researchers. Advanced search capabilities with detailed analysis and priority support.",
    "subscription.plan.proDesc": "For teams and enterprises requiring the most comprehensive search solution with full customization and dedicated support.",
    "subscription.plan.mostPopular": "Most Popular",
    "subscription.plan.subscribeNow": "Subscribe Now",
    "subscription.plan.feature.basicSearch": "Basic AI search functionality",
    "subscription.plan.feature.100Searches": "Up to 100 searches per month",
    "subscription.plan.feature.standardDisplay": "Standard result display",
    "subscription.plan.feature.emailSupport": "Email support",
    "subscription.plan.feature.basicAnalytics": "Basic analytics",
    "subscription.plan.feature.advancedSearch": "Advanced AI search functionality",
    "subscription.plan.feature.unlimitedSearches": "Unlimited searches",
    "subscription.plan.feature.enhancedAnalysis": "Enhanced result analysis",
    "subscription.plan.feature.prioritySupport": "Priority email support",
    "subscription.plan.feature.advancedAnalytics": "Advanced analytics & insights",
    "subscription.plan.feature.exportResults": "Export search results",
    "subscription.plan.feature.apiAccess": "API access (limited)",
    "subscription.plan.feature.enterpriseSearch": "Enterprise AI search functionality",
    "subscription.plan.feature.customConfig": "Custom search configurations",
    "subscription.plan.feature.dedicatedSupport": "Dedicated support team",
    "subscription.plan.feature.enterpriseDashboard": "Enterprise analytics dashboard",
    "subscription.plan.feature.bulkExport": "Bulk export capabilities",
    "subscription.plan.feature.fullApiAccess": "Full API access",
    "subscription.plan.feature.customIntegrations": "Custom integrations",
    "subscription.plan.feature.teamCollaboration": "Team collaboration tools",
    "subscription.faq.title": "Frequently Asked Questions",
    "subscription.faq.paymentMethods": "What payment methods do you accept?",
    "subscription.faq.paymentMethodsAnswer": "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans. All payments are processed securely through our payment partners.",
    "subscription.faq.changePlan": "Can I change my plan later?",
    "subscription.faq.changePlanAnswer": "Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll immediately gain access to the new features. When you downgrade, changes will take effect at the end of your current billing cycle.",
    "subscription.faq.freeTrial": "Is there a free trial available?",
    "subscription.faq.freeTrialAnswer": "Yes! We offer a 7-day free trial for all plans. You can cancel anytime during the trial period without being charged. No credit card required to start your trial.",
    "subscription.faq.exceedLimit": "What happens if I exceed my search limit?",
    "subscription.faq.exceedLimitAnswer": "If you're on the Vantage plan and exceed your monthly search limit, you'll be notified and can either upgrade to Premium for unlimited searches or wait until your limit resets the following month.",
    "subscription.faq.cancel": "How do I cancel my subscription?",
    "subscription.faq.cancelAnswer": "You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period, and you won't be charged for the next cycle.",
    "subscription.footer.legal": "Legal",
    "subscription.footer.terms": "Terms & Conditions",
    "subscription.footer.privacy": "Privacy Policy",
    "subscription.footer.support": "Support",
    "subscription.footer.contact": "Contact Support",
    "subscription.footer.help": "Help Center",
    "subscription.footer.about": "About",
    "subscription.footer.aboutDesc": "AI-powered search platform designed for professionals and researchers.",
    "subscription.footer.copyright": "© {year} The Truth. All rights reserved.",
    
    // Payment
    "payment.step.account": "1. Account",
    "payment.step.paymentDetails": "2. Payment Details",
    "payment.step.confirmation": "3. Confirmation",
    "payment.loggedInAs": "Logged in as",
    "payment.notYou": "Not you?",
    "payment.selectMethod": "Select Payment Method",
    "payment.orPayWithCard": "Or pay with card",
    "payment.billingInfo": "Enter your billing information",
    "payment.card": "Card",
    "payment.cardNumber": "Card number",
    "payment.cardNumberPlaceholder": "1234 1234 1234 1234",
    "payment.expirationDate": "Expiration date",
    "payment.expirationPlaceholder": "MM / YY",
    "payment.securityCode": "Security code",
    "payment.securityCodePlaceholder": "CVC",
    "payment.country": "Country",
    "payment.legalText1": "By providing your card information, you allow The Truth to charge your card for future payments in accordance with their terms.",
    "payment.legalText2": "This site is protected by reCAPTCHA Enterprise and the Google Privacy Policy and Terms of Service apply.",
    "payment.subscribeAndPay": "Subscribe & pay",
    "payment.processing": "Processing...",
    "payment.secureTransaction": "Secure transaction",
    "payment.plan": "Plan",
    "payment.perMonth": "/Month",
    "payment.billedAs": "Billed as",
    "payment.perYear": "/year",
    "payment.riseAbove": "Rise above the noise.",
    "payment.orderSummary": "Order Summary",
    "payment.item": "Item",
    "payment.total": "Total",
    "payment.subscription": "Subscription",
    "payment.allPricesUSD": "* All prices are in USD.",
    
    // Register
    "register.title": "Create Account",
    "register.description": "Enter your information to create a new account.",
    "register.uploadPhoto": "Upload Photo",
    "register.fullName": "Full Name",
    "register.fullNamePlaceholder": "Enter your full name",
    "register.dateOfBirth": "Date of Birth",
    "register.pickDate": "Pick a date",
    "register.confirmPassword": "Confirm Password",
    "register.creating": "Creating...",
    "register.createAccount": "Create Account",
    "register.alreadyHaveAccount": "Already have an account?",
    "register.passwordMismatch": "Passwords do not match.",
    "register.passwordTooShort": "Password must be at least 6 characters.",
    "register.photoTooLarge": "Photo size must be less than 5MB",
    "register.emailExists": "Email already exists. Please login instead.",
    "register.error": "An error occurred. Please try again.",
    "register.choosePlan": "Choose Your Plan",
    "register.selectPlan": "Select a subscription plan to unlock all features",
    "register.viewAllPlans": "View All Plans",
    
    // Login Page
    "loginPage.dontHaveAccount": "Don't have an account?",
    "loginPage.signUp": "Sign up",
    "loginPage.viewAllPlans": "View All Plans",
  },
  ja: {
    // Header
    "header.title": "The Truth",
    "header.save": "保存",
    "header.share": "共有",
    "header.settings": "フィード設定",
    "header.login": "ログイン",
    "header.logout": "ログアウト",
    "header.language": "日本語",
    "header.subscribe": "購読",
    "header.search": "検索",
    
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
    
    // Subscription
    "subscription.title": "プランを選択",
    "subscription.subtitle": "柔軟なサブスクリプションプランでAI検索の力を解放",
    "subscription.plan.vantage": "Vantage",
    "subscription.plan.premium": "Premium",
    "subscription.plan.pro": "Pro",
    "subscription.plan.perMonth": "月額",
    "subscription.plan.vantageDesc": "AI検索を始める個人に最適。コア検索機能と基本的な結果分析にアクセスできます。",
    "subscription.plan.premiumDesc": "プロフェッショナルや研究者に最適。詳細な分析と優先サポートを備えた高度な検索機能。",
    "subscription.plan.proDesc": "完全なカスタマイズと専任サポートを備えた最も包括的な検索ソリューションを必要とするチームや企業向け。",
    "subscription.plan.mostPopular": "最も人気",
    "subscription.plan.subscribeNow": "今すぐ購読",
    "subscription.plan.feature.basicSearch": "基本的なAI検索機能",
    "subscription.plan.feature.100Searches": "月100回までの検索",
    "subscription.plan.feature.standardDisplay": "標準的な結果表示",
    "subscription.plan.feature.emailSupport": "メールサポート",
    "subscription.plan.feature.basicAnalytics": "基本的な分析",
    "subscription.plan.feature.advancedSearch": "高度なAI検索機能",
    "subscription.plan.feature.unlimitedSearches": "無制限の検索",
    "subscription.plan.feature.enhancedAnalysis": "強化された結果分析",
    "subscription.plan.feature.prioritySupport": "優先メールサポート",
    "subscription.plan.feature.advancedAnalytics": "高度な分析とインサイト",
    "subscription.plan.feature.exportResults": "検索結果のエクスポート",
    "subscription.plan.feature.apiAccess": "APIアクセス（制限付き）",
    "subscription.plan.feature.enterpriseSearch": "エンタープライズAI検索機能",
    "subscription.plan.feature.customConfig": "カスタム検索設定",
    "subscription.plan.feature.dedicatedSupport": "専任サポートチーム",
    "subscription.plan.feature.enterpriseDashboard": "エンタープライズ分析ダッシュボード",
    "subscription.plan.feature.bulkExport": "一括エクスポート機能",
    "subscription.plan.feature.fullApiAccess": "完全なAPIアクセス",
    "subscription.plan.feature.customIntegrations": "カスタム統合",
    "subscription.plan.feature.teamCollaboration": "チームコラボレーションツール",
    "subscription.faq.title": "よくある質問",
    "subscription.faq.paymentMethods": "どのような支払い方法を受け付けていますか？",
    "subscription.faq.paymentMethodsAnswer": "主要なクレジットカード（Visa、MasterCard、American Express）、PayPal、および年間プランの銀行振込を受け付けています。すべての支払いは、当社の決済パートナーを通じて安全に処理されます。",
    "subscription.faq.changePlan": "後でプランを変更できますか？",
    "subscription.faq.changePlanAnswer": "はい、いつでもプランをアップグレードまたはダウングレードできます。アップグレードすると、すぐに新機能にアクセスできます。ダウングレードすると、変更は現在の請求サイクルの終了時に有効になります。",
    "subscription.faq.freeTrial": "無料トライアルはありますか？",
    "subscription.faq.freeTrialAnswer": "はい！すべてのプランで7日間の無料トライアルを提供しています。トライアル期間中はいつでもキャンセルでき、料金はかかりません。トライアルを開始するためにクレジットカードは必要ありません。",
    "subscription.faq.exceedLimit": "検索制限を超えた場合はどうなりますか？",
    "subscription.faq.exceedLimitAnswer": "Vantageプランで月間検索制限を超えた場合、通知され、無制限検索のためにPremiumにアップグレードするか、翌月に制限がリセットされるまで待つことができます。",
    "subscription.faq.cancel": "サブスクリプションをキャンセルするにはどうすればよいですか？",
    "subscription.faq.cancelAnswer": "アカウント設定からいつでもサブスクリプションをキャンセルできます。アクセスは現在の請求期間の終了まで継続し、次のサイクルに請求されることはありません。",
    "subscription.footer.legal": "法的情報",
    "subscription.footer.terms": "利用規約",
    "subscription.footer.privacy": "プライバシーポリシー",
    "subscription.footer.support": "サポート",
    "subscription.footer.contact": "サポートに連絡",
    "subscription.footer.help": "ヘルプセンター",
    "subscription.footer.about": "について",
    "subscription.footer.aboutDesc": "プロフェッショナルや研究者向けに設計されたAI検索プラットフォーム。",
    "subscription.footer.copyright": "© {year} ザ・トゥルース。全著作権所有。",
    
    // Payment
    "payment.step.account": "1. アカウント",
    "payment.step.paymentDetails": "2. 支払い詳細",
    "payment.step.confirmation": "3. 確認",
    "payment.loggedInAs": "ログイン中：",
    "payment.notYou": "違いますか？",
    "payment.selectMethod": "支払い方法を選択",
    "payment.orPayWithCard": "またはカードで支払う",
    "payment.billingInfo": "請求情報を入力",
    "payment.card": "カード",
    "payment.cardNumber": "カード番号",
    "payment.cardNumberPlaceholder": "1234 1234 1234 1234",
    "payment.expirationDate": "有効期限",
    "payment.expirationPlaceholder": "MM / YY",
    "payment.securityCode": "セキュリティコード",
    "payment.securityCodePlaceholder": "CVC",
    "payment.country": "国",
    "payment.legalText1": "カード情報を提供することで、The Truthがその規約に従って将来の支払いをカードに請求することを許可します。",
    "payment.legalText2": "このサイトはreCAPTCHA Enterpriseによって保護されており、Googleのプライバシーポリシーと利用規約が適用されます。",
    "payment.subscribeAndPay": "購読して支払う",
    "payment.processing": "処理中...",
    "payment.secureTransaction": "安全な取引",
    "payment.plan": "プラン",
    "payment.perMonth": "/月",
    "payment.billedAs": "請求額",
    "payment.perYear": "/年",
    "payment.riseAbove": "ノイズを超えて上昇。",
    "payment.orderSummary": "注文概要",
    "payment.item": "項目",
    "payment.total": "合計",
    "payment.subscription": "サブスクリプション",
    "payment.allPricesUSD": "* すべての価格はUSDです。",
    
    // Register
    "register.title": "アカウント作成",
    "register.description": "新しいアカウントを作成するには、情報を入力してください。",
    "register.uploadPhoto": "写真をアップロード",
    "register.fullName": "氏名",
    "register.fullNamePlaceholder": "氏名を入力してください",
    "register.dateOfBirth": "生年月日",
    "register.pickDate": "日付を選択",
    "register.confirmPassword": "パスワード確認",
    "register.creating": "作成中...",
    "register.createAccount": "アカウント作成",
    "register.alreadyHaveAccount": "既にアカウントをお持ちですか？",
    "register.passwordMismatch": "パスワードが一致しません。",
    "register.passwordTooShort": "パスワードは6文字以上である必要があります。",
    "register.photoTooLarge": "写真のサイズは5MB未満である必要があります",
    "register.emailExists": "メールアドレスは既に存在します。代わりにログインしてください。",
    "register.error": "エラーが発生しました。もう一度お試しください。",
    "register.choosePlan": "プランを選択",
    "register.selectPlan": "すべての機能を解除するには、サブスクリプションプランを選択してください",
    "register.viewAllPlans": "すべてのプランを表示",
    
    // Login Page
    "loginPage.dontHaveAccount": "アカウントをお持ちでないですか？",
    "loginPage.signUp": "登録",
    "loginPage.viewAllPlans": "すべてのプランを表示",
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

