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
const Landing = lazy(() => import("./pages/info/Landing"));
const PostNeed = lazy(() => import("./pages/needs/PostNeed"));
const About = lazy(() => import("./pages/info/About"));
const HowItWorks = lazy(() => import("./pages/info/HowItWorks"));
const Community = lazy(() => import("./pages/community/Community"));
const Churches = lazy(() => import("./pages/info/Churches"));
const Charities = lazy(() => import("./pages/giving/Charities"));
const Contact = lazy(() => import("./pages/info/Contact"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const MemberSignup = lazy(() => import("./pages/auth/MemberSignup"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const MyNeeds = lazy(() => import("./pages/needs/MyNeeds"));
const Volunteering = lazy(() => import("./pages/giving/Volunteering"));
const MyChurch = lazy(() => import("./pages/account/MyChurch"));
const MinistryDetails = lazy(() => import("./pages/ministries/MinistryDetails"));
const Help = lazy(() => import("./pages/info/Help"));
const Profile = lazy(() => import("./pages/account/Profile"));
const Guides = lazy(() => import("./pages/info/Guides"));
const SafetyTrust = lazy(() => import("./pages/legal/SafetyTrust"));
const Terms = lazy(() => import("./pages/legal/Terms"));
const Privacy = lazy(() => import("./pages/legal/Privacy"));
const NotFound = lazy(() => import("./pages/system/NotFound"));
const PendingApproval = lazy(() => import("./pages/auth/PendingApproval"));
const EmailVerification = lazy(() => import("./pages/auth/EmailVerification"));
const AllChurchNeeds = lazy(() => import("./pages/needs/AllChurchNeeds"));
const AllChurchEvents = lazy(() => import("./pages/events/AllChurchEvents"));
const EventHub = lazy(() => import("./pages/events/EventHub"));
const EventDetails = lazy(() => import("./pages/events/EventDetails"));
const AllRecentActivity = lazy(() => import("./pages/insights/AllRecentActivity"));
const JoinMovement = lazy(() => import("./pages/info/JoinMovement"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const Feedback = lazy(() => import("./pages/insights/Feedback"));
const FeedbackApp = lazy(() => import("./pages/insights/FeedbackApp"));
const FeedbackChurch = lazy(() => import("./pages/insights/FeedbackChurch"));
const TemplateArticle = lazy(() => import("./pages/system/TemplateArticle"));
const NeedDetails = lazy(() => import("./pages/needs/NeedDetails"));
const VolunteeringDetails = lazy(() => import("./pages/giving/VolunteeringDetails"));
const MyDashboard = lazy(() => import("./pages/dashboard/MyDashboard"));
const Giving = lazy(() => import("./pages/giving/Giving"));
const Received = lazy(() => import("./pages/needs/Received"));
const Watchlist = lazy(() => import("./pages/community/Watchlist"));
const Wishlist = lazy(() => import("./pages/community/Wishlist"));
const MarketplaceItemDetails = lazy(() => import("./pages/needs/MarketplaceItemDetails"));
const AdminDashboard = lazy(() => import("./pages/dashboard/AdminDashboard"));
const AdminDashboardTemplate = lazy(() => import("./pages/dashboard/AdminDashboardTemplate"));
const StaffVerification = lazy(() => import("./pages/auth/StaffVerification"));
const ContentModeration = lazy(() => import("./pages/community/ContentModeration"));
const Analytics = lazy(() => import("./pages/insights/Analytics"));
const SystemSettings = lazy(() => import("./pages/dashboard/SystemSettings"));
const ServiceDetail = lazy(() => import("./pages/ministries/ServiceDetail"));
const MinistriesDashboard = lazy(() => import("./pages/ministries/MinistriesDashboard"));
const MinistryHomelessOutreach = lazy(() => import("./pages/ministries/MinistryHomelessOutreach"));
const MinistryWinterCoatDrive = lazy(() => import("./pages/ministries/MinistryWinterCoatDrive"));
const MinistryFoodPantry = lazy(() => import("./pages/ministries/MinistryFoodPantry"));
const MinistryBackToSchool = lazy(() => import("./pages/ministries/MinistryBackToSchool"));
import { AuthEventRouter } from "@/components/AuthEventRouter";
import { SidebarProvider } from "@/contexts/SidebarContext";
const QuickstartGuides = lazy(() => import("./pages/info/quickstart-guides"));

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
                        <Route path="/my-ministries/homeless-outreach" element={<MinistryHomelessOutreach />} />
                        <Route path="/my-ministries/winter-coat-drive" element={<MinistryWinterCoatDrive />} />
                        <Route path="/my-ministries/food-pantry" element={<MinistryFoodPantry />} />
                        <Route path="/my-ministries/back-to-school" element={<MinistryBackToSchool />} />
                        <Route path="/my-ministries" element={<MinistriesDashboard />} />
                        <Route path="/my-ministries/:id" element={<MinistryDetails />} />
                      </Route>
                      <Route path="/my-church" element={<MyChurch />} />
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
                      <Route path="/ministries" element={<Charities />} />
                      <Route path="/charities" element={<Navigate to="/ministries" replace />} />
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

