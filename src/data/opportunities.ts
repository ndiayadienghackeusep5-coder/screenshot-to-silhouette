import imgCode from "@/assets/p-code.jpg";
import imgTechki from "@/assets/p-techki.jpg";
import imgFablab from "@/assets/p-fablab.jpg";
import imgClubs from "@/assets/p-clubs.jpg";
import imgStartup from "@/assets/p-startup.jpg";

// DEMO DATA — fictitious examples for the prototype. Not official ODC offers.
// Replace with a verified source managed by ODC (see AGENTS.md).

export type Category = "formation" | "emploi" | "evenement" | "benevolat";
export type Status = "ouvert" | "bientot" | "complet" | "cloture" | null;

export interface Bilingual {
  fr: string;
  /** Wolof text, null if no validated translation is available yet */
  wo: string | null;
}

export interface Opportunity {
  id: string;
  title: Bilingual;
  description: Bilingual;
  category: Category;
  organisme: string;
  region: string;
  lieu: string;
  startDate: string | null;
  endDate: string | null;
  deadline: string | null;
  objectifs: string[];
  public: string[];
  eligibilite: string[];
  documents: string[];
  modalites: string[];
  status: Status;
  source: string | null;
  inscriptionUrl: string | null;
  lastVerified: string | null;
}

export const REGIONS = [
  "Dakar", "Thiès", "Saint-Louis", "Ziguinchor", "Kaolack", "Diourbel", "Louga",
  "Fatick", "Kolda", "Matam", "Tambacounda", "Kaffrine", "Kédougou", "Sédhiou",
];

const parcours = (id: string, fr: string, desc: string, pub: string[], obj: string[]): Opportunity => ({
  id, title: { fr, wo: null }, description: { fr: desc, wo: null }, category: "formation",
  organisme: "École du Code — Sonatel Academy", region: "Dakar", lieu: "Orange Digital Center (lieu à confirmer)",
  startDate: null, endDate: null, deadline: null, objectifs: obj, public: pub,
  eligibilite: ["Critères d'admission propres à chaque session — à confirmer auprès d'ODC"],
  documents: ["À confirmer selon la session (pièce d'identité, CV…)"],
  modalites: ["Envoyer une demande via CAP ODC", "L'équipe te recontacte avec les modalités officielles", "Sélection selon le parcours"],
  status: null, source: "Catalogue ODC Sénégal (résumé fourni)", inscriptionUrl: null, lastVerified: null,
});

