import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Footer } from "@/components/Footer";
import Landing from "./pages/Landing";
import BrowseNeeds from "./pages/BrowseNeeds";
import PostNeed from "./pages/PostNeed";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Community from "./pages/Community";
import Churches from "./pages/Churches";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyChurch from "./pages/MyChurch";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import Guides from "./pages/Guides";
import SafetyTrust from "./pages/SafetyTrust";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
        <div className="min-h-screen bg-background flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/post" element={<PostNeed />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/my-church" element={<MyChurch />} />
              <Route path="/help" element={<Help />} />
              <Route path="/profile" element={<Profile />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/safety-trust" element={<SafetyTrust />} />
              {/* Alternative URLs for better UX */}
              <Route path="/browse" element={<Community />} />
              <Route path="/find-help" element={<Community />} />
              <Route path="/volunteer" element={<Community />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/community" element={<Community />} />
              <Route path="/churches" element={<Churches />} />
              <Route path="/support" element={<Help />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
