import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Settings, Webhook, Mail, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSettings = ({ isOpen, onClose }: AdminSettingsProps) => {
  const [webhookUrl, setWebhookUrl] = useState("https://hooks.zapier.com/hooks/catch/24006790/u4ufyst/");
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const { toast } = useToast();

 

  const handleSaveWebhook = () => {
    localStorage.setItem('quickmart_webhook_url', webhookUrl);
    toast({
      title: "Settings Saved",
      description: "Zapier webhook URL has been saved successfully.",
    });
  };

  const handleTestWebhook = async () => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter your Zapier webhook URL first",
        variant: "destructive",
      });
      return;
    }

    setIsTestingWebhook(true);

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          test: true,
          message: "Test notification from QuickMart Pusad",
          timestamp: new Date().toISOString(),
          triggered_from: window.location.origin,
        }),
      });

      toast({
        title: "Test Request Sent",
        description: "Check your Zap's history to confirm the webhook is working.",
      });
    } catch (error) {
      console.error("Error testing webhook:", error);
      toast({
        title: "Error",
        description: "Failed to test webhook. Please check the URL.",
        variant: "destructive",
      });
    } finally {
      setIsTestingWebhook(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Admin Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Webhook Setup */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Webhook className="w-4 h-4" />
              <h3 className="font-semibold">Order Notifications</h3>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="webhook">Zapier Webhook URL</Label>
              <Input
                id="webhook"
                type="url"
                placeholder="https://hooks.zapier.com/hooks/catch/..."
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleSaveWebhook}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  Save URL
                </Button>
                <Button 
                  onClick={handleTestWebhook}
                  variant="outline"
                  size="sm"
                  disabled={isTestingWebhook}
                  className="flex-1"
                >
                  {isTestingWebhook ? "Testing..." : "Test"}
                </Button>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-secondary/20 p-4 rounded-lg space-y-3">
            <h4 className="font-medium text-sm">Setup Instructions:</h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <Mail className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span><strong>Email:</strong> Create a Zap with Webhook → Gmail</span>
              </div>
              <div className="flex items-start gap-2">
                <FileSpreadsheet className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span><strong>Excel:</strong> Create a Zap with Webhook → Google Sheets</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Copy the webhook URL from your Zap and paste it above.
            </p>
          </div>

          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};