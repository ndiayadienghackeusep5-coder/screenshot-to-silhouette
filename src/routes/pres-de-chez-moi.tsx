import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useApp } from "@/lib/app-state";
import { REGIONS, opportunities } from "@/data/opportunities";
import { Empty, Page, btnSecondary } from "@/components/cap/Shell";
import { OppCard } from "@/components/cap/OppCard";

export const Route = createFileRoute("/pres-de-chez-moi")({
  validateSearch: (s: Record<string, unknown>): { region?: string | undefined } => ({ region: typeof s["region"] === "string" ? s["region"] : undefined }),
  head: () => ({
    meta: [
      { title: "ODC près de chez moi — CAP ODC" },
      { name: "description", content: "Découvre les activités numériques publiées dans ta région du Sénégal." },
      { property: "og:title", content: "ODC près de chez moi — CAP ODC" },
      { property: "og:description", content: "Les activités numériques publiées dans ta région du Sénégal." },
    ],
  }),
  component: Near,
});

function Near() {
  const { t } = useApp();
  const { region = "Dakar" } = Route.useSearch();
  const nav = useNavigate({ from: "/pres-de-chez-moi" });
  const items = opportunities.filter((o) => o.region === region);
  return (
    <Page back title={t("nearTitle")}>
      <label className="block text-sm font-semibold">
        {t("pickRegion")}
        <select value={region} onChange={(e) => nav({ search: { region: e.target.value } })} className="mt-1 h-12 w-full rounded-2xl border bg-card px-3 text-base">
          {REGIONS.map((r) => <option key={r}>{r}</option>)}
        </select>
      </label>
      <div className="mt-5 space-y-4">
        {items.length ? items.map((o) => <OppCard key={o.id} o={o} />) : (
          <Empty title={t("nearEmpty")} hint={t("nearEmptyHint")} action={<Link to="/initiatives" className={btnSecondary}>{t("qActivities")}</Link>} />
        )}
      </div>
    </Page>
  );
}
