import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, Crown, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";

const plans = [
  {
    id: "vantage",
    name: "Vantage",
    price: "$9.99",
    period: "per month",
    description: "Perfect for individuals getting started with AI-powered search.",
    icon: Sparkles,
    features: [
      "Basic AI search functionality",
      "Up to 100 searches per month",
      "Standard result display",
      "Email support",
    ],
    popular: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$19.99",
    period: "per month",
    description: "Ideal for professionals and researchers.",
    icon: Zap,
    features: [
      "Advanced AI search functionality",
      "Unlimited searches",
      "Enhanced result analysis",
      "Priority email support",
    ],
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$39.99",
    period: "per month",
    description: "For teams and enterprises.",
    icon: Crown,
    features: [
      "Enterprise AI search functionality",
      "Unlimited searches",
      "Custom search configurations",
      "Dedicated support team",
    ],
    popular: false,
  },
];

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const { login } = useAuth();
  const { isSubscribed } = useSubscription();
  const { language, t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        // After logging in:
        // If S=1: go to default page (home) with all features
        // If S=0: go to subscription page
        const savedPlan = localStorage.getItem("subscriptionPlan");
        if (savedPlan) {
          navigate("/");
        } else {
          navigate("/subscription");
        }
      } else {
        setError(t("login.error"));
      }
    } catch (err) {
      setError(t("login.errorGeneric"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupClick = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className={`grid gap-6 sm:gap-8 max-w-7xl mx-auto ${isSubscribed ? "lg:grid-cols-1 max-w-md" : "grid-cols-1 lg:grid-cols-[4fr_6fr]"}`}>
          {/* Login Section - Left */}
          <div className={`flex flex-col justify-start ${isSubscribed ? "mx-auto" : ""}`}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{t("login.title")}</CardTitle>
                <CardDescription>
                  {t("login.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("login.email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("login.emailPlaceholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">{t("login.password")}</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder={t("login.passwordPlaceholder")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      minLength={6}
                    />
                  </div>
                  {error && (
                    <div className="text-sm text-destructive">{error}</div>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("login.loggingIn")}
                      </>
                    ) : (
                      t("login.title")
                    )}
                  </Button>
                  <div className="text-center text-sm">
                    <p>
                      {t("loginPage.dontHaveAccount")}{" "}
                      <button
                        type="button"
                        onClick={handleSignupClick}
                        className="text-primary underline hover:text-primary/80 transition-colors"
                      >
                        {t("loginPage.signUp")}
                      </button>
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Subscription Plans Section - Right */}
          {!isSubscribed && (
          <div className="flex flex-col justify-start">
            <div className="grid gap-4">
              {plans.map((plan) => {
                const Icon = plan.icon;
                const isHovered = hoveredPlan === plan.id;
                const isPopular = plan.popular;
                const shouldShowPopular = isPopular && !hoveredPlan;
                return (
                  <Card
                    key={plan.id}
                    className={`relative cursor-pointer transition-all duration-300 ${
                      shouldShowPopular
                        ? "border-primary border-2 shadow-lg"
                        : isHovered
                        ? "border-primary border-2 shadow-lg"
                        : "border"
                    }`}
                    onMouseEnter={() => setHoveredPlan(plan.id)}
                    onMouseLeave={() => setHoveredPlan(null)}
                    onClick={() => navigate("/subscription")}
                  >
                    {shouldShowPopular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                        {t("subscription.plan.mostPopular")}
                      </Badge>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-full bg-primary/10 ${
                            shouldShowPopular || isHovered ? "bg-primary/20" : ""
                          }`}>
                            <Icon className={`h-6 w-6 ${
                              shouldShowPopular || isHovered ? "text-primary" : "text-muted-foreground"
                            }`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{plan.name}</h3>
                            <p className="text-sm text-muted-foreground">{plan.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{plan.price}</div>
                          <div className="text-xs text-muted-foreground">/{plan.period}</div>
                        </div>
                      </div>
                      <ul className="mt-4 space-y-2">
                        {plan.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-black dark:text-white flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <Button
              className="w-full mt-6"
              size="lg"
              onClick={() => navigate("/subscription")}
            >
              {t("loginPage.viewAllPlans")}
            </Button>
          </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

