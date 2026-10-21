import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { ExtraIcon, THEMES } from "@/components/cap/Themes";
import hero from "@/assets/hero.jpg";
import { useApp } from "@/lib/app-state";
import { initiatives, opportunities } from "@/data/opportunities";
import { LangSwitch, Page, btnPrimary } from "@/components/cap/Shell";
import { OppCard, canApply } from "@/components/cap/OppCard";
import { GOALS } from "./objectif";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CAP ODC — Les opportunités numériques à ta portée" },
      { name: "description", content: "Formations, stages, emplois et activités numériques d'Orange Digital Center au Sénégal, en français et en wolof." },
      { property: "og:title", content: "CAP ODC — Les opportunités numériques à ta portée" },
      { property: "og:description", content: "Formations, stages et activités numériques au Sénégal, en français et en wolof." },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, lang, setLang, ready, goals, plans } = useApp();
  const cats = GOALS.filter((g) => goals.includes(g.id)).map((g) => g.cat);
  const forYou = opportunities.find((o) => canApply(o) && (!cats.length || cats.includes(o.category))) ?? opportunities[0]!;
  const planId = Object.keys(plans).find((id) => plans[id]!.some((v) => !v));
  const planOpp = opportunities.find((o) => o.id === planId);
  const planDone = planId ? plans[planId]!.filter(Boolean).length : 0;

  if (ready && lang === null) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 px-6">
        <img src={hero} alt="" width={1024} height={640} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card" />
        <span className="font-display text-2xl font-bold text-primary">CAP ODC</span>
        <h1 className="text-3xl font-bold">Choisis ta langue<br /><span className="text-muted-foreground">Tànnal sa làkk</span></h1>
        <button className={btnPrimary} onClick={() => setLang("fr")}>Français</button>
        <button className={btnPrimary} onClick={() => setLang("wo")}>Wolof</button>
        <p className="text-sm text-muted-foreground">Tu pourras changer à tout moment. · Prototype non officiel.</p>
      </div>
    );
  }

  return (
    <Page>
      {planOpp && (
        <Link to="/plan" search={{ id: planOpp.id }} className="mb-5 block rounded-3xl bg-feature p-5 text-primary-foreground shadow-card">
          <p className="text-xs font-bold uppercase tracking-wider opacity-90">★ {t("yourPlan")}</p>
          <p className="mt-1 font-display text-xl font-bold">{planOpp.title.fr}</p>
          <div className="mt-3 h-2 rounded-full bg-primary-foreground/30"><div className="h-full rounded-full bg-primary-foreground" style={{ width: `${planDone * 20}%` }} /></div>
          <p className="mt-2 text-sm font-bold">{planDone}/5 · {t("resume")} →</p>
        </Link>
      )}
      <section className="relative overflow-hidden rounded-3xl shadow-card">
        <img src={hero} alt="" width={1024} height={640} className="aspect-[4/3] w-full object-cover" />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/30 to-transparent p-5 text-ink-foreground">
          <span className="w-fit rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">{t("heroBadge")}</span>
          <h1 className="mt-2 text-2xl font-bold leading-tight">{t("appTagline")}</h1>
          <p className="mt-1 text-sm opacity-90">{t("homeIntro")}</p>
        </div>
      </section>

      <section className="mt-5 rounded-3xl border-2 border-primary bg-card p-4 shadow-card">
        <span className="inline-block rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">📣 Appel à candidatures</span>
        <h2 className="mt-2 font-display text-lg font-bold leading-tight">Rejoindre l'École du Code — Sonatel Academy</h2>
        <p className="mt-1 text-sm text-muted-foreground">Choisis ta filière et envoie ta demande. Dates d'ouverture à confirmer sur le site officiel ODC.</p>
        <ul className="mt-3 space-y-2">
          {opportunities.filter((o) => o.id.startsWith("sa-")).map((o) => (
            <li key={o.id}>
              <Link to="/inscription/$id" params={{ id: o.id }} className="flex items-center gap-3 rounded-2xl bg-secondary p-3">
                <span className="flex-1">
                  <span className="block font-bold leading-tight">{o.title.fr}</span>
                  <span className="block text-xs text-muted-foreground">{o.description.fr.split(" · ")[0]}</span>
                </span>
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">Postuler</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>


      <section className="mt-6">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-xl font-bold">{t("programs")}</h2>
          <Link to="/initiatives" className="text-sm font-bold text-primary">{t("seeAll")}</Link>
        </div>
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2">
          {initiatives.map((i) => (
            <Link
              key={i.id}
              to={i.id === "fablab" ? "/fablab" : "/initiatives"}
              search={(i.id === "fablab" ? {} : { theme: i.themes[0] }) as never}
              className="relative w-60 shrink-0 snap-start overflow-hidden rounded-2xl shadow-card"
            >
              <img src={i.image} alt="" loading="lazy" width={1024} height={640} className="aspect-[4/5] w-full object-cover" />
              <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 to-transparent p-3 text-ink-foreground">
                <span className="w-fit rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">{i.badge}</span>
                <span className="mt-1 font-display font-bold leading-tight">{i.name}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Link to="/opportunites" search={{ cat: "formation" }} className="mt-5 flex items-center gap-3 rounded-2xl bg-feature p-4 text-primary-foreground shadow-card">
        <span className="flex-1">
          <span className="block font-display text-lg font-bold">Formations disponibles</span>
          <span className="block text-sm opacity-90">Voir les détails et s'inscrire en 1 minute</span>
        </span>
        <ChevronRight className="size-6" aria-hidden />
      </Link>

      <h2 className="mt-6 text-xl font-bold">{t("themesTitle")}</h2>
      <ul className="mt-3 space-y-2.5">
        {THEMES.map(({ id, label, sub, icon: Icon }) => (
          <li key={id}>
            <Link
              to={id === "pres" ? "/pres-de-chez-moi" : "/initiatives"}
              search={(id === "pres" ? {} : { theme: id }) as never}
              className="flex min-h-18 items-center gap-3 rounded-2xl border bg-card p-3.5 shadow-card active:scale-[0.99]"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-accent-foreground"><Icon className="size-6" aria-hidden /></span>
              <span className="flex-1">
                <span className="block font-bold leading-tight">{t(label)}</span>
                <span className="block text-sm text-muted-foreground">{t(sub)}</span>
              </span>
              <ChevronRight className="size-5 text-primary" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>

      <Link to="/opportunites" className="mt-4 flex items-center gap-3 rounded-2xl bg-ink p-4 text-ink-foreground">
        <ExtraIcon className="size-6 shrink-0" aria-hidden />
        <span className="flex-1">
          <span className="block font-bold">{t("extraOpps")}</span>
          <span className="block text-sm opacity-80">{t("extraOppsSub")}</span>
        </span>
        <ChevronRight className="size-5" aria-hidden />
      </Link>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-bold">{cats.length ? t("forYou") : t("featured")}</h2>
        <OppCard o={forYou} />
      </section>

      <div className="mt-8 flex justify-center"><LangSwitch light /></div>
    </Page>
  );
}
