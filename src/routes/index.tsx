import { createFileRoute } from "@tanstack/react-router";
import heroBottle from "@/assets/hero-bottle.jpg";
import notesImage from "@/assets/notes.jpg";

const TITLE = "Oud Aura by Sarkar Perfume | Smoky Oud & Saffron Extrait";
const DESCRIPTION =
  "Oud Aura is Sarkar Perfume's new extrait de parfum: bergamot, saffron and Assam oud with a 12-hour trail. 50ml for Rs 2,450 with free shipping in India.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const notes = [
  {
    stage: "Top",
    time: "First 20 minutes",
    items: "Calabrian bergamot, pink pepper, dried lemon peel",
  },
  { stage: "Heart", time: "Hours 1-4", items: "Kashmiri saffron, Turkish rose, nutmeg" },
  { stage: "Base", time: "Hours 4-12", items: "Assam oud, amber resin, vetiver, tonka" },
];

const proof = [
  { label: "Concentration", value: "24% extrait" },
  { label: "Longevity", value: "10-12 hrs" },
  { label: "Sillage", value: "Moderate-heavy" },
  { label: "Best for", value: "Evening, winter" },
];

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="font-display text-lg uppercase tracking-[0.35em] text-primary">
            Sarkar
          </span>
          <a
            href="#buy"
            className="rounded-full border border-border px-5 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Buy now
          </a>
        </nav>
      </header>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            New from Sarkar Perfume
          </p>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] md:text-7xl">
            <span className="text-gold">Oud Aura</span>
          </h1>
          <p className="mt-4 font-display text-2xl italic text-muted-foreground md:text-3xl">
            Smoke, saffron and the last hour of a wedding night.
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            An extrait built around Assam oud and Kashmiri saffron, softened with bergamot so it
            opens bright and closes dark. The same Sarkar bottle you already know, with a new soul
            inside.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#buy"
              className="rounded-full bg-primary px-8 py-3 text-sm font-medium uppercase tracking-[0.15em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Shop 50ml - Rs 2,450
            </a>
            <a
              href="#notes"
              className="text-sm uppercase tracking-[0.15em] text-muted-foreground underline decoration-border underline-offset-8 hover:text-primary"
            >
              Explore the notes
            </a>
          </div>
        </div>
        <img
          src={heroBottle}
          alt="Oud Aura extrait de parfum bottle on dark stone with oud wood and dried citrus"
          width={1280}
          height={1600}
          className="mx-auto w-full max-w-sm rounded-2xl border border-border object-cover shadow-[var(--shadow-glow)]"
        />
      </section>
      <section className="border-y border-border bg-card">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-6 py-10 md:grid-cols-4">
          {proof.map((p) => (
            <div key={p.label}>
              <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {p.label}
              </dt>
              <dd className="mt-2 font-display text-xl text-primary">{p.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section id="notes" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <h2 className="font-display text-4xl md:text-5xl">The fragrance pyramid</h2>
        <p className="mt-3 max-w-lg text-sm text-muted-foreground">
          Three movements, twelve hours. Oud Aura is blended to bloom slowly on skin rather than
          shout on first spray.
        </p>
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-center">
          <ol className="space-y-6">
            {notes.map((n, i) => (
              <li key={n.stage} className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl text-primary">
                    <span className="mr-3 text-sm text-muted-foreground">0{i + 1}</span>
                    {n.stage} notes
                  </h3>
                  <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {n.time}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{n.items}</p>
              </li>
            ))}
          </ol>
          <img
            src={notesImage}
            alt="Oud wood, bergamot slices, saffron threads and dried rose petals on dark slate"
            width={1280}
            height={860}
            loading="lazy"
            className="rounded-2xl border border-border object-cover"
          />
        </div>
      </section>
      <section id="buy" className="border-t border-border bg-card">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center md:py-24">
          <h2 className="font-display text-4xl md:text-5xl">
            Launch price, <span className="text-gold">first 200 bottles</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            Every order ships with a 2ml travel atomiser and free delivery across India. Not your
            scent? Return the atomiser sealed within 14 days.
          </p>
          <div className="mt-8 flex flex-wrap items-baseline justify-center gap-4">
            <span className="font-display text-5xl text-primary">Rs 2,450</span>
            <span className="text-sm text-muted-foreground line-through">Rs 3,200</span>
            <span className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
              50 ml
            </span>
          </div>
          <a
            href="https://sarkar.store/"
            className="mt-10 inline-block rounded-full bg-primary px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            Order Oud Aura
          </a>
        </div>
      </section>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span className="font-display text-base tracking-[0.35em] text-primary">Sarkar</span>
          <a href="https://sarkar.store/" className="hover:text-primary">
            sarkar.store
          </a>
          <span>Student concept project - Oud Aura</span>
        </div>
      </footer>
    </main>
  );
}