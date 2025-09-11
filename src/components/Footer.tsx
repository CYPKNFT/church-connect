import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0A2540] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Branding & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-accent" />
              <span className="text-xl font-bold">ChurchConnect</span>
            </div>
            <p className="text-accent font-medium">Stronger Together</p>
            <p className="text-gray-300 leading-relaxed">
              Helping churches connect, serve, and care for one another through simple acts of kindness.
            </p>
            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white" asChild>
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <h4 className="text-gray-400 font-medium text-sm uppercase tracking-wide">Navigation</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-gray-300 hover:text-accent transition-colors">Home</Link>
                <Link to="/browse" className="block text-gray-300 hover:text-accent transition-colors">Find Help</Link>
                <Link to="/post" className="block text-gray-300 hover:text-accent transition-colors">Post a Need</Link>
                <Link to="/about" className="block text-gray-300 hover:text-accent transition-colors">How It Works</Link>
                <Link to="/help" className="block text-gray-300 hover:text-accent transition-colors">Support / Help Center</Link>
              </div>
            </div>
          </div>

          {/* Column 3: Trust Pages */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Trust Pages</h3>
            <div className="space-y-2">
              <Link to="/safety-trust" className="block text-gray-300 hover:text-accent transition-colors">Safety & Trust</Link>
              <Link to="/guides?tab=communication" className="block text-gray-300 hover:text-accent transition-colors">Community Guidelines</Link>
              <Link to="/privacy" className="block text-gray-300 hover:text-accent transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="block text-gray-300 hover:text-accent transition-colors">Terms of Service</Link>
            </div>
          </div>

          {/* Column 4: For Churches */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">For Churches</h3>
            <div className="space-y-2">
              <h4 className="text-gray-400 font-medium text-sm uppercase tracking-wide">Church Admin Tools</h4>
              <div className="space-y-2">
                <Link to="/dashboard" className="block text-gray-300 hover:text-accent transition-colors">Invite Your Church</Link>
                <Link to="/guides?tab=getting-started" className="block text-gray-300 hover:text-accent transition-colors">Leader Resources</Link>
                <Link to="/guides?tab=volunteers" className="block text-gray-300 hover:text-accent transition-colors">Volunteer Guidelines</Link>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-gray-400 font-medium text-sm uppercase tracking-wide">Growth</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-gray-300 hover:text-accent transition-colors">Explainer Video</Link>
                <Link to="/about" className="block text-gray-300 hover:text-accent transition-colors">Impact Stories</Link>
              </div>
            </div>
          </div>

          {/* Column 5: Stay Connected */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-300 mb-3">Get updates and stories from our community</p>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Your email" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Button className="bg-accent hover:bg-accent/80">Subscribe</Button>
                </div>
              </div>
              <div>
                <p className="text-gray-300 mb-3">Follow us</p>
                <div className="flex gap-3">
                  <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <Link to="/profile" className="block text-gray-300 hover:text-accent transition-colors">Contact Support</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© 2025 ChurchConnect. All rights reserved.</p>
          <p className="text-gray-400 text-sm">Built with ❤️ for church communities.</p>
        </div>
      </div>
    </footer>
  );
}