import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TwoLevelNav } from "@/components/TwoLevelNav";
import {
  Settings,
  Shield,
  Bell,
  Users,
  Database,
  Key,
  Mail,
  Smartphone,
  Globe,
  Clock,
  Save,
  RotateCcw,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Server
} from "lucide-react";

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    // General Settings
    churchName: "Community Church",
    churchDescription: "A welcoming community focused on serving others",
    timezone: "America/New_York",
    language: "en",
    maintenanceMode: false,
    
    // Security Settings
    requireEmailVerification: true,
    requirePhoneVerification: false,
    enableTwoFactor: true,
    sessionTimeout: 30,
    passwordComplexity: "medium",
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    digestFrequency: "weekly",
    
    // User Settings
    allowSelfRegistration: true,
    requireAdminApproval: true,
    defaultUserRole: "member",
    maxUsersPerChurch: 500,
    
    // Integration Settings
    enableGoogleMaps: true,
    enableCalendarSync: false,
    enableEmailIntegration: true,
    apiRateLimit: 1000
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log("Saving settings:", settings);
  };

  const handleResetSettings = () => {
    // Reset to defaults logic here
    console.log("Resetting settings");
  };

  const handleExportSettings = () => {
    // Export settings logic here
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'system-settings.json';
    link.click();
  };

  return (
    <TwoLevelNav activeMenuId="admin" activeSubItemPath="/admin/settings">
      <div className="p-6 lg:p-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
            </div>
            <p className="text-muted-foreground">
              Configure platform settings, manage integrations, and control system behavior
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleExportSettings}>
              <Download className="h-4 w-4 mr-2" />
              Export Settings
            </Button>
            <Button variant="outline" onClick={handleResetSettings}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button onClick={handleSaveSettings}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">System Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <p className="text-sm font-semibold text-success">Operational</p>
                  </div>
                </div>
                <Server className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold">89</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
                  <p className="text-2xl font-bold">2.4GB</p>
                  <p className="text-xs text-muted-foreground">of 10GB</p>
                </div>
                <Database className="h-8 w-8 text-info" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Backup</p>
                  <p className="text-sm font-semibold">2 hours ago</p>
                  <p className="text-xs text-muted-foreground">Automatic</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Integrations
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Church Information</CardTitle>
                  <CardDescription>Basic information about your church</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="churchName">Church Name</Label>
                    <Input
                      id="churchName"
                      value={settings.churchName}
                      onChange={(e) => handleSettingChange("churchName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="churchDescription">Description</Label>
                    <Textarea
                      id="churchDescription"
                      value={settings.churchDescription}
                      onChange={(e) => handleSettingChange("churchDescription", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      value={settings.timezone}
                      onChange={(e) => handleSettingChange("timezone", e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Preferences</CardTitle>
                  <CardDescription>Platform behavior and display settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Default Language</Label>
                    <select
                      id="language"
                      value={settings.language}
                      onChange={(e) => handleSettingChange("language", e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Temporarily disable public access
                      </p>
                    </div>
                    <Switch
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                    />
                  </div>
                  {settings.maintenanceMode && (
                    <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-warning" />
                        <p className="text-sm font-medium text-warning">Maintenance Mode Active</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Only administrators can access the platform
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Authentication Settings
                  </CardTitle>
                  <CardDescription>Configure user authentication requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Verification Required</Label>
                      <p className="text-sm text-muted-foreground">
                        Users must verify email before access
                      </p>
                    </div>
                    <Switch
                      checked={settings.requireEmailVerification}
                      onCheckedChange={(checked) => handleSettingChange("requireEmailVerification", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Phone Verification Required</Label>
                      <p className="text-sm text-muted-foreground">
                        Require phone number verification
                      </p>
                    </div>
                    <Switch
                      checked={settings.requirePhoneVerification}
                      onCheckedChange={(checked) => handleSettingChange("requirePhoneVerification", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable 2FA for enhanced security
                      </p>
                    </div>
                    <Switch
                      checked={settings.enableTwoFactor}
                      onCheckedChange={(checked) => handleSettingChange("enableTwoFactor", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Password & Session Settings
                  </CardTitle>
                  <CardDescription>Password requirements and session management</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleSettingChange("sessionTimeout", parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passwordComplexity">Password Complexity</Label>
                    <select
                      id="passwordComplexity"
                      value={settings.passwordComplexity}
                      onChange={(e) => handleSettingChange("passwordComplexity", e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="low">Low (8+ characters)</option>
                      <option value="medium">Medium (8+ chars, mixed case)</option>
                      <option value="high">High (12+ chars, mixed case, symbols)</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Channels
                  </CardTitle>
                  <CardDescription>Configure available notification methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Send notifications via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      <div className="space-y-0.5">
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Browser push notifications</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Digest Settings</CardTitle>
                  <CardDescription>Configure notification frequency and batching</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="digestFrequency">Digest Frequency</Label>
                    <select
                      id="digestFrequency"
                      value={settings.digestFrequency}
                      onChange={(e) => handleSettingChange("digestFrequency", e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="immediate">Immediate</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Settings */}
          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Registration
                  </CardTitle>
                  <CardDescription>Control how new users can join your platform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Self Registration</Label>
                      <p className="text-sm text-muted-foreground">
                        Users can create accounts themselves
                      </p>
                    </div>
                    <Switch
                      checked={settings.allowSelfRegistration}
                      onCheckedChange={(checked) => handleSettingChange("allowSelfRegistration", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require Admin Approval</Label>
                      <p className="text-sm text-muted-foreground">
                        New accounts need admin approval
                      </p>
                    </div>
                    <Switch
                      checked={settings.requireAdminApproval}
                      onCheckedChange={(checked) => handleSettingChange("requireAdminApproval", checked)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultUserRole">Default User Role</Label>
                    <select
                      id="defaultUserRole"
                      value={settings.defaultUserRole}
                      onChange={(e) => handleSettingChange("defaultUserRole", e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="member">Member</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="staff">Staff</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Limits</CardTitle>
                  <CardDescription>Set limits for user capacity and permissions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxUsersPerChurch">Maximum Users Per Church</Label>
                    <Input
                      id="maxUsersPerChurch"
                      type="number"
                      value={settings.maxUsersPerChurch}
                      onChange={(e) => handleSettingChange("maxUsersPerChurch", parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Current Usage</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "39%" }}></div>
                      </div>
                      <span className="text-sm text-muted-foreground">195 / 500</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Integration Settings */}
          <TabsContent value="integrations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    External Services
                  </CardTitle>
                  <CardDescription>Configure third-party service integrations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Google Maps Integration</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable location services and maps
                      </p>
                    </div>
                    <Switch
                      checked={settings.enableGoogleMaps}
                      onCheckedChange={(checked) => handleSettingChange("enableGoogleMaps", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Calendar Sync</Label>
                      <p className="text-sm text-muted-foreground">
                        Sync with external calendar services
                      </p>
                    </div>
                    <Switch
                      checked={settings.enableCalendarSync}
                      onCheckedChange={(checked) => handleSettingChange("enableCalendarSync", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Integration</Label>
                      <p className="text-sm text-muted-foreground">
                        Connect with email service providers
                      </p>
                    </div>
                    <Switch
                      checked={settings.enableEmailIntegration}
                      onCheckedChange={(checked) => handleSettingChange("enableEmailIntegration", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Configuration</CardTitle>
                  <CardDescription>Configure API access and rate limiting</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiRateLimit">API Rate Limit (requests/hour)</Label>
                    <Input
                      id="apiRateLimit"
                      type="number"
                      value={settings.apiRateLimit}
                      onChange={(e) => handleSettingChange("apiRateLimit", parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">API Usage Today</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full" style={{ width: "23%" }}></div>
                      </div>
                      <span className="text-sm text-muted-foreground">230 / 1000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Save Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>Manage your system configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Button onClick={handleSaveSettings} size="lg">
                <Save className="h-4 w-4 mr-2" />
                Save All Settings
              </Button>
              <Button variant="outline" onClick={handleResetSettings} size="lg">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Defaults
              </Button>
              <Button variant="outline" onClick={handleExportSettings} size="lg">
                <Download className="h-4 w-4 mr-2" />
                Export Configuration
              </Button>
              <Button variant="outline" size="lg">
                <Upload className="h-4 w-4 mr-2" />
                Import Configuration
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </TwoLevelNav>
  );
}