export const opportunities: Opportunity[] = [
  parcours("sa-dev-web", "Développement Web / Web Mobile", "10 mois · Créer des sites web et des applications, du front-end au back-end. Métier visé : Développeur Fullstack.", ["Jeunes motivés par le code"], ["Créer des sites et applications", "Front-end et back-end", "Devenir Développeur Fullstack"]),
  parcours("sa-data-ia", "Développement Data & IA", "10 mois · Exploiter les données et découvrir les techniques d'intelligence artificielle. Métier visé : Data Analyst.", ["Profils à l'aise avec la logique et les chiffres"], ["Manipuler et visualiser des données", "Découvrir l'IA", "Devenir Data Analyst"]),
  parcours("sa-referent", "Référent Digital", "10 mois · Outils numériques, webmarketing, sites web, e-commerce et solutions digitales.", ["Personnes intéressées par la transformation numérique"], ["Webmarketing et e-commerce", "Outils et solutions digitales"]),
  parcours("sa-assistante", "Assistante Digitale — Hackeuse", "4 mois · Programme réservé aux femmes : outils numériques, communication, créativité et design. Métier visé : Assistante de direction digitale.", ["Femmes"], ["Outils numériques", "Communication, créativité et design"]),
  parcours("sa-aws", "AWS re/Start — Cloud Computing & DevOps", "4 mois · Bases du cloud AWS et pratiques DevOps. Métier visé : DevOps.", ["Débutants motivés par l'infrastructure"], ["Comprendre le cloud AWS", "Pratiques DevOps"]),
  parcours("sa-ia", "Intelligence Artificielle", "4 mois · Machine Learning, Deep Learning et création de modèles d'IA. Métier visé : Développeur IA.", ["Profils motivés par l'IA"], ["Machine Learning", "Deep Learning", "Créer des modèles d'IA"]),
  parcours("sa-cyber", "Cybersécurité", "3 mois · Formation en ligne pour professionnels : protéger les systèmes, repérer les vulnérabilités, gérer les incidents. Métier visé : Technicien support en cybersécurité.", ["Professionnels"], ["Repérer les vulnérabilités", "Gérer les incidents de sécurité"]),

  {
    id: "dev-web-debutant",
    title: { fr: "Initiation au développement web", wo: null },
    description: {
      fr: "Une formation pour apprendre à créer un site web simple, même sans expérience.",
      wo: null,
    },
    category: "formation",
    organisme: "Exemple — École du Code",
    region: "Dakar",
    lieu: "Exemple de lieu, Dakar",
    startDate: "2026-12-01",
    endDate: "2027-02-28",
    deadline: "2026-11-20",
    objectifs: ["Comprendre comment fonctionne un site web", "Créer une première page", "Découvrir les métiers du code"],
    public: ["Jeunes de 18 à 35 ans", "Débutants acceptés"],
    eligibilite: ["Avoir entre 18 et 35 ans", "Être disponible en journée", "Savoir lire et écrire en français"],
    documents: ["Pièce d'identité", "Un CV simple (même court)"],
    modalites: ["Remplir le formulaire officiel", "Passer un petit test de logique", "Entretien de motivation"],
    status: "ouvert",
    source: null,
    inscriptionUrl: null,
    lastVerified: null,
  },
  {
    id: "atelier-smartphone",
    title: { fr: "Atelier : bien utiliser son smartphone", wo: null },
    description: { fr: "Apprendre à envoyer un e-mail, se protéger en ligne et utiliser les services utiles.", wo: null },
    category: "formation",
    organisme: "Exemple — Atelier de sensibilisation",
    region: "Thiès",
    lieu: "Exemple de lieu, Thiès",
    startDate: "2026-11-15",
    endDate: "2026-11-15",
    deadline: null,
    objectifs: ["Utiliser les fonctions de base", "Éviter les arnaques en ligne"],
    public: ["Toute personne débutante", "Femmes et jeunes"],
    eligibilite: ["Aucune condition particulière"],
    documents: ["Aucun document requis"],
    modalites: ["Se présenter sur place le jour de l'atelier", "Places limitées"],
    status: "bientot",
    source: null,
    inscriptionUrl: null,
    lastVerified: null,
  },
  {
    id: "stage-support",
    title: { fr: "Stage : assistant support numérique", wo: null },
    description: { fr: "Un stage pour accompagner les usagers d'un espace numérique.", wo: null },
    category: "emploi",
    organisme: "Exemple — Entreprise partenaire",
    region: "Dakar",
    lieu: "Exemple de lieu, Dakar",
    startDate: "2027-01-05",
    endDate: "2027-06-30",
    deadline: "2026-12-10",
    objectifs: ["Acquérir une première expérience", "Aider les usagers"],
    public: ["Étudiants", "Jeunes diplômés"],
    eligibilite: ["Bac ou équivalent", "Bonne communication"],
    documents: ["CV", "Lettre de motivation", "Pièce d'identité"],
    modalites: ["Envoyer sa candidature au contact officiel", "Entretien"],
    status: "ouvert",
    source: null,
    inscriptionUrl: null,
    lastVerified: null,
  },
  {
    id: "fablab-portes-ouvertes",
    title: { fr: "Journée découverte du FabLab", wo: null },
    description: { fr: "Venir voir des imprimantes 3D et des machines de fabrication numérique.", wo: null },
    category: "evenement",
    organisme: "Exemple — FabLab",
    region: "Saint-Louis",
    lieu: "Exemple de lieu, Saint-Louis",
    startDate: "2026-11-28",
    endDate: "2026-11-28",
    deadline: null,
    objectifs: ["Découvrir la fabrication numérique", "Rencontrer des makers"],
    public: ["Tout public", "Familles"],
    eligibilite: ["Entrée libre"],
    documents: ["Aucun document requis"],
    modalites: ["Venir sur place aux horaires annoncés"],
    status: null,
    source: null,
    inscriptionUrl: null,
    lastVerified: null,
  },
  {
    id: "benevole-club",
    title: { fr: "Bénévole pour un club numérique", wo: null },
    description: { fr: "Aider à animer des séances d'initiation au numérique dans ton quartier.", wo: null },
    category: "benevolat",
    organisme: "Exemple — ODC Club",
    region: "Ziguinchor",
    lieu: "Exemple de lieu, Ziguinchor",
    startDate: null,
    endDate: null,
    deadline: null,
    objectifs: ["Partager ses connaissances", "S'engager pour sa communauté"],
    public: ["Étudiants", "Jeunes motivés"],
    eligibilite: ["Avoir des bases en informatique", "Être disponible 2 h par semaine"],
    documents: ["Pièce d'identité"],
    modalites: ["Contacter le club officiel", "Rencontre de présentation"],
    status: "complet",
    source: null,
    inscriptionUrl: null,
    lastVerified: null,
  },
  {
    id: "entrepreneuriat-femmes",
    title: { fr: "Programme numérique pour femmes entrepreneures", wo: null },
    description: { fr: "Apprendre à vendre en ligne et à gérer son activité avec le téléphone.", wo: null },
    category: "formation",
    organisme: "Exemple — Programme partenaire",
    region: "Kaolack",
    lieu: "Exemple de lieu, Kaolack",
    startDate: "2026-09-01",
    endDate: "2026-10-15",
    deadline: "2026-08-20",
    objectifs: ["Vendre sur les réseaux sociaux", "Gérer ses comptes simplement"],
    public: ["Femmes ayant une activité ou un projet"],
    eligibilite: ["Avoir une activité ou une idée de projet"],
    documents: ["Pièce d'identité", "Courte description du projet"],
    modalites: ["Formulaire officiel", "Sélection sur dossier"],
    status: "cloture",
    source: null,
    inscriptionUrl: null,
    lastVerified: null,
  },
];

export type Theme = "former" | "decouvrir" | "innover" | "projet" | "pres";

export interface Initiative {
  id: string;
  name: string;
  badge: string;
  themes: Theme[];
  mission: string;
  public: string;
  items: string[];
  itemsLabel: string;
  acces: string;
  extra?: string;
  image: string;
}

// Source: user-provided summary of the official ODC Sénégal programme catalogue.
// Open sessions, dates and sign-up links must be refreshed from ODC before publication.
export const initiatives: Initiative[] = [
  {
    id: "ecole-du-code", image: imgCode, name: "École du Code — Sonatel Academy", badge: "Formation", themes: ["former"],
    mission: "Formations intensives aux métiers du numérique, avec projets pratiques et accompagnement vers l'emploi.",
    public: "Personnes voulant se former à un métier du numérique",
    itemsLabel: "Parcours",
    items: ["Développement Web / Web Mobile", "Data et intelligence artificielle", "Référent digital", "Assistante digitale (programme dédié aux femmes)", "AWS re/Start — Cloud et DevOps", "Cybersécurité"],
    acces: "Durées, critères d'admission et inscriptions varient selon le parcours.",
  },
  {
    id: "tech-ki", image: imgTechki, name: "Tech-Ki — Acculturation numérique", badge: "Initiation", themes: ["decouvrir", "pres"],
    mission: "Initiative d'inclusion numérique pour mieux comprendre et utiliser le numérique.",
    public: "Débutants, toute personne qui veut découvrir le numérique",
    itemsLabel: "Activités",
    items: ["Découverte d'Internet et du Web", "Initiation aux outils bureautiques", "Sensibilisation à la sécurité en ligne", "Découverte des métiers et opportunités numériques"],
    acces: "Intervient dans les régions du Sénégal, selon les sessions annoncées.",
  },
  {
    id: "fablab", image: imgFablab, name: "FabLab Solidaire — Lab-S", badge: "Innovation", themes: ["innover"],
    mission: "Un espace pour apprendre, expérimenter et transformer une idée en prototype.",
    public: "Curieux, étudiants, porteurs d'idées",
    itemsLabel: "Activités et ressources",
    items: ["Impression 3D", "Découpe laser et fabrication numérique", "Électronique et robotique", "Prototypage", "Création de projets et collaboration"],
    acces: "Équipements, réservations et activités selon les modalités du FabLab.",
  },
  {
    id: "clubs", image: imgClubs, name: "ODC Clubs", badge: "Communauté", themes: ["innover", "pres"],
    mission: "Communautés d'apprentissage et d'innovation, notamment dans des universités sénégalaises.",
    public: "Étudiants",
    itemsLabel: "Peuvent proposer",
    items: ["Ateliers et sessions de formation", "Initiation au code", "Hackathons et défis Tech for Good", "Sensibilisation au numérique", "Rencontres entre étudiants"],
    acces: "Selon le club de ton université.",
    extra: "Universités partenaires : UGB (Saint-Louis), UAM, Université Alioune Diop (Bambey), Université Assane Seck (Ziguinchor).",
  },
  {
    id: "startups", image: imgStartup, name: "Accompagnement des startups", badge: "Entrepreneuriat", themes: ["projet"],
    mission: "Des dispositifs pour les porteurs de projets et les startups.",
    public: "Porteurs de projets et startups",
    itemsLabel: "Programmes",
    items: ["Startup Lab : idéation, prototypage, ateliers et accompagnement", "Orange Fab : accélération des startups en croissance, mentorat et développement commercial"],
    acces: "Conditions selon le programme et la maturité du projet.",
  },
];
