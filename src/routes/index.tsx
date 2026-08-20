import { createFileRoute } from "@tanstack/react-router";
import { Triangle, Circle, ChevronDown } from "lucide-react";
import { useState } from "react";

const TITLE = "Performance Audit & Insights";
const DESCRIPTION =
  "A clean, modern diagnostics panel highlighting performance insights, estimated savings, and actionable recommendations.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type AuditItem = {
  id: string;
  status: "warning" | "info";
  title: string;
  savings?: string;
  details: string;
};

const insights: AuditItem[] = [
  {
    id: "cache",
    status: "warning",
    title: "Use efficient cache lifetimes",
    savings: "97 KiB",
    details:
      "Static assets are served with short cache headers. Lengthening cache lifetimes for fonts, images, and hashed bundles will reduce repeat-load network transfers and improve cache-hit ratios.",
  },
  {
    id: "render-blocking",
    status: "warning",
    title: "Render-blocking requests",
    savings: "900 ms",
    details:
      "Critical CSS and JavaScript are blocking first paint. Inline essential CSS, defer non-critical scripts, and use async or modulepreload hints to unblock the rendering path.",
  },
  {
    id: "image-delivery",
    status: "warning",
    title: "Improve image delivery",
    savings: "255 KiB",
    details:
      "Several images are larger than their rendered size or served in inefficient formats. Use responsive images, modern formats such as AVIF/WebP, and explicit width/height to reduce layout shifts.",
  },
  {
    id: "lcp-discovery",
    status: "warning",
    title: "LCP request discovery",
    details:
      "The Largest Contentful Paint element is not discoverable from the initial HTML. Preload the LCP image or font so the browser can start the request earlier in the document lifecycle.",
  },
  {
    id: "network-tree",
    status: "warning",
    title: "Network dependency tree",
    details:
      "Deep dependency chains between scripts, styles, and fonts delay critical requests. Flatten the tree by preloading high-priority resources and removing unused request chains.",
  },
  {
    id: "dom-size",
    status: "info",
    title: "Optimize DOM size",
    details:
      "The document has a moderate number of DOM nodes. Simplify nested markup, remove wrapper divs, and lazy-render below-the-fold content to improve style recalculation and layout costs.",
  },
  {
    id: "lcp-breakdown",
    status: "info",
    title: "LCP breakdown",
    details:
      "Largest Contentful Paint is currently within an acceptable range. Continue monitoring the time spent on load delay, resource load, and element render to keep it stable.",
  },
  {
    id: "third-parties",
    status: "info",
    title: "3rd parties",
    details:
      "Third-party scripts are present but not significantly blocking main-thread work. Audit each tag for necessity and load non-essential scripts after user interaction or idle time.",
  },
];

const diagnostics: AuditItem[] = [
  {
    id: "unused-js",
    status: "warning",
    title: "Reduce unused JavaScript",
    savings: "52 KiB",
    details:
      "A portion of the shipped JavaScript is not executed on initial load. Split code by route, tree-shake unused modules, and defer below-the-fold logic to reduce parse and compile time.",
  },
];

function StatusIcon({ status }: { status: AuditItem["status"] }) {
  if (status === "warning") {
    return (
      <Triangle
        size={18}
        fill="currentColor"
        className="mt-0.5 shrink-0 text-destructive"
        aria-hidden="true"
      />
    );
  }
  return (
    <Circle
      size={18}
      fill="currentColor"
      className="mt-0.5 shrink-0 text-muted-foreground"
      aria-hidden="true"
    />
  );
}

function AuditSection({
  label,
  items,
  open,
  toggle,
}: {
  label: string;
  items: AuditItem[];
  open: Set<string>;
  toggle: (id: string) => void;
}) {
  return (
    <section className="rounded-xl border border-border bg-white shadow-sm">
      <div className="px-5 py-4">
        <span className="inline-flex rounded-md bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
          {label}
        </span>
      </div>
      <ul className="divide-y divide-border">
        {items.map((item) => {
          const isOpen = open.has(item.id);
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="group flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-3">
                  <StatusIcon status={item.status} />
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-foreground">{item.title}</span>
                    {item.savings && (
                      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <span aria-hidden="true">{"—"}</span>
                        <span className="rounded-full bg-savings-bg px-2.5 py-0.5 text-xs font-medium text-savings-text">
                          Est savings of {item.savings}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
                <ChevronDown
                  size={18}
                  className={`mt-1 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-4 pl-12">
                  <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {item.details}
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Index() {
  const [open, setOpen] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-white py-12 text-foreground">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="mb-2 text-center font-display text-3xl font-light tracking-tight text-foreground sm:text-4xl">
          Performance Audit
        </h1>
        <p className="mb-10 text-center text-sm text-muted-foreground">
          Expand each item to view detailed recommendations and estimated impact.
        </p>

        <div className="space-y-8">
          <AuditSection label="Insights" items={insights} open={open} toggle={toggle} />
          <p className="text-xs leading-relaxed text-muted-foreground">
            These insights are also available in the Chrome DevTools Performance Panel - record a
            trace to view more detailed information.
          </p>
          <AuditSection label="Diagnostics" items={diagnostics} open={open} toggle={toggle} />
        </div>
      </div>
    </main>
  );
}
