import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";

export function SecuritySettings() {
  return (
    <GlassCard className="p-6">
      <h3 className="text-lg font-medium mb-4">Account Security</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">••••••••</span>
            <Button variant="outline" size="sm">Change Password</Button>
          </div>
        </div>

        <div className="pt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Two-Factor Authentication
          </label>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Not enabled</span>
            <Button variant="outline" size="sm">Enable 2FA</Button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
} 