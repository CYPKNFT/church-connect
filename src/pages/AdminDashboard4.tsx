import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  ShieldCheck,
  FolderOpen,
  GaugeCircle,
  Settings,
  AlertTriangle,
  Clock,
  Mail,
  ChevronRight,
} from "lucide-react";

// --- Utility helpers --------------------------------------------------------
const classNames = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(" ");

// --- Root component ---------------------------------------------------------
export default function ChurchConnectAdmin() {
  const [active, setActive] = useState<
    "dashboard" | "moderation" | "analytics" | "settings"
  >("dashboard");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <Sidebar active={active} onChange={setActive} />
        <main className="flex-1 p-6 lg:p-8" role="main">
          {active === "dashboard" && <Dashboard />}
          {active === "moderation" && <Placeholder title="Content Moderation" />}
          {active === "analytics" && <Placeholder title="Analytics & Reports" />}
          {active === "settings" && <Placeholder title="System Settings" />}
        </main>
      </div>
    </div>
  );
}

// --- Sidebar ---------------------------------------------------------------
function Sidebar({
  active,
  onChange,
}: {
  active: string;
  onChange: (k: any) => void;
}) {
  const navigate = useNavigate();
  const items = [
    { key: "dashboard", label: "Admin Dashboard", icon: GaugeCircle },
    { key: "staff", label: "Staff Verification", icon: ShieldCheck, isNavigation: true },
    { key: "moderation", label: "Content Moderation", icon: FolderOpen },
    { key: "analytics", label: "Analytics & Reports", icon: Users },
    { key: "settings", label: "System Settings", icon: Settings },
  ];
  return (
    <aside
      className="hidden w-72 shrink-0 border-r border-border bg-card p-6 lg:block"
      aria-label="Sidebar"
    >
      <div className="mb-6 border-b border-border pb-4">
        <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-2xl font-bold text-transparent">
          Church Connect
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Admin Panel</p>
      </div>
      <nav className="space-y-1" aria-label="Administration">
        <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Administration
        </div>
        {items.map(({ key, label, icon: Icon, isNavigation }) => (
          <button
            key={key}
            onClick={() => isNavigation ? navigate('/staff-verification') : onChange(key)}
            className={classNames(
              "group flex w-full items-center gap-3 rounded-md px-3 py-2 text-left outline-none transition-all",
              active === key
                ? "bg-primary/10 text-primary ring-1 ring-inset ring-primary/20"
                : "text-foreground hover:bg-primary/5 hover:text-primary"
            )}
            aria-current={active === key ? "page" : undefined}
          >
            <Icon className="h-5 w-5" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

// --- Dashboard (overview) ---------------------------------------------------
function Dashboard() {
  const navigate = useNavigate();
  
  return (
    <div>
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-foreground">Administrative Dashboard</h2>
        <p className="mt-1 text-muted-foreground">Manage church operations and system settings</p>
      </header>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex items-start gap-4 rounded-2xl border border-warning/30 bg-card p-4 shadow-sm ring-1 ring-warning/10">
          <AlertTriangle className="mt-0.5 h-5 w-5 text-warning" />
          <div>
            <h3 className="text-base font-semibold text-warning">Action Required</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              7 pending applications • 3 need background checks
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/staff-verification')}
          className="group relative flex items-center justify-between rounded-2xl bg-gradient-to-r from-warning to-warning/80 px-4 py-4 font-semibold text-warning-foreground shadow-lg transition hover:brightness-110"
        >
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm">
              Review Pending Applications
              <span className="block text-xs font-normal opacity-90">
                12 applications awaiting review
              </span>
            </span>
          </span>
          <ChevronRight className="h-4 w-4 opacity-80 transition group-hover:translate-x-0.5" />
        </button>

        <button className="group relative flex items-center justify-between rounded-2xl bg-gradient-to-r from-primary to-primary-light px-4 py-4 font-semibold text-primary-foreground shadow-lg transition hover:brightness-110">
          <span className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="text-sm">
              Send Community Update
              <span className="block text-xs font-normal opacity-90">
                Notify members of new activities
              </span>
            </span>
          </span>
          <ChevronRight className="h-4 w-4 opacity-80 transition group-hover:translate-x-0.5" />
        </button>
      </div>

      <QuickStats />

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <AdminCard
          title="Staff Verification"
          description="Review and approve ministry staff applications, manage background checks, and verify credentials."
          stats={[
            { label: "Pending", value: "7" },
            { label: "This Month", value: "23" },
            { label: "Total Active", value: "156" },
          ]}
          icon={ShieldCheck}
          primaryLabel="Review Applications"
        />
        <AdminCard
          title="Content Moderation"
          description="Monitor flagged content, manage community posts, and maintain platform safety standards."
          stats={[
            { label: "Flagged", value: "3" },
            { label: "Reviewed", value: "12" },
            { label: "Clean Rate", value: "95%" },
          ]}
          icon={FolderOpen}
          primaryLabel="Review Content"
        />
        <AdminCard
          title="Analytics & Reports"
          description="Track platform usage, generate administrative reports, and monitor system performance."
          stats={[
            { label: "Users", value: "1.2K" },
            { label: "Engagement", value: "89%" },
            { label: "Actions", value: "5.2K" },
          ]}
          icon={Users}
          primaryLabel="View Reports"
        />
        <AdminCard
          title="System Settings"
          description="Configure platform settings, manage integrations, and control permissions."
          stats={[
            { label: "Admins", value: "12" },
            { label: "Uptime", value: "99.9%" },
            { label: "Version", value: "v2.1" },
          ]}
          icon={Settings}
          primaryLabel="Manage Settings"
        />
      </div>
    </div>
  );
}

function QuickStats() {
  const items = [
    { label: "Pending Review", value: "12" },
    { label: "Documents Missing", value: "5" },
    { label: "Ready for Approval", value: "7" },
    { label: "Approved This Month", value: "23" },
    { label: "Active Staff Members", value: "156" },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-5">
      {items.map((s, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
        >
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary to-accent" />
          <div className="text-3xl font-bold text-foreground">{s.value}</div>
          <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function AdminCard({
  title,
  description,
  stats,
  icon: Icon,
  primaryLabel,
}: {
  title: string;
  description: string;
  stats: Array<{ label: string; value: string }>;
  icon: any;
  primaryLabel: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg">
      <div className="mb-3 inline-flex rounded-lg bg-primary/15 p-2 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-xl font-bold text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex gap-2">
        <button className="flex-1 rounded-md bg-gradient-to-r from-primary to-primary-light px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110">
          {primaryLabel}
        </button>
        <button className="flex-1 rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary">
          View All
        </button>
      </div>
    </div>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <div>
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        <p className="mt-1 text-muted-foreground">Coming soon. Focus is Staff Verification.</p>
      </header>
      <div className="rounded-xl border border-border bg-muted/40 p-6 text-muted-foreground">
        Build these next or hide them from non-admins via RLS-backed feature flags.
      </div>
    </div>
  );
}