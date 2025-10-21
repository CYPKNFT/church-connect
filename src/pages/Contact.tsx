import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #059669 0%, #2563eb 100%)' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(5,150,105,0.9) 0%, rgba(37,99,235,0.9) 100%)' }} />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-2 text-white font-medium mb-6 backdrop-blur-sm">
            <MessageSquare className="w-4 h-4" />
            <span>Contact Us</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Get in <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Have questions about ChurchConnect? We're here to help you get started and support your church community.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-card/80 backdrop-blur-sm border-white hover:bg-card/90 hover:shadow-lg transition-all duration-300 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Send us a Message</CardTitle>
              <p className="text-muted-foreground text-center">We'll get back to you within 24 hours</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" placeholder="Enter your first name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" placeholder="Enter your last name" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" placeholder="Enter your email" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="church">Church Name</Label>
                <Input id="church" placeholder="Enter your church name (optional)" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input id="subject" placeholder="What can we help you with?" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us more about your question or how we can help..."
                  className="min-h-[120px]"
                  required 
                />
              </div>
              
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-lg rounded-xl shadow-lg hover-lift">
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
