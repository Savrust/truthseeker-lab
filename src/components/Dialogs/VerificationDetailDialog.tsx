import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { FileText, Link as LinkIcon, User } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface VerificationDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: {
    id: string;
    priority: string;
    claim: string;
    evidence: string;
    assignee: string;
    status: string;
  };
}

export const VerificationDetailDialog = ({ open, onOpenChange, item }: VerificationDetailDialogProps) => {
  const [assignee, setAssignee] = useState(item.assignee);
  const [status, setStatus] = useState(item.status);
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    toast({
      title: "保存しました",
      description: "検証情報が更新されました。",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>検証案件の詳細</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <Label className="text-sm font-semibold">主張</Label>
                <p className="mt-1 text-foreground">{item.claim}</p>
              </div>

              <Separator />

              <div>
                <Label className="text-sm font-semibold">既存の根拠まとめ</Label>
                <p className="mt-1 text-sm text-muted-foreground">{item.evidence}</p>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="assignee">担当者</Label>
                  <Select value={assignee} onValueChange={setAssignee}>
                    <SelectTrigger id="assignee">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="未割当">未割当</SelectItem>
                      <SelectItem value="田中">田中</SelectItem>
                      <SelectItem value="佐藤">佐藤</SelectItem>
                      <SelectItem value="鈴木">鈴木</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <Label htmlFor="status">状態</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unverified">未検証</SelectItem>
                      <SelectItem value="in-progress">検証中</SelectItem>
                      <SelectItem value="verified">検証済み</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Evidence Links */}
          <Card>
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">証拠リンク</Label>
                <Button variant="outline" size="sm">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  リンクを追加
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <FileText className="h-4 w-4 mt-1 text-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">一次資料：政府発表</p>
                    <p className="text-xs text-muted-foreground truncate">https://example.com/source1</p>
                  </div>
                  <Badge variant="outline" className="shrink-0">一次資料</Badge>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <FileText className="h-4 w-4 mt-1 text-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">OSINT分析レポート</p>
                    <p className="text-xs text-muted-foreground truncate">https://example.com/osint-report</p>
                  </div>
                  <Badge variant="outline" className="shrink-0">OSINT</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline Events */}
          <Card>
            <CardContent className="pt-6 space-y-3">
              <Label className="text-sm font-semibold">タイムライン</Label>
              
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Badge variant="outline" className="shrink-0">2025-03-20</Badge>
                  <p className="text-sm">初回投稿を確認</p>
                </div>
                <div className="flex gap-3">
                  <Badge variant="outline" className="shrink-0">2025-03-20</Badge>
                  <p className="text-sm">検証作業を開始</p>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                イベントを追加
              </Button>
            </CardContent>
          </Card>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">検証メモ</Label>
            <Textarea
              id="notes"
              placeholder="検証作業のメモ、注意点、次のステップなど..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              キャンセル
            </Button>
            <Button onClick={handleSave}>
              保存
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
