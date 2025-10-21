import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, User, Calendar, Share2, BookOpen, Heart, Users, Shield, MessageSquare, Search, CheckCircle, Edit3, Settings, AlertTriangle, Handshake, Filter, Bell, BarChart3, Lock, MapPin, Target, Star, UserCheck, Award, Zap, HelpCircle, FileText, Lightbulb, Phone, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function TemplateArticle() {
  const { articleId } = useParams();

  // Mock article data - in a real app, this would come from a CMS or API
  const articleData = {
    id: articleId || "finding-needs",
    title: "Finding Needs That Match Your Skills",
    subtitle: "Every act of service begins with recognizing where your unique gifts can make a difference",
    category: "Serving Others",
    readTime: "8 min read",
    lastUpdated: "December 2024",
    author: "ChurchConnect Team",
    content: "This article content is now handled by the JSX structure below.",
    tags: ["serving", "volunteering", "community", "skills"],
    relatedArticles: [
      { id: "committing-to-help", title: "Committing to Help", category: "Serving Others" },
      { id: "what-to-bring", title: "What to Bring & What to Expect", category: "Serving Others" },
      { id: "declining-gracefully", title: "Declining or Backing Out Gracefully", category: "Serving Others" }
    ]
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "getting started":
        return Users;
      case "safety":
        return Shield;
      case "communication":
        return MessageSquare;
      case "features":
        return Settings;
      case "community":
        return Heart;
      case "advanced":
        return Zap;
      default:
        return BookOpen;
    }
  };

  const CategoryIcon = getCategoryIcon(articleData.category);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Gradient */}
      <section className="relative py-16 overflow-hidden" style={{ background: 'linear-gradient(135deg, #059669 0%, #2563eb 100%)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(5,150,105,0.9) 0%, rgba(37,99,235,0.9) 100%)' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link 
              to="/all-guides" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Guides
            </Link>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-2 text-white font-medium mb-6 backdrop-blur-sm">
              <CategoryIcon className="w-4 h-4" />
              <span>{articleData.category}</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {articleData.title}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              {articleData.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{articleData.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{articleData.lastUpdated}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{articleData.author}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            {/* Article Content */}
            <div className="space-y-12">
              {/* Introduction */}
              <div className="bg-gradient-to-r from-primary/5 to-secondary/10 dark:from-white/10 dark:to-secondary/5 rounded-2xl p-8 border border-primary/10 dark:border-white/10">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Every church has members who need help—a ride to the doctor, an extra hand during a move, a warm meal after surgery. Others stand ready to serve but don't know where to start. ChurchConnect bridges this gap by making it simple to find needs that align with your skills and calling.
                </p>
              </div>

              {/* Service Categories Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-white/20 rounded-xl flex items-center justify-center">
                    <Search className="w-6 h-6 text-primary dark:text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Discovering Service Categories</h2>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  When you log into ChurchConnect, you'll find five main categories reflecting everyday church needs. Transportation covers rides for seniors, single parents, or anyone without reliable wheels. Meals and hospitality includes home-cooked dinners, event setup, or grocery delivery. Childcare support helps families during small groups, church events, or emergencies. Handyman and home needs tap your practical skills for repairs, assembly, or maintenance others can't handle alone. Prayer and encouragement offers spiritual and emotional support—sometimes the most powerful service isn't physical.
                </p>

                <div className="bg-gradient-to-r from-primary/5 to-secondary/10 dark:from-white/10 dark:to-secondary/5 rounded-xl p-6 border-l-4 border-primary">
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="text-primary dark:text-white font-semibold">Pro Tip:</span> Start by choosing one category that matches your strongest skills, then gradually expand your comfort zone.
                  </p>
                </div>
              </div>

              {/* Smart Matching Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-white/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary dark:text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Smart Matching Through Your Profile</h2>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  ChurchConnect's matching system highlights needs that fit your profile. Add your skills, location, and availability to get personalized suggestions. The platform considers your distance preferences, time constraints, and expertise areas to show relevant opportunities. This saves time while creating meaningful connections between helpers and receivers.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Before committing to any need, take a moment to pray and reflect. Ask God where He wants to use your gifts. The most rewarding service often comes when your skills meet someone's real, heartfelt need.
                </p>
              </div>

              {/* Realistic Commitments Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-white/20 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-primary dark:text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Choosing Realistic Commitments</h2>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  As you review available opportunities, read each request carefully. Ensure you fully understand what's being asked and can deliver on your promise. Choose opportunities that align with your schedule and comfort level. Don't be afraid to start small—even one hour of your time can make a real difference.
                </p>
                
                <div className="bg-gradient-to-r from-secondary/5 to-primary/10 dark:from-white/10 dark:to-secondary/5 rounded-xl p-6">
                  <p className="text-muted-foreground leading-relaxed italic">
                    Serving well isn't about volume. It's about intention. A single act done with love often has more impact than a dozen done out of obligation.
                  </p>
                </div>
              </div>

              {/* Building Trust Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-white/20 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary dark:text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Building Trust Through Reliability</h2>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Every connection you make through ChurchConnect strengthens your church family. When you serve, you're embodying Christ's command to love one another. Each smile, conversation, and shared moment of care builds the body of Christ in visible, tangible ways.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Reliability builds trust. When you follow through on commitments, receivers feel valued and helpers gain confidence. This creates a cycle of mutual support that transforms individual acts into lasting relationships.
                </p>

                {/* Scripture Blockquote */}
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-white/10 dark:to-secondary/5 rounded-2xl p-8 border border-primary/20 dark:border-white/20 shadow-lg">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <BookOpen className="w-8 h-8 text-primary dark:text-white" />
                    </div>
                    <blockquote className="text-xl text-foreground italic leading-relaxed mb-4">
                      &ldquo;As each has received a gift, use it to serve one another, as good stewards of God&rsquo;s varied grace.&rdquo;
                    </blockquote>
                    <footer className="text-muted-foreground font-medium">— 1 Peter 4:10</footer>
                  </div>
                </div>
              </div>

              {/* Safety Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-white/20 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary dark:text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Safety Through Church Verification</h2>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  ChurchConnect prioritizes safety through church verification. All helpers and receivers must be verified members of participating churches. This creates a trusted environment where you can serve with confidence. Use in-app messaging to communicate before meeting in person. Always meet in public places for first-time connections.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Your church admin can help address any concerns about safety or appropriate behavior. The platform's verification system ensures you're serving within a safe church help network.
                </p>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-center shadow-xl mb-32">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Serving?</h3>
                <p className="text-white/90 text-lg leading-relaxed mb-6">
                  Open ChurchConnect today and browse needs in your community—your unique gifts are waiting to make a difference.
                </p>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-xl shadow-lg font-semibold">
                  Get Started Today
                </Button>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Related Articles</h3>
              <div className="flex flex-wrap gap-4">
                {articleData.relatedArticles.map((article) => (
                  <Link 
                    key={article.id}
                    to={`/template-article/${article.id}`}
                    className="flex-1 min-w-[200px] p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <h4 className="font-medium text-foreground text-sm mb-1">
                      {article.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {article.category}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {articleData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Share this article</h3>
              <Button variant="outline" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}