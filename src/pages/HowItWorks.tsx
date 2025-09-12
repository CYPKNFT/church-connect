import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, Search, Heart, Users, Shield, MessageSquare, CheckCircle, User, Church } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="text-center mb-32 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-6 py-3 text-accent font-medium mb-12">
            <Heart className="w-5 h-5" />
            <span>Simple & Effective</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-bold text-foreground mb-12 leading-tight">
            How <span className="bg-accent-gradient bg-clip-text text-transparent">ChurchConnect</span> Works
          </h1>
          <p className="text-2xl lg:text-3xl text-muted-foreground max-w-5xl mx-auto leading-relaxed">
            Three simple steps to connect, serve, and build stronger relationships in your church community.
          </p>
        </div>

        {/* Three-Step Process */}
        <section className="mb-32 animate-slide-up">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-8">
              Getting Started is <span className="bg-accent-gradient bg-clip-text text-transparent">Simple</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto">
              Join thousands of church members already connecting and serving through ChurchConnect
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Step 1 */}
            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group text-center p-12">
              <CardHeader className="pb-8">
                <div className="w-32 h-32 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-accent mb-2">1</div>
                    <User className="w-12 h-12 text-accent mx-auto" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold mb-4">Create Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-xl leading-relaxed mb-6">
                  Sign up with your church community, verify your membership, and set up your profile with your skills and availability.
                </p>
                <ul className="text-left space-y-3 text-lg text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    Quick 2-minute setup
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    Church verification for trust
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    Share your unique skills
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group text-center p-12">
              <CardHeader className="pb-8">
                <div className="w-32 h-32 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-accent mb-2">2</div>
                    <div className="flex gap-2">
                      <Plus className="w-6 h-6 text-accent" />
                      <Search className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold mb-4">Post or Browse</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-xl leading-relaxed mb-6">
                  Either post a need you have or browse available opportunities to help others in your church community.
                </p>
                <ul className="text-left space-y-3 text-lg text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    Post needs in seconds
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    Browse by category or skill
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    Smart matching system
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group text-center p-12">
              <CardHeader className="pb-8">
                <div className="w-32 h-32 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-accent mb-2">3</div>
                    <Heart className="w-12 h-12 text-accent mx-auto" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold mb-4">Connect & Serve</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-xl leading-relaxed mb-6">
                  Use our secure messaging to coordinate, meet safely, and build lasting relationships through acts of service.
                </p>
                <ul className="text-left space-y-3 text-lg text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    Secure in-app messaging
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    Built-in safety guidelines
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    Build lasting friendships
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Video Section */}
        <section className="mb-32 animate-fade-in">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-8">
              See It in <span className="bg-accent-gradient bg-clip-text text-transparent">Action</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto">
              Watch how ChurchConnect transforms church communities
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 border border-accent/20">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-0 h-0 border-l-[12px] border-l-accent border-y-[8px] border-y-transparent ml-1"></div>
                  </div>
                  <p className="text-2xl font-semibold text-foreground">Coming Soon: Demo Video</p>
                  <p className="text-lg text-muted-foreground mt-2">See ChurchConnect in action</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-32 animate-slide-up">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-8">
              Built for <span className="bg-accent-gradient bg-clip-text text-transparent">Church Communities</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto">
              Every feature designed with church values and community safety in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group text-center p-8">
              <CardHeader className="pb-6">
                <div className="w-24 h-24 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
                  <Shield className="w-12 h-12 text-accent" />
                </div>
                <CardTitle className="text-2xl font-bold mb-4">Church Verified</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  All members are verified through their church for maximum trust and safety.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group text-center p-8">
              <CardHeader className="pb-6">
                <div className="w-24 h-24 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
                  <MessageSquare className="w-12 h-12 text-accent" />
                </div>
                <CardTitle className="text-2xl font-bold mb-4">Secure Messaging</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Private, secure messaging to coordinate help while protecting privacy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group text-center p-8">
              <CardHeader className="pb-6">
                <div className="w-24 h-24 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
                  <Users className="w-12 h-12 text-accent" />
                </div>
                <CardTitle className="text-2xl font-bold mb-4">Community Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Designed specifically for church communities to strengthen relationships.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group text-center p-8">
              <CardHeader className="pb-6">
                <div className="w-24 h-24 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
                  <Church className="w-12 h-12 text-accent" />
                </div>
                <CardTitle className="text-2xl font-bold mb-4">Church Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Seamlessly integrates with your church's existing ministries and programs.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center animate-fade-in">
          <div className="relative bg-warm-gradient rounded-3xl p-16 lg:p-24 text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary/85"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-5xl lg:text-6xl font-bold mb-8">Ready to Get Started?</h2>
              <p className="text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed">
                Join your church community today and start building meaningful connections through service.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-foreground font-bold px-12 py-6 text-xl rounded-xl shadow-lg hover-lift" 
                  asChild
                >
                  <Link to="/register">Join Free Today</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-12 py-6 text-xl rounded-xl" 
                  asChild
                >
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}