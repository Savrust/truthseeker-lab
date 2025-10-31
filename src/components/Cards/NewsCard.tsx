import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VerificationBadge, VerificationLevel } from "@/components/Badges/VerificationBadge";
import { SourceBadge } from "@/components/Badges/SourceBadge";
import { C2PABadge } from "@/components/Badges/C2PABadge";
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
  onClick,
}: NewsCardProps) => {
  return (
    <Card
      className="transition-all hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
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
            className="gap-2"
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
    </Card>
  );
};
