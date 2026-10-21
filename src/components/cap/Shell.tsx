import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Compass, Home, ListChecks, UserRound, Volume2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useApp } from "@/lib/app-state";
import type { Key } from "@/lib/i18n";
import type { Status } from "@/data/opportunities";

export function LangSwitch({ light }: { light?: boolean }) {
  const { lang, setLang } = useApp();
  const cur = lang ?? "fr";
  return (
    <div role="group" aria-label="Langue / Làkk" className={`flex rounded-full p-1 ${light ? "bg-muted" : "bg-ink/25"}`}>
      {(["fr", "wo"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={cur === l}
          className={`min-h-9 rounded-full px-3 text-sm font-bold transition-colors ${cur === l ? "bg-card text-primary" : light ? "text-muted-foreground" : "text-primary-foreground"}`}
        >
          {l === "fr" ? "Français" : "Wolof"}
        </button>
      ))}
    </div>
  );
}

export function Page({ title, back, children }: { title?: string; back?: boolean; children: ReactNode }) {
  const { t, lang } = useApp();
  const router = useRouter();
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-brand">
      <header className="px-4 pb-8 pt-4 text-primary-foreground">
        <div className="flex items-center gap-2">
          {back ? (
            <button onClick={() => router.history.back()} aria-label={t("back")} className="grid size-11 place-items-center rounded-full bg-primary-foreground/20">
              <ArrowLeft className="size-5" aria-hidden />
            </button>
          ) : (
            <Link to="/" className="font-display text-xl font-bold">CAP ODC</Link>
          )}
          {title && back && <h1 className="flex-1 truncate text-center text-lg font-bold">{title}</h1>}
          <div className="ml-auto flex items-center gap-2">
            <LangSwitch />
            <Link to="/espace" aria-label={t("mySpace")} className="grid size-10 place-items-center rounded-full bg-primary-foreground/20">
              <UserRound className="size-5" aria-hidden />
            </Link>
          </div>
        </div>
        {title && !back && <h1 className="mt-4 text-2xl font-bold">{title}</h1>}
      </header>
      <main className="-mt-4 flex-1 rounded-t-[2rem] bg-background px-4 pb-32 pt-5">
        <p className="mb-4 rounded-xl bg-warning-soft px-3 py-1.5 text-xs font-medium text-warning">
          {t("prototype")}{lang === "wo" && <> · {t("woReview")}</>}
        </p>
        {children}
      </main>
      <BottomNav />
    </div>
  );
}

function BottomNav() {
  const { t } = useApp();
  const items: { to: "/" | "/opportunites" | "/plan"; label: Key; icon: typeof Home }[] = [
    { to: "/", label: "navHome", icon: Home },
    { to: "/opportunites", label: "navExplore", icon: Compass },
    { to: "/plan", label: "navPlan", icon: ListChecks },
  ];
  return (
    <nav className="fixed inset-x-0 bottom-3 z-20 px-4">
      <ul className="mx-auto flex max-w-sm justify-between gap-1 rounded-full bg-ink p-1.5 shadow-card">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="group flex min-h-12 items-center justify-center gap-2 rounded-full text-sm font-bold text-ink-foreground/70 data-[status=active]:bg-brand data-[status=active]:text-primary-foreground"
            >
              <Icon className="size-5" aria-hidden />
              <span>{t(label)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function StatusBadge({ status }: { status: Status }) {
  const { t } = useApp();
  const map = {
    ouvert: ["stOuvert", "bg-success-soft text-success", "●"],
    bientot: ["stBientot", "bg-accent text-accent-foreground", "◐"],
    complet: ["stComplet", "bg-muted text-muted-foreground", "■"],
    cloture: ["stCloture", "bg-muted text-muted-foreground", "✕"],
  } as const;
  if (!status) return <span className="rounded-full border px-2.5 py-1 text-xs font-medium text-muted-foreground">{t("stUnknown")}</span>;
  const [k, cls, sym] = map[status];
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${cls}`}>
      <span aria-hidden>{sym} </span>
      {t(k)}
    </span>
  );
}

export function AudioButton() {
  const { t } = useApp();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex min-h-11 items-center gap-2 rounded-full border-2 border-primary px-4 text-sm font-bold text-primary"
      >
        <Volume2 className="size-5" aria-hidden /> {t("listen")}
      </button>
      {open && <p role="status" className="mt-2 rounded-xl bg-muted p-3 text-sm">{t("audioSoon")}</p>}
    </div>
  );
}

export function Empty({ title, hint, action }: { title: string; hint: string; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed bg-card p-6 text-center">
      <p className="font-display text-lg font-semibold">{title}</p>
      <p className="mt-1 text-muted-foreground">{hint}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export const btnPrimary =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-base font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40";
export const btnSecondary =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 bg-card px-5 text-base font-bold";
