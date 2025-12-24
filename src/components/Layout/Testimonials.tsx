import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";
import testimonial6 from "@/assets/testimonial-6.jpg";
import testimonial7 from "@/assets/testimonial-7.jpg";
import testimonial8 from "@/assets/testimonial-8.jpg";
import testimonial9 from "@/assets/testimonial-9.jpg";
import testimonial10 from "@/assets/testimonial-10.jpg";

const testimonials = [
  {
    id: 1,
    name: "田中 美咲",
    role: "主幹編集者、全国新聞社",
    image: testimonial1,
    testimonial: "The Truthプラットフォームは情報検証の方法を革新しました。透明性の高い包括的な検証プロセスにより、読者は私たちが公開するすべての記事に信頼を持つことができます。"
  },
  {
    id: 2,
    name: "佐藤 健太",
    role: "調査報道ジャーナリスト",
    image: testimonial2,
    testimonial: "ジャーナリストとして、詳細なソース追跡と証拠検証機能へのアクセスは非常に貴重です。このプラットフォームはニュースの信頼性に新しい基準を設定しています。"
  },
  {
    id: 3,
    name: "鈴木 裕子",
    role: "メディアディレクター、テック企業",
    image: testimonial3,
    testimonial: "検証キューとコラボレーション機能により、ファクトチェックプロセスが大幅に効率化されました。ジャーナリズムの誠実さを維持するための必須ツールです。"
  },
  {
    id: 4,
    name: "高橋 真一",
    role: "コミュニケーションマネージャー",
    image: testimonial4,
    testimonial: "タイムライン再構築機能は、ストーリーの展開を追跡し、誤情報が拡散する前に特定するのに役立ちます。私たちのチームにとって画期的なツールです。"
  },
  {
    id: 5,
    name: "伊藤 隆",
    role: "シニアメディアアナリスト",
    image: testimonial5,
    testimonial: "業界で数十年の経験を持つ私は、これが最も包括的なニュース検証プラットフォームであると自信を持って言えます。証拠バインダー機能だけでも価値があります。"
  },
  {
    id: 6,
    name: "渡辺 明美",
    role: "デジタルメディア起業家",
    image: testimonial6,
    testimonial: "協調拡散検出機能により、誤情報キャンペーンを早期に特定して阻止することができました。このツールは視聴者との信頼を維持するために不可欠です。"
  },
  {
    id: 7,
    name: "山本 誠",
    role: "コンテンツストラテジスト",
    image: testimonial7,
    testimonial: "ソースレンズ機能は、メディアの信頼性に関する素晴らしい洞察を提供します。最も信頼できるニュースソースとのパートナーシップ構築に役立ちました。"
  },
  {
    id: 8,
    name: "中村 優子",
    role: "ジャーナリズム教授",
    image: testimonial8,
    testimonial: "The Truthを学生の教材として使用しています。すべてのジャーナリストが従うべき検証と透明性のベストプラクティスを示しています。"
  },
  {
    id: 9,
    name: "小林 大輔",
    role: "テック＆メディアコンサルタント",
    image: testimonial9,
    testimonial: "C2PAと透明性バッジの統合により、読者がコンテンツの真正性を理解しやすくなりました。これが信頼できるメディアの未来です。"
  },
  {
    id: 10,
    name: "加藤 さくら",
    role: "広報部長",
    image: testimonial10,
    testimonial: "私たちの組織は、ニュース報道の監視と正確性の確保のためにThe Truthに依存しています。専門家の解説機能は複雑な記事に貴重な文脈を追加します。"
  }
];

export const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [pausedIndex, setPausedIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
          entry.target.classList.remove("opacity-0");
        }
      });
    }, observerOptions);

    observer.observe(section);

    return () => {
      observer.unobserve(section);
    };
  }, []);

  // Duplicate testimonials for seamless scrolling
  const scrollingTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("testimonials.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div
          ref={sectionRef}
          className="testimonial-section opacity-0 transition-opacity duration-700"
        >
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2">
              {t("testimonials.sectionTitle")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("testimonials.sectionDesc")}
            </p>
          </div>

          <div className="overflow-x-hidden pb-4 relative pt-4">
            <div 
              className="flex gap-6 min-w-max animate-scroll-left"
              style={{
                width: `${(testimonials.length * 368) + (testimonials.length * 24)}px`,
                animationPlayState: pausedIndex !== null ? 'paused' : 'running'
              }}
            >
              {scrollingTestimonials.map((testimonial, index) => {
                const isPaused = pausedIndex === index;
                return (
                  <Card
                    key={`testimonial-${index}`}
                    className={`w-[350px] flex-shrink-0 transition-all duration-300 ${
                      isPaused 
                        ? 'shadow-lg z-10' 
                        : 'hover:shadow-lg hover:scale-105'
                    }`}
                    onMouseEnter={() => setPausedIndex(index)}
                    onMouseLeave={() => setPausedIndex(null)}
                    onClick={() => setPausedIndex(isPaused ? null : index)}
                    style={{
                      transform: isPaused ? 'scale(1.1)' : undefined,
                      position: isPaused ? 'relative' : undefined
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16 flex-shrink-0">
                            <AvatarImage src={testimonial.image} alt={testimonial.name} />
                            <AvatarFallback>
                              {testimonial.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">
                              {testimonial.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <Quote className="h-6 w-6 text-primary mb-2 opacity-50" />
                          <p className="text-sm leading-relaxed">
                            {testimonial.testimonial}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
