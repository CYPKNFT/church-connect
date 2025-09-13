import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Heart, Plus, Home, Settings, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthDialog } from "./AuthDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-warm-gradient rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white dark:text-yellow-400" />
          </div>
          <span className="text-xl font-bold text-foreground">ChurchConnect</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium">
            About
          </Link>
          <Link to="/how-it-works" className="text-foreground hover:text-primary transition-colors font-medium">
            How It Works
          </Link>
          <Link to="/community" className="text-foreground hover:text-primary transition-colors font-medium">
            Community
          </Link>
          <Link to="/churches" className="text-foreground hover:text-primary transition-colors font-medium">
            Churches
          </Link>
          <Link to="/support" className="text-foreground hover:text-primary transition-colors font-medium">
            Support
          </Link>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center space-x-3">
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
            Post a Need
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary/40 hover:bg-primary/5">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-background border border-border shadow-lg">
                <DropdownMenuItem asChild>
                  <Link to="/my-church" className="flex items-center cursor-pointer">
                    <Heart className="w-4 h-4 mr-2" />
                    My Church
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center cursor-pointer">
                    <Home className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => signOut()}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => {
                  setAuthMode("signup");
                  setShowAuthDialog(true);
                }}
              >
                Join Free
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-primary/20 hover:border-primary/40 hover:bg-primary/5" 
                onClick={() => {
                  setAuthMode("signin");
                  setShowAuthDialog(true);
                }}
              >
                Sign In
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
              to="/about" 
              className="block text-foreground hover:text-primary transition-colors font-medium py-3"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/how-it-works" 
              className="block text-foreground hover:text-primary transition-colors font-medium py-3"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="/community" 
              className="block text-foreground hover:text-primary transition-colors font-medium py-3"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <Link 
              to="/churches" 
              className="block text-foreground hover:text-primary transition-colors font-medium py-3"
              onClick={() => setIsMenuOpen(false)}
            >
              Churches
            </Link>
            <Link 
              to="/support" 
              className="block text-foreground hover:text-primary transition-colors font-medium py-3"
              onClick={() => setIsMenuOpen(false)}
            >
              Support
            </Link>
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
                Post a Need
              </Button>
              {user ? (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/my-church" onClick={() => setIsMenuOpen(false)}>
                      <Heart className="w-4 h-4 mr-2" />
                      My Church
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <Home className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/settings" onClick={() => setIsMenuOpen(false)}>
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="text-destructive hover:text-destructive"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => {
                      setAuthMode("signup");
                      setShowAuthDialog(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    Join Free
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setAuthMode("signin");
                      setShowAuthDialog(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign In
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
        redirectTo="/dashboard"
        initialMode={authMode}
      />
    </header>
  );
}