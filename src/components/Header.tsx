import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Heart, Plus, Home, Settings, ChevronDown, Sun, Moon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
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
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-yellow-gradient rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
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
             Guides
           </Link>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {user && (
            <Button 
              className="bg-primary hover:bg-primary-hover text-white shadow-md hover:shadow-lg transition-all rounded-full px-6" 
              size="sm" 
              onClick={() => navigate('/post')}
            >
              Post a Need
            </Button>
          )}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary/40 hover:bg-primary/5 rounded-full px-6">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card/80 backdrop-blur-md border border-border/50 shadow-xl rounded-xl p-2">
                <DropdownMenuItem asChild>
                  <Link to="/my-church" className="flex items-center cursor-pointer px-3 py-2.5 hover:bg-accent/50 rounded-md transition-colors">
                    <Heart className="w-4 h-4 mr-2" />
                    My Church
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center cursor-pointer px-3 py-2.5 hover:bg-accent/50 rounded-md transition-colors">
                    <Home className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center cursor-pointer px-3 py-2.5 hover:bg-accent/50 rounded-md transition-colors">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={toggleTheme}
                  className="cursor-pointer flex items-center justify-between px-3 py-2.5 hover:bg-accent/50 rounded-md transition-colors"
                >
                  <div className="flex items-center">
                    {theme === 'light' ? (
                      <Moon className="w-4 h-4 mr-2 text-blue-600" />
                    ) : (
                      <Sun className="w-4 h-4 mr-2 text-amber-500" />
                    )}
                    <span className="font-medium">
                      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </span>
                  </div>
                  <div className={`w-10 h-5 rounded-full transition-colors duration-200 relative ${
                    theme === 'dark' ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200 absolute top-0.5 ${
                      theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'
                    }`} />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/50 my-2" />
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center cursor-pointer px-3 py-2.5 hover:bg-accent/50 rounded-md transition-colors">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/50 my-2" />
                <DropdownMenuItem 
                  onClick={() => signOut()}
                  className="cursor-pointer text-red-600 hover:bg-red-50/50 px-3 py-2.5 rounded-md transition-colors"
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
                Guides
             </Link>
            <div className="flex flex-col space-y-3 pt-6 border-t border-border">
              {user && (
                <Button 
                  className="bg-primary hover:bg-primary-hover text-white shadow-md" 
                  size="sm" 
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/post');
                  }}
                >
                  Post a Need
                </Button>
              )}
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