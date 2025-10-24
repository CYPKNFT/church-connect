import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Calendar, MessageSquare, Car, ShoppingCart, Wrench, ChefHat, HandHeart, Baby, Plus, BookOpen, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { AuthDialog } from "@/components/AuthDialog";


export default function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [redirectTo, setRedirectTo] = useState<string>("");
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      content: "When my husband was in the hospital, our church family brought meals for two weeks. ChurchConnect made it so easy to coordinate everything. We felt so loved.",
      author: "Sarah Miller",
      church: "Grace Community Church",
      initials: "SM"
    },
    {
      id: 2,
      content: "I've been able to help three families with home repairs this month. It's amazing how technology can connect us to serve others right in our neighborhood.",
      author: "Mike Johnson",
      church: "First Baptist Church",
      initials: "MJ"
    },
    {
      id: 3,
      content: "As a single mom, I was hesitant to ask for help. ChurchConnect made it comfortable and showed me how much our church really cares.",
      author: "Linda Chen",
      church: "Community Fellowship",
      initials: "LC"
    },
    {
      id: 4,
      content: "Our elderly neighbor needed rides to her doctor appointments. Through ChurchConnect, I found other volunteers to help share the responsibility. It's been such a blessing.",
      author: "David Thompson",
      church: "Hope Baptist Church",
      initials: "DT"
    },
    {
      id: 5,
      content: "When my car broke down, I posted a need for transportation. Within hours, three different church members offered to help. The love and support overwhelmed me.",
      author: "Jennifer Rodriguez",
      church: "Faith Community Church",
      initials: "JR"
    },
    {
      id: 6,
      content: "I've been volunteering to help with childcare during church events. The platform makes it so easy to coordinate schedules and ensure every family is supported.",
      author: "Amanda Foster",
      church: "Grace Lutheran Church",
      initials: "AF"
    },
    {
      id: 7,
      content: "After my surgery, I couldn't cook for weeks. ChurchConnect connected me with families who brought meals. It was like having extended family care for me.",
      author: "Robert Kim",
      church: "New Life Community",
      initials: "RK"
    },
    {
      id: 8,
      content: "I love using ChurchConnect to find ways to serve. Last month I helped with yard work for a senior couple. The joy on their faces was priceless.",
      author: "Maria Garcia",
      church: "St. Mary's Catholic Church",
      initials: "MG"
    },
    {
      id: 9,
      content: "When I moved to a new city, ChurchConnect helped me connect with my new church family immediately. I found ways to serve and made lifelong friends.",
      author: "James Wilson",
      church: "New Hope Community Church",
      initials: "JW"
    },
    {
      id: 10,
      content: "Our church used ChurchConnect to coordinate meals for a family going through chemotherapy. The outpouring of love and support was overwhelming.",
      author: "Patricia Davis",
      church: "Grace United Methodist",
      initials: "PD"
    },
    {
      id: 11,
      content: "I'm a retired teacher and love helping families with tutoring. ChurchConnect makes it easy to find students who need academic support in our community.",
      author: "Dr. Michael Brown",
      church: "First Presbyterian Church",
      initials: "MB"
    },
    {
      id: 12,
      content: "As a single parent, I was struggling to balance work and childcare. ChurchConnect connected me with other parents for playdates and mutual support.",
      author: "Rachel Martinez",
      church: "Community Bible Church",
      initials: "RM"
    }
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const nextTestimonials = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % totalPages);
  };

  const prevTestimonials = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleProtectedNavigation = (path: string) => {
    if (user) {
      navigate(path);
    } else {
      setRedirectTo(path);
      setAuthDialogOpen(true);
    }
  };

  const handleFindWaysToHelp = () => {
    if (user) {
      navigate("/my-church");
    } else {
      setRedirectTo("/my-church");
      setAuthDialogOpen(true);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #059669 100%)' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10"></div>
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left animate-fade-in">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white font-medium">
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
              <div className="flex flex-col sm:flex-row gap-6 animate-slide-up">
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-white/90 text-primary font-bold px-12 py-6 text-xl rounded-2xl shadow-xl hover-lift"
                  onClick={() => handleProtectedNavigation("/post")}
                >
                  <Plus className="w-5 h-5 mr-3" />
                  Post Your Need
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-12 py-6 text-xl rounded-2xl"
                  onClick={() => handleProtectedNavigation("/browse")}
                >
                  Find Ways to Help
                </Button>
              </div>
            </div>
            <div className="lg:order-2 animate-scale-in">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-3xl transform scale-110"></div>
                <img 
                  src={heroImage} 
                  alt="Church community helping each other" 
                  width="1200"
                  height="900"
                  fetchpriority="high"
                  decoding="async"
                  className="relative rounded-3xl shadow-card w-full max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-muted/20 to-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-primary font-medium mb-6">
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
            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
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

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
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

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
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

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
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

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
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

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <HandHeart className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Prayer & Encouragement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Provide spiritual support, prayer, and encouragement during difficult times.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <MessageSquare className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Technology Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Help with computer repairs, tech setup, and digital literacy for seniors and families.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Moving & Logistics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Assist with moving, heavy lifting, and organizational support for life transitions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <BookOpen className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Education & Tutoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Provide academic support, tutoring, and educational resources for students of all ages.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-primary font-medium mb-6">
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
          
          <div className="relative">
            {/* Testimonials Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up items-stretch">
              {testimonials
                .slice(currentTestimonialIndex * itemsPerPage, (currentTestimonialIndex + 1) * itemsPerPage)
                .map((testimonial) => (
                  <Card key={testimonial.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-card group h-full flex flex-col min-h-[280px]">
                    <CardContent className="p-8 flex flex-col flex-1">
                      <div className="mb-6 flex-1">
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          "{testimonial.content}"
                        </p>
                      </div>
                      <div className="flex items-center mt-auto">
                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                          <span className="text-accent font-bold">{testimonial.initials}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.church}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center mt-8 space-x-8">
              {/* Left Arrow */}
              <button
                onClick={prevTestimonials}
                className="bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="w-6 h-6 text-primary" />
              </button>
              
              {/* Page Indicators */}
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonialIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentTestimonialIndex
                        ? 'bg-primary scale-125'
                        : 'bg-primary/30 hover:bg-primary/50'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={nextTestimonials}
                className="bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110"
                aria-label="Next testimonials"
              >
                <ChevronRight className="w-6 h-6 text-primary" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Guides Section */}
      <section className="py-20 lg:py-32 pb-32 lg:pb-40 bg-gradient-to-br from-muted/10 via-background to-muted/5 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-primary font-medium mb-6">
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
              <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card group cursor-pointer h-full">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                    <Users className="w-8 h-8 text-accent" />
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
              <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card group cursor-pointer h-full">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                    <Heart className="w-8 h-8 text-accent" />
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
              <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card group cursor-pointer h-full">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                    <Shield className="w-8 h-8 text-accent" />
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
              <Card className="border-0 shadow-card hover:shadow-accent hover-lift bg-card group cursor-pointer h-full">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                    <MessageSquare className="w-8 h-8 text-accent" />
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
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10"></div>
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
                onClick={() => handleProtectedNavigation("/post")}
              >
                <Plus className="w-5 h-5 mr-3" />
                Post Your Need
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-12 py-6 text-xl rounded-2xl"
                onClick={handleFindWaysToHelp}
              >
                Find Ways to Help
              </Button>
            </div>
          </div>
        </div>
      </section>

      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen}
        redirectTo={redirectTo}
      />
    </div>
  );
}