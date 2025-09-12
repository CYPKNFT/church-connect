import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Shield, Target, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-subtle-gradient">
      <div className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="text-center mb-32 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-6 py-3 text-accent font-medium mb-12">
            <Sparkles className="w-5 h-5" />
            <span>Our Story</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-bold text-foreground mb-12 leading-tight">
            About <span className="bg-accent-gradient bg-clip-text text-transparent">ChurchConnect</span>
          </h1>
          <p className="text-2xl lg:text-3xl text-muted-foreground max-w-5xl mx-auto leading-relaxed">
            Transforming church communities through meaningful connections, acts of service, and shared love. 
            We believe in the extraordinary power of ordinary people helping one another in Christ's name.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-32 animate-fade-in">
          <div className="relative bg-warm-gradient rounded-[3.5rem] p-16 lg:p-24 text-white overflow-hidden border-2 border-blue-400/80">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary/85"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white/90 font-medium mb-8">
                <Target className="w-5 h-5" />
                <span>Our Purpose</span>
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold mb-12 text-white">Our Mission</h2>
              <p className="text-2xl lg:text-3xl leading-relaxed max-w-5xl mx-auto text-gray-100">
                To create a transformative digital platform where church communities can easily connect, 
                share their needs, and offer help to one another—fostering deeper relationships 
                and demonstrating Christ's love through practical, life-changing service.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-32 animate-slide-up relative">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-accent/30 to-primary/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-primary/20 to-accent/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
          </div>
        
          <div className="relative z-10">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-4 text-accent font-semibold mb-8 shadow-lg hover:bg-white/15 transition-all duration-300">
                <Heart className="w-6 h-6" />
                <span className="text-lg">What Drives Us</span>
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-8">
                Our <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient">Core Values</span>
              </h2>
              <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                The principles that guide everything we do in building stronger, more connected communities
              </p>
            </div>
        
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Love in Action Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center hover:bg-white/15 transition-all duration-500 shadow-2xl hover:shadow-accent/20 hover:-translate-y-2 group">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-accent/20">
                    <Heart className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-foreground">Love in Action</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Demonstrating Christ's love through practical acts of service, genuine kindness, and unconditional care for one another.
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
        
              {/* Strong Community Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center hover:bg-white/15 transition-all duration-500 shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 group">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-primary/20">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-foreground">Strong Community</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Building bridges between church members, creating lasting relationships, and fostering a true sense of belonging and family.
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
        
              {/* Trust & Safety Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center hover:bg-white/15 transition-all duration-500 shadow-2xl hover:shadow-green-500/20 hover:-translate-y-2 group">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-500/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-green-500/20">
                    <Shield className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-foreground">Trust & Safety</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed min-h-[120px] flex items-center">
                    Creating a secure, verified environment where people feel comfortable sharing their needs and offering their gifts.
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
        
              {/* Purposeful Service Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center hover:bg-white/15 transition-all duration-500 shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 group">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-purple-500/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-purple-500/20">
                    <Target className="w-10 h-10 text-purple-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-foreground">Purposeful Service</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Empowering every church member to discover meaningful ways to serve others and use their unique gifts for Kingdom impact.
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-32 animate-scale-in">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div>
                <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-6 py-3 text-accent font-medium mb-8">
                  <Heart className="w-5 h-5" />
                  <span>Our Beginning</span>
                </div>
                <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-8">
                  Our <span className="bg-accent-gradient bg-clip-text text-transparent">Story</span>
                </h2>
                <div className="space-y-8 text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                  <p>
                    ChurchConnect was born from a profound observation: churches are filled with people 
                    who genuinely want to help and people who desperately need assistance, but they often remain unaware of each other.
                  </p>
                  <p>
                    We've witnessed elderly members struggling with groceries while young families actively seek 
                    ways to serve. We've seen skilled handymen wanting to contribute while single mothers 
                    face home repairs alone, unsure where to turn for help.
                  </p>
                  <p>
                    Our platform eliminates these barriers, making it effortless for church communities to connect, 
                    support one another, and live out Christ's love in practical, transformative ways that build lasting relationships.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-accent/10 rounded-3xl p-16 border border-accent/20 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="text-center space-y-10 relative z-10">
                  <div className="w-24 h-24 bg-accent/20 rounded-3xl flex items-center justify-center mx-auto">
                    <Heart className="w-12 h-12 text-accent" />
                  </div>
                  <blockquote className="text-3xl lg:text-4xl font-bold text-foreground leading-relaxed">
                    "Bear one another's burdens, and so fulfill the law of Christ."
                  </blockquote>
                  <cite className="block text-2xl text-accent font-semibold">
                    — Galatians 6:2
                  </cite>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="mb-32 animate-fade-in">
          <div className="relative bg-gradient-to-br from-accent/10 to-primary/10 rounded-3xl p-16 lg:p-24 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-6 py-3 text-accent font-medium mb-8">
                  <Target className="w-5 h-5" />
                  <span>Making a Difference</span>
                </div>
                <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-8">
                  Community <span className="bg-accent-gradient bg-clip-text text-transparent">Impact</span>
                </h2>
                <p className="text-2xl text-muted-foreground max-w-4xl mx-auto">
                  See how ChurchConnect is strengthening communities across the country
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mb-20">
                <Card className="border-0 shadow-card bg-white text-center p-12">
                  <CardContent>
                    <div className="text-6xl font-bold text-accent mb-4">12,000+</div>
                    <h3 className="text-2xl font-semibold text-foreground mb-4">Needs Fulfilled</h3>
                    <p className="text-lg text-muted-foreground">
                      Acts of service completed through our platform, touching thousands of lives
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card bg-white text-center p-12">
                  <CardContent>
                    <div className="text-6xl font-bold text-accent mb-4">500+</div>
                    <h3 className="text-2xl font-semibold text-foreground mb-4">Church Partners</h3>
                    <p className="text-lg text-muted-foreground">
                      Churches using ChurchConnect to strengthen their communities nationwide
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card bg-white text-center p-12">
                  <CardContent>
                    <div className="text-6xl font-bold text-accent mb-4">50,000+</div>
                    <h3 className="text-2xl font-semibold text-foreground mb-4">Active Members</h3>
                    <p className="text-lg text-muted-foreground">
                      Church members actively serving and supporting one another daily
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Testimonials Section */}
              <div className="text-center mb-16">
                <h3 className="text-4xl font-bold text-foreground mb-6">
                  Stories from Our <span className="bg-accent-gradient bg-clip-text text-transparent">Community</span>
                </h3>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Real testimonies of lives changed through ChurchConnect
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          </div>
        </section>
      </div>
    </div>
  );
}