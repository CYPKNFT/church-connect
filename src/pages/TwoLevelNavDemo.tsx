import { Header } from "@/components/Header";
import { TwoLevelNav } from "@/components/TwoLevelNav";

export default function TwoLevelNavDemo() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <TwoLevelNav />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-8">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Two-Level Navigation Demo
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Experience smooth, animated navigation with a clean two-panel design.
              </p>

              <div className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6 shadow-md">
                  <h2 className="text-2xl font-semibold text-foreground mb-3">
                    Features
                  </h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 mr-3"></span>
                      <span>Smooth Framer Motion animations for all transitions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 mr-3"></span>
                      <span>Icon-first design in the first panel (72px width)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 mr-3"></span>
                      <span>Second panel slides in with submenu items (288px width)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 mr-3"></span>
                      <span>Active state highlighting with golden accent color</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 mr-3"></span>
                      <span>Smooth fade and slide transitions when switching menus</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 mr-3"></span>
                      <span>Collapsible toggle button in the first panel</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 mr-3"></span>
                      <span>Responsive design optimized for desktop and tablet</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20 rounded-xl p-6">
                  <h2 className="text-2xl font-semibold text-foreground mb-3">
                    Navigation Sections
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-card rounded-lg p-4 border border-border">
                      <h3 className="font-semibold text-foreground mb-2">Admin</h3>
                      <p className="text-sm text-muted-foreground">
                        Dashboard, Staff Verification, Content Moderation, Analytics
                      </p>
                    </div>
                    <div className="bg-card rounded-lg p-4 border border-border">
                      <h3 className="font-semibold text-foreground mb-2">Admin Copy</h3>
                      <p className="text-sm text-muted-foreground">
                        Dashboard, My Needs, Volunteering, Browse
                      </p>
                    </div>
                    <div className="bg-card rounded-lg p-4 border border-border bg-accent/5">
                      <h3 className="font-semibold text-accent mb-2">Serving (Active)</h3>
                      <p className="text-sm text-muted-foreground">
                        Dashboard, My Needs, Volunteering, Browse
                      </p>
                    </div>
                    <div className="bg-card rounded-lg p-4 border border-border">
                      <h3 className="font-semibold text-foreground mb-2">Giving</h3>
                      <p className="text-sm text-muted-foreground">
                        Giving, Received, Watchlist, Marketplace
                      </p>
                    </div>
                    <div className="bg-card rounded-lg p-4 border border-border">
                      <h3 className="font-semibold text-foreground mb-2">Feedback</h3>
                      <p className="text-sm text-muted-foreground">
                        General, App, Church
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 shadow-md">
                  <h2 className="text-2xl font-semibold text-foreground mb-3">
                    Usage Instructions
                  </h2>
                  <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
                    <li>Click any icon in the left panel to open its submenu</li>
                    <li>The second panel will smoothly slide in from the right</li>
                    <li>Click a submenu item to navigate to that page</li>
                    <li>Click the same icon again to close the submenu panel</li>
                    <li>Switch between different top-level menus to see smooth transitions</li>
                    <li>Use the toggle button to collapse/expand the navigation</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
