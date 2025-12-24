import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Check, Lock, CreditCard } from "lucide-react";
import paypalLogo from "@/assets/paypal.svg";
import googleLogo from "@/assets/googleIcon.svg";
import cardIconsImage from "@/assets/Screenshot_1.png";

const getPlanLabels = (t: (key: string) => string): Record<string, string> => ({
  vantage: t("subscription.plan.vantage"),
  premium: t("subscription.plan.premium"),
  pro: t("subscription.plan.pro"),
});

const planPrices: Record<string, { monthly: string; yearly: string }> = {
  vantage: { monthly: "$9.99", yearly: "$99.99" },
  premium: { monthly: "$19.99", yearly: "$199.99" },
  pro: { monthly: "$39.99", yearly: "$399.99" },
};

const getPlanFeatures = (t: (key: string) => string): Record<string, string[]> => ({
  vantage: [
    t("subscription.plan.feature.basicSearch"),
    t("subscription.plan.feature.100Searches"),
    t("subscription.plan.feature.standardDisplay"),
    t("subscription.plan.feature.emailSupport"),
  ],
  premium: [
    t("subscription.plan.feature.advancedSearch"),
    t("subscription.plan.feature.unlimitedSearches"),
    t("subscription.plan.feature.enhancedAnalysis"),
    t("subscription.plan.feature.prioritySupport"),
    t("subscription.plan.feature.advancedAnalytics"),
    t("subscription.plan.feature.exportResults"),
  ],
  pro: [
    t("subscription.plan.feature.enterpriseSearch"),
    t("subscription.plan.feature.unlimitedSearches"),
    t("subscription.plan.feature.customConfig"),
    t("subscription.plan.feature.dedicatedSupport"),
    t("subscription.plan.feature.enterpriseDashboard"),
    t("subscription.plan.feature.fullApiAccess"),
  ],
});

const countries = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "RU", name: "Russia", flag: "🇷🇺" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭" },
  { code: "NO", name: "Norway", flag: "🇳🇴" },
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
];

