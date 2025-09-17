import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
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
import MemberSignup from "./pages/MemberSignup";
import Dashboard from "./pages/Dashboard";
import MyNeeds from "./pages/MyNeeds";
import Volunteering from "./pages/Volunteering";
import BrowseDashboard from "./pages/BrowseDashboard";
import MyChurch from "./pages/MyChurch";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Guides from "./pages/Guides";
import SafetyTrust from "./pages/SafetyTrust";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import PendingApproval from "./pages/PendingApproval";
import EmailVerification from "./pages/EmailVerification";
import AllChurchNeeds from "./pages/AllChurchNeeds";
import AllChurchEvents from "./pages/AllChurchEvents";
import AllRecentActivity from "./pages/AllRecentActivity";
import JoinMovement from "./pages/JoinMovement";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Feedback from "./pages/Feedback";
import Template from "./pages/Template";
import NeedDetails from "./pages/NeedDetails";
import VolunteeringDetails from "./pages/VolunteeringDetails";
import { AuthEventRouter } from "@/components/AuthEventRouter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <SidebarProvider>
              <Toaster />
              <Sonner />
              <ScrollToTop />
              <AuthEventRouter />
              <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <main className="flex-1">
                  <Routes>
...
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </SidebarProvider>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
