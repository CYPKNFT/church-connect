import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Heart } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <Link to="/browse" className="text-foreground hover:text-primary transition-colors">
            Browse Needs
          </Link>
          <Link to="/post" className="text-foreground hover:text-primary transition-colors">
            Post a Need
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            About Us
          </Link>
          <Link to="/help" className="text-foreground hover:text-primary transition-colors">
            Help
          </Link>
          <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
            Dashboard
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Button variant="gentle" size="sm" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button variant="hero" size="sm" asChild>
            <Link to="/register">Join Community</Link>
          </Button>
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
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Needs
            </Link>
            <Link 
              to="/post" 
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Post a Need
            </Link>
            <Link 
              to="/about" 
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/help" 
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Help
            </Link>
            <Link 
              to="/dashboard" 
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t border-border">
              <Button variant="gentle" size="sm" asChild>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
              </Button>
              <Button variant="hero" size="sm" asChild>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>Join Community</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}