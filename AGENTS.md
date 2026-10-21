<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## CAP ODC
- Standalone prototype (not integrated into Max it): no backend; user choices persist in localStorage via `src/lib/app-state.tsx` — keeps the MVP accountless and stores no personal data.
- All UI copy lives in `src/lib/i18n.ts` (fr + wo drafts flagged for review); content data in `src/data/` with bilingual fields — so translation and a future verified data source can be swapped without touching screens.
- Never show unverified status, links, or fake submissions; null fields render as "à confirmer".
- Key actions use the Max it pattern: tap card → bottom sheet summary → "glisser pour valider" (SwipeConfirm, keyboard/double-tap fallback) — minimizes taps.
- Registration requests go to Lovable Cloud table `inscriptions` (anon insert-only, no public read); confirmation copy must say it is a request, not an official ODC enrolment.
