import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, Upload } from "lucide-react";

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
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
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
      const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Crect width='128' height='128' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='48' fill='%239ca3af'%3E%3F%3C/text%3E%3C/svg%3E";
      const result = await register(email, password, name || undefined, photo || defaultImage, undefined);
      if (result.success) {
        onOpenChange(false);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setName("");
        setPhoto("");
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {t("register.title")}
          </DialogTitle>
          <DialogDescription>
            {t("register.description")}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-end justify-between gap-4">
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="signup-photo"
                  className="flex items-center gap-2 cursor-pointer border rounded-md px-4 py-2 hover:bg-accent transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  <span className="text-sm">
                    {t("register.uploadPhoto")}
                  </span>
                </Label>
                <Input
                  id="signup-photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  disabled={isLoading}
                  className="hidden"
                />
              </div>
              {photo && (
                <div className="flex-shrink-0 mr-[30px]">
                  <img
                    src={photo}
                    alt="Profile"
                    className="w-40 h-40 rounded-full object-cover border-2 border-border"
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
            <Label htmlFor="signup-name">
              {t("register.fullName")}
            </Label>
            <Input
              id="signup-name"
              type="text"
              placeholder={t("register.fullNamePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
          </div>
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
                onClick={onBackToLogin}
                className="text-primary underline hover:text-primary/80 transition-colors"
              >
                {t("login.title")}
              </button>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

