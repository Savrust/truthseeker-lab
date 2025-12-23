import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink, MapPin, Newspaper } from "lucide-react";
import { BiasBar } from "./BiasBar";

export interface NewsStory {
  id: string;
  headline: string;
  thumbnail: string;
  bias: {
    left: number;
    center: number;
    right: number;
  };
  region: string;
  category: string;
  sourceCount: number;
  timestamp: string;
  url?: string;
}

interface NewsStoryCardProps {
  story: NewsStory;
  variant?: "default" | "compact";
}

export const NewsStoryCard = ({ story, variant = "default" }: NewsStoryCardProps) => {
  const isCompact = variant === "compact";

  return (
    <Card className="transition-all hover:shadow-lg cursor-pointer group">
      <CardHeader className={isCompact ? "p-4" : ""}>
        <div className={`flex gap-4 ${isCompact ? "flex-row" : "flex-col"}`}>
          {story.thumbnail && (
            <div className={`${isCompact ? "w-24 h-24 flex-shrink-0" : "w-full h-48"} rounded-lg overflow-hidden`}>
              <img
                src={story.thumbnail}
                alt={story.headline}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
          )}
          <div className="flex-1">
            <h3 className={`font-semibold ${isCompact ? "text-base line-clamp-2" : "text-lg mb-2"}`}>
              {story.headline}
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline" className="text-xs">
                <MapPin className="h-3 w-3 mr-1" />
                {story.region}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {story.category}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Newspaper className="h-3 w-3 mr-1" />
                {story.sourceCount} sources
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {story.timestamp}
              </Badge>
            </div>
            <BiasBar left={story.bias.left} center={story.bias.center} right={story.bias.right} />
          </div>
        </div>
      </CardHeader>
      {story.url && (
        <CardContent className={isCompact ? "p-4 pt-0" : ""}>
          <a
            href={story.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            Read more <ExternalLink className="h-3 w-3" />
          </a>
        </CardContent>
      )}
    </Card>
  );
};




