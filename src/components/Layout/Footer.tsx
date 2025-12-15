import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 max-w-[1200px] py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 text-center md:text-left">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/9391703.png" 
                alt="Logo" 
                className="h-10 w-10 object-contain"
              />
              <h3 className={`text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ${language === "en" ? "brand-font-en" : "brand-font-ja"}`}>
                {t("header.title")}
              </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              {t("footer.description")}
            </p>
            <div className="flex gap-3 justify-center md:justify-start">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.about")}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.howItWorks")}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.verification")}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.careers")}
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.resources")}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.guidelines")}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.editorial")}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.privacy")}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.terms")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 justify-center md:justify-start">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  123 Verification Street<br />
                  Truth City, TC 12345
                </span>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:contact@thetruth.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  contact@thetruth.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-sm text-muted-foreground text-center md:text-left">
          <p>
            {t("footer.copyright")}
          </p>
          <p>
            {t("footer.commitment")}
          </p>
        </div>
      </div>
    </footer>
  );
};
