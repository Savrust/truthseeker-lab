import { useState, useEffect } from "react";
import banner1 from "@/assets/banner-1.jpg";
import banner2 from "@/assets/banner-2.jpg";
import banner3 from "@/assets/banner-3.jpg";
import banner4 from "@/assets/banner-4.jpg";
import banner5 from "@/assets/banner-5.jpg";
import { useLanguage } from "@/contexts/LanguageContext";


const banners = [banner1, banner2, banner3, banner4, banner5];

export const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language, t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 60000); // change image every 60s

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={banner}
            alt={`Banner ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent flex items-start pt-24">
            <div className="container mx-auto px-4">
              <h2 className={`text-4xl md:text-5xl font-bold text-foreground mb-4 max-w-2xl ${language === "en" ? "brand-font-en" : "brand-font-ja"}`}>
                {t("banner.title")}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-6">
                {t("banner.subtitle")}
              </p>
            </div>
          </div>
        </div>
      ))}
      
      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary w-8"
                : "bg-muted-foreground/50"
            }`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div> */}
    </section>
  );
};
