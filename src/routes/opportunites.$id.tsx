import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/lib/app-state";
import type { Key } from "@/lib/i18n";
import { opportunities } from "@/data/opportunities";
import { AudioButton, Page, StatusBadge, btnPrimary, btnSecondary } from "@/components/cap/Shell";
import { canApply, catKey, fmtDate } from "@/components/cap/OppCard";
import { SwipeConfirm } from "@/components/cap/SwipeConfirm";

export const Route = createFileRoute("/opportunites/$id")({
  loader: ({ params }) => {
    const o = opportunities.find((x) => x.id === params.id);
    if (!o) throw notFound();
    return o;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title.fr ?? "Opportunité"} — CAP ODC` },
      { name: "description", content: loaderData?.description.fr ?? "Détail d'une opportunité CAP ODC." },
      { property: "og:title", content: `${loaderData?.title.fr ?? "Opportunité"} — CAP ODC` },
      { property: "og:description", content: loaderData?.description.fr ?? "Détail d'une opportunité CAP ODC." },
    ],
  }),
  notFoundComponent: () => (
    <div className="p-8 text-center">
      <p className="text-lg font-bold">Opportunité introuvable.</p>
      <Link to="/opportunites" className="mt-4 inline-block font-bold text-primary underline">Voir toutes les opportunités</Link>
    </div>
  ),
  component: Detail,
});

function Section({ k, items }: { k: Key; items: string[] }) {
  const { t } = useApp();
  return (
    <section className="rounded-2xl border bg-card p-4">
      <h2 className="text-base font-bold">{t(k)}</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5">{items.map((i) => <li key={i}>{i}</li>)}</ul>
    </section>
  );
}

function Detail() {
  const o = Route.useLoaderData();
  const { t, lang, saved, toggleSaved, plans, setPlan } = useApp();
  const nav = useNavigate();
  const isSaved = saved.includes(o.id);
  const dates = o.startDate ? (o.endDate && o.endDate !== o.startDate ? `${fmtDate(o.startDate)} → ${fmtDate(o.endDate)}` : fmtDate(o.startDate)) : "Dates à confirmer";

  return (
    <Page back>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-bold text-accent-foreground">{t(catKey[o.category])}</span>
        <StatusBadge status={o.status} />
      </div>
      <h1 className="mt-3 text-2xl font-bold">{(lang === "wo" && o.title.wo) || o.title.fr}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("organisme")} : {o.organisme}</p>
      <p className="mt-3 text-lg">{(lang === "wo" && o.description.wo) || o.description.fr}</p>
      {lang === "wo" && !o.description.wo && <p className="mt-1 text-xs font-semibold text-warning">Texte en français — traduction wolof à venir.</p>}
      <div className="mt-4"><AudioButton /></div>

      <div className="mt-5 space-y-3">
        <Section k="goals" items={o.objectifs} />
        <Section k="who" items={o.public} />
        <Section k="eligibility" items={o.eligibilite} />
        <Section k="where" items={[o.lieu, dates, ...(o.deadline ? [`${t("deadline")} : ${fmtDate(o.deadline)}`] : [])]} />
        <Section k="docs" items={o.documents} />
        <Section k="howTo" items={o.modalites} />
        <p className="rounded-xl bg-muted p-3 text-sm">
          {o.inscriptionUrl ? <a href={o.inscriptionUrl} target="_blank" rel="noreferrer" className="font-bold text-primary underline">Lien officiel</a> : t("noOfficialLink")}
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {canApply(o) && <Link to="/inscription/$id" params={{ id: o.id }} className={btnPrimary}>M'inscrire</Link>}
        {canApply(o) ? (
          <SwipeConfirm
            label={t("swipePrepare")}
            onConfirm={() => {
              if (!plans[o.id]) setPlan(o.id, [false, false, false, false, false]);
              toast.success(t("planCreated"));
              nav({ to: "/plan", search: { id: o.id } });
            }}
          />
        ) : (
          <p className="rounded-2xl bg-muted p-4 text-center font-bold text-muted-foreground">{t("notOpen")}</p>
        )}
        <button
          className={btnSecondary}
          aria-pressed={isSaved}
          onClick={() => {
            toggleSaved(o.id);
            toast.success(isSaved ? "Retiré de tes enregistrements" : "Enregistré dans Mon espace");
          }}
        >
          {isSaved ? <BookmarkCheck className="size-5" aria-hidden /> : <Bookmark className="size-5" aria-hidden />}
          {isSaved ? t("saved") : t("save")}
        </button>
      </div>
    </Page>
  );
}
