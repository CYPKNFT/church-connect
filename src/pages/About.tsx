import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Shield, Target } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            About ChurchConnect
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Strengthening church communities through acts of service, love, and support. 
            We believe in the power of neighbors helping neighbors in Christ's name.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-warm-gradient rounded-2xl p-8 lg:p-12 text-white">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl leading-relaxed max-w-4xl mx-auto">
                To create a digital platform where church communities can easily connect, 
                share their needs, and offer help to one another, fostering deeper relationships 
                and demonstrating Christ's love through practical service.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-foreground mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="shadow-gentle hover:shadow-card transition-all duration-200 text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Love in Action</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Demonstrating Christ's love through practical acts of service and kindness.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-gentle hover:shadow-card transition-all duration-200 text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-xl">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Building stronger connections and relationships within church families.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-gentle hover:shadow-card transition-all duration-200 text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">Trust & Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Creating a safe environment where people feel comfortable asking for help.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-gentle hover:shadow-card transition-all duration-200 text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Purpose</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Enabling every church member to find meaningful ways to serve others.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  ChurchConnect was born from a simple observation: churches are filled with people 
                  who want to help and people who need help, but they often don't know about each other.
                </p>
                <p>
                  We've seen elderly members struggle with groceries while young families look for 
                  ways to serve. We've witnessed skilled handymen wanting to help while single mothers 
                  deal with home repairs alone.
                </p>
                <p>
                  Our platform bridges these gaps, making it easy for church communities to connect, 
                  support one another, and live out the love of Christ in practical, meaningful ways.
                </p>
              </div>
            </div>
            <div className="bg-hero-gradient rounded-2xl p-8 text-white">
              <blockquote className="text-xl italic leading-relaxed">
                "Bear one another's burdens, and so fulfill the law of Christ."
              </blockquote>
              <cite className="block mt-4 text-accent font-semibold">
                — Galatians 6:2
              </cite>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}