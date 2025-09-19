import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  Search,
  Filter,
  FileCheck2,
  BadgeCheck,
  UserCheck,
  Shield,
  X,
  Clock,
  Mail,
  Phone,
  MapPin,
  Download,
  Upload,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  Trash2,
} from "lucide-react";

// --- Domain types -----------------------------------------------------------
const CATEGORIES = [
  "Worship/Service",
  "Facilities/Building",
  "Leadership",
  "Events & Programs",
  "Child Ministries",
] as const;

const STATUS = ["pending", "missing_docs", "ready", "approved", "denied"] as const;

/** Category-specific required docs (example policy) */
const REQUIRED_DOCS: Record<(typeof CATEGORIES)[number], string[]> = {
  "Worship/Service": ["Government ID"],
  "Facilities/Building": ["Government ID", "Liability Waiver"],
  Leadership: ["Government ID", "Statement of Belief", "Reference Check (2)"],
  "Events & Programs": ["Government ID", "Event Safety Training"],
  "Child Ministries": [
    "Government ID",
    "Background Check",
    "Child Safety Certificate",
    "Reference Check (2)",
  ],
};

// --- Sample data (replace with Supabase) -----------------------------------
type Applicant = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  submittedAt: string;
  category: (typeof CATEGORIES)[number];
  roleRequested: string;
  docs: Record<string, boolean | number>;
  notes?: string;
  status: (typeof STATUS)[number];
};

const seedApplicants: Applicant[] = [
  {
    id: "a01",
    name: "Ava Thompson",
    email: "ava@example.com",
    phone: "+1 (904) 555-0198",
    address: "123 Kernan Blvd, Jacksonville, FL",
    submittedAt: "2025-09-16T13:12:00Z",
    category: "Child Ministries",
    roleRequested: "Nursery Volunteer",
    docs: {
      "Government ID": true,
      "Background Check": false,
      "Child Safety Certificate": false,
      "Reference Check (2)": 1, // number completed
    },
    notes: "Excellent with toddlers according to reference.",
    status: "pending",
  },
  {
    id: "a02",
    name: "Marcus Lee",
    email: "marcus@example.com",
    phone: "+1 (904) 555-0124",
    address: "Atlantic Blvd, Jacksonville, FL",
    submittedAt: "2025-09-15T09:40:00Z",
    category: "Worship/Service",
    roleRequested: "Guitarist",
    docs: { "Government ID": true },
    notes: "Played with youth band; needs quick audition.",
    status: "ready",
  },
  {
    id: "a03",
    name: "Elena Rivera",
    email: "elena@example.com",
    phone: "+1 (904) 555-0177",
    address: "Hodges Blvd, Jacksonville, FL",
    submittedAt: "2025-09-14T21:10:00Z",
    category: "Leadership",
    roleRequested: "Small Group Leader",
    docs: {
      "Government ID": true,
      "Statement of Belief": true,
      "Reference Check (2)": 2,
    },
    notes: "Prior leader at previous church.",
    status: "approved",
  },
  {
    id: "a04",
    name: "Jordan Park",
    email: "jordan@example.com",
    phone: "+1 (904) 555-0150",
    address: "Kernan & Atlantic, Jacksonville, FL",
    submittedAt: "2025-09-17T15:00:00Z",
    category: "Events & Programs",
    roleRequested: "Hospitality Team",
    docs: { "Government ID": false, "Event Safety Training": false },
    notes: "Friendly; highly recommended by staff.",
    status: "missing_docs",
  },
  {
    id: "a05",
    name: "Chris Nguyen",
    email: "chris@example.com",
    phone: "+1 (904) 555-0133",
    address: "Southside Blvd, Jacksonville, FL",
    submittedAt: "2025-09-15T18:45:00Z",
    category: "Facilities/Building",
    roleRequested: "Maintenance Volunteer",
    docs: { "Government ID": true, "Liability Waiver": true },
    notes: "Handy with HVAC and light electrical.",
    status: "ready",
  },
];

// --- Utility helpers --------------------------------------------------------
const classNames = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(" ");

function formatDate(d: string) {
  try {
    const date = new Date(d);
    return date.toLocaleString();
  } catch {
    return d;
  }
}

function calcMissingDocs(app: Applicant) {
  const required = REQUIRED_DOCS[app.category] || [];
  const missing = required.filter((doc) => {
    const v = app.docs[doc];
    if (typeof v === "number") {
      const need = /\((\d+)\)/.exec(doc)?.[1];
      const target = need ? parseInt(need, 10) : 2;
      return v < target;
    }
    return !v;
  });
  return missing;
}

