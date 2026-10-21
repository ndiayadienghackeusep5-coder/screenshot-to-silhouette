import { createFileRoute, Link } from "@tanstack/react-router";
import { Box, Cpu, Lightbulb, Printer, Scissors, Users } from "lucide-react";
import fab from "@/assets/p-fablab.jpg";
import { useApp } from "@/lib/app-state";
import { AudioButton, Page, btnPrimary, btnSecondary } from "@/components/cap/Shell";

export const Route = createFileRoute("/fablab")({
  head: () => ({
    meta: [
      { title: "FabLab Solidaire Lab-S — CAP ODC" },
      { name: "description", content: "Le FabLab Solidaire d'ODC Sénégal : impression 3D, découpe laser, électronique, robotique et prototypage pour transformer une idée en prototype." },
      { property: "og:title", content: "FabLab Solidaire Lab-S — CAP ODC" },
      { property: "og:description", content: "Impression 3D, découpe laser, électronique et prototypage à ODC Sénégal." },
    ],
  }),
  component: FabLab,
});

const RESOURCES = [
  { icon: Printer, name: "Impression 3D", desc: "Fabriquer une pièce en volume à partir d'un modèle numérique." },
  { icon: Scissors, name: "Découpe laser", desc: "Découper ou graver bois, carton ou plexiglas avec précision." },
  { icon: Cpu, name: "Électronique et robotique", desc: "Capteurs, cartes programmables, petits robots." },
  { icon: Box, name: "Prototypage", desc: "Construire une première version testable de ton idée." },
  { icon: Users, name: "Projets et collaboration", desc: "Travailler en équipe et partager les savoir-faire." },
];

const JOURNEY = ["J'ai une idée", "Je la dessine et je la modélise", "Je fabrique avec les machines", "Je teste et j'améliore", "Je présente mon prototype"];

function FabLab() {
  const { t } = useApp();
  return (
    <Page back title="FabLab">
      <div className="relative overflow-hidden rounded-3xl">
        <img src={fab} alt="Un jeune maker observe une imprimante 3D au FabLab" width={1264} height={848} className="aspect-[4/3] w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4 pt-16 text-ink-foreground">
          <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">Innovation</span>
          <h1 className="mt-2 text-2xl font-bold">FabLab Solidaire — Lab-S</h1>
          <p className="text-sm opacity-90">Apprendre, expérimenter, transformer une idée en prototype.</p>
        </div>
      </div>

      <div className="mt-4"><AudioButton /></div>

      <section className="mt-6">
        <h2 className="text-xl font-bold">Ce que tu peux y faire</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {RESOURCES.map(({ icon: Icon, name, desc }, idx) => (
            <div key={name} className={`rounded-2xl border bg-card p-4 shadow-card ${idx === 4 ? "col-span-2" : ""}`}>
              <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-accent-foreground"><Icon className="size-5" aria-hidden /></span>
              <p className="mt-2 font-bold leading-tight">{name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold">De l'idée au prototype</h2>
        <ol className="mt-3 space-y-0">
          {JOURNEY.map((s, i) => (
            <li key={s} className="flex gap-3">
              <span className="flex flex-col items-center">
                <span className="grid size-8 place-items-center rounded-full bg-brand text-sm font-bold text-primary-foreground">{i + 1}</span>
                {i < JOURNEY.length - 1 && <span className="w-0.5 flex-1 bg-border" />}
              </span>
              <p className="pb-4 pt-1 font-semibold">{s}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-2 rounded-2xl bg-ink p-4 text-ink-foreground">
        <p className="flex items-center gap-2 font-bold"><Lightbulb className="size-5" aria-hidden /> Pour qui ?</p>
        <p className="mt-1 opacity-90">Curieux, étudiants, porteurs d'idées et de projets.</p>
      </section>

      <section className="mt-4 rounded-2xl border bg-card p-4">
        <h2 className="font-bold">{t("howJoin")}</h2>
        <p className="mt-1">Les équipements, réservations et activités accessibles dépendent des modalités du FabLab.</p>
        <p className="mt-2 text-sm font-semibold text-warning">{t("officialNote")}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t("noOfficialLink")}</p>
      </section>

      <div className="mt-5 space-y-3">
        <Link to="/initiatives" search={{ theme: "innover" }} className={btnPrimary}>{t("thInnover")}</Link>
        <Link to="/initiatives" search={{ theme: "projet" }} className={btnSecondary}>{t("thProjet")}</Link>
      </div>
    </Page>
  );
}
