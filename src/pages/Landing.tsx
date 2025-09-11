import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Calendar, MessageSquare, Car, ShoppingCart, Wrench, ChefHat, HandHeart, Baby, Plus, BookOpen, Shield, Target } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";


export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-hero-gradient overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left animate-fade-in">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-4 py-2 text-accent font-medium">
                  <Heart className="w-4 h-4" />
                  <span>Building Stronger Communities</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Need Help?
                  <br />
                  <span className="bg-accent-gradient bg-clip-text text-transparent">Want to Help?</span>
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl">
                  Connect with your community in minutes. Post what you need or volunteer to help others. 
                  Real neighbors helping real neighbors.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-foreground font-bold px-10 py-6 text-lg rounded-xl shadow-lg hover-lift" 
                  asChild
                >
                  <Link to="/register">
                    <Plus className="w-5 h-5 mr-3" />
                    Join Church
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-primary/60 bg-primary/20 text-white backdrop-blur-sm px-10 py-6 text-lg rounded-xl glass-effect hover:bg-primary/30 inline-flex items-center gap-2" 
                  asChild
                >
                  <Link to="/browse">
                    <Target className="w-5 h-5" />
                    Browse & Help
                  </Link>
                </Button>
              </div>
            </div>
            <div className="lg:order-2 animate-scale-in">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-3xl transform scale-110"></div>
                <img 
                  src={heroImage} 
                  alt="Church community helping each other" 
                  className="relative rounded-3xl shadow-card w-full hover-lift"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-subtle-gradient relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 text-accent font-medium mb-6">
              <Users className="w-4 h-4" />
              <span>Community Impact</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Ways to <span className="bg-accent-gradient bg-clip-text text-transparent">Connect & Serve</span>
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover meaningful ways to support your church family through simple acts of kindness
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
            <Card className="border-0 shadow-card hover:shadow-accent hover-lift glass-effect bg-accent/10 backdrop-blur-sm border border-accent/20 group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/30 transition-colors">
                  <Car className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Transportation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Provide rides to appointments, church services, or grocery runs for those in need.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift glass-effect bg-accent/10 backdrop-blur-sm border border-accent/20 group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/30 transition-colors">
                  <ShoppingCart className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Groceries & Errands</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Help with shopping, pharmacy visits, and essential errands for busy families.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift glass-effect bg-accent/10 backdrop-blur-sm border border-accent/20 group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/30 transition-colors">
                  <Wrench className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Home Repairs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Share your skills to fix household issues, from simple repairs to bigger projects.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift glass-effect bg-accent/10 backdrop-blur-sm border border-accent/20 group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/30 transition-colors">
                  <ChefHat className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Meals & Hospitality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Organize meal trains for new parents, illness recovery, or times of need.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift glass-effect bg-accent/10 backdrop-blur-sm border border-accent/20 group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/30 transition-colors">
                  <Baby className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Childcare Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Offer babysitting, school pickups, or playdates to support busy parents.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift glass-effect bg-accent/10 backdrop-blur-sm border border-accent/20 group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/30 transition-colors">
                  <HandHeart className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Prayer & Encouragement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Provide spiritual support, prayer, and encouragement during different times.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift glass-effect bg-accent/10 backdrop-blur-sm border border-accent/20 group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/30 transition-colors">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Social Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Provide companionship, organize social events, and combat loneliness in the community.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift glass-effect bg-accent/10 backdrop-blur-sm border border-accent/20 group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/30 transition-colors">
                  <Calendar className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Life Transitions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Support during major life changes like moving, job loss, or family transitions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift glass-effect bg-accent/10 backdrop-blur-sm border border-accent/20 group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/30 transition-colors">
                  <MessageSquare className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Digital Assistance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Help with technology, online forms, video calls, and digital literacy needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 text-accent font-medium mb-6">
              <Heart className="w-4 h-4" />
              <span>Community Stories</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Real Stories of <span className="bg-accent-gradient bg-clip-text text-transparent">God's Love</span>
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              See how ChurchConnect is bringing our community together in beautiful ways
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-white group">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="text-accent text-4xl mb-4">"</div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    "When my husband was in the hospital, our church family brought meals for two weeks. ChurchConnect made it so easy to coordinate everything. We felt so loved."
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-accent font-bold">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Sarah Miller</p>
                    <p className="text-sm text-muted-foreground">Grace Community Church</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-white group">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="text-accent text-4xl mb-4">"</div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    "I've been able to help three families with home repairs this month. It's amazing how technology can connect us to serve others right in our neighborhood."
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-accent font-bold">MJ</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Mike Johnson</p>
                    <p className="text-sm text-muted-foreground">First Baptist Church</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-white group">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="text-accent text-4xl mb-4">"</div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    "As a single mom, I was hesitant to ask for help. ChurchConnect made it comfortable and showed me how much our church really cares."
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-accent font-bold">LC</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Linda Chen</p>
                    <p className="text-sm text-muted-foreground">Community Fellowship</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Start Guides Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-accent/5 to-primary/5 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 text-accent font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              <span>Quick Start Guides</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Everything You Need to <span className="bg-accent-gradient bg-clip-text text-transparent">Get Started</span>
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Step-by-step guides to help you make the most of ChurchConnect
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
            <Link to="/guides?tab=getting-started">
              <Card className="border-0 shadow-card hover:shadow-accent hover-lift glass-effect bg-primary/5 backdrop-blur-sm border border-primary/20 group cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold text-center">Getting Started Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    Learn how to set up your profile and start connecting with your church community
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/guides?tab=volunteers">
              <Card className="border-0 shadow-card hover:shadow-accent hover-lift glass-effect bg-primary/5 backdrop-blur-sm border border-primary/20 group cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold text-center">Best Practices for Volunteers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    Tips for being an effective and trusted volunteer in your community
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/guides?tab=safety">
              <Card className="border-0 shadow-card hover:shadow-accent hover-lift glass-effect bg-primary/5 backdrop-blur-sm border border-primary/20 group cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold text-center">Safety Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    Important safety tips for both those requesting and offering help
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/guides?tab=communication">
              <Card className="border-0 shadow-card hover:shadow-accent hover-lift glass-effect bg-primary/5 backdrop-blur-sm border border-primary/20 group cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors">
                    <MessageSquare className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold text-center">Communication Etiquette</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    How to communicate effectively and respectfully through the platform
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-warm-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-4 py-2 text-accent font-medium mb-8">
              <Heart className="w-4 h-4" />
              <span>Join the Movement</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Get Started in 
              <span className="bg-accent-gradient bg-clip-text text-transparent"> 30 Seconds</span>
            </h2>
            <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Post your first need or volunteer opportunity right now. No complicated setup, no long forms. Just real help for real people.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up">
              <Button 
                size="lg" 
                className="bg-white hover:bg-white/90 text-primary font-bold px-12 py-6 text-xl rounded-2xl shadow-xl hover-lift" 
                asChild
              >
                <Link to="/post">
                  <Plus className="w-5 h-5 mr-3" />
                  Post Your Need
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-12 py-6 text-xl rounded-2xl" 
                asChild
              >
                <Link to="/browse">Find Ways to Help</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}