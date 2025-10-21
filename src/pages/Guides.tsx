import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Users, 
  Shield, 
  MessageSquare, 
  Heart, 
  BookOpen, 
  Search,
  CheckCircle,
  Edit3,
  Settings,
  Clock,
  AlertTriangle,
  Handshake,
  Filter,
  Bell,
  BarChart3,
  Lock,
  MapPin,
  Calendar,
  Target,
  Star,
  UserCheck,
  Award,
  Zap,
  HelpCircle,
  FileText,
  Lightbulb,
  Phone
} from "lucide-react";

export default function Guides() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-primary font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            <span>ChurchConnect Guides</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Learn How to Make the Most of <span className="bg-gradient-primary bg-clip-text text-transparent">ChurchConnect</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive step-by-step guides to help you serve, connect, and build community through our platform
          </p>
        </div>

        {/* Serving Others Section */}
        <section className="mb-20 bg-gradient-to-r from-primary/5 to-secondary/10 dark:from-white/10 dark:to-secondary/5 rounded-2xl py-12 px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">SERVING OTHERS</h2>
            <p className="text-lg text-muted-foreground">Learn how to effectively help your church community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/template-article/finding-needs">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-primary dark:text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Finding Needs That Match Your Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">Filter by categories like transportation, meals, childcare, handyman work, and more</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/template-article/committing-to-help">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Handshake className="w-8 h-8 text-primary dark:text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Committing to Help</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">How to respond to needs, coordinate timing, and follow through on your commitment</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/template-article/what-to-bring">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary dark:text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">What to Bring & What to Expect</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">Prepare for different types of service opportunities and understand boundaries</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/template-article/declining-gracefully">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Declining or Backing Out Gracefully</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">Life happens - how to cancel or adjust commitments without leaving someone stranded</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Asking for Help Section */}
        <section className="mb-20 bg-gradient-to-l from-primary/5 to-secondary/10 dark:from-white/10 dark:to-secondary/5 rounded-2xl py-12 px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">ASKING FOR HELP</h2>
            <p className="text-lg text-muted-foreground">Post requests that get results and build community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/template-article/what-kinds-of-needs">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">What Kinds of Needs to Post</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">Examples of practical needs that work well on ChurchConnect from meals to rides to repairs</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/template-article/writing-clear-posts">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Edit3 className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Writing Clear Need Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">Include the right details, timeframes, and specific skills required to get the best response</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/template-article/setting-expectations">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Setting Expectations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">How to communicate availability, preferences, and any special considerations upfront</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/template-article/when-no-one-responds">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <HelpCircle className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">When No One Responds</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">What to do if your need isn't getting traction and alternative resources available</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* App Features Section */}
        <section className="mb-20 bg-gradient-to-r from-primary/5 to-secondary/10 dark:from-white/10 dark:to-secondary/5 rounded-2xl py-12 px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">APP FEATURES</h2>
            <p className="text-lg text-muted-foreground">Master the tools that make ChurchConnect work</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/template-article/secure-messaging">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Secure Messaging System</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">How to communicate, coordinate schedules, and share details without exposing personal info</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/template-article/smart-matching">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Smart Matching & Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">How needs are matched to helpers based on skills, location, and availability</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/template-article/need-categories">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Filter className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Need Categories & Filters</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">Browse by type of help needed, urgency level, and what skills are required</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/template-article/tracking-impact">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Tracking Your Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">View your service history, hours contributed, and lives touched through the platform</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Prayer & Spiritual Support Section */}
        <section className="mb-20 bg-gradient-to-l from-primary/5 to-secondary/10 dark:from-white/10 dark:to-secondary/5 rounded-2xl py-12 px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">PRAYER & SPIRITUAL SUPPORT</h2>
            <p className="text-lg text-muted-foreground">Connect spiritually and offer encouragement</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/template-article/posting-prayer-requests">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Posting Prayer Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">Share prayer needs with your church community and receive spiritual support</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/template-article/responding-to-prayer">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Responding to Prayer Needs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">How to pray for others, send encouragement, and offer spiritual support through the app</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/template-article/connecting-pastoral-care">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <UserCheck className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Connecting Pastoral Care</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">When and how to loop in church staff for counseling or deeper spiritual guidance</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/template-article/prayer-chains-updates">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Prayer Chains & Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">Keep your community updated on answered prayers and ongoing situations</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Staying Safe Section */}
        <section className="mb-20 bg-gradient-to-r from-primary/5 to-secondary/10 dark:from-white/10 dark:to-secondary/5 rounded-2xl py-12 px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">STAYING SAFE</h2>
            <p className="text-lg text-muted-foreground">Protect yourself and your family while serving</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/template-article/verification-background-checks">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Verification & Background Checks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">How church verification works and what security measures protect our community</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/template-article/safe-meeting-guidelines">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Safe Meeting Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">Best practices for first meetings, public locations, and bringing accountability partners</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/template-article/red-flags-warning-signs">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Red Flags & Warning Signs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">Recognizing suspicious behavior and when to report concerns to your church admin</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/template-article/privacy-data-protection">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Privacy & Data Protection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">What information is shared, who can see it, and how to control your visibility</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Building Community Section */}
        <section className="mb-16 bg-gradient-to-l from-primary/5 to-secondary/10 dark:from-white/10 dark:to-secondary/5 rounded-2xl py-12 px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">BUILDING COMMUNITY</h2>
            <p className="text-lg text-muted-foreground">Turn one-time help into lasting relationships</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/template-article/one-time-help-to-friendship">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">From One-Time Help to Friendship</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">How serving together creates natural opportunities for ongoing connection</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/template-article/creating-service-groups">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Creating Service Groups</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">Form teams around shared skills like cooking crews, moving teams, or repair squads</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/template-article/celebrating-wins-together">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Celebrating Wins Together</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">Share testimonies, recognize volunteers, and highlight the impact being made</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* For Church Leaders Section */}
        <section className="mb-16 bg-gradient-to-r from-primary/5 to-secondary/10 dark:from-white/10 dark:to-secondary/5 rounded-2xl py-12 px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">FOR CHURCH LEADERS</h2>
            <p className="text-lg text-muted-foreground">Launch and manage ChurchConnect in your congregation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/template-article/inviting-congregation">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Inviting Your Congregation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">Step-by-step rollout plan and announcement templates to launch ChurchConnect in your church</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/template-article/admin-dashboard-overview">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Admin Dashboard Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">Navigate member activity, monitor needs being fulfilled, and track community engagement metrics</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/template-article/integration-existing-ministries">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Integration with Existing Ministries</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">Connect ChurchConnect with your care teams, deacons, and volunteer coordinators</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/template-article/handling-sensitive-situations">
              <Card className="bg-card/80 backdrop-blur-sm border-gray-700 hover:bg-card/90 shadow-md transition-all duration-300 hover-lift h-full min-h-[280px]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Handling Sensitive Situations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">What to do when needs escalate beyond the app or require pastoral intervention</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}