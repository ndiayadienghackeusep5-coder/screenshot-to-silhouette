import { createFileRoute, Link } from "@tanstack/react-router";
import { useApp } from "@/lib/app-state";
import { opportunities } from "@/data/opportunities";
import { GOALS } from "./objectif";
import { LangSwitch, Page } from "@/components/cap/Shell";
import { OppCard } from "@/components/cap/OppCard";

export const Route = createFileRoute("/espace")({
  head: () => ({
    meta: [
      { title: "Mon espace — CAP ODC" },
      { name: "description", content: "Tes objectifs, ton plan d'action, tes opportunités enregistrées et tes réglages." },
      { property: "og:title", content: "Mon espace — CAP ODC" },
      { property: "og:description", content: "Tes objectifs, ton plan et tes opportunités enregistrées." },
    ],
  }),
  component: Space,
});

function Space() {
  const { t, goals, saved, plans, bigText, setBigText } = useApp();
  const savedOpps = opportunities.filter((o) => saved.includes(o.id));
  const box = "rounded-2xl border bg-card p-4";
  return (
    <Page back title={t("spaceTitle")}>
      <p className="-mt-2 mb-4 text-sm text-muted-foreground">{t("privacy")}</p>
      <div className="space-y-4">
        <section className={box}>
          <div className="flex items-center justify-between"><h2 className="font-bold">{t("myGoals")}</h2><Link to="/objectif" className="text-sm font-bold text-primary underline">{t("change")}</Link></div>
          <p className="mt-2 text-muted-foreground">{goals.length ? GOALS.filter((g) => goals.includes(g.id)).map((g) => t(g.label)).join(" · ") : t("noGoals")}</p>
        </section>
        <section className={box}>
          <div className="flex items-center justify-between"><h2 className="font-bold">{t("planTitle")}</h2><Link to="/plan" className="text-sm font-bold text-primary underline">{t("navPlan")}</Link></div>
          <p className="mt-2 text-muted-foreground">
            {Object.keys(plans).length ? Object.entries(plans).map(([id, s]) => `${opportunities.find((o) => o.id === id)?.title.fr} (${s.filter(Boolean).length}/5)`).join(" · ") : t("planEmpty")}
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-bold">{t("mySaved")}</h2>
          <div className="space-y-3">{savedOpps.length ? savedOpps.map((o) => <OppCard key={o.id} o={o} />) : <p className={`${box} text-muted-foreground`}>{t("noSaved")}</p>}</div>
        </section>
        <section className={box}>
          <h2 className="font-bold">{t("language")}</h2>
          <div className="mt-2"><LangSwitch light /></div>
        </section>
        <section className={box}>
          <h2 className="font-bold">{t("accessibility")}</h2>
          <label className="mt-2 flex min-h-11 items-center justify-between gap-3">
            <span>{t("bigText")}</span>
            <input type="checkbox" checked={bigText} onChange={(e) => setBigText(e.target.checked)} className="size-6 accent-primary" />
          </label>
        </section>
      </div>
    </Page>
  );
}