function docStatusBadge(v: boolean | number, target?: number) {
  if (typeof v === "number") {
    const ok = target ? v >= target : v >= 2;
    return ok ? (
      <Badge variant="default" className="bg-success/15 text-success border-success/20">
        <CheckCircle2 className="mr-1 h-3 w-3" /> {v}/{target ?? 2}
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-warning/15 text-warning border-warning/20">
        <Clock className="mr-1 h-3 w-3" /> {v}/{target ?? 2}
      </Badge>
    );
  }
  return v ? (
    <Badge variant="default" className="bg-success/15 text-success border-success/20">
      <CheckCircle2 className="mr-1 h-3 w-3" /> Complete
    </Badge>
  ) : (
    <Badge variant="destructive" className="bg-destructive/15 text-destructive border-destructive/20">
      <AlertTriangle className="mr-1 h-3 w-3" /> Missing
    </Badge>
  );
}

// CSV escaping helper for testing and reuse
export function csvEscape(x: unknown) {
  const s = String(x ?? "");
  return `"${s.replace(/"/g, '""')}"`;
}

export default function StaffVerification() {
  const [apps, setApps] = useState(seedApplicants);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | (typeof CATEGORIES)[number]>("All");
  const [status, setStatus] = useState<"All" | (typeof STATUS)[number]>("All");
  const [selected, setSelected] = useState<string[]>([]);
  const [drawer, setDrawer] = useState<string | null>(null);
  const [sort, setSort] = useState<{ key: "submittedAt" | "name"; dir: "asc" | "desc" }>({
    key: "submittedAt",
    dir: "desc",
  });

  const filtered = useMemo(() => {
    return apps
      .filter((a) => (category === "All" ? true : a.category === category))
      .filter((a) => (status === "All" ? true : a.status === status))
      .filter((a) =>
        query
          ? [a.name, a.email, a.roleRequested, a.category]
              .join(" ")
              .toLowerCase()
              .includes(query.toLowerCase())
          : true
      )
      .sort((a, b) => {
        const dir = sort.dir === "asc" ? 1 : -1;
        if (sort.key === "name") return a.name.localeCompare(b.name) * dir;
        return (new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()) * dir;
      });
  }, [apps, query, category, status, sort]);

  const toggleSelect = (id: string) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const allOnPageChecked = filtered.length > 0 && filtered.every((a) => selected.includes(a.id));

  const bulkApprove = () => {
    setApps((prev) =>
      prev.map((a) => (selected.includes(a.id) ? { ...a, status: "approved" as const } : a))
    );
    setSelected([]);
  };

  const bulkRequestDocs = () => {
    alert("Requested missing documents for selected applicants (stub). Replace with Supabase RPC.");
  };

  const open = apps.find((a) => a.id === drawer) || null;

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-primary" />
            Staff Verification
          </CardTitle>
          <p className="text-muted-foreground">
            Review and approve ministry staff applications, manage background checks, and verify credentials.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Filters */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                aria-label="Search applicants"
                placeholder="Search by name, email, role…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                aria-label="Filter by category"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-transparent text-sm text-foreground focus:outline-none"
              >
                <option>All</option>
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <select
                aria-label="Filter by status"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-transparent text-sm text-foreground focus:outline-none"
              >
                <option>All</option>
                {STATUS.map((s) => (
                  <option key={s} value={s}>
                    {labelize(s)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportCSV(filtered)}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" /> Export CSV
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Upload className="h-4 w-4" /> Import
              </Button>
            </div>
          </div>

          {/* Bulk actions */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {apps.length}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={bulkRequestDocs}
                disabled={selected.length === 0}
                className={selected.length === 0 ? "opacity-50 cursor-not-allowed" : "border-warning text-warning hover:bg-warning/10"}
              >
                <FileCheck2 className="h-4 w-4 mr-2" /> Request Missing Docs
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={bulkApprove}
                disabled={selected.length === 0}
                className={selected.length === 0 ? "opacity-50 cursor-not-allowed" : "border-success text-success hover:bg-success/10"}
              >
                <BadgeCheck className="h-4 w-4 mr-2" /> Approve Selected
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <input
                      aria-label="Select all on page"
                      type="checkbox"
                      className="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary"
                      checked={allOnPageChecked}
                      onChange={(e) =>
                        setSelected(
                          e.target.checked ? Array.from(new Set([...selected, ...filtered.map((a) => a.id)])) : []
                        )
                      }
                    />
                  </th>
                  <SortableTH label="Applicant" sort={sort} setSort={setSort} k="name" />
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Category
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Role Requested
                  </th>
                  <SortableTH label="Submitted" sort={sort} setSort={setSort} k="submittedAt" />
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Required Docs
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((a) => {
                  const missing = calcMissingDocs(a);
                  return (
                    <tr key={a.id} className="hover:bg-muted/50">
                      <td className="px-3 py-2">
                        <input
                          aria-label={`Select ${a.name}`}
                          type="checkbox"
                          className="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary"
                          checked={selected.includes(a.id)}
                          onChange={() => toggleSelect(a.id)}
                        />
                      </td>
                      <td className="px-3 py-3">
                        <div className="font-medium text-foreground">{a.name}</div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5" /> {a.email}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5" /> {a.phone}
                          </span>
                          <span className="hidden items-center gap-1 sm:inline-flex">
                            <MapPin className="h-3.5 w-3.5" /> {a.address}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm text-foreground">{a.category}</td>
                      <td className="px-3 py-3 text-sm text-foreground">{a.roleRequested}</td>
                      <td className="px-3 py-3 text-sm text-muted-foreground">{formatDate(a.submittedAt)}</td>
                      <td className="px-3 py-3 text-sm">
                        <div className="flex flex-wrap items-center gap-2">
                          {(REQUIRED_DOCS[a.category] || []).map((doc) => {
                            const v = a.docs[doc];
                            const need = /\((\d+)\)/.exec(doc)?.[1];
                            const target = need ? parseInt(need, 10) : undefined;
                            return (
                              <div key={doc} className="whitespace-nowrap">
                                <span className="mr-1 text-xs text-muted-foreground">{doc}:</span>
                                {docStatusBadge(v as any, target)}
                              </div>
                            );
                          })}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm">
                        <StatusPill status={a.status} missingCount={missing.length} />
                      </td>
                      <td className="px-3 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDrawer(a.id)}
                            className="flex items-center gap-2"
                          >
                            <UserCheck className="h-4 w-4" /> Review
                          </Button>
                          <Button
                            size="sm"
                            onClick={() =>
                              setApps((prev) => prev.map((p) => (p.id === a.id ? { ...p, status: "approved" as const } : p)))
                            }
                            className="bg-success hover:bg-success/90 text-success-foreground flex items-center gap-2"
                          >
                            <CheckCircle2 className="h-4 w-4" /> Approve
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Drawer */}
          {open && (
            <ReviewDrawer
              app={open}
              onClose={() => setDrawer(null)}
              onUpdate={(patch) => setApps((prev) => prev.map((p) => (p.id === open.id ? { ...p, ...patch } : p)))}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SortableTH({
  label,
  sort,
  setSort,
  k,
}: {
  label: string;
  sort: { key: "submittedAt" | "name"; dir: "asc" | "desc" };
  setSort: (s: any) => void;
  k: "submittedAt" | "name";
}) {
  const active = sort.key === k;
  const dir = active ? sort.dir : undefined;
  return (
    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
      <button
        onClick={() => setSort({ key: k, dir: active && dir === "asc" ? "desc" : "asc" })}
        className="inline-flex items-center gap-1.5 hover:text-slate-200"
        aria-sort={active ? (dir === "asc" ? "ascending" : "descending") : "none"}
      >
        {label}
        <ChevronDown
          className={classNames(
            "h-4 w-4 transition",
            !active && "opacity-40",
            active && dir === "asc" && "rotate-180"
          )}
        />
      </button>
    </th>
  );
}

function StatusPill({
  status,
  missingCount,
}: {
  status: (typeof STATUS)[number];
  missingCount: number;
}) {
  const map: Record<(typeof STATUS)[number], { text: string; classes: string }> = {
    pending: {
      text: "Pending",
      classes: "bg-amber-500/15 text-amber-300",
    },
    missing_docs: {
      text: `Missing Docs${missingCount ? ` (${missingCount})` : ""}`,
      classes: "bg-rose-500/15 text-rose-300",
    },
    ready: { text: "Ready", classes: "bg-sky-500/15 text-sky-300" },
    approved: { text: "Approved", classes: "bg-emerald-500/15 text-emerald-300" },
    denied: { text: "Denied", classes: "bg-rose-600/20 text-rose-300" },
  };
  const m = map[status];
  return (
    <span className={classNames("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", m.classes)}>
      {m.text}
    </span>
  );
}

function ReviewDrawer({
  app,
  onClose,
  onUpdate,
}: {
  app: Applicant;
  onClose: () => void;
  onUpdate: (patch: Partial<Applicant>) => void;
}) {
  const missing = calcMissingDocs(app);

  const toggleDoc = (doc: string) => {
    const current = app.docs[doc];
    if (typeof current === "number") {
      const need = /\((\d+)\)/.exec(doc)?.[1];
      const target = need ? parseInt(need, 10) : 2;
      const next = Math.min(target, (current as number) + 1);
      onUpdate({ docs: { ...app.docs, [doc]: next } });
    } else {
      onUpdate({ docs: { ...app.docs, [doc]: !current } });
    }
  };

  const approve = () => onUpdate({ status: "approved" });
  const markReady = () => onUpdate({ status: "ready" });
  const deny = () => onUpdate({ status: "denied" });

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto h-full w-full max-w-xl overflow-y-auto border-l border-slate-800 bg-slate-950 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-100">Review Application</h3>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Applicant header */}
          <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold text-slate-100">{app.name}</div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                  <span className="inline-flex items-center gap-1"><Mail className="h-4 w-4" /> {app.email}</span>
                  <span className="inline-flex items-center gap-1"><Phone className="h-4 w-4" /> {app.phone}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {app.address}</span>
                </div>
              </div>
              <StatusPill status={app.status} missingCount={missing.length} />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-slate-400">Category</div>
                <div className="font-medium text-slate-200">{app.category}</div>
              </div>
              <div>
                <div className="text-slate-400">Role Requested</div>
                <div className="font-medium text-slate-200">{app.roleRequested}</div>
              </div>
              <div>
                <div className="text-slate-400">Submitted</div>
                <div className="font-medium text-slate-200">{formatDate(app.submittedAt)}</div>
              </div>
              <div>
                <div className="text-slate-400">Notes</div>
                <div className="font-medium text-slate-200">{app.notes || "—"}</div>
              </div>
            </div>
          </div>

          {/* Required docs checklist */}
          <section aria-labelledby="docs-heading" className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
            <h4 id="docs-heading" className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
              <FileCheck2 className="h-4 w-4" /> Required Documents
            </h4>
            <ul className="space-y-2">
              {(REQUIRED_DOCS[app.category] || []).map((doc) => {
                const v = app.docs[doc];
                const need = /\((\d+)\)/.exec(doc)?.[1];
                const target = need ? parseInt(need, 10) : undefined;
                const ok = typeof v === "number" ? v >= (target ?? 2) : !!v;
                return (
                  <li key={doc} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {ok ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-amber-400" />
                      )}
                      <span className="text-sm text-slate-200">{doc}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {docStatusBadge(v as any, target)}
                      <button
                        onClick={() => toggleDoc(doc)}
                        className="rounded-md border border-slate-700 px-2 py-1 text-xs font-semibold text-slate-200 hover:bg-slate-800/60"
                      >
                        Mark One
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={markReady}
              className="inline-flex items-center gap-2 rounded-md border border-sky-500/40 bg-sky-500/10 px-3 py-2 text-sm font-semibold text-sky-300 hover:bg-sky-500/15"
            >
              <ShieldCheck className="h-4 w-4" /> Mark Ready
            </button>
            <button
              onClick={approve}
              className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:brightness-110"
            >
              <BadgeCheck className="h-4 w-4" /> Approve
            </button>
            <button
              onClick={deny}
              className="inline-flex items-center gap-2 rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm font-semibold text-rose-300 hover:bg-rose-500/15"
            >
              <Trash2 className="h-4 w-4" /> Deny
            </button>
          </div>

          {/* Audit trail (stub) */}
          <section className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
            <h4 className="mb-3 text-sm font-semibold text-slate-200">Audit Trail</h4>
            <ol className="space-y-2 text-sm text-slate-400">
              <li>
                <span className="font-medium text-slate-300">2025-09-17</span> — Application created by {app.name}
              </li>
              <li>
                <span className="font-medium text-slate-300">2025-09-18</span> — System flagged missing docs
              </li>
              <li>
                <span className="font-medium text-slate-300">—</span> — (Wire to Supabase to show real events)
              </li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}

function labelize(s: string) {
  return s
    .split("_")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

// --- CSV Export (client-side) ----------------------------------------------
function exportCSV(rows: any[]) {
  const header = [
    "id",
    "name",
    "email",
    "phone",
    "address",
    "submittedAt",
    "category",
    "roleRequested",
    "status",
    "missingDocs",
  ];
  const lines = rows.map((a) => {
    const missing = calcMissingDocs(a).join("; ");
    return [
      a.id,
      a.name,
      a.email,
      a.phone,
      a.address,
      a.submittedAt,
      a.category,
      a.roleRequested,
      a.status,
      missing,
    ]
      .map((x) => csvEscape(x))
      .join(",");
  });
  const blob = new Blob([[header.join(","), ...lines].join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `churchconnect_staff_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}