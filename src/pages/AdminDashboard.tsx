import { 
  AlertTriangle, 
  Clock, 
  Mail, 
  ChevronRight,
  ShieldCheck,
  FolderOpen,
  Users,
  Settings,
  PanelsTopLeft
} from "lucide-react";

export default function AdminDashboard() {
  // Mock church data for template display
  const mockChurch = {
    id: "template-church",
    name: "Template Church"
  };

  return (
    <div className="flex-1 min-h-screen">
      <div className="p-6 lg:p-8">
      </div>
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
        <button className="flex-1 rounded-md bg-gradient-to-r from-primary to-primary/80 px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110">
          {primaryLabel}
        </button>
        <button className="flex-1 rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary">
          View All
        </button>
      </div>
    </div>
  );
}