import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";

interface SignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBackToLogin: () => void;
  prefillEmail?: string;
}

export const SignupDialog = ({ open, onOpenChange, onBackToLogin, prefillEmail = "" }: SignupDialogProps) => {
  const [email, setEmail] = useState(prefillEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const { language, t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(
        language === "en" 
          ? "Passwords do not match." 
          : "パスワードが一致しません。"
      );
      return;
    }

    if (password.length < 6) {
      setError(
        language === "en" 
          ? "Password must be at least 6 characters." 
          : "パスワードは6文字以上である必要があります。"
      );
      return;
    }

    setIsLoading(true);

    try {
      const result = await register(email, password);
      if (result.success) {
        onOpenChange(false);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setError(
          language === "en" 
            ? result.message || "Email already exists. Please login instead." 
            : result.message || "メールアドレスは既に存在します。代わりにログインしてください。"
        );
      }
    } catch (err) {
      setError(
        language === "en" 
          ? "An error occurred. Please try again." 
          : "エラーが発生しました。もう一度お試しください。"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {language === "en" ? "Create Account" : "アカウント作成"}
          </DialogTitle>
          <DialogDescription>
            {language === "en" 
              ? "Enter your information to create a new account."
              : "新しいアカウントを作成するには、情報を入力してください。"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-email">{t("login.email")}</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder={t("login.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">{t("login.password")}</Label>
            <Input
              id="signup-password"
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
              {language === "en" ? "Confirm Password" : "パスワード確認"}
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
                {language === "en" ? "Creating..." : "作成中..."}
              </>
            ) : (
              language === "en" ? "Create Account" : "アカウント作成"
            )}
          </Button>
          <div className="text-center text-sm">
            {language === "en" ? (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="text-primary underline hover:text-primary/80 transition-colors"
                >
                  Login
                </button>
              </p>
            ) : (
              <p>
                既にアカウントをお持ちですか？{" "}
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="text-primary underline hover:text-primary/80 transition-colors"
                >
                  ログイン
                </button>
              </p>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

