import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/AuthDialog";
import { User, Users, Crown, Heart, Shield, Building, UserPlus, CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function JoinMovement() {
  const [selectedRole, setSelectedRole] = useState<"admin" | "member" | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleRoleSelect = (role: "admin" | "member") => {
    setSelectedRole(role);
    setShowAuthDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-primary dark:from-background dark:via-muted/20 dark:to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 dark:bg-primary/5 rounded-full blur-3xl -translate-y-64 translate-x-64"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 dark:bg-accent/5 rounded-full blur-2xl translate-y-64 -translate-x-32"></div>
      
      <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/15 dark:bg-card border border-white/25 dark:border-border rounded-full px-8 py-4 text-white dark:text-foreground font-semibold mb-8 backdrop-blur-sm">
            <Heart className="w-6 h-6" />
            <span className="text-lg">Join the Community</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-white dark:text-foreground mb-8 leading-tight">
            Choose Your <span className="bg-gradient-to-r from-white to-white/80 dark:from-primary dark:to-accent bg-clip-text text-transparent">Path</span>
          </h1>
          <p className="text-2xl lg:text-3xl text-white/90 dark:text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Whether you're leading a church community or joining as a member, ChurchConnect empowers meaningful connections
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Church Admin Option */}
          <Card className="border-0 shadow-2xl hover:shadow-3xl hover-lift bg-white/95 dark:bg-card backdrop-blur-sm group cursor-pointer overflow-hidden relative"
                onClick={() => handleRoleSelect("admin")}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="pb-8 relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-center mb-4">Church Administrator</CardTitle>
              <p className="text-xl text-muted-foreground text-center leading-relaxed">
                Lead your congregation and coordinate community outreach
              </p>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Building className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-lg">Manage church profile and information</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-lg">Oversee member registration and verification</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-lg">Coordinate community needs and responses</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-lg">Access advanced ministry tools and analytics</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
                <h4 className="font-bold text-lg mb-2 text-primary">Perfect for:</h4>
                <p className="text-muted-foreground">Pastors, ministry leaders, and church staff who want to streamline community care and expand their church's impact</p>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white text-xl py-6 rounded-xl shadow-lg"
              >
                <Crown className="w-5 h-5 mr-3" />
                Start as Church Admin
              </Button>
            </CardContent>
          </Card>

          {/* Church Member Option */}
          <Card className="border-0 shadow-2xl hover:shadow-3xl hover-lift bg-white/95 dark:bg-card backdrop-blur-sm group cursor-pointer overflow-hidden relative"
                onClick={() => handleRoleSelect("member")}>
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="pb-8 relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <User className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-center mb-4">Church Member</CardTitle>
              <p className="text-xl text-muted-foreground text-center leading-relaxed">
                Connect with your church family and serve your community
              </p>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-lg">Request help when you need support</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <UserPlus className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-lg">Volunteer to help others in your community</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-lg">Connect with other church members</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-lg">Join community events and service projects</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-6 border border-accent/20">
                <h4 className="font-bold text-lg mb-2 text-accent">Perfect for:</h4>
                <p className="text-muted-foreground">Church members who want to strengthen community bonds and participate in meaningful service opportunities</p>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent-hover hover:to-primary-hover text-white text-xl py-6 rounded-xl shadow-lg"
              >
                <User className="w-5 h-5 mr-3" />
                Join as Member
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Security Notice */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="col-span-2">
              <Link to="/safety-trust" className="block w-full">
                <Card className="border border-white/80 dark:border-border shadow-xl bg-white/60 dark:bg-card/60 backdrop-blur-md w-full cursor-pointer transition-transform hover:-translate-y-1">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Safe & Verified Community</h3>
                    <div className="text-lg text-muted-foreground leading-relaxed space-y-2">
                      <div>All church administrators are verified before approval.</div>
                      <div>Members are connected only within their verified church communities.</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AuthDialog 
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        initialMode="signup"
        redirectTo="/dashboard"
      />
    </div>
  );
}