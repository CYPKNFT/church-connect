import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { HelpCircle, MessageSquare, Shield, Users, Heart, Search, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
      path: "/guides"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 text-accent font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>We're Here to Help</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            ChurchConnect Guides
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Learn how to make the most of ChurchConnect with our step-by-step guides
          </p>
        </div>


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
            <div className="bg-warm-gradient rounded-3xl p-12 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary"></div>
              <div className="relative z-10">
                <MessageSquare className="w-16 h-16 mx-auto mb-6 text-white" />
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Still Need Help?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Sign in to send your Church Leadership a message directly from your profile
                </p>
                
                <Button 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10" 
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