import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChevronLeft, Shield, AlertTriangle, Eye, Users, MessageSquare, Phone, MapPin, Clock, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SafetyGuidelines() {
  const navigate = useNavigate();

  const safetyRules = [
    {
      title: "Meet in Public Places Initially",
      description: "For first-time interactions, always meet in public locations like the church, coffee shops, or community centers",
      icon: Users,
      type: "essential"
    },
    {
      title: "Verify Church Membership",
      description: "Only interact with verified church members. Look for the verification badge on profiles",
      icon: Shield,
      type: "essential"
    },
    {
      title: "Trust Your Instincts",
      description: "If something feels uncomfortable or unsafe, politely decline and report concerns to church leadership",
      icon: Eye,
      type: "essential"
    },
    {
      title: "Share Your Plans",
      description: "Let family or friends know where you're going and when you expect to return",
      icon: MapPin,
      type: "recommended"
    },
    {
      title: "Keep Communication Professional",
      description: "Maintain appropriate boundaries in all communications and interactions",
      icon: MessageSquare,
      type: "recommended"
    },
    {
      title: "Use Church Contact Information",
      description: "When possible, use church-provided contact methods rather than personal phone numbers initially",
      icon: Phone,
      type: "recommended"
    }
  ];

  const dosDonts = {
    dos: [
      "Verify the person's church membership before meeting",
      "Meet during daylight hours when possible",
      "Bring a friend if you feel more comfortable",
      "Check in with church leadership about new connections",
      "Keep detailed records of your volunteer activities",
      "Report any concerning behavior immediately"
    ],
    donts: [
      "Give out personal information too quickly",
      "Meet alone in isolated or private locations",
      "Ignore red flags or uncomfortable feelings",
      "Engage with unverified users",
      "Share financial information or handle money",
      "Make commitments you cannot keep"
    ]
  };

  const emergencyContacts = [
    {
      title: "Church Office",
      description: "For non-emergency concerns and verification",
      contact: "Call during business hours"
    },
    {
      title: "Pastoral Care",
      description: "For urgent safety concerns involving church members",
      contact: "Available 24/7 for emergencies"
    },
    {
      title: "Local Emergency Services",
      description: "For immediate safety threats or emergencies",
      contact: "Call 911"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/help')}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Help
          </Button>
        </div>

        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 text-accent font-medium mb-6">
            <Shield className="w-4 h-4" />
            <span>Safety First</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Safety Guidelines
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Important safety tips for both those requesting and offering help in our church community
          </p>
        </div>

        {/* Safety Alert */}
        <div className="max-w-4xl mx-auto mb-16">
          <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800 dark:text-orange-200">
              <strong>Remember:</strong> Your safety is our top priority. Never hesitate to ask questions, verify information, or report concerns to church leadership.
            </AlertDescription>
          </Alert>
        </div>

        {/* Essential Safety Rules */}
        <section className="mb-16 animate-slide-up">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Essential Safety Rules</h2>
            <div className="space-y-6">
              {safetyRules.map((rule, index) => {
                const Icon = rule.icon;
                return (
                  <Card key={index} className={`border-0 shadow-card bg-card ${
                    rule.type === 'essential' ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-yellow-500'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          rule.type === 'essential' ? 'bg-red-100 dark:bg-red-950/20' : 'bg-yellow-100 dark:bg-yellow-950/20'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            rule.type === 'essential' ? 'text-red-600' : 'text-yellow-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-foreground">{rule.title}</h3>
                            <Badge variant={rule.type === 'essential' ? 'destructive' : 'secondary'}>
                              {rule.type === 'essential' ? 'Essential' : 'Recommended'}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">{rule.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Do's and Don'ts */}
        <section className="mb-16 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Do's and Don'ts</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Do's */}
              <Card className="border-0 shadow-card bg-card border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    Do's
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dosDonts.dos.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Don'ts */}
              <Card className="border-0 shadow-card bg-card border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                    <XCircle className="w-5 h-5" />
                    Don'ts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dosDonts.donts.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="mb-16 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Emergency Contacts</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {emergencyContacts.map((contact, index) => (
                <Card key={index} className="border-0 shadow-card bg-card text-center">
                  <CardContent className="p-6">
                    <Phone className="w-8 h-8 mx-auto mb-4 text-accent" />
                    <h3 className="font-semibold text-foreground mb-2">{contact.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{contact.description}</p>
                    <p className="text-sm font-medium text-accent">{contact.contact}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="animate-scale-in">
          <div className="max-w-4xl mx-auto">
            <div className="bg-warm-gradient rounded-3xl p-12 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary"></div>
              <div className="relative z-10">
                <Shield className="w-16 h-16 mx-auto mb-6 text-white" />
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Have Safety Concerns?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Don't hesitate to reach out to church leadership with any safety questions or concerns
                </p>
                
                <Button 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => navigate('/profile')}
                >
                  Contact Church Leadership
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}