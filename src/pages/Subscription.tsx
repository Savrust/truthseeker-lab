import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { LoginDialog } from "@/components/Dialogs/LoginDialog";
import { SignupDialog } from "@/components/Dialogs/SignupDialog";

const getPlans = (t: (key: string) => string) => [
  {
    id: "vantage",
    name: t("subscription.plan.vantage"),
    price: "$9.99",
    period: t("subscription.plan.perMonth"),
    description: t("subscription.plan.vantageDesc"),
    icon: Sparkles,
    features: [
      t("subscription.plan.feature.basicSearch"),
      t("subscription.plan.feature.100Searches"),
      t("subscription.plan.feature.standardDisplay"),
      t("subscription.plan.feature.emailSupport"),
      t("subscription.plan.feature.basicAnalytics"),
    ],
    color: "secondary",
    popular: false,
  },
  {
    id: "premium",
    name: t("subscription.plan.premium"),
    price: "$19.99",
    period: t("subscription.plan.perMonth"),
    description: t("subscription.plan.premiumDesc"),
    icon: Zap,
    features: [
      t("subscription.plan.feature.advancedSearch"),
      t("subscription.plan.feature.unlimitedSearches"),
      t("subscription.plan.feature.enhancedAnalysis"),
      t("subscription.plan.feature.prioritySupport"),
      t("subscription.plan.feature.advancedAnalytics"),
      t("subscription.plan.feature.exportResults"),
      t("subscription.plan.feature.apiAccess"),
    ],
    color: "default",
    popular: true,
  },
  {
    id: "pro",
    name: t("subscription.plan.pro"),
    price: "$39.99",
    period: t("subscription.plan.perMonth"),
    description: t("subscription.plan.proDesc"),
    icon: Crown,
    features: [
      t("subscription.plan.feature.enterpriseSearch"),
      t("subscription.plan.feature.unlimitedSearches"),
      t("subscription.plan.feature.customConfig"),
      t("subscription.plan.feature.dedicatedSupport"),
      t("subscription.plan.feature.enterpriseDashboard"),
      t("subscription.plan.feature.bulkExport"),
      t("subscription.plan.feature.fullApiAccess"),
      t("subscription.plan.feature.customIntegrations"),
      t("subscription.plan.feature.teamCollaboration"),
    ],
    color: "default",
    popular: false,
  },
];

const getFaqs = (t: (key: string) => string) => [
  {
    question: t("subscription.faq.paymentMethods"),
    answer: t("subscription.faq.paymentMethodsAnswer"),
  },
  {
    question: t("subscription.faq.changePlan"),
    answer: t("subscription.faq.changePlanAnswer"),
  },
  {
    question: t("subscription.faq.freeTrial"),
    answer: t("subscription.faq.freeTrialAnswer"),
  },
  {
    question: t("subscription.faq.exceedLimit"),
    answer: t("subscription.faq.exceedLimitAnswer"),
  },
  {
    question: t("subscription.faq.cancel"),
    answer: t("subscription.faq.cancelAnswer"),
  },
];

export default function Subscription() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<"vantage" | "premium" | "pro" | null>(null);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  
  const plans = getPlans(t);
  const faqs = getFaqs(t);

  const handleSwitchToSignup = (email: string) => {
    setSignupEmail(email);
    setLoginOpen(false);
    setSignupOpen(true);
  };

  const handleBackToLogin = () => {
    setSignupOpen(false);
    setLoginOpen(true);
  };

  const handleSubscribe = (planId: "vantage" | "premium" | "pro") => {
    setSelectedPlan(planId);
    if (!isAuthenticated) {
      setLoginOpen(true);
      return;
    }
    navigate(`/payment?plan=${planId}`);
  };

  // After authentication, proceed to payment with the selected plan
  useEffect(() => {
    if (isAuthenticated && selectedPlan) {
      setLoginOpen(false);
      setSignupOpen(false);
      navigate(`/payment?plan=${selectedPlan}`);
    }
  }, [isAuthenticated, selectedPlan, navigate]);

  const handleLoginClose = (open: boolean) => {
    setLoginOpen(open);
  };

  const handleSignupClose = (open: boolean) => {
    setSignupOpen(open);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-8 sm:py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">{t("subscription.title")}</h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
              {t("subscription.subtitle")}
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isHovered = hoveredPlan === plan.id;
              const isPopular = plan.popular;
              const shouldShowPopular = isPopular && !hoveredPlan;
              return (
                <Card
                  key={plan.id}
                  className={`relative flex flex-col transition-all duration-300 ${
                    shouldShowPopular
                      ? "border-primary border-2 shadow-lg md:scale-105"
                      : isHovered
                      ? "border-primary border-2 shadow-lg"
                      : "border"
                  }`}
                  onMouseEnter={() => setHoveredPlan(plan.id)}
                  onMouseLeave={() => setHoveredPlan(null)}
                >
                  {shouldShowPopular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                      {t("subscription.plan.mostPopular")}
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-8">
                    <div className="flex justify-center mb-4">
                      <div className={`p-3 rounded-full bg-primary/10 ${
                        shouldShowPopular || isHovered ? "bg-primary/20" : ""
                      }`}>
                        <Icon className={`h-8 w-8 ${
                          shouldShowPopular || isHovered ? "text-primary" : "text-muted-foreground"
                        }`} />
                      </div>
                    </div>
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <CardDescription className="text-sm min-h-[3rem]">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 flex-1 flex flex-col">
                    <ul className="space-y-3 flex-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-black dark:text-black flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full h-12"
                      variant={shouldShowPopular || isHovered ? "default" : "outline"}
                      size="lg"
                      onClick={() => handleSubscribe(plan.id as "vantage" | "premium" | "pro")}
                    >
                      {t("subscription.plan.subscribeNow")}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-muted/50 py-8 sm:py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-12">
                {t("subscription.faq.title")}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger className="text-left font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <h3 className="font-semibold mb-4">{t("subscription.footer.legal")}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    {t("subscription.footer.terms")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    {t("subscription.footer.privacy")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t("subscription.footer.support")}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    {t("subscription.footer.contact")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    {t("subscription.footer.help")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t("subscription.footer.about")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("subscription.footer.aboutDesc")}
              </p>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>{t("subscription.footer.copyright").replace("{year}", new Date().getFullYear().toString())}</p>
          </div>
        </div>
      </footer>

      {/* Login and Signup Dialogs */}
      <LoginDialog 
        open={loginOpen} 
        onOpenChange={handleLoginClose}
        onSwitchToSignup={handleSwitchToSignup}
      />
      <SignupDialog 
        open={signupOpen} 
        onOpenChange={handleSignupClose}
        onBackToLogin={handleBackToLogin}
        prefillEmail={signupEmail}
      />
    </div>
  );
}

