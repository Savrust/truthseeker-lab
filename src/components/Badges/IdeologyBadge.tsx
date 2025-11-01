import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface IdeologyData {
  liberal: number;  // リベラル
  neutral: number;  // 中立
  conservative: number;  // 保守
}

interface IdeologyBadgeProps {
  ideology: IdeologyData;
  size?: "sm" | "md";
}

export const IdeologyBadge = ({ ideology, size = "sm" }: IdeologyBadgeProps) => {
  const { language } = useLanguage();
  
  const textSize = size === "sm" ? "text-[10px]" : "text-xs";
  
  return (
    <Badge 
      variant="outline" 
      className={`${textSize} font-mono px-2 py-0.5 bg-muted/50`}
    >
      {language === "en" ? (
        <>L:{ideology.liberal}% | N:{ideology.neutral}% | C:{ideology.conservative}%</>
      ) : (
        <>リ:{ideology.liberal}% | 中:{ideology.neutral}% | 保:{ideology.conservative}%</>
      )}
    </Badge>
  );
};

export type { IdeologyData };

