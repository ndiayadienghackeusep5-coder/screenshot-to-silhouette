import type React from "react";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dict, type Lang, type Key } from "./i18n";

interface State {
  lang: Lang | null;
  goals: string[];
  saved: string[];
  plans: Record<string, boolean[]>;
  bigText: boolean;
}

const initial: State = { lang: null, goals: [], saved: [], plans: {}, bigText: false };
const KEY = "cap-odc-state-v1";

interface Ctx extends State {
  setLang: (l: Lang) => void;
  setGoals: (g: string[]) => void;
  toggleSaved: (id: string) => void;
  setPlan: (id: string, steps: boolean[]) => void;
  setBigText: (b: boolean) => void;
  t: (k: Key) => string;
  /** true when the shown text is a Wolof translation awaiting review */
  needsReview: (k: Key) => boolean;
  ready: boolean;
}

// Keep a single context instance across hot reloads so provider and consumers always match.
const g = globalThis as unknown as { __capOdcCtx?: React.Context<Ctx | null> };
const AppCtx = (g.__capOdcCtx ??= createContext<Ctx | null>(null));

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [s, setS] = useState<State>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setS({ ...initial, ...JSON.parse(raw) });
    } catch { /* ignore */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(s));
    document.documentElement.style.setProperty("--app-font-size", s.bigText ? "19px" : "16px");
    document.documentElement.lang = s.lang === "wo" ? "wo" : "fr";
  }, [s, ready]);

  const lang = s.lang ?? "fr";
  const value: Ctx = {
    ...s,
    ready,
    setLang: (l) => setS((p) => ({ ...p, lang: l })),
    setGoals: (g) => setS((p) => ({ ...p, goals: g })),
    toggleSaved: (id) =>
      setS((p) => ({ ...p, saved: p.saved.includes(id) ? p.saved.filter((x) => x !== id) : [...p.saved, id] })),
    setPlan: (id, steps) => setS((p) => ({ ...p, plans: { ...p.plans, [id]: steps } })),
    setBigText: (b) => setS((p) => ({ ...p, bigText: b })),
    t: (k) => (lang === "wo" ? dict[k].wo ?? dict[k].fr : dict[k].fr),
    needsReview: (k) => lang === "wo",
  };
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const c = useContext(AppCtx);
  if (!c) throw new Error("useApp outside provider");
  return c;
}
