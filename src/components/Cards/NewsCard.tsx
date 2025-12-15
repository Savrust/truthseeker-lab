import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VerificationBadge, VerificationLevel } from "@/components/Badges/VerificationBadge";
import { SourceBadge } from "@/components/Badges/SourceBadge";
import { C2PABadge } from "@/components/Badges/C2PABadge";
import { IdeologyBadge, IdeologyData } from "@/components/Badges/IdeologyBadge";
import { ExternalLink, Clock, TrendingUp } from "lucide-react";

interface NewsCardProps {
  title: string;
  summary: string;
  source: string;
  verificationLevel: VerificationLevel;
  c2pa: boolean;
  primarySourceUrl?: string;
  timestamp: string;
  trending?: boolean;
  ideology?: IdeologyData;
  imageUrl?: string;
  onClick?: () => void;
}

export const NewsCard = ({
  title,
  summary,
  source,
  verificationLevel,
  c2pa,
  primarySourceUrl,
  timestamp,
  trending,
  ideology,
  imageUrl,
  onClick,
}: NewsCardProps) => {
  return (
    <Card
      className="transition-all hover:shadow-lg cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row md:items-center items-stretch">
        {/* Image - Top on mobile, Right on desktop */}
        {imageUrl && (
          <div className="flex-shrink-0 w-full md:w-64 h-[400px] md:h-[200px] md:m-[10px] rounded-lg overflow-hidden order-1 md:order-2">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Content - Bottom on mobile, Left on desktop */}
        <div className="flex-1 flex flex-col min-w-0 order-2 md:order-1">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold leading-tight flex-1">{title}</h3>
              {trending && (
                <TrendingUp className="h-5 w-5 text-warning flex-shrink-0" />
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <SourceBadge source={source} />
              <VerificationBadge level={verificationLevel} size="sm" />
              <C2PABadge verified={c2pa} />
              {ideology && <IdeologyBadge ideology={ideology} size="sm" />}
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3">{summary}</p>
          </CardContent>

          <CardFooter className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {timestamp}
            </div>
            {primarySourceUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 hover:bg-sky-500 hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(primarySourceUrl, "_blank");
                }}
              >
                一次ソース
                <ExternalLink className="h-3 w-3" />
              </Button>
            )}
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};
