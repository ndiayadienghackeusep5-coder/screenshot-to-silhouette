import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Briefcase, Check, GraduationCap, HandHeart, PartyPopper, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import { useApp } from "@/lib/app-state";
import type { Key } from "@/lib/i18n";
import { Page, btnPrimary } from "@/components/cap/Shell";

export const GOALS: { id: string; label: Key; icon: typeof Check; cat: string }[] = [
  { id: "form", label: "gForm", icon: GraduationCap, cat: "formation" },
  { id: "job", label: "gJob", icon: Briefcase, cat: "emploi" },
  { id: "event", label: "gEvent", icon: PartyPopper, cat: "evenement" },
  { id: "vol", label: "gVol", icon: HandHeart, cat: "benevolat" },
  { id: "disc", label: "gDisc", icon: Smartphone, cat: "formation" },
];

export const Route = createFileRoute("/objectif")({
  head: () => ({
    meta: [
      { title: "Choisir mon objectif — CAP ODC" },
      { name: "description", content: "Choisis ce que tu veux faire : te former, trouver un stage, participer à un événement ou faire du bénévolat." },
      { property: "og:title", content: "Choisir mon objectif — CAP ODC" },
      { property: "og:description", content: "Te former, trouver un stage, participer à un événement ou faire du bénévolat." },
    ],
  }),
  component: Goal,
});

function Goal() {
  const { t, goals, setGoals } = useApp();
  const [sel, setSel] = useState<string[]>(goals);
  const nav = useNavigate();
  useEffect(() => setSel(goals), [goals]);
  const toggle = (id: string) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <Page back title={t("goalTitle")}>
      <p className="-mt-2 mb-4 text-muted-foreground">{t("goalHint")}</p>
      <div className="space-y-3">
        {GOALS.map(({ id, label, icon: Icon }) => {
          const on = sel.includes(id);
          return (
            <button
              key={id}
              role="checkbox"
              aria-checked={on}
              onClick={() => toggle(id)}
              className={`flex min-h-16 w-full items-center gap-3 rounded-2xl border-2 bg-card p-4 text-left font-bold ${on ? "border-primary" : "border-border"}`}
            >
              <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-accent-foreground"><Icon className="size-5" aria-hidden /></span>
              <span className="flex-1">{t(label)}</span>
              <span className={`grid size-7 place-items-center rounded-lg border-2 ${on ? "border-primary bg-primary text-primary-foreground" : ""}`}>
                {on && <Check className="size-4" aria-hidden />}
              </span>
            </button>
          );
        })}
      </div>
      <button
        className={`${btnPrimary} mt-6`}
        onClick={() => {
          setGoals(sel);
          const cats = [...new Set(GOALS.filter((g) => sel.includes(g.id)).map((g) => g.cat))];
          nav({ to: "/opportunites", search: cats.length === 1 ? { cat: cats[0] } : {} });
        }}
      >
        {t("seeOpps")}
      </button>
    </Page>
  );
}
