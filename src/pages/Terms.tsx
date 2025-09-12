import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, Clock, Users, Heart } from "lucide-react";

export default function Terms() {
  const lastUpdated = "January 15, 2025";

  return (
    <div className="min-h-screen bg-gradient-cream py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-accent/20 text-accent-dark text-sm font-medium mb-8">
            Legal Framework
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Terms of <span className="text-accent">Service</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Legal framework for our faith-based community platform
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: {lastUpdated}
          </p>
        </div>

        <ScrollArea className="h-[70vh]">
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 rounded-2xl mr-4">
            <CardContent className="p-8">
              <div className="space-y-8">
                
                {/* Introduction */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Welcome to ChurchConnect ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our platform, which connects church members to facilitate community support and volunteer opportunities. By accessing or using ChurchConnect, you agree to be bound by these Terms.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    ChurchConnect is operated as a non-profit service dedicated to strengthening church communities through mutual aid and support. We do not sell user information or operate for commercial profit.
                  </p>
                </section>

                <Separator />

                {/* Acceptance of Terms */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">2. Acceptance of Terms</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    By creating an account, accessing, or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not use our services.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    These Terms constitute a legally binding agreement between you and ChurchConnect. We may update these Terms from time to time, and continued use of our services constitutes acceptance of any changes.
                  </p>
                </section>

                <Separator />

                {/* Eligibility and Account Registration */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">3. Eligibility and Account Registration</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">3.1 Age Requirement</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        You must be at least 18 years old to create an account and use our services. Users under 18 may participate in activities with proper adult supervision and church authorization.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">3.2 Church Membership</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Individual accounts require verification of membership at a participating church. Church administrators must provide valid credentials and authorization to register their congregation.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">3.3 Account Security</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use.
                      </p>
                    </div>
                  </div>
                </section>

                <Separator />

                {/* Platform Use and Community Guidelines */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">4. Platform Use and Community Guidelines</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">4.1 Acceptable Use</h3>
                      <p className="text-muted-foreground leading-relaxed mb-2">You agree to use our platform only for lawful purposes and in accordance with Christian values of love, service, and community. Specifically, you agree to:</p>
                      <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                        <li>Provide accurate and truthful information in all communications</li>
                        <li>Respect the privacy and dignity of all community members</li>
                        <li>Use appropriate and respectful language at all times</li>
                        <li>Honor commitments made to help others through the platform</li>
                        <li>Report any safety concerns or inappropriate behavior immediately</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">4.2 Prohibited Activities</h3>
                      <p className="text-muted-foreground leading-relaxed mb-2">The following activities are strictly prohibited:</p>
                      <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                        <li>Harassment, discrimination, or hate speech of any kind</li>
                        <li>Posting false, misleading, or fraudulent requests for help</li>
                        <li>Commercial solicitation or advertising unrelated to community service</li>
                        <li>Sharing inappropriate content or language</li>
                        <li>Attempting to bypass church verification systems</li>
                        <li>Collecting or misusing other users' personal information</li>
                        <li>Any illegal activities or promoting illegal conduct</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <Separator />

                {/* Data and Privacy */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">5. Data and Privacy</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">5.1 Data Collection and Use</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        We collect and process personal information solely to operate our services and facilitate community connections. We do not sell, rent, or commercially exploit user data. Detailed information about our data practices is available in our Privacy Policy.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">5.2 Information Sharing</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        We may share information with church administrators for verification and safety purposes, and as required by law. Users control when and how their contact information is shared with other community members.
                      </p>
                    </div>
                  </div>
                </section>

                <Separator />

                {/* Liability and Disclaimers */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">6. Liability and Disclaimers</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">6.1 Platform Disclaimer</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        ChurchConnect serves as a facilitating platform to connect community members. We do not provide the actual services, goods, or assistance exchanged between users. All interactions and transactions between users are their sole responsibility.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">6.2 Limitation of Liability</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        To the fullest extent permitted by law, ChurchConnect and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform, including but not limited to personal injury, property damage, or any issues arising from user interactions.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">6.3 User Responsibility</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Users assume full responsibility for their interactions with other community members, including verification of identity, assessment of capabilities, and personal safety precautions.
                      </p>
                    </div>
                  </div>
                </section>

                <Separator />

                {/* Termination */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">7. Account Termination</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">7.1 Voluntary Termination</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        You may delete your account at any time by contacting us or using the account deletion feature in your profile settings.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">7.2 Involuntary Termination</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        We reserve the right to suspend or terminate accounts that violate these Terms, engage in inappropriate behavior, or pose a risk to community safety, with or without notice.
                      </p>
                    </div>
                  </div>
                </section>

                <Separator />

                {/* Governing Law */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">8. Governing Law and Dispute Resolution</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    These Terms shall be governed by and construed in accordance with the laws of [State/Jurisdiction], without regard to its conflict of law provisions.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    In keeping with Christian principles, we encourage users to resolve disputes through peaceful dialogue and, if necessary, through mediation before pursuing legal action.
                  </p>
                </section>

                <Separator />

                {/* Contact Information */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">9. Contact Information</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you have questions about these Terms of Service, please contact us at:
                  </p>
                  <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                    <p className="text-foreground font-medium">ChurchConnect Support</p>
                    <p className="text-muted-foreground">Email: legal@churchconnect.org</p>
                    <p className="text-muted-foreground">Phone: [Phone Number]</p>
                    <p className="text-muted-foreground">Address: [Physical Address]</p>
                  </div>
                </section>

                <Separator />

                {/* Final Provisions */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">10. Final Provisions</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">10.1 Severability</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">10.2 Entire Agreement</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        These Terms, together with our Privacy Policy, constitute the entire agreement between you and ChurchConnect regarding your use of our services.
                      </p>
                    </div>
                  </div>
                </section>

                <div className="bg-primary/10 rounded-lg p-6 border border-primary/20 mt-8">
                  <div className="flex items-start gap-4">
                    <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Our Commitment to You</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        ChurchConnect exists to serve the body of Christ by facilitating love in action through community support. 
                        We are committed to maintaining a safe, respectful, and Christ-centered environment for all users.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </ScrollArea>
      </div>
    </div>
  );
}