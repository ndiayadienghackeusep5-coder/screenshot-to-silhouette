import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { REGIONS, opportunities } from "@/data/opportunities";
import { Page, btnPrimary, btnSecondary } from "@/components/cap/Shell";

export const Route = createFileRoute("/inscription/$id")({
  loader: ({ params }) => {
    const o = opportunities.find((x) => x.id === params.id);
    if (!o) throw notFound();
    return o;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `M'inscrire — ${loaderData?.title.fr ?? "Formation"} — CAP ODC` },
      { name: "description", content: "Envoie ta demande d'inscription et reçois les informations par e-mail." },
      { property: "og:title", content: `M'inscrire — ${loaderData?.title.fr ?? "Formation"}` },
      { property: "og:description", content: "Envoie ta demande d'inscription via CAP ODC." },
    ],
  }),
  component: Signup,
});

const schema = z.object({
  full_name: z.string().trim().min(2, "Ton nom est trop court").max(120),
  email: z.string().trim().email("Adresse e-mail invalide").max(200),
  phone: z.string().trim().max(30).optional(),
  region: z.string().max(40).optional(),
});

function Signup() {
  const o = Route.useLoaderData();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notify, setNotify] = useState(true);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = schema.safeParse({ ...fd, phone: fd["phone"] || undefined, region: fd["region"] || undefined });
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    setState("sending");
    const { error } = await supabase.from("inscriptions").insert({
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      phone: parsed.data.phone ?? null,
      region: parsed.data.region ?? null,
      opportunity_id: o.id,
      opportunity_title: o.title.fr,
      notify_email: notify,
    });
    setState(error ? "error" : "done");
  }

  if (state === "done") {
    return (
      <Page back title="Demande envoyée">
        <div className="rounded-3xl bg-success-soft p-6 text-center">
          <CheckCircle2 className="mx-auto size-14 text-success" aria-hidden />
          <h2 className="mt-3 text-xl font-bold">Ta demande est bien enregistrée</h2>
          <p className="mt-2">{o.title.fr}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Ce n'est pas encore une inscription officielle ODC. L'équipe te recontactera avec les modalités et les dates de la prochaine session.
          </p>
        </div>
        <div className="mt-5 space-y-3">
          <Link to="/opportunites" search={{ cat: "formation" }} className={btnPrimary}>Voir d'autres formations</Link>
          <Link to="/" className={btnSecondary}>Retour à l'accueil</Link>
        </div>
      </Page>
    );
  }

  const field = "mt-1 h-12 w-full rounded-2xl border bg-card px-4 text-base";
  return (
    <Page back title="M'inscrire">
      <div className="rounded-2xl bg-primary-soft p-4">
        <p className="text-xs font-bold uppercase text-accent-foreground">Formation</p>
        <p className="font-display text-lg font-bold">{o.title.fr}</p>
        <p className="text-sm text-muted-foreground">{o.organisme}</p>
      </div>

      <form onSubmit={submit} noValidate className="mt-5 space-y-4">
        <label className="block font-semibold">Nom complet *
          <input name="full_name" autoComplete="name" required className={field} aria-invalid={!!errors["full_name"]} />
          {errors["full_name"] && <span className="text-sm text-destructive">{errors["full_name"]}</span>}
        </label>
        <label className="block font-semibold">E-mail *
          <input name="email" type="email" inputMode="email" autoComplete="email" required className={field} aria-invalid={!!errors["email"]} />
          {errors["email"] && <span className="text-sm text-destructive">{errors["email"]}</span>}
        </label>
        <label className="block font-semibold">Téléphone <span className="font-normal text-muted-foreground">(facultatif)</span>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" className={field} />
        </label>
        <label className="block font-semibold">Région <span className="font-normal text-muted-foreground">(facultatif)</span>
          <select name="region" className={field} defaultValue="">
            <option value="">—</option>
            {REGIONS.map((r) => <option key={r}>{r}</option>)}
          </select>
        </label>
        <label className="flex min-h-11 items-start gap-3 rounded-2xl border bg-card p-4">
          <input type="checkbox" checked={notify} onChange={(e) => setNotify(e.target.checked)} className="mt-1 size-5 accent-primary" />
          <span>Recevoir des e-mails de notification sur cette formation (ouverture des inscriptions, prochaine étape).</span>
        </label>
        <p className="text-xs text-muted-foreground">Tes informations servent uniquement à traiter ta demande.</p>
        {state === "error" && <p role="alert" className="rounded-xl bg-destructive/10 p-3 text-sm font-semibold text-destructive">L'envoi a échoué. Vérifie ta connexion et réessaie.</p>}
        <button type="submit" disabled={state === "sending"} className={btnPrimary}>
          {state === "sending" ? <><Loader2 className="size-5 animate-spin" aria-hidden /> Envoi…</> : "Envoyer ma demande"}
        </button>
      </form>
    </Page>
  );
}