export default function Payment() {
  const navigate = useNavigate();
  const { subscribe } = useSubscription();
  const { isAuthenticated, currentUser } = useAuth();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const selectedPlanParam = searchParams.get("plan") || "vantage";
  const plan = useMemo(() => (["vantage", "premium", "pro"].includes(selectedPlanParam) ? selectedPlanParam : "vantage"), [selectedPlanParam]);
  
  const planLabels = getPlanLabels(t);
  const planFeatures = getPlanFeatures(t);

  const [paymentMethod, setPaymentMethod] = useState<"gpay" | "paypal" | "card">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [country, setCountry] = useState("JP");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/subscription");
      return;
    }
    setProcessing(true);
    subscribe(plan as "vantage" | "premium" | "pro");
    setProcessing(false);
    navigate("/");
  };

  const planPrice = planPrices[plan] || planPrices.vantage;
  const planFeaturesList = planFeatures[plan] || planFeatures.vantage;
  const selectedCountry = countries.find(c => c.code === country) || countries[2]; // Default to Japan

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 flex-1 max-w-6xl">
        {/* Step Navigation */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 overflow-x-auto pb-2">
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{t("payment.step.account")}</span>
          </div>
          <div className="w-4 sm:w-8 h-px bg-border flex-shrink-0" />
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <span className="text-xs sm:text-sm font-medium underline whitespace-nowrap">{t("payment.step.paymentDetails")}</span>
          </div>
          <div className="w-4 sm:w-8 h-px bg-border flex-shrink-0" />
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{t("payment.step.confirmation")}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-[2fr_1fr] gap-6 md:gap-8">
          {/* Left Section - Payment Details */}
          <div className="space-y-6">
            {/* Login Status Section */}
            {isAuthenticated && currentUser && (
              <Card className="border-0 border-none bg-background shadow-none">
                <CardContent className="pt-6 border-0">
                  <div className="text-sm">
                    <span className="text-muted-foreground">{t("payment.loggedInAs")} </span>
                    <span className="font-medium">{currentUser}</span>
                    <span className="text-muted-foreground">. </span>
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="text-gray-600 underline hover:text-gray-800"
                    >
                      {t("payment.notYou")}
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment Form Section */}
            <Card className="border-0 bg-background">
              <CardContent className="pt-0">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Payment Method Selection */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold">{t("payment.selectMethod")}</h2>
                    <div className="flex flex-col gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-14 bg-gray-600 text-white hover:bg-gray-700 border-gray-600"
                        onClick={() => setPaymentMethod("gpay")}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold"><img src={googleLogo} alt="googlelogo" className="h-6" /></span>
                          <span className="text-lg font-medium">Pay</span>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-14 bg-[#FFC439] text-white hover:bg-[#FFC439]/90 border-[#FFC439] rounded-full"
                        onClick={() => setPaymentMethod("paypal")}
                      >
                        <div className="flex items-center gap-3">
                          <img src={paypalLogo} alt="PayPal" className="h-6" />
                        </div>
                      </Button>
                    </div>

                    {/* Or pay with card separator */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">{t("payment.orPayWithCard")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Payment Section */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold">{t("payment.billingInfo")}</h2>
                    
                    <Tabs value="card" className="w-full">
                      <TabsList>
                        <TabsTrigger value="card" className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          {t("payment.card")}
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">{t("payment.cardNumber")}</Label>
                        <div className="flex items-center gap-2 border border-border rounded-md p-2">
                          <Input
                            id="card-number"
                            placeholder={t("payment.cardNumberPlaceholder")}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            required
                            className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                          <img 
                            src={cardIconsImage} 
                            alt="VISA JCB MC D" 
                            className="h-6 object-contain"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">{t("payment.expirationDate")}</Label>
                          <Input
                            id="expiry"
                            placeholder={t("payment.expirationPlaceholder")}
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cvc">{t("payment.securityCode")}</Label>
                          <Input
                            id="cvc"
                            placeholder={t("payment.securityCodePlaceholder")}
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">{t("payment.country")}</Label>
                        <Select value={country} onValueChange={setCountry}>
                          <SelectTrigger id="country">
                            <div className="flex items-center gap-2 flex-1">
                              <span>{selectedCountry.flag}</span>
                              <SelectValue>{selectedCountry.name}</SelectValue>
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((countryOption) => (
                              <SelectItem key={countryOption.code} value={countryOption.code}>
                                <span className="flex items-center gap-2">
                                  <span>{countryOption.flag}</span>
                                  <span>{countryOption.name}</span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Legal Text */}
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p>
                      {t("payment.legalText1")}
                    </p>
                    <p>
                      {t("payment.legalText2")}
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gray-600 text-white hover:bg-gray-700 rounded-full"
                    size="lg"
                    disabled={processing}
                  >
                    {processing ? t("payment.processing") : t("payment.subscribeAndPay")}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    <span>{t("payment.secureTransaction")}</span>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Section - Plan Details & Order Summary */}
          <div className="space-y-6">
            {/* Plan Details Section */}
            <Card className="border-0 bg-background">
              <CardHeader>
                <CardTitle className="text-2xl">{planLabels[plan] || t("subscription.plan.premium")} {t("payment.plan")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-3xl font-bold">{planPrice.monthly}{t("payment.perMonth")}</div>
                  <div className="text-sm text-muted-foreground">{t("payment.billedAs")} {planPrice.yearly}{t("payment.perYear")}</div>
                </div>

                <div>
                  <p className="text-lg font-semibold mb-4">{t("payment.riseAbove")}</p>
                  <ul className="space-y-3">
                    {planFeaturesList.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t("payment.item")}</span>
                    <span className="text-muted-foreground">{t("payment.total")}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{planLabels[plan] || t("subscription.plan.premium")} {t("payment.subscription")}</span>
                    <span className="font-bold">{planPrice.yearly}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
