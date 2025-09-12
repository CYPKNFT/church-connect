import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, Mail, Phone, ArrowRight, Shield, Zap, Users, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function PendingApproval() {
  return (
    <div className="min-h-screen bg-hero-gradient relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-secondary/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow animate-gentle-bounce">
                <Clock className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center animate-pulse">
                <Shield className="w-4 h-4 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 animate-slide-up">
              Registration Under Review
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Thank you for registering your church with ChurchConnect! Your application is being carefully reviewed.
            </p>
          </div>

          {/* Progress Timeline */}
          <div className="mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Card className="glass-card border-0 backdrop-blur-lg bg-white/10 shadow-elegant">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-white mb-8 text-center">Your Progress</h2>
                <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
                  {[
                    { icon: FileCheck, title: "Application Submitted", status: "complete", color: "text-green-400" },
                    { icon: Shield, title: "Security Review", status: "current", color: "text-primary" },
                    { icon: Users, title: "Team Verification", status: "pending", color: "text-white/40" },
                    { icon: Zap, title: "Account Activation", status: "pending", color: "text-white/40" },
                  ].map((step, index) => (
                    <div key={step.title} className="flex flex-col items-center text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                        step.status === 'complete' ? 'bg-green-500/20 shadow-glow' : 
                        step.status === 'current' ? 'bg-gradient-primary shadow-primary' : 
                        'bg-white/10'
                      }`}>
                        <step.icon className={`w-8 h-8 ${step.color}`} />
                      </div>
                      <h3 className="font-medium text-white mb-2">{step.title}</h3>
                      <div className={`w-2 h-2 rounded-full ${
                        step.status === 'complete' ? 'bg-green-400' : 
                        step.status === 'current' ? 'bg-primary animate-pulse' : 
                        'bg-white/20'
                      }`}></div>
                      {index < 3 && (
                        <ArrowRight className="hidden md:block w-6 h-6 text-white/30 absolute" 
                          style={{ transform: `translateX(${(index + 1) * 120}px)` }} />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* What's Next Section */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Card className="glass-card border-0 backdrop-blur-lg bg-white/10 shadow-elegant hover-lift transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-subtle rounded-full flex items-center justify-center flex-shrink-0 shadow-soft">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-6">
                      What happens next?
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        "Our security team reviews your church registration within 1-3 business days",
                        "We verify your church information and leadership credentials",
                        "You'll receive an email notification once your church is approved",
                        "After approval, you gain access to all ChurchConnect premium features"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3 animate-slide-up" 
                          style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-white/90">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Support Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Card className="glass-card border-0 backdrop-blur-lg bg-white/10 shadow-elegant hover-lift transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-primary group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white">
                    Questions?
                  </h4>
                </div>
                <p className="text-white/80 mb-6">
                  Contact our support team if you have any questions about the approval process.
                </p>
                <Button variant="gentle" size="sm" className="w-full group-hover:shadow-glow transition-all duration-300">
                  <Mail className="w-4 h-4 mr-2" />
                  support@churchconnect.com
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 backdrop-blur-lg bg-white/10 shadow-elegant hover-lift transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center shadow-secondary group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white">
                    Need Help?
                  </h4>
                </div>
                <p className="text-white/80 mb-6">
                  Call us during business hours for immediate assistance with your registration.
                </p>
                <Button variant="gentle" size="sm" className="w-full group-hover:shadow-glow transition-all duration-300">
                  <Phone className="w-4 h-4 mr-2" />
                  (555) 123-4567
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="text-center animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gentle" size="lg" asChild className="hover-scale">
                <Link to="/">
                  Return to Home
                </Link>
              </Button>
              <Button variant="hero" size="lg" asChild className="hover-scale">
                <Link to="/login">
                  Sign In to Check Status
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}