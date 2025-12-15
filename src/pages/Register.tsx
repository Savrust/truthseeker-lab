import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, Sparkles, Zap, Crown, Loader2, CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
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

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const { register } = useAuth();
  const { isSubscribed } = useSubscription();
  const { language, t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(t("register.passwordMismatch"));
      return;
    }

    if (password.length < 6) {
      setError(t("register.passwordTooShort"));
      return;
    }

    setIsLoading(true);

    try {
      const dateOfBirthString = dateOfBirth ? format(dateOfBirth, "yyyy-MM-dd") : undefined;
      const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Crect width='128' height='128' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='48' fill='%239ca3af'%3E%3F%3C/text%3E%3C/svg%3E";
      const result = await register(email, password, name || undefined, photo || defaultImage, dateOfBirthString);
      if (result.success) {
        // After registration:
        // If S=1: go to default page (home) with all features
        // If S=0: go to subscription page
        const savedPlan = localStorage.getItem("subscriptionPlan");
        if (savedPlan) {
          navigate("/");
        } else {
          navigate("/subscription");
        }
      } else {
        setError(result.message || t("register.emailExists"));
      }
    } catch (err) {
      setError(t("register.error"));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError(t("register.photoTooLarge"));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className={`grid gap-6 sm:gap-8 max-w-7xl mx-auto ${isSubscribed ? "lg:grid-cols-1 max-w-md" : "grid-cols-1 lg:grid-cols-[4fr_6fr]"}`}>
          {/* Registration Section - Left */}
          <div className={`flex flex-col justify-start ${isSubscribed ? "mx-auto" : ""}`}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {t("register.title")}
                </CardTitle>
                <CardDescription>
                  {t("register.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-end justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor="photo"
                          className="flex items-center gap-2 cursor-pointer border rounded-md px-4 py-2 hover:bg-accent transition-colors"
                        >
                          <Upload className="h-4 w-4" />
                          <span className="text-sm">
                            {t("register.uploadPhoto")}
                          </span>
                        </Label>
                        <Input
                          id="photo"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          disabled={isLoading}
                          className="hidden"
                        />
                      </div>
                      {photo && (
                        <div className="flex-shrink-0 sm:mr-[30px]">
                          <img
                            src={photo}
                            alt="Profile"
                            className="w-24 h-24 sm:w-40 sm:h-40 rounded-full object-cover border-2 border-border"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Crect width='128' height='128' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='48' fill='%239ca3af'%3E%3F%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {t("register.fullName")}
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder={t("register.fullNamePlaceholder")}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-of-birth">
                      {t("register.dateOfBirth")}
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateOfBirth && "text-muted-foreground"
                          )}
                          disabled={isLoading}
                          type="button"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateOfBirth ? (
                            format(dateOfBirth, "PPP")
                          ) : (
                            <span>{t("register.pickDate")}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateOfBirth}
                          onSelect={setDateOfBirth}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
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
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      {t("register.confirmPassword")}
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder={t("login.passwordPlaceholder")}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                        {t("register.creating")}
                      </>
                    ) : (
                      t("register.createAccount")
                    )}
                  </Button>
                  <div className="text-center text-sm">
                    <p>
                      {t("register.alreadyHaveAccount")}{" "}
                      <button
                        type="button"
                        onClick={handleLoginClick}
                        className="text-primary underline hover:text-primary/80 transition-colors"
                      >
                        {t("login.title")}
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
            <div className="mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">{t("register.choosePlan")}</h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                {t("register.selectPlan")}
              </p>
            </div>
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
              {t("register.viewAllPlans")}
            </Button>
          </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

