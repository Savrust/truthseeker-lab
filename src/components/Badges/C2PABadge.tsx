import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

interface C2PABadgeProps {
  verified: boolean;
}

export const C2PABadge = ({ verified }: C2PABadgeProps) => {
  if (!verified) return null;

  return (
    <Badge variant="secondary" className="gap-1">
      <Shield className="h-3 w-3" />
      C2PA
    </Badge>
  );
};
