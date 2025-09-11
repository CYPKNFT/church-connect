import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, User, Settings, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
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
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-card bg-white mb-8">
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
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile Settings
                </Button>
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