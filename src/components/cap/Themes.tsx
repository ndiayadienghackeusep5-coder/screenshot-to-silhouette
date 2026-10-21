import { Briefcase, GraduationCap, Lightbulb, MapPin, Rocket, Smartphone } from "lucide-react";
import type { Key } from "@/lib/i18n";
import type { Theme } from "@/data/opportunities";

export const THEMES: { id: Theme; label: Key; sub: Key; icon: typeof GraduationCap }[] = [
  { id: "former", label: "thFormer", sub: "thFormerSub", icon: GraduationCap },
  { id: "decouvrir", label: "thDecouvrir", sub: "thDecouvrirSub", icon: Smartphone },
  { id: "innover", label: "thInnover", sub: "thInnoverSub", icon: Lightbulb },
  { id: "projet", label: "thProjet", sub: "thProjetSub", icon: Rocket },
  { id: "pres", label: "thPres", sub: "thPresSub", icon: MapPin },
];
export const ExtraIcon = Briefcase;
