import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Calendar, MessageSquare, Car, ShoppingCart, Wrench, ChefHat, HandHeart, Baby } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-hero-gradient overflow-hidden">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <div className="pt-8">
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  Connect Hearts,
                  <br />
                  <span className="text-accent">Share Hope</span>
                </h1>
                <p className="text-xl text-white/90 leading-relaxed mt-6">
                  Join your church community in sharing God's love through acts of service. 
                  Post your needs or volunteer to help others in our caring network.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="default" size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/register">Join Our Community</Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                  <Link to="/browse">Browse Needs</Link>
                </Button>
              </div>
            </div>
            <div className="lg:order-2">
              <img 
                src={heroImage} 
                alt="Church community helping each other" 
                className="rounded-lg shadow-card w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How ChurchConnect Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, secure, and designed with love for our church community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-gentle hover:shadow-card transition-all duration-200 text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Car className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Transportation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Rides to appointments, church, or errands for those who need a lift.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-gentle hover:shadow-card transition-all duration-200 text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle className="text-lg">Groceries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Shopping assistance for elderly, busy families, or those unable to get out.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-gentle hover:shadow-card transition-all duration-200 text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-lg">Home Repairs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fix leaky faucets, change light bulbs, or tackle bigger home projects.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-gentle hover:shadow-card transition-all duration-200 text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ChefHat className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Meals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Meal trains for new babies, illness recovery, or just showing love.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-gentle hover:shadow-card transition-all duration-200 text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Baby className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle className="text-lg">Childcare</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Babysitting, school pickups, or watching kids during appointments.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-gentle hover:shadow-card transition-all duration-200 text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <HandHeart className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-lg">Prayer & Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Emotional support, prayer requests, and spiritual encouragement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-warm-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of church members who are already sharing God's love through ChurchConnect
          </p>
          <Button variant="default" size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
            <Link to="/register">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}