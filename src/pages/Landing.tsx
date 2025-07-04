import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Calendar, MessageSquare, Car, ShoppingCart, Wrench, ChefHat, HandHeart, Baby } from "lucide-react";
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
                  Connect Hearts,
                  <br />
                  <span className="bg-accent-gradient bg-clip-text text-transparent">Share Hope</span>
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl">
                  Transform your church community through meaningful connections. 
                  Post your needs, volunteer to help, and experience God's love in action.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent-hover text-accent-foreground font-semibold px-8 py-6 text-lg rounded-xl shadow-accent hover-lift" 
                  asChild
                >
                  <Link to="/register">Join Our Community</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg rounded-xl glass-effect" 
                  asChild
                >
                  <Link to="/browse">Explore Needs</Link>
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
            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/80 backdrop-blur-sm group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <Car className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold">Transportation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Provide rides to appointments, church services, or grocery runs for those in need.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/80 backdrop-blur-sm group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <ShoppingCart className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold">Groceries & Errands</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Help with shopping, pharmacy visits, and essential errands for busy families.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/80 backdrop-blur-sm group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <Wrench className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold">Home Repairs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Share your skills to fix household issues, from simple repairs to bigger projects.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/80 backdrop-blur-sm group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <ChefHat className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold">Meals & Hospitality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Organize meal trains for new parents, illness recovery, or times of need.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/80 backdrop-blur-sm group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <Baby className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold">Childcare Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Offer babysitting, school pickups, or playdates to support busy parents.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/80 backdrop-blur-sm group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <HandHeart className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold">Prayer & Encouragement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Provide spiritual support, prayer, and encouragement during difficult times.
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
              Ready to Make a 
              <span className="bg-accent-gradient bg-clip-text text-transparent"> Real Difference?</span>
            </h2>
            <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of church members who are transforming their communities through acts of love and service
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent-hover text-accent-foreground font-bold px-10 py-6 text-xl rounded-2xl shadow-accent hover-lift" 
                asChild
              >
                <Link to="/register">Start Your Journey</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-10 py-6 text-xl rounded-2xl" 
                asChild
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}