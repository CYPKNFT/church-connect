import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, Plus, ChevronDown, Search, Video, HelpCircle, TrendingUp, BarChart3, Newspaper, Users, BookOpen, MessageSquare, Phone } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthDialog } from "./AuthDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-warm-gradient rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">ChurchConnect</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {/* Find Help */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium">
              Find Help <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-background border border-border shadow-lg">
              <DropdownMenuItem asChild>
                <Link to="/browse" className="flex items-center gap-2 cursor-pointer">
                  <Search className="w-4 h-4" />
                  Browse Needs
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/browse/categories" className="flex items-center gap-2 cursor-pointer">
                  <BarChart3 className="w-4 h-4" />
                  By Category
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/browse/search" className="flex items-center gap-2 cursor-pointer">
                  <Search className="w-4 h-4" />
                  Search & Filters
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Offer Help */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium">
              Offer Help <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-background border border-border shadow-lg">
              <DropdownMenuItem asChild>
                <Link to="/volunteer" className="flex items-center gap-2 cursor-pointer">
                  <Heart className="w-4 h-4" />
                  Volunteer Opportunities
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/guides?tab=getting-started" className="flex items-center gap-2 cursor-pointer">
                  <BookOpen className="w-4 h-4" />
                  Volunteer Quick Start
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/safety-trust" className="flex items-center gap-2 cursor-pointer">
                  <Users className="w-4 h-4" />
                  Safety for Helpers
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* How It Works */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium">
              How It Works <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-background border border-border shadow-lg">
              <DropdownMenuItem asChild>
                <Link to="/about" className="flex items-center gap-2 cursor-pointer">
                  <BarChart3 className="w-4 h-4" />
                  3-Step Process
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/explainer" className="flex items-center gap-2 cursor-pointer">
                  <Video className="w-4 h-4" />
                  Explainer Video
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/faq" className="flex items-center gap-2 cursor-pointer">
                  <HelpCircle className="w-4 h-4" />
                  FAQ
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Impact */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium">
              Impact <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-background border border-border shadow-lg">
              <DropdownMenuItem asChild>
                <Link to="/stories" className="flex items-center gap-2 cursor-pointer">
                  <Heart className="w-4 h-4" />
                  Stories & Testimonials
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/metrics" className="flex items-center gap-2 cursor-pointer">
                  <TrendingUp className="w-4 h-4" />
                  Metrics & Reports
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/press" className="flex items-center gap-2 cursor-pointer">
                  <Newspaper className="w-4 h-4" />
                  Press & Media
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* For Churches */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium">
              For Churches <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-background border border-border shadow-lg">
              <DropdownMenuItem asChild>
                <Link to="/invite-church" className="flex items-center gap-2 cursor-pointer">
                  <Users className="w-4 h-4" />
                  Invite Your Church
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/leader-resources" className="flex items-center gap-2 cursor-pointer">
                  <BookOpen className="w-4 h-4" />
                  Leader Resources
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/case-studies" className="flex items-center gap-2 cursor-pointer">
                  <BarChart3 className="w-4 h-4" />
                  Case Studies
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Support */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium">
              Support <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-background border border-border shadow-lg">
              <DropdownMenuItem asChild>
                <Link to="/help" className="flex items-center gap-2 cursor-pointer">
                  <HelpCircle className="w-4 h-4" />
                  Help Center
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/guides" className="flex items-center gap-2 cursor-pointer">
                  <BookOpen className="w-4 h-4" />
                  Getting Started
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/safety-trust" className="flex items-center gap-2 cursor-pointer">
                  <Users className="w-4 h-4" />
                  Safety & Trust
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/guides?tab=communication" className="flex items-center gap-2 cursor-pointer">
                  <MessageSquare className="w-4 h-4" />
                  Communication
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/guides?tab=serving-well" className="flex items-center gap-2 cursor-pointer">
                  <Heart className="w-4 h-4" />
                  Serving Well
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/guides?tab=troubleshooting" className="flex items-center gap-2 cursor-pointer">
                  <HelpCircle className="w-4 h-4" />
                  Troubleshooting
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/contact" className="flex items-center gap-2 cursor-pointer">
                  <Phone className="w-4 h-4" />
                  Contact Support
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dashboard (only for authenticated users) */}
          {user && (
            <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors font-medium">
              Dashboard
            </Link>
          )}
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <>
              <Button 
                className="bg-primary hover:bg-primary-hover text-white shadow-md hover:shadow-lg transition-all" 
                size="sm" 
                onClick={() => navigate('/post')}
              >
                <Plus className="w-4 h-4 mr-1" />
                Post Need
              </Button>
              <div className="flex items-center gap-3">
                <Link to="/profile" className="text-foreground hover:text-primary transition-colors font-medium">
                  Profile
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => signOut()}
                  className="border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                >
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button 
                className="bg-primary hover:bg-primary-hover text-white shadow-md hover:shadow-lg transition-all" 
                size="sm" 
                onClick={() => {
                  if (!user) {
                    setShowAuthDialog(true);
                  } else {
                    navigate('/post');
                  }
                }}
              >
                <Plus className="w-4 h-4 mr-1" />
                Post Need
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-primary/20 hover:border-primary/40 hover:bg-primary/5" 
                asChild
              >
                <Link to="/login">Sign In</Link>
              </Button>
              <Button variant="secondary" size="sm" asChild>
                <Link to="/register">Join Free</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              to="/browse" 
              className="block text-foreground hover:text-primary transition-colors font-medium py-3"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Help
            </Link>
            <Link 
              to="/volunteer" 
              className="block text-foreground hover:text-primary transition-colors font-medium py-3"
              onClick={() => setIsMenuOpen(false)}
            >
              Offer Help
            </Link>
            <Link 
              to="/about" 
              className="block text-foreground hover:text-primary transition-colors font-medium py-3"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="/stories" 
              className="block text-foreground hover:text-primary transition-colors font-medium py-3"
              onClick={() => setIsMenuOpen(false)}
            >
              Impact
            </Link>
            <Link 
              to="/invite-church" 
              className="block text-foreground hover:text-primary transition-colors font-medium py-3"
              onClick={() => setIsMenuOpen(false)}
            >
              For Churches
            </Link>
            <Link 
              to="/help" 
              className="block text-foreground hover:text-primary transition-colors font-medium py-3"
              onClick={() => setIsMenuOpen(false)}
            >
              Support
            </Link>
            {user && (
              <Link 
                to="/dashboard" 
                className="block text-foreground hover:text-primary transition-colors font-medium py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <div className="flex flex-col space-y-3 pt-6 border-t border-border">
              <Button 
                className="bg-primary hover:bg-primary-hover text-white shadow-md" 
                size="sm" 
                onClick={() => {
                  setIsMenuOpen(false);
                  if (!user) {
                    setShowAuthDialog(true);
                  } else {
                    navigate('/post');
                  }
                }}
              >
                <Plus className="w-4 h-4 mr-1" />
                Post Need
              </Button>
              {user ? (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                  </Button>
                  <Button variant="secondary" size="sm" asChild>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>Join Free</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        redirectTo="/post"
      />
    </header>
  );
}