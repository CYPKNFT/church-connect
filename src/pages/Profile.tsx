import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, User, Mail, Church } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUserSettings } from "@/hooks/useUserSettings";
import { useMembership } from "@/hooks/useMembership";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function Profile() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const { settings, loading: settingsLoading, updateSettings } = useUserSettings();
  const { memberId, memberName, displayName, churchId, churchName, loading: membershipLoading } = useMembership();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: ""
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would implement the actual message sending
    toast({
      title: "Message Sent",
      description: "Your message has been sent to support. We'll get back to you soon!",
    });
    setContactForm({ subject: "", message: "" });
    setIsContactFormOpen(false);
  };

  const handleNotificationsChange = async (checked: boolean) => {
    await updateSettings({ push_notifications: checked });
  };

  const handleEmailUpdatesChange = async (checked: boolean) => {
    await updateSettings({ email_updates: checked });
  };

  const handleThemeToggle = async (checked: boolean) => {
    const newTheme = checked ? 'dark' : 'light';
    setTheme(newTheme);
    await updateSettings({ dark_mode: checked });
    toast({
      title: "Theme Updated",
      description: `Switched to ${newTheme} mode.`,
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-subtle-gradient flex items-center justify-center">
        <Card className="border-0 shadow-card bg-white max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-4">Sign In Required</h2>
            <p className="text-muted-foreground mb-6">Please sign in to view your profile</p>
            <Button asChild>
              <a href="/login">Sign In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-subtle-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Your Profile</h1>
          <p className="text-xl text-muted-foreground">Manage your account and get support</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Profile Information and Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <Card className="border-0 shadow-card bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      value={user.email || ""} 
                      disabled 
                      className="mt-2 bg-muted"
                    />
                  </div>
                  <div>
                    <Label htmlFor="joined">Member Since</Label>
                    <Input 
                      id="joined" 
                      value={new Date(user.created_at).toLocaleDateString()} 
                      disabled 
                      className="mt-2 bg-muted"
                    />
                  </div>
                </div>
                
                {/* Church Membership Information */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <Church className="w-5 h-5 text-primary" />
                    <Label className="text-base font-semibold">Church Membership</Label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="churchName">Church Name</Label>
                      <Input 
                        id="churchName" 
                        value={churchName || "Not assigned"} 
                        disabled 
                        className="mt-2 bg-muted"
                      />
                    </div>
                    <div>
                      <Label htmlFor="memberName">Member Name</Label>
                      <div className="mt-2 flex items-center gap-2">
                        <Input 
                          id="memberName" 
                          value={memberName || displayName || "Not set"} 
                          disabled 
                          className="bg-muted"
                        />
                        {memberId && (
                          <Badge variant="secondary" className="whitespace-nowrap">
                            Active Member
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  {!churchId && !membershipLoading && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-md border border-border">
                      <p className="text-sm text-muted-foreground">
                        You haven't joined a church yet. <Link to="/member-signup" className="text-primary hover:underline">Join a church</Link> to get started.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Account Settings */}
            <Card className="border-0 shadow-card bg-white">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Update your account details and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email || ""}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      type="text"
                      placeholder="Enter your display name"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="border-0 shadow-card bg-white">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Choose how you want to be notified about updates and activity.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <div className="text-sm text-muted-foreground">
                      Receive notifications about new needs and updates
                    </div>
                  </div>
                  <Switch
                    checked={settings.push_notifications}
                    onCheckedChange={handleNotificationsChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Updates</Label>
                    <div className="text-sm text-muted-foreground">
                      Get weekly updates about community activity
                    </div>
                  </div>
                  <Switch
                    checked={settings.email_updates}
                    onCheckedChange={handleEmailUpdatesChange}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card className="border-0 shadow-card bg-white">
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how the app looks and feels.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Dark Mode</Label>
                    <div className="text-sm text-muted-foreground">
                      Switch between light and dark themes
                    </div>
                  </div>
                  <Switch
                    checked={settings.dark_mode}
                    onCheckedChange={handleThemeToggle}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="border-0 shadow-card bg-white">
              <CardHeader>
                <CardTitle>Privacy</CardTitle>
                <CardDescription>
                  Control your privacy and data sharing preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  <p>
                    Your personal information is always kept private and secure. 
                    We only use your data to provide you with the best possible experience.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/privacy">Privacy Policy</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/terms">Terms of Service</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Support Section */}
          <div>
            <Card className="border-0 shadow-card bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Have questions or need assistance? Send us a message and we'll help you out.
                </p>
                
                {!isContactFormOpen ? (
                  <Button 
                    onClick={() => setIsContactFormOpen(true)}
                    className="w-full"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send us a Message
                  </Button>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="What can we help you with?"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                        className="mt-2"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Describe your question or issue..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        rows={4}
                        className="mt-2 resize-none"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" size="sm">
                        Send
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsContactFormOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}