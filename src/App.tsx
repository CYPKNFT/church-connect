import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
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
import AdminDashboard from "./pages/AdminDashboard";
import AdminDashboardTemplate from "./pages/AdminDashboardTemplate";
import AdminDashboard2 from "./pages/AdminDashboard2";
import AdminDashboard3 from "./pages/AdminDashboard3";
import AdminDashboard4 from "./pages/AdminDashboard4";
import StaffVerification from "./pages/StaffVerification";
import StaffVerification2 from "./pages/StaffVerification2";
import { AuthEventRouter } from "@/components/AuthEventRouter";
import { SidebarProvider } from "@/contexts/SidebarContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <ScrollToTop />
            <AuthEventRouter />
            <SidebarProvider>
              <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/post" element={<PostNeed />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/member-signup" element={<MemberSignup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/email-verification" element={<EmailVerification />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/my-needs" element={<MyNeeds />} />
                    <Route path="/volunteering" element={<Volunteering />} />
                    <Route path="/my-church" element={<MyChurch />} />
                    <Route path="/my-church/needs" element={<AllChurchNeeds />} />
                    <Route path="/my-church/events" element={<AllChurchEvents />} />
                    <Route path="/my-church/activity" element={<AllRecentActivity />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/template" element={<Template />} />
                    <Route path="/needs_details/:id" element={<NeedDetails />} />
                    <Route path="/volunteering/:id" element={<VolunteeringDetails />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/admin-dashboard-template" element={<AdminDashboardTemplate />} />
                    <Route path="/admin-dashboard2" element={<AdminDashboard2 />} />
                    <Route path="/admin-dashboard3" element={<AdminDashboard3 />} />
                    <Route path="/admin-dashboard4" element={<AdminDashboard4 />} />
                    <Route path="/admin/staff-verification" element={<StaffVerification />} />
                    <Route path="/staff-verification" element={<StaffVerification />} />
                    <Route path="/staff-verification2" element={<StaffVerification2 />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/guides" element={<Guides />} />
                    <Route path="/safety-trust" element={<SafetyTrust />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/join-movement" element={<JoinMovement />} />
                    {/* Alternative URLs for better UX */}
                    <Route path="/browse" element={<BrowseDashboard />} />
                    <Route path="/browse-dashboard" element={<BrowseDashboard />} />
                    <Route path="/find-help" element={<Community />} />
                    <Route path="/volunteer" element={<Community />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/churches" element={<Churches />} />
                    <Route path="/support" element={<Help />} />
                    <Route path="/pending-approval" element={<PendingApproval />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
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
