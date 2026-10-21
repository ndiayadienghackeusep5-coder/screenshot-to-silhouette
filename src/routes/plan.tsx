import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/lib/app-state";
import type { Key } from "@/lib/i18n";
import { dict } from "@/lib/i18n";
import { opportunities } from "@/data/opportunities";
import { Empty, Page, btnPrimary, btnSecondary } from "@/components/cap/Shell";

export const STEPS: Key[] = ["step1", "step2", "step3", "step4", "step5"];

export const Route = createFileRoute("/plan")({
  validateSearch: (s: Record<string, unknown>): { id?: string | undefined } => ({ id: typeof s["id"] === "string" ? s["id"] : undefined }),
  head: () => ({
    meta: [
      { title: "Mon plan d'action — CAP ODC" },
      { name: "description", content: "Avance étape par étape pour préparer ta démarche." },
      { property: "og:title", content: "Mon plan d'action — CAP ODC" },
      { property: "og:description", content: "Avance étape par étape pour préparer ta démarche." },
    ],
  }),
  component: Plan,
});

function Plan() {
  const { t, lang, plans, setPlan } = useApp();
  const { id } = Route.useSearch();
  const nav = useNavigate({ from: "/plan" });
  const ids = Object.keys(plans);
  const current = id && plans[id] ? id : ids[0];
  const opp = opportunities.find((o) => o.id === current);

  if (!current || !opp) {
    return (
      <Page title={t("planTitle")}>
        <Empty title={t("planEmpty")} hint={t("planEmptyHint")} action={<Link to="/opportunites" className={btnPrimary}>{t("seeOpps")}</Link>} />
      </Page>
    );
  }

  const steps = plans[current] ?? [false, false, false, false, false];
  const done = steps.filter(Boolean).length;
  const next = steps.findIndex((s) => !s);

  return (
    <Page title={t("planTitle")}>
      {ids.length > 1 && (
        <select value={current} onChange={(e) => nav({ search: { id: e.target.value } })} className="mb-4 h-12 w-full rounded-2xl border bg-card px-3" aria-label="Opportunité">
          {ids.map((i) => <option key={i} value={i}>{opportunities.find((o) => o.id === i)?.title.fr}</option>)}
        </select>
      )}
      <Link to="/opportunites/$id" params={{ id: opp.id }} className="font-bold text-primary underline">{opp.title.fr}</Link>

      <div className="mt-4">
        <div className="flex justify-between text-sm font-semibold"><span>{done} / 5 {t("progress")}</span><span>{done * 20}%</span></div>
        <div className="mt-1 h-3 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={done} aria-valuemin={0} aria-valuemax={5}>
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${done * 20}%` }} />
        </div>
      </div>

      <ol className="mt-5 space-y-3">
        {STEPS.map((k, i) => (
          <li key={k}>
            <button
              role="checkbox"
              aria-checked={steps[i]}
              onClick={() => setPlan(current, steps.map((v, j) => (j === i ? !v : v)))}
              className={`flex min-h-16 w-full items-start gap-3 rounded-2xl border-2 bg-card p-4 text-left ${i === next ? "border-primary" : ""}`}
            >
              <span className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg border-2 ${steps[i] ? "border-success bg-success text-primary-foreground" : ""}`}>
                {steps[i] ? <Check className="size-4" aria-hidden /> : <span className="text-sm font-bold">{i + 1}</span>}
              </span>
              <span>
                <span className={`block font-bold ${steps[i] ? "line-through opacity-60" : ""}`}>{dict[k].fr}</span>
                {lang === "wo" && <span className="block text-sm text-muted-foreground">{dict[k].wo} <em className="text-warning">(à vérifier)</em></span>}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <p className="mt-4 rounded-xl bg-muted p-3 text-sm">{t("planNote")}</p>

      <div className="mt-5 space-y-3">
        {next === -1 ? (
          <>
            <p role="status" className="rounded-xl bg-success-soft p-3 font-bold text-success">{t("planDone")}</p>
            <Link to="/opportunites" className={btnSecondary}>{t("seeOpps")}</Link>
          </>
        ) : (
          <button
            className={btnPrimary}
            onClick={() => {
              setPlan(current, steps.map((v, j) => (j === next ? true : v)));
              toast.success(`✓ ${t(STEPS[next]!)}`);
            }}
          >
            {t("continue")} : {t(STEPS[next]!)}
          </button>
        )}
      </div>
    </Page>
  );
}
