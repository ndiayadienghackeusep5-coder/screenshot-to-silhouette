import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/lib/app-state";
import { initiatives, type Theme } from "@/data/opportunities";
import { Page, btnSecondary } from "@/components/cap/Shell";
import { THEMES } from "@/components/cap/Themes";

export const Route = createFileRoute("/initiatives")({
  validateSearch: (s: Record<string, unknown>): { theme?: Theme | undefined } => ({
    theme: THEMES.some((t) => t.id === s["theme"]) ? (s["theme"] as Theme) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Programmes ODC Sénégal — CAP ODC" },
      { name: "description", content: "Sonatel Academy, Tech-Ki, FabLab Solidaire, ODC Clubs, Startup Lab et Orange Fab : à qui ils s'adressent et comment participer." },
      { property: "og:title", content: "Programmes ODC Sénégal — CAP ODC" },
      { property: "og:description", content: "Sonatel Academy, Tech-Ki, FabLab, ODC Clubs, Startup Lab et Orange Fab." },
    ],
  }),
  component: Init,
});

function Init() {
  const { t } = useApp();
  const { theme } = Route.useSearch();
  const nav = useNavigate({ from: "/initiatives" });
  const [open, setOpen] = useState<string | null>(null);
  const list = initiatives.filter((i) => !theme || i.themes.includes(theme));
  const current = THEMES.find((x) => x.id === theme);

  return (
    <Page back title={current ? t(current.label) : t("initTitle")}>
      <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1">
        <button aria-pressed={!theme} onClick={() => nav({ search: {} })} className={`min-h-10 shrink-0 rounded-full border-2 px-4 text-sm font-bold ${!theme ? "border-ink bg-ink text-ink-foreground" : "bg-card"}`}>{t("all")}</button>
        {THEMES.map((th) => (
          <button key={th.id} aria-pressed={theme === th.id} onClick={() => nav({ search: { theme: th.id } })} className={`min-h-10 shrink-0 rounded-full border-2 px-4 text-sm font-bold ${theme === th.id ? "border-ink bg-ink text-ink-foreground" : "bg-card"}`}>{t(th.label)}</button>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((i) => {
          const isOpen = open === i.id;
          return (
            <article key={i.id} className="overflow-hidden rounded-2xl border bg-card shadow-card">
              <img src={i.image} alt="" loading="lazy" width={1024} height={640} className="aspect-[16/8] w-full object-cover" />
              <div className="p-4">
              <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-bold text-accent-foreground">{i.badge}</span>
              <h2 className="mt-2 text-lg font-bold leading-snug">{i.name}</h2>
              <p className="mt-1 text-muted-foreground">{i.mission}</p>
              <p className="mt-2 text-sm"><span className="font-bold">{t("who")} </span>{i.public}</p>
              <p className="mt-3 text-sm font-bold">{i.itemsLabel}</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {i.items.map((x) => <span key={x} className="rounded-lg bg-muted px-2 py-1 text-sm">{x}</span>)}
              </div>
              <button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i.id)} className="mt-4 flex min-h-11 w-full items-center justify-between rounded-xl bg-ink px-4 font-bold text-ink-foreground">
                {t("howJoin")} <ChevronDown className={`size-5 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden />
              </button>
              {isOpen && (
                <div className="mt-3 space-y-2 rounded-xl bg-muted p-3 text-sm">
                  <p>{i.acces}</p>
                  {i.extra && <p>{i.extra}</p>}
                  <p className="font-semibold text-warning">{t("officialNote")}</p>
                  <p className="text-muted-foreground">{t("noOfficialLink")}</p>
                </div>
              )}
              {i.id === "fablab" && <Link to="/fablab" className={`${btnSecondary} mt-3`}>{t("fabMore")}</Link>}
              </div>
            </article>
          );
        })}
      </div>

      {theme === "pres" && <Link to="/pres-de-chez-moi" className={`${btnSecondary} mt-4`}>{t("nearTitle")}</Link>}
    </Page>
  );
}
