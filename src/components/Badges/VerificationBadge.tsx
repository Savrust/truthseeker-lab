import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Circle } from "lucide-react";

export type VerificationLevel = "verified" | "partial" | "unverified";

interface VerificationBadgeProps {
  level: VerificationLevel;
  size?: "sm" | "md";
}

const levelConfig = {
  verified: {
    label: "検証済み",
    icon: CheckCircle2,
    className: "bg-verified text-verified-foreground",
  },
  partial: {
    label: "部分検証",
    icon: AlertCircle,
    className: "bg-partial text-partial-foreground",
  },
  unverified: {
    label: "未検証",
    icon: Circle,
    className: "bg-unverified text-unverified-foreground",
  },
};

export const VerificationBadge = ({ level, size = "md" }: VerificationBadgeProps) => {
  const config = levelConfig[level];
  const Icon = config.icon;
  const iconSize = size === "sm" ? "h-3 w-3" : "h-4 w-4";

  return (
    <Badge className={`${config.className} gap-1`}>
      <Icon className={iconSize} />
      {config.label}
    </Badge>
  );
};
