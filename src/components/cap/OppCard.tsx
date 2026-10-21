import { Link, useNavigate } from "@tanstack/react-router";
import { Building2, CalendarClock, ChevronRight, FileText, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Drawer, DrawerContent, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { useApp } from "@/lib/app-state";
import type { Key } from "@/lib/i18n";
import type { Category, Opportunity } from "@/data/opportunities";
import { StatusBadge } from "./Shell";
import { SwipeConfirm } from "./SwipeConfirm";

export const catKey: Record<Category, Key> = { formation: "fForm", emploi: "fJob", evenement: "fEvent", benevolat: "fVol" };

export function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export const canApply = (o: Opportunity) => o.status !== "complet" && o.status !== "cloture";

/** Bottom sheet: everything needed to decide, then one swipe to start the plan. */
export function QuickSheet({ o, open, onOpenChange }: { o: Opportunity; open: boolean; onOpenChange: (v: boolean) => void }) {
  const { t, lang, plans, setPlan } = useApp();
  const nav = useNavigate();
  const start = () => {
    if (!plans[o.id]) setPlan(o.id, [false, false, false, false, false]);
    toast.success(t("planCreated"));
    onOpenChange(false);
    nav({ to: "/plan", search: { id: o.id } });
  };
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mx-auto max-w-md px-4 pb-6">
        <DrawerTitle className="mt-3 text-xl font-bold">{(lang === "wo" && o.title.wo) || o.title.fr}</DrawerTitle>
        <DrawerDescription className="mt-1">{o.organisme} · {o.region}</DrawerDescription>
        <div className="mt-3 rounded-2xl bg-muted p-4 text-sm">
          <p className="font-bold">{t("eligibility")}</p>
          <ul className="mt-1 list-disc pl-5">{o.eligibilite.map((e) => <li key={e}>{e}</li>)}</ul>
          <p className="mt-3 flex gap-2 font-bold"><FileText className="size-4" aria-hidden />{t("docs")}</p>
          <p className="mt-1">{o.documents.join(" · ")}</p>
          {o.deadline && <p className="mt-3 font-bold text-primary">{t("deadline")} : {fmtDate(o.deadline)}</p>}
        </div>
        <div className="mt-4">
          {canApply(o) ? (
            <SwipeConfirm label={t("swipePrepare")} onConfirm={start} />
          ) : (
            <p className="rounded-2xl bg-muted p-4 text-center font-bold text-muted-foreground"><StatusBadge status={o.status} /> {t("notOpen")}</p>
          )}
        </div>
        {canApply(o) && (
          <Link to="/inscription/$id" params={{ id: o.id }} className="mt-3 flex min-h-12 items-center justify-center rounded-2xl bg-ink font-bold text-ink-foreground">M'inscrire</Link>
        )}
        <Link to="/opportunites/$id" params={{ id: o.id }} className="mt-1 flex min-h-11 items-center justify-center gap-1 font-bold text-primary">
          {t("details")} <ChevronRight className="size-4" aria-hidden />
        </Link>
      </DrawerContent>
    </Drawer>
  );
}

export function OppCard({ o }: { o: Opportunity }) {
  const { t, lang } = useApp();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="w-full rounded-2xl border bg-card p-4 text-left shadow-card transition-transform active:scale-[0.99]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-bold text-accent-foreground">{t(catKey[o.category])}</span>
          <StatusBadge status={o.status} />
        </div>
        <span className="mt-3 flex items-start justify-between gap-2">
          <span className="font-display text-lg font-bold leading-snug">{(lang === "wo" && o.title.wo) || o.title.fr}</span>
          <ChevronRight className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
        </span>
        <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Building2 className="size-4" aria-hidden />{o.organisme}</span>
          <span className="flex items-center gap-1"><MapPin className="size-4" aria-hidden />{o.region}</span>
          {o.deadline && <span className="flex items-center gap-1"><CalendarClock className="size-4" aria-hidden />{fmtDate(o.deadline)}</span>}
        </span>
      </button>
      <QuickSheet o={o} open={open} onOpenChange={setOpen} />
    </>
  );
}
