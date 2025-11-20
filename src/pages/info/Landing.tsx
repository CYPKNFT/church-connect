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

  // Import testimonials from Community page successStories
  const communityTestimonials = [
    {
      id: 1,
      content: "I help with transportation requests weekly. Whether it's doctor visits or job interviews, giving someone a ride can literally change the trajectory of their day - and sometimes their life.",
      author: "Maria Williams", 
      church: "St. Luke's Community",
      avatar: "MW"
    },
    {
      id: 2,
      content: "ChurchConnect has revolutionized how our congregation connects and serves. We've facilitated over 200 acts of service this quarter alone. It's like having a full-time ministry coordinator in everyone's pocket.",
      author: "Pastor Tom Richards",
      church: "Hillside Christian Church",
      avatar: "PT"
    },
    {
      id: 3,
      content: "The transparency and ease of the platform has increased our community engagement by 300%. Members who never participated before are now actively giving and receiving help regularly.",
      author: "Lisa Stevens",
      church: "Covenant Community Church", 
      avatar: "LS"
    },
    {
      id: 4,
      content: "When my teenage son needed a laptop for college applications, I hesitated to ask. A church family donated their extra MacBook within hours. He's now enrolled at his dream school.",
      author: "Carlos Delgado",
      church: "Faith Community Church",
      avatar: "CD"
    },
    {
      id: 5,
      content: "Hurricane damage left us without basic appliances. Through ChurchConnect, our church family furnished our entire kitchen in three days. We were able to host Thanksgiving after all.",
      author: "Nancy Kim",
      church: "Seaside Chapel",
      avatar: "NK"
    },
    {
      id: 6,
      content: "I've donated over 20 items this year through the platform. Seeing families receive exactly what they need, when they need it most, reminds me that our excess can be someone else's miracle.",
      author: "Kevin Carter",
      church: "Cornerstone Baptist",
      avatar: "KC"
    },
    {
      id: 7,
      content: "I coordinate our monthly grocery drives through the app. Last month we organized 50 volunteers across 8 churches to serve 200 families. The efficiency of connecting so many willing hearts in one place is remarkable.",
      author: "Amanda Lopez",
      church: "Riverside Community Church",
      avatar: "AL"
    },
    {
      id: 8,
      content: "When Mrs. Patterson needed her yard cleaned before winter, I saw her request and spent my Saturday morning raking leaves with my kids. Teaching them to serve while building relationships - that's what community is about.",
      author: "David Wilson",
      church: "New Hope Fellowship",
      avatar: "DW"
    },
    {
      id: 9,
      content: "I teach basic computer skills to seniors every Tuesday through the app. Watching 73-year-old Frank learn to email his grandson in college was worth every minute I've invested.",
      author: "Jennifer Chen",
      church: "CrossPoint Church",
      avatar: "JC"
    },
    {
      id: 10,
      content: "Our neighborhood food prep team meets weekly to make meals for new moms. Through ChurchConnect, we've coordinated 150 home-cooked meals this quarter. It's fellowship with a purpose.",
      author: "Betty Thompson",
      church: "Grace Community Church",
      avatar: "BT"
    },
    {
      id: 11,
      content: "I help drive church members to medical appointments twice a week. Being the friendly face in the waiting room or helping someone navigate their insurance forms - these small acts create lasting bonds.",
      author: "Sofia Patel",
      church: "Unity Christian Church",
      avatar: "SP"
    },
    {
      id: 12,
      content: "Every Saturday, I help elderly members with basic home maintenance - changing light bulbs, unclogging drains, fixing squeaky doors. My toolbox has become my ministry toolkit.",
      author: "James Robinson",
      church: "First Methodist",
      avatar: "JR"
    },
    {
      id: 13,
      content: "I teach cooking classes for college students and young adults through the platform. Nothing beats seeing someone master their grandmother's recipe or learn to meal prep for the week.",
      author: "Tom Richards",
      church: "Hillside Christian Church",
      avatar: "TR"
    },
    {
      id: 14,
      content: "Our carpool network for after-school activities has been a game-changer. Working parents support each other seamlessly, and the kids have built friendships across church families.",
      author: "Emily Rodriguez",
      church: "Grace Fellowship",
      avatar: "ER"
    },
    {
      id: 15,
      content: "I offer free tax preparation for church families during tax season. It's incredible how helping someone navigate their finances becomes an opportunity for deeper conversations about stewardship and planning.",
      author: "Mark Harris",
      church: "Community Baptist",
      avatar: "MH"
    },
    {
      id: 16,
      content: "Teaching guitar lessons to teenagers through the app has been amazing. Music brings us together across generations, and now we have a youth band that plays monthly at service.",
      author: "Janet Kim",
      church: "Riverside Community",
      avatar: "JK"
    },
    {
      id: 17,
      content: "I help families organize their homes and create functional spaces. Decluttering isn't just about stuff - it's about creating peaceful environments where families can thrive together.",
      author: "Tyler Jackson",
      church: "Mountain View Church",
      avatar: "TJ"
    },
    {
      id: 18,
      content: "Our reading tutoring program connects literacy volunteers with struggling students. Watching kids gain confidence with each book we read together reminds me why education is so powerful.",
      author: "Amanda Lopez",
      church: "Riverside Community Church",
      avatar: "AL"
    },
    {
      id: 19,
      content: "When I was recovering from surgery, church members rotated helping with my dog walks and grocery runs. The coordination was flawless, and I felt so supported during a vulnerable time.",
      author: "Jennifer Chen",
      church: "CrossPoint Church",
      avatar: "JC"
    },
    {
      id: 20,
      content: "The childcare swap network has been incredible for our family. Parents help each other with date nights and errands, and our kids have formed the sweetest friendships.",
      author: "David Wilson", 
      church: "New Hope Fellowship",
      avatar: "DW"
    },
    {
      id: 21,
      content: "Learning to garden from experienced church members has transformed my backyard and my perspective. Now I'm teaching my neighbor kids how to grow their own vegetables.",
      author: "Carlos Delgado",
      church: "Faith Community Church",
      avatar: "CD"
    },
    {
      id: 22,
      content: "The resume writing and interview prep I received helped me land my current job. But more than that, it taught me how to present my best self with confidence.",
      author: "Nancy Kim",
      church: "Seaside Chapel",
      avatar: "NK"
    }
  ];

  // Transform to match Landing page format
  const testimonials = communityTestimonials.map((testimonial) => ({
    id: testimonial.id,
    content: testimonial.content,
    author: testimonial.author,
    church: testimonial.church,
    initials: testimonial.avatar
  }));

  const itemsPerPage = 4;
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
      <section className="relative overflow-hidden min-h-screen flex items-center bg-[linear-gradient(135deg,#2563eb_0%,#059669_100%)] dark:bg-[linear-gradient(135deg,#2d1b69_0%,#8b4513_100%)]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 dark:from-white/10 dark:to-secondary/5"></div>
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
                  fetchPriority="high"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up items-stretch">
              {testimonials
                .slice(currentTestimonialIndex * itemsPerPage, (currentTestimonialIndex + 1) * itemsPerPage)
                .map((testimonial) => (
                  <Card key={testimonial.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-card group h-full flex flex-col min-h-[200px]">
                    <CardContent className="p-6 flex flex-col flex-1">
                      <div className="mb-4 flex-1">
                        <p className="text-base text-muted-foreground leading-relaxed">
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
                className="bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 dark:bg-card dark:hover:bg-muted/20 dark:border dark:border-border/20"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="w-6 h-6 text-primary dark:text-foreground" />
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
                className="bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 dark:bg-card dark:hover:bg-muted/20 dark:border dark:border-border/20"
                aria-label="Next testimonials"
              >
                <ChevronRight className="w-6 h-6 text-primary dark:text-foreground" />
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
      <section className="py-20 lg:py-32 bg-[linear-gradient(135deg,#2563eb_0%,#059669_100%)] dark:bg-[linear-gradient(135deg,#2d1b69_0%,#8b4513_100%)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 dark:from-white/10 dark:to-secondary/5"></div>
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
                className="bg-white hover:bg-white/80 text-slate-900 font-bold px-12 py-6 text-xl rounded-2xl shadow-xl hover-lift"
                onClick={() => handleProtectedNavigation("/post")}
              >
                <Plus className="w-5 h-5 mr-3 text-slate-900" />
                Post Your Need
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white/30 text-white hover:text-accent hover:bg-white/10 backdrop-blur-sm px-12 py-6 text-xl rounded-2xl"
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