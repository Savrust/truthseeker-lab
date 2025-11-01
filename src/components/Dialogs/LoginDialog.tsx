import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToSignup: (email: string) => void;
}

export const LoginDialog = ({ open, onOpenChange, onSwitchToSignup }: LoginDialogProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { language, t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        onOpenChange(false);
        setEmail("");
        setPassword("");
      } else if (result.userNotFound) {
        // User doesn't exist, redirect to signup
        onOpenChange(false);
        setTimeout(() => {
          onSwitchToSignup(email);
        }, 100);
      } else {
        // Wrong password
        setError(t("login.error"));
      }
    } catch (err) {
      setError(t("login.errorGeneric"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("login.title")}</DialogTitle>
          <DialogDescription>
            {t("login.description")}
          </DialogDescription>
        </DialogHeader>
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
            {language === "en" ? (
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    onOpenChange(false);
                    setTimeout(() => onSwitchToSignup(""), 100);
                  }}
                  className="text-primary underline hover:text-primary/80 transition-colors"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                アカウントをお持ちでないですか？{" "}
                <button
                  type="button"
                  onClick={() => {
                    onOpenChange(false);
                    setTimeout(() => onSwitchToSignup(""), 100);
                  }}
                  className="text-primary underline hover:text-primary/80 transition-colors"
                >
                  登録
                </button>
              </p>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

