import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, Lock, Users, Eye, Database, UserCheck } from "lucide-react";

export default function Privacy() {
  const lastUpdated = "January 15, 2025";

  return (
    <div className="min-h-screen bg-subtle-gradient py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground">
            How we protect and handle your personal information
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: {lastUpdated}
          </p>
        </div>

        <Card className="shadow-card border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8">
            <ScrollArea className="h-[70vh]">
              <div className="space-y-8 pr-4">
                
                {/* Introduction */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    At ChurchConnect, we are committed to protecting your privacy and handling your personal information with the utmost care and respect. This Privacy Policy explains how we collect, use, protect, and share your information when you use our platform.
                  </p>
                  <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Our Privacy Commitment</h3>
                        <p className="text-sm text-muted-foreground">
                          We are a non-profit organization dedicated to serving church communities. We do not sell, rent, or commercialize your personal information. Your data is used solely to facilitate community connections and provide our services.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <Separator />

                {/* Information We Collect */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
                  <div className="space-y-6">
                    
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-primary" />
                        2.1 Account Information
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-2">When you create an account, we collect:</p>
                      <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                        <li>Full name and contact information (email, phone number)</li>
                        <li>Church affiliation and membership verification details</li>
                        <li>Account credentials (encrypted passwords)</li>
                        <li>Profile information (skills, availability, bio)</li>
                        <li>General location/neighborhood information</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        2.2 Usage and Activity Information
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-2">To improve our services and ensure community safety, we collect:</p>
                      <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                        <li>Posts and requests for help that you create</li>
                        <li>Volunteer commitments and responses to needs</li>
                        <li>Messages and communications within the platform</li>
                        <li>Platform usage patterns and feature interactions</li>
                        <li>Device information and technical logs for security purposes</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-primary" />
                        2.3 Information from Churches
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-2">With proper authorization, we may receive:</p>
                      <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                        <li>Membership verification and status updates</li>
                        <li>Contact information for administrative purposes</li>
                        <li>Background check results where required by church policy</li>
                        <li>Ministry involvement and volunteer history</li>
                      </ul>
                    </div>

                  </div>
                </section>

                <Separator />

                {/* How We Use Your Information */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                  <div className="space-y-4">
                    
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">3.1 Core Platform Functions</h3>
                      <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                        <li>Connecting community members with volunteer opportunities</li>
                        <li>Facilitating communication between helpers and those in need</li>
                        <li>Verifying church membership and maintaining community integrity</li>
                        <li>Providing personalized recommendations for volunteer opportunities</li>
                        <li>Tracking volunteer commitments and community impact</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">3.2 Safety and Security</h3>
                      <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                        <li>Protecting against fraud, harassment, and inappropriate behavior</li>
                        <li>Monitoring for compliance with community guidelines</li>
                        <li>Investigating reports of misconduct or safety concerns</li>
                        <li>Maintaining secure access to your account</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">3.3 Platform Improvement</h3>
                      <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                        <li>Analyzing usage patterns to enhance user experience</li>
                        <li>Developing new features based on community needs</li>
                        <li>Generating aggregated, anonymized reports for church leaders</li>
                        <li>Troubleshooting technical issues and bugs</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">3.4 Communication</h3>
                      <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                        <li>Sending notifications about volunteer opportunities and responses</li>
                        <li>Providing important updates about platform features or policies</li>
                        <li>Responding to your questions and support requests</li>
                        <li>Sharing community impact stories (with your permission)</li>
                      </ul>
                    </div>

                  </div>
                </section>

                <Separator />

                {/* Information Sharing */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">4. How We Share Your Information</h2>
                  <div className="bg-accent/10 rounded-lg p-4 border border-accent/20 mb-4">
                    <p className="text-foreground font-medium mb-2">Our Fundamental Principle:</p>
                    <p className="text-muted-foreground text-sm">
                      We never sell, rent, or commercially exploit your personal information. All sharing is done to facilitate community connections or ensure safety within the platform.
                    </p>
                  </div>

                  <div className="space-y-4">
                    
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">4.1 Within Your Church Community</h3>
                      <p className="text-muted-foreground leading-relaxed mb-2">With your consent and church verification:</p>
                      <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                        <li>Contact information when you volunteer for a specific need</li>
                        <li>Your volunteer posts and offers to help others</li>
                        <li>General profile information visible to verified church members</li>
                        <li>Activity summaries with church administrators (for safety and coordination)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">4.2 With Church Leadership</h3>
                      <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                        <li>Membership verification and account status information</li>
                        <li>Reports of policy violations or safety concerns</li>
                        <li>Aggregated, anonymized usage statistics and impact metrics</li>
                        <li>Information necessary for addressing community conflicts or issues</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">4.3 Legal and Safety Requirements</h3>
                      <p className="text-muted-foreground leading-relaxed mb-2">We may share information when required by law or to protect safety:</p>
                      <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                        <li>In response to valid legal process (subpoenas, court orders)</li>
                        <li>To report suspected child abuse or neglect as required by law</li>
                        <li>To prevent imminent physical harm or illegal activity</li>
                        <li>To protect the rights and safety of our users and staff</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">4.4 Service Providers</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        We work with trusted third-party service providers (hosting, email, analytics) who process data on our behalf under strict confidentiality agreements and only for the purposes of providing our services.
                      </p>
                    </div>

                  </div>
                </section>

                <Separator />

                {/* Data Security */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Security and Protection</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Database className="w-5 h-5 text-primary" />
                        Technical Safeguards
                      </h3>
                      <ul className="list-disc ml-6 text-muted-foreground space-y-1 text-sm">
                        <li>End-to-end encryption for sensitive communications</li>
                        <li>Secure data storage with encrypted databases</li>
                        <li>Regular security audits and vulnerability assessments</li>
                        <li>Multi-factor authentication for administrative access</li>
                        <li>Secure backup and disaster recovery procedures</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-primary" />
                        Organizational Safeguards
                      </h3>
                      <ul className="list-disc ml-6 text-muted-foreground space-y-1 text-sm">
                        <li>Limited access to personal data on a need-to-know basis</li>
                        <li>Background checks for staff with data access</li>
                        <li>Regular privacy and security training for all personnel</li>
                        <li>Incident response plan for potential data breaches</li>
                        <li>Annual third-party security compliance reviews</li>
                      </ul>
                    </div>

                  </div>
                </section>

                <Separator />

                {/* Your Privacy Rights */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">6. Your Privacy Rights and Choices</h2>
                  <div className="space-y-4">
                    
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">6.1 Account Control</h3>
                      <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                        <li>Update or correct your profile information at any time</li>
                        <li>Control visibility settings for your posts and profile</li>
                        <li>Choose which notifications you receive</li>
                        <li>Delete your account and associated data</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">6.2 Data Requests</h3>
                      <p className="text-muted-foreground leading-relaxed mb-2">You have the right to:</p>
                      <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                        <li>Request a copy of all personal data we have about you</li>
                        <li>Ask us to correct inaccurate information</li>
                        <li>Request deletion of your data (subject to legal requirements)</li>
                        <li>Object to certain types of data processing</li>
                        <li>Receive your data in a portable format</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">6.3 Communication Preferences</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        You can opt out of non-essential communications while still receiving important safety and service notifications. Essential communications include security alerts and legal notices.
                      </p>
                    </div>

                  </div>
                </section>

                <Separator />

                {/* Data Retention */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">7. Data Retention</h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      We retain your personal information only as long as necessary to provide our services and fulfill the purposes outlined in this policy:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-card rounded-lg p-4 border">
                        <h4 className="font-semibold text-foreground mb-2">Account Information</h4>
                        <p className="text-sm text-muted-foreground">Retained while your account is active and for 2 years after deletion for legal compliance</p>
                      </div>
                      <div className="bg-card rounded-lg p-4 border">
                        <h4 className="font-semibold text-foreground mb-2">Communication Records</h4>
                        <p className="text-sm text-muted-foreground">Kept for 1 year after the interaction for safety and dispute resolution purposes</p>
                      </div>
                      <div className="bg-card rounded-lg p-4 border">
                        <h4 className="font-semibold text-foreground mb-2">Safety Records</h4>
                        <p className="text-sm text-muted-foreground">Incident reports retained for 7 years or as required by law for community protection</p>
                      </div>
                      <div className="bg-card rounded-lg p-4 border">
                        <h4 className="font-semibold text-foreground mb-2">Analytics Data</h4>
                        <p className="text-sm text-muted-foreground">Aggregated, anonymized data may be retained indefinitely for platform improvement</p>
                      </div>
                    </div>
                  </div>
                </section>

                <Separator />

                {/* Children's Privacy */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">8. Children's Privacy</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    ChurchConnect is not intended for children under 13, and we do not knowingly collect personal information from children under 13. Users under 18 may participate in supervised activities with proper church authorization and parental consent.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    If we become aware that we have collected information from a child under 13, we will take immediate steps to delete that information and terminate the account.
                  </p>
                </section>

                <Separator />

                {/* International Users */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">9. International Users</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you are accessing ChurchConnect from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States where our servers are located.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    By using our services, you consent to the transfer of your information to the United States and agree that such transfer complies with applicable privacy laws.
                  </p>
                </section>

                <Separator />

                {/* Changes to Privacy Policy */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">10. Changes to This Privacy Policy</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:
                  </p>
                  <ul className="list-disc ml-6 text-muted-foreground space-y-1 mb-4">
                    <li>Posting a notice on our platform</li>
                    <li>Sending an email to your registered address</li>
                    <li>Requiring acknowledgment before continued use for significant changes</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed">
                    Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy.
                  </p>
                </section>

                <Separator />

                {/* Contact Information */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">11. Contact Information</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you have questions about this Privacy Policy, want to exercise your rights, or have privacy concerns, please contact us:
                  </p>
                  <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                    <p className="text-foreground font-medium">ChurchConnect Privacy Team</p>
                    <p className="text-muted-foreground">Email: privacy@churchconnect.org</p>
                    <p className="text-muted-foreground">Phone: [Phone Number]</p>
                    <p className="text-muted-foreground">Address: [Physical Address]</p>
                    <p className="text-muted-foreground text-sm mt-2">
                      We will respond to your inquiries within 30 days of receipt.
                    </p>
                  </div>
                </section>

                <div className="bg-primary/10 rounded-lg p-6 border border-primary/20 mt-8">
                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Our Promise to You</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Your privacy is not just a legal requirement for us—it's a reflection of our Christian values of respect, 
                        dignity, and stewardship. We are committed to being transparent, protective, and responsible with the 
                        personal information you entrust to us.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}