import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/lib/app-state";
import type { Key } from "@/lib/i18n";
import { REGIONS, opportunities } from "@/data/opportunities";
import { Empty, Page, btnSecondary } from "@/components/cap/Shell";
import { OppCard } from "@/components/cap/OppCard";

type S = { cat?: string | undefined; region?: string | undefined };

export const Route = createFileRoute("/opportunites/")({
  validateSearch: (s: Record<string, unknown>): S => ({
    cat: typeof s["cat"] === "string" ? s["cat"] : undefined,
    region: typeof s["region"] === "string" ? s["region"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Opportunités — CAP ODC" },
      { name: "description", content: "Formations, emplois, stages, événements et bénévolat dans le numérique au Sénégal." },
      { property: "og:title", content: "Opportunités — CAP ODC" },
      { property: "og:description", content: "Formations, emplois, stages, événements et bénévolat au Sénégal." },
    ],
  }),
  component: List,
});

const FILTERS: { v?: string; k: Key }[] = [
  { k: "all" }, { v: "formation", k: "fForm" }, { v: "emploi", k: "fJob" }, { v: "evenement", k: "fEvent" }, { v: "benevolat", k: "fVol" },
];

function List() {
  const { t } = useApp();
  const { cat, region } = Route.useSearch();
  const nav = useNavigate({ from: "/opportunites/" });
  const [q, setQ] = useState("");
  const items = opportunities.filter(
    (o) =>
      (!cat || o.category === cat) &&
      (!region || o.region === region) &&
      (!q || `${o.title.fr} ${o.organisme} ${o.region}`.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <Page title={t("oppsTitle")}>
      <label className="flex min-h-12 items-center gap-2 rounded-2xl border bg-card px-4">
        <Search className="size-5 text-muted-foreground" aria-hidden />
        <span className="sr-only">{t("search")}</span>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("search")} className="h-12 flex-1 bg-transparent outline-none" />
      </label>

      <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1" role="group" aria-label="Catégories">
        {FILTERS.map((f) => (
          <button
            key={f.k}
            aria-pressed={cat === f.v}
            onClick={() => nav({ search: (s) => ({ ...s, cat: f.v }) })}
            className={`min-h-10 shrink-0 rounded-full border-2 px-4 text-sm font-bold ${cat === f.v ? "border-ink bg-ink text-ink-foreground" : "bg-card"}`}
          >
            {t(f.k)}
          </button>
        ))}
      </div>

      <label className="mt-3 block text-sm font-semibold">
        {t("region")}
        <select
          value={region ?? ""}
          onChange={(e) => nav({ search: (s) => ({ ...s, region: e.target.value || undefined }) })}
          className="mt-1 h-12 w-full rounded-2xl border bg-card px-3 text-base"
        >
          <option value="">{t("allRegions")}</option>
          {REGIONS.map((r) => <option key={r}>{r}</option>)}
        </select>
      </label>

      <div className="mt-5 space-y-4">
        {items.length ? (
          items.map((o) => <OppCard key={o.id} o={o} />)
        ) : (
          <Empty
            title={t("noResult")}
            hint={t("noResultHint")}
            action={<button className={btnSecondary} onClick={() => { setQ(""); nav({ search: {} }); }}>{t("reset")}</button>}
          />
        )}
      </div>
    </Page>
  );
}
