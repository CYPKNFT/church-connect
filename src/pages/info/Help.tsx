import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { HelpCircle, MessageSquare, Shield, Users, Heart, Search, Mail, Phone } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function Help() {
  const navigate = useNavigate();
  const faqs = [
    {
      question: "How do I post a need for help?",
      answer: "Click the 'Post a Need' button in the navigation menu or dashboard. Fill out the 4-step form with details about what you need help with, choose the appropriate category, set urgency level, and add location details. Your need will be visible to church members who can volunteer to help."
    },
    {
      question: "How do I volunteer to help someone?",
      answer: "Browse available needs on the 'Community Needs' page. Use filters to find opportunities that match your skills and availability. Click 'Volunteer' on any need card to offer your help. The person who posted the need will be notified and can contact you directly."
    },
    {
      question: "Is my personal information safe?",
      answer: "Yes, your privacy and safety are our top priorities. Only verified church members can see your posts. We never share personal information without consent. Contact details are only shared when you volunteer or when someone offers to help you."
    },
    {
      question: "What if I need to cancel my volunteering commitment?",
      answer: "Life happens! If you need to cancel, please contact the person you committed to help as soon as possible through the app messaging system or phone. This gives them time to find alternative help or reschedule."
    },
    {
      question: "How are volunteers verified?",
      answer: "All users must be verified church members. New accounts require pastoral approval before posting or volunteering. We also have a community rating system where users can rate their experiences to build trust."
    },
    {
      question: "What types of help can I request?",
      answer: "You can request help with transportation, groceries, home repairs, meals, childcare, prayer support, and many other needs. If your need doesn't fit standard categories, use 'Other' and describe what you need in detail."
    },
    {
      question: "Can I schedule help for a future date?",
      answer: "Absolutely! When posting your need, you can specify your preferred timing in the description. Many church members are happy to schedule help in advance, especially for regular needs like grocery shopping or transportation."
    },
    {
      question: "What if no one volunteers for my need?",
      answer: "Don't worry! Needs stay active for 30 days. Try reaching out to church staff who can help connect you with specific ministry groups. You can also edit your post to add more details or adjust timing to make it easier for volunteers."
    }
  ];

  const guides = [
    {
      icon: Users,
      title: "Getting Started Guide",
      description: "Learn how to set up your profile and start connecting with your church community",
      path: "/quickstart-guides?tab=getting-started"
    },
    {
      icon: Shield,
      title: "Safety Guidelines",
      description: "Important safety tips for both those requesting and offering help",
      path: "/quickstart-guides?tab=safety"
    },
    {
      icon: Heart,
      title: "Best Practices for Volunteers",
      description: "Tips for being an effective and trusted volunteer in your community",
      path: "/quickstart-guides?tab=volunteers"
    },
    {
      icon: HelpCircle,
      title: "View All Guides",
      description: "Browse our complete collection of guides and tutorials",
      path: "/all-guides"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Gradient */}
      <section className="relative py-14 overflow-hidden bg-gradient-to-br from-green-600 to-blue-600 dark:bg-none" style={{ background: 'linear-gradient(135deg, #059669 0%, #2563eb 100%)' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/90 to-blue-600/90 dark:bg-none" style={{ background: 'linear-gradient(135deg, rgba(5,150,105,0.9) 0%, rgba(37,99,235,0.9) 100%)' }} />
        <div className="absolute inset-0 dark:block hidden" style={{ background: 'linear-gradient(135deg, #2d1b69 0%, #8b4513 100%)' }} />
        <div className="absolute inset-0 dark:block hidden" style={{ background: 'linear-gradient(135deg, rgba(45,27,105,0.9) 0%, rgba(139,69,19,0.9) 100%)' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-2 text-white font-medium mb-6 backdrop-blur-sm">
              <HelpCircle className="w-4 h-4" />
              <span>We're Here to Help</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              ChurchConnect <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Guides</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Learn how to make the most of ChurchConnect with our step-by-step guides
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white dark:bg-yellow-500 text-primary dark:text-gray-900 hover:bg-white/90 dark:hover:bg-yellow-600 px-6 py-3 rounded-xl shadow-2xl" asChild>
                <Link to="/quickstart-guides">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  Get Started
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-xl backdrop-blur-sm" asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-12 relative z-20">


        {/* Main Guides */}
        <section className="mb-16 animate-slide-up">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <Card 
                  key={index} 
                  className="border-0 shadow-card hover:shadow-accent hover-lift bg-card group cursor-pointer"
                  onClick={() => navigate(guide.path)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground">{guide.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Support Articles Section */}
        <section className="mb-16 animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Support Articles
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Find quick answers to the most common questions
            </p>
            
            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input 
                  placeholder="Search for help articles..." 
                  className="pl-12 h-14 text-lg bg-card border-2 shadow-card"
                />
              </div>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-foreground">
              Frequently Asked Questions
            </h3>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-card bg-card">
              <CardContent className="p-8">
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
                      <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Support */}
        <section className="animate-scale-in">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-3xl p-12 text-center text-white overflow-hidden mb-32 bg-gradient-to-br from-green-600 to-blue-600 dark:bg-none" style={{ background: 'linear-gradient(135deg, #059669 0%, #2563eb 100%)' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/90 to-blue-600/90 dark:bg-none" style={{ background: 'linear-gradient(135deg, rgba(5,150,105,0.9) 0%, rgba(37,99,235,0.9) 100%)' }} />
              <div className="absolute inset-0 dark:block hidden" style={{ background: 'linear-gradient(135deg, #2d1b69 0%, #8b4513 100%)' }} />
              <div className="absolute inset-0 dark:block hidden" style={{ background: 'linear-gradient(135deg, rgba(45,27,105,0.9) 0%, rgba(139,69,19,0.9) 100%)' }} />
              <div className="relative z-10">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Still Need Help?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Sign in to send your Church Leadership a message directly from your profile
                </p>
                
                <Button 
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-full px-8 py-3" 
                  asChild
                >
                  <a href="/login">Sign in for more resources</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}