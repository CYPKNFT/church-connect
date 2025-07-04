import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Shield, Target, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-subtle-gradient">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 text-accent font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Our Story</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
            About <span className="bg-accent-gradient bg-clip-text text-transparent">ChurchConnect</span>
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Transforming church communities through meaningful connections, acts of service, and shared love. 
            We believe in the extraordinary power of ordinary people helping one another in Christ's name.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-24 animate-fade-in">
          <div className="relative bg-primary rounded-3xl p-12 lg:p-16 text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">Our Mission</h2>
              <p className="text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto">
                To create a transformative digital platform where church communities can easily connect, 
                share their needs, and offer help to one another—fostering deeper relationships 
                and demonstrating Christ's love through practical, life-changing service.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-24 animate-slide-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Our <span className="bg-accent-gradient bg-clip-text text-transparent">Core Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do in building stronger communities
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/80 backdrop-blur-sm group text-center">
              <CardHeader className="pb-4">
                <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <Heart className="w-10 h-10 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold">Love in Action</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Demonstrating Christ's love through practical acts of service and genuine kindness.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/80 backdrop-blur-sm group text-center">
              <CardHeader className="pb-4">
                <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <Users className="w-10 h-10 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold">Strong Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Building deeper connections and lasting relationships within church families.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/80 backdrop-blur-sm group text-center">
              <CardHeader className="pb-4">
                <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <Shield className="w-10 h-10 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold">Trust & Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Creating a secure environment where people feel comfortable sharing their needs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-white/80 backdrop-blur-sm group text-center">
              <CardHeader className="pb-4">
                <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <Target className="w-10 h-10 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold">Purposeful Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Enabling every church member to discover meaningful ways to serve others.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-24 animate-scale-in">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Our <span className="bg-accent-gradient bg-clip-text text-transparent">Story</span>
                </h2>
                <div className="space-y-6 text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  <p>
                    ChurchConnect was born from a profound observation: churches are filled with people 
                    who genuinely want to help and people who desperately need help, but they often remain unaware of each other.
                  </p>
                  <p>
                    We've witnessed elderly members struggling with groceries while young families actively seek 
                    ways to serve. We've seen skilled handymen wanting to contribute while single mothers 
                    face home repairs alone, unsure where to turn.
                  </p>
                  <p>
                    Our platform eliminates these barriers, making it effortless for church communities to connect, 
                    support one another, and live out Christ's love in practical, transformative ways.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-primary/5 rounded-3xl p-12 border border-accent/20 backdrop-blur-sm">
                <div className="text-center space-y-8">
                  <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto">
                    <Heart className="w-10 h-10 text-accent" />
                  </div>
                  <blockquote className="text-2xl lg:text-3xl font-bold text-foreground leading-relaxed">
                    "Bear one another's burdens, and so fulfill the law of Christ."
                  </blockquote>
                  <cite className="block text-xl text-accent font-semibold">
                    — Galatians 6:2
                  </cite>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}