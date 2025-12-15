import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { VerificationDetailDialog } from "@/components/Dialogs/VerificationDetailDialog";
import { AlertCircle, CheckCircle2, Clock, User, Lock } from "lucide-react";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mock verification queue data
const verificationQueue = [
  {
    id: "v1",
    priority: "high",
    claim: "SNSで急拡散中の政策主張A",
    evidence: "一次資料3件、OSINT分析2件",
    assignee: "未割当",
    status: "unverified",
  },
  {
    id: "v2",
    priority: "medium",
    claim: "経済統計の解釈に関する主張B",
    evidence: "政府データ1件、専門家意見2件",
    assignee: "田中",
    status: "in-progress",
  },
  {
    id: "v3",
    priority: "low",
    claim: "歴史的事実の再確認C",
    evidence: "学術論文5件",
    assignee: "佐藤",
    status: "verified",
  },
];

const priorityColors = {
  high: "destructive",
  medium: "warning",
  low: "secondary",
} as const;

const statusIcons = {
  unverified: Clock,
  "in-progress": AlertCircle,
  verified: CheckCircle2,
};

const statusLabels = {
  unverified: "未検証",
  "in-progress": "検証中",
  verified: "検証済み",
};

export const VerifyView = () => {
  const [selectedItem, setSelectedItem] = useState<typeof verificationQueue[0] | null>(null);
  const { isSubscribed } = useSubscription();
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{t("verify.title")}</h2>
        <p className="text-muted-foreground">
          {t("verify.subtitle")}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t("verify.cases")}</span>
            <Button>{t("verify.addCase")}</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("verify.priority")}</TableHead>
                  <TableHead>{t("verify.claim")}</TableHead>
                  <TableHead>{t("verify.evidence")}</TableHead>
                  <TableHead>{t("verify.assignee")}</TableHead>
                  <TableHead>{t("verify.status")}</TableHead>
                  <TableHead className="text-right">{t("verify.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {verificationQueue.map((item) => {
                  const StatusIcon = statusIcons[item.status as keyof typeof statusIcons];
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Badge variant={priorityColors[item.priority as keyof typeof priorityColors]}>
                          {item.priority === "high" ? "高" : item.priority === "medium" ? "中" : "低"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{item.claim}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {item.evidence}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {item.assignee}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="gap-1">
                          <StatusIcon className="h-3 w-3" />
                          {statusLabels[item.status as keyof typeof statusLabels]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedItem(item)}
                        >
                          {t("verify.details")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("verify.timeline")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {t("verify.timelineDesc")}
            </p>
            <Button variant="outline" className="w-full hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-colors">
              {t("verify.createTimeline")}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("verify.coordinated")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {t("verify.coordinatedDesc")}
            </p>
            <Button variant="outline" className="w-full hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-colors">
              {t("verify.analyzePattern")}
            </Button>
          </CardContent>
        </Card>
      </div>

      {selectedItem && (
        <VerificationDetailDialog
          open={!!selectedItem}
          onOpenChange={(open) => !open && setSelectedItem(null)}
          item={selectedItem}
        />
      )}
    </div>
  );
};
