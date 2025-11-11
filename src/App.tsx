import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Header } from "@/components/Header";
import { AdminLayout } from "@/components/AdminLayout";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Footer } from "@/components/Footer";
import { DashboardLayout } from "@/components/DashboardLayout";
const Landing = lazy(() => import("./pages/Landing"));
const PostNeed = lazy(() => import("./pages/PostNeed"));
const About = lazy(() => import("./pages/About"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Community = lazy(() => import("./pages/Community"));
const Churches = lazy(() => import("./pages/Churches"));
const Charities = lazy(() => import("./pages/Charities"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const MemberSignup = lazy(() => import("./pages/MemberSignup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const MyNeeds = lazy(() => import("./pages/MyNeeds"));
const Volunteering = lazy(() => import("./pages/Volunteering"));
const MyChurch = lazy(() => import("./pages/MyChurch"));
const Ministries = lazy(() => import("./pages/Ministries"));
const MinistryDetails = lazy(() => import("./pages/MinistryDetails"));
const Help = lazy(() => import("./pages/Help"));
const Profile = lazy(() => import("./pages/Profile"));
const Guides = lazy(() => import("./pages/Guides"));
const SafetyTrust = lazy(() => import("./pages/SafetyTrust"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PendingApproval = lazy(() => import("./pages/PendingApproval"));
const EmailVerification = lazy(() => import("./pages/EmailVerification"));
const AllChurchNeeds = lazy(() => import("./pages/AllChurchNeeds"));
const AllChurchEvents = lazy(() => import("./pages/AllChurchEvents"));
const EventHub = lazy(() => import("./pages/EventHub"));
const EventDetails = lazy(() => import("./pages/EventDetails"));
const AllRecentActivity = lazy(() => import("./pages/AllRecentActivity"));
const JoinMovement = lazy(() => import("./pages/JoinMovement"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Feedback = lazy(() => import("./pages/Feedback"));
const FeedbackApp = lazy(() => import("./pages/FeedbackApp"));
const FeedbackChurch = lazy(() => import("./pages/FeedbackChurch"));
const TemplateArticle = lazy(() => import("./pages/TemplateArticle"));
const NeedDetails = lazy(() => import("./pages/NeedDetails"));
const VolunteeringDetails = lazy(() => import("./pages/VolunteeringDetails"));
const MyDashboard = lazy(() => import("./pages/MyDashboard"));
const Giving = lazy(() => import("./pages/Giving"));
const Received = lazy(() => import("./pages/Received"));
const Watchlist = lazy(() => import("./pages/Watchlist"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const MarketplaceItemDetails = lazy(() => import("./pages/MarketplaceItemDetails"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminDashboardTemplate = lazy(() => import("./pages/AdminDashboardTemplate"));
const StaffVerification = lazy(() => import("./pages/StaffVerification"));
const ContentModeration = lazy(() => import("./pages/ContentModeration"));
const Analytics = lazy(() => import("./pages/Analytics"));
const SystemSettings = lazy(() => import("./pages/SystemSettings"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const MinistriesDashboard = lazy(() => import("./pages/MinistriesDashboard"));
const MinistryHomelessOutreach = lazy(() => import("./pages/MinistryHomelessOutreach"));
const MinistryWinterCoatDrive = lazy(() => import("./pages/MinistryWinterCoatDrive"));
const MinistryFoodPantry = lazy(() => import("./pages/MinistryFoodPantry"));
const MinistryBackToSchool = lazy(() => import("./pages/MinistryBackToSchool"));
import { AuthEventRouter } from "@/components/AuthEventRouter";
import { SidebarProvider } from "@/contexts/SidebarContext";
const QuickstartGuides = lazy(() => import("./pages/quickstart-guides"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always',
    },
    mutations: {
      retry: 0,
    },
  },
});

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
                  <Suspense fallback={<div className="p-6 text-center text-muted-foreground">Loading…</div>}>
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
                      {/* Dashboard routes with persistent layout */}
                      <Route element={<DashboardLayout />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/my-needs" element={<MyNeeds />} />
                      <Route path="/volunteering" element={<Volunteering />} />
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/staff-verification" element={<StaffVerification />} />
                        <Route path="/admin/content-moderation" element={<ContentModeration />} />
                        <Route path="/admin/analytics" element={<Analytics />} />
                        <Route path="/admin/settings" element={<SystemSettings />} />
                        <Route path="/giving" element={<Giving />} />
                        <Route path="/received" element={<Received />} />
                        <Route path="/watchlist" element={<Watchlist />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/feedback" element={<Feedback />} />
                        <Route path="/feedback/app" element={<FeedbackApp />} />
                        <Route path="/feedback/church" element={<FeedbackChurch />} />
                        <Route path="/ministries/dashboard" element={<MinistriesDashboard />} />
                        <Route path="/ministries/homeless-outreach" element={<MinistryHomelessOutreach />} />
                        <Route path="/ministries/winter-coat-drive" element={<MinistryWinterCoatDrive />} />
                        <Route path="/ministries/food-pantry" element={<MinistryFoodPantry />} />
                        <Route path="/ministries/back-to-school" element={<MinistryBackToSchool />} />
                      </Route>
                      <Route path="/my-church" element={<MyChurch />} />
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/ministries/:id" element={<MinistryDetails />} />
                      <Route path="/my-church/needs" element={<AllChurchNeeds />} />
                      <Route path="/my-church/events" element={<AllChurchEvents />} />
                      <Route path="/events" element={<EventHub />} />
                      <Route path="/events/:id" element={<EventDetails />} />
                      <Route path="/my-church/activity" element={<AllRecentActivity />} />
                      <Route path="/template-article/:articleId?" element={<TemplateArticle />} />
                      <Route path="/needs_details/:id" element={<NeedDetails />} />
                      <Route path="/service_detail/:id" element={<ServiceDetail />} />
                      <Route path="/volunteering/:id" element={<VolunteeringDetails />} />
                      <Route path="/admin-dashboard-template" element={<AdminDashboardTemplate />} />
                      <Route path="/help" element={<Help />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/settings" element={<Navigate to="/profile" replace />} />
                      <Route path="/all-guides" element={<Guides />} />
                      <Route path="/quickstart-guides" element={<QuickstartGuides />} />
                      <Route path="/safety-trust" element={<SafetyTrust />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/join-movement" element={<JoinMovement />} />
                      {/* Alternative URLs for better UX */}
                      <Route path="/marketplace-item/:id" element={<MarketplaceItemDetails />} />
                      <Route path="/find-help" element={<Community />} />
                      <Route path="/volunteer" element={<Community />} />
                      <Route path="/how-it-works" element={<HowItWorks />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/churches" element={<Churches />} />
                      <Route path="/charities" element={<Charities />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/guides" element={<Help />} />
                      <Route path="/pending-approval" element={<PendingApproval />} />
                      <Route path="/my-dashboard" element={<MyDashboard />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
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

