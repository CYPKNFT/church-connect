import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import Landing from "./pages/Landing";
import BrowseNeeds from "./pages/BrowseNeeds";
import PostNeed from "./pages/PostNeed";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/browse" element={<BrowseNeeds />} />
            <Route path="/post" element={<PostNeed />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/help" element={<Help />} />
            <Route path="/profile" element={<Profile />} />
            {/* Alternative URLs for better UX */}
            <Route path="/find-help" element={<BrowseNeeds />} />
            <Route path="/volunteer" element={<BrowseNeeds />} />
            <Route path="/how-it-works" element={<About />} />
            <Route path="/support" element={<Help />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
