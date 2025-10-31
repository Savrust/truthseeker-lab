import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";

interface SourceBadgeProps {
  source: string;
}

export const SourceBadge = ({ source }: SourceBadgeProps) => {
  return (
    <Badge variant="outline" className="gap-1">
      <Building2 className="h-3 w-3" />
      {source}
    </Badge>
  );
};
