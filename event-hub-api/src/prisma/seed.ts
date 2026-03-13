import "dotenv/config";
import { prisma } from "./client.js";


const daysFromNow = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
};

const events = [
  {
    id: "evt-001",
    title: "Festival d'Hiver",
    description: "Animations, stands et concerts pour lancer la saison.",
    postalcode: "75001",
    address: "10 Rue de Rivoli, Paris",
    capacity: 600,
    ticket: 450,
    price: 15,
    category: ["festival", "musique", "food"],
    createdBy: "cityHall",
    startDate: daysFromNow(14),
  },
  {
    id: "evt-002",
    title: "Conférence Tech & IA",
    description: "Talks, démos et networking autour de l'IA et du cloud.",
    postalcode: "75002",
    address: "30 Rue Montorgueil, Paris",
    capacity: 300,
    ticket: 220,
    price: 0,
    category: ["conference", "startup", "networking"],
    createdBy: "eventhub",
    startDate: daysFromNow(21),
  },
  {
    id: "evt-003",
    title: "Atelier Cuisine Locale",
    description: "Atelier pratique, dégustation et recettes faciles à refaire.",
    postalcode: "75005",
    address: "15 Rue Mouffetard, Paris",
    capacity: 30,
    ticket: 28,
    price: 35,
    category: ["workshop", "food"],
    createdBy: "asso_food",
    startDate: daysFromNow(10),
  },
  {
    id: "evt-004",
    title: "Soirée Jazz Live",
    description: "Concert live, ambiance lounge, restauration sur place.",
    postalcode: "75010",
    address: "5 Rue du Faubourg Saint-Denis, Paris",
    capacity: 120,
    ticket: 110,
    price: 22,
    category: ["musique", "festival"],
    createdBy: "asso_music",
    startDate: daysFromNow(7),
  },
  {
    id: "evt-005",
    title: "Projection Cinéma Plein Air",
    description: "Projection en extérieur, plaid conseillé. Popcorn disponible.",
    postalcode: "75016",
    address: "50 Avenue Victor Hugo, Paris",
    capacity: 500,
    ticket: 500,
    price: 0,
    category: ["cinema", "art"],
    createdBy: "cityHall",
    startDate: daysFromNow(30),
  },
  {
    id: "evt-006",
    title: "Tournoi eSport",
    description: "Compétition en équipes, lots et retransmission sur écran géant.",
    postalcode: "75011",
    address: "20 Rue de la République, Paris",
    capacity: 200,
    ticket: 160,
    price: 10,
    category: ["gaming", "networking"],
    createdBy: "campusBDE",
    startDate: daysFromNow(18),
  },
  {
    id: "evt-007",
    title: "Exposition Art Moderne",
    description: "Vernissage, visites guidées et rencontres d'artistes.",
    postalcode: "75003",
    address: "12 Rue des Archives, Paris",
    capacity: 250,
    ticket: 200,
    price: 12.5,
    category: ["art", "theatre"],
    createdBy: "gallery_paris",
    startDate: daysFromNow(25),
  },
  {
    id: "evt-008",
    title: "Workshop TypeScript",
    description: "Bases, types avancés et bonnes pratiques avec exercices.",
    postalcode: "75009",
    address: "8 Boulevard Haussmann, Paris",
    capacity: 60,
    ticket: 55,
    price: 49.9,
    category: ["workshop", "conference"],
    createdBy: "eventhub",
    startDate: daysFromNow(12),
  },
  {
    id: "evt-009", title: "Marché des Créateurs", description: "Artisans locaux, bijoux, vêtements et déco faits main.", postalcode: "75004", address: "Place des Vosges, Paris", capacity: 400, ticket: 350, price: 0, category: ["art", "festival"], createdBy: "cityHall", startDate: daysFromNow(5),
  },
  {
    id: "evt-010", title: "Yoga au Parc", description: "Séance de yoga en plein air pour tous niveaux.", postalcode: "75008", address: "Parc Monceau, Paris", capacity: 80, ticket: 60, price: 8, category: ["sport", "workshop"], createdBy: "asso_sport", startDate: daysFromNow(3),
  },
  {
    id: "evt-011", title: "Hackathon Green Tech", description: "48h pour concevoir des solutions éco-responsables.", postalcode: "75013", address: "Station F, Paris", capacity: 150, ticket: 120, price: 0, category: ["startup", "conference"], createdBy: "eventhub", startDate: daysFromNow(35),
  },
  {
    id: "evt-012", title: "Concert Classique", description: "Orchestre philharmonique, programme Beethoven & Mozart.", postalcode: "75008", address: "Salle Gaveau, Paris", capacity: 500, ticket: 480, price: 30, category: ["musique", "art"], createdBy: "asso_music", startDate: daysFromNow(20),
  },
  {
    id: "evt-013", title: "Atelier Photo Urbaine", description: "Sortie photo guidée dans les rues de Paris.", postalcode: "75018", address: "Place du Tertre, Montmartre", capacity: 20, ticket: 18, price: 25, category: ["art", "workshop"], createdBy: "gallery_paris", startDate: daysFromNow(8),
  },
  {
    id: "evt-014", title: "Forum de l'Emploi Tech", description: "Rencontrez 50 entreprises qui recrutent en tech.", postalcode: "75015", address: "Palais des Sports, Paris", capacity: 1000, ticket: 800, price: 0, category: ["networking", "conference"], createdBy: "campusBDE", startDate: daysFromNow(40),
  },
  {
    id: "evt-015", title: "Escape Game Géant", description: "Escape game grandeur nature pour équipes de 4 à 6.", postalcode: "75011", address: "14 Rue Oberkampf, Paris", capacity: 100, ticket: 80, price: 18, category: ["gaming"], createdBy: "eventhub", startDate: daysFromNow(6),
  },
  {
    id: "evt-016", title: "Soirée Salsa", description: "Cours débutant + soirée dansante, tous niveaux bienvenus.", postalcode: "75006", address: "28 Rue de Buci, Paris", capacity: 150, ticket: 130, price: 12, category: ["festival", "musique"], createdBy: "asso_dance", startDate: daysFromNow(9),
  },
  {
    id: "evt-017", title: "Conférence Cybersécurité", description: "Menaces, bonnes pratiques et demo d'attaques en live.", postalcode: "75002", address: "42 Rue Réaumur, Paris", capacity: 200, ticket: 175, price: 0, category: ["conference", "startup"], createdBy: "eventhub", startDate: daysFromNow(28),
  },
  {
    id: "evt-018", title: "Vide-Grenier Géant", description: "500 exposants, trouvailles garanties.", postalcode: "75020", address: "Parc de Belleville, Paris", capacity: 2000, ticket: 1800, price: 0, category: ["festival"], createdBy: "cityHall", startDate: daysFromNow(11),
  },
  {
    id: "evt-019", title: "Séminaire Développement Personnel", description: "Conférences et ateliers sur leadership et bien-être.", postalcode: "75009", address: "16 Rue La Fayette, Paris", capacity: 100, ticket: 90, price: 55, category: ["workshop", "conference"], createdBy: "asso_wellness", startDate: daysFromNow(45),
  },
  {
    id: "evt-020", title: "Tournoi de Pétanque", description: "Tournoi convivial, boulodrome en plein air.", postalcode: "75019", address: "Parc des Buttes-Chaumont, Paris", capacity: 120, ticket: 100, price: 5, category: ["sport"], createdBy: "cityHall", startDate: daysFromNow(13),
  },
  {
    id: "evt-021", title: "Atelier Poterie", description: "Initiation au tour de potier, matériaux fournis.", postalcode: "75003", address: "6 Rue de Bretagne, Paris", capacity: 15, ticket: 14, price: 40, category: ["art", "workshop"], createdBy: "gallery_paris", startDate: daysFromNow(16),
  },
  {
    id: "evt-022", title: "Soirée Jeux de Société", description: "200 jeux disponibles, snacks et boissons sur place.", postalcode: "75012", address: "Rue du Faubourg Saint-Antoine, Paris", capacity: 80, ticket: 70, price: 7, category: ["gaming"], createdBy: "campusBDE", startDate: daysFromNow(4),
  },
  {
    id: "evt-023", title: "Marathon de Paris Junior", description: "Course 5km et 10km pour les moins de 18 ans.", postalcode: "75007", address: "Champ-de-Mars, Paris", capacity: 500, ticket: 450, price: 10, category: ["sport"], createdBy: "cityHall", startDate: daysFromNow(22),
  },
  {
    id: "evt-024", title: "Projection Documentaire Climat", description: "Projection suivie d'un débat avec des experts.", postalcode: "75005", address: "Cinéma Le Champo, Paris", capacity: 120, ticket: 100, price: 0, category: ["cinema", "conference"], createdBy: "asso_green", startDate: daysFromNow(17),
  },
  {
    id: "evt-025", title: "Fête de la Musique Locale", description: "Scènes de quartier, groupes amateurs et pros.", postalcode: "75014", address: "Place Denfert-Rochereau, Paris", capacity: 800, ticket: 800, price: 0, category: ["musique", "festival"], createdBy: "cityHall", startDate: daysFromNow(33),
  },
  {
    id: "evt-026", title: "Atelier Aquarelle", description: "Peinture à l'aquarelle pour débutants et intermédiaires.", postalcode: "75016", address: "Jardin du Ranelagh, Paris", capacity: 25, ticket: 22, price: 30, category: ["art", "workshop"], createdBy: "gallery_paris", startDate: daysFromNow(19),
  },
  {
    id: "evt-027", title: "Meetup React & Next.js", description: "Présentations techniques et retours d'expérience.", postalcode: "75009", address: "WeWork Haussmann, Paris", capacity: 80, ticket: 75, price: 0, category: ["conference", "startup"], createdBy: "eventhub", startDate: daysFromNow(26),
  },
  {
    id: "evt-028", title: "Brunch Solidaire", description: "Brunch associatif, bénéfices reversés à une œuvre caritative.", postalcode: "75010", address: "10 Rue du Château d'Eau, Paris", capacity: 60, ticket: 55, price: 20, category: ["food", "networking"], createdBy: "asso_food", startDate: daysFromNow(15),
  },
  {
    id: "evt-029", title: "Battle de Hip-Hop", description: "Compétition de danse urbaine, judges professionnels.", postalcode: "75018", address: "Espace Sportif Poissonniers, Paris", capacity: 300, ticket: 270, price: 8, category: ["sport", "musique"], createdBy: "asso_dance", startDate: daysFromNow(23),
  },
  {
    id: "evt-030", title: "Salon du Livre Indépendant", description: "Rencontres avec 80 auteurs indépendants, dédicaces.", postalcode: "75006", address: "Mairie du 6e, Paris", capacity: 400, ticket: 350, price: 0, category: ["art", "conference"], createdBy: "cityHall", startDate: daysFromNow(38),
  },
  {
    id: "evt-031", title: "Atelier Brassage Artisanal", description: "Fabriquez votre propre bière artisanale, dégustation incluse.", postalcode: "75011", address: "La Brasserie du Canal, Paris", capacity: 20, ticket: 20, price: 45, category: ["food", "workshop"], createdBy: "asso_food", startDate: daysFromNow(27),
  },
  {
    id: "evt-032", title: "Conférence Startup Funding", description: "Levée de fonds, pitch et rencontres avec des investisseurs.", postalcode: "75008", address: "Station F, Paris", capacity: 250, ticket: 200, price: 0, category: ["startup", "networking"], createdBy: "campusBDE", startDate: daysFromNow(42),
  },
  {
    id: "evt-033", title: "Festival Street Food", description: "30 food trucks, musique live et animations.", postalcode: "75012", address: "Bercy Village, Paris", capacity: 1500, ticket: 1500, price: 0, category: ["food", "festival"], createdBy: "cityHall", startDate: daysFromNow(32),
  },
  {
    id: "evt-034", title: "Atelier Calligraphie", description: "Initiation à la calligraphie arabe et latine.", postalcode: "75003", address: "Institut du Monde Arabe, Paris", capacity: 30, ticket: 28, price: 20, category: ["art", "workshop"], createdBy: "gallery_paris", startDate: daysFromNow(36),
  },
  {
    id: "evt-035", title: "Tournoi de Jeux Vidéo Rétro", description: "Pac-Man, Street Fighter, Mario Kart – win or go home.", postalcode: "75002", address: "Rue Saint-Denis, Paris", capacity: 60, ticket: 50, price: 10, category: ["gaming"], createdBy: "campusBDE", startDate: daysFromNow(29),
  },
  {
    id: "evt-036", title: "Conférence Bien-être au Travail", description: "Stratégies concrètes pour un meilleur équilibre pro/perso.", postalcode: "75009", address: "45 Rue de la Victoire, Paris", capacity: 150, ticket: 130, price: 0, category: ["conference", "workshop"], createdBy: "asso_wellness", startDate: daysFromNow(48),
  },
  {
    id: "evt-037", title: "Journée Portes Ouvertes École de Code", description: "Découvrez nos formations, essayez un mini-projet.", postalcode: "75013", address: "42 Rue Jeanne d'Arc, Paris", capacity: 100, ticket: 90, price: 0, category: ["conference", "startup"], createdBy: "eventhub", startDate: daysFromNow(24),
  },
  {
    id: "evt-038", title: "Soirée Quiz Culturel", description: "Quiz en équipes, 10 thèmes, lots à gagner.", postalcode: "75006", address: "Le Bar à Bulles, Paris", capacity: 80, ticket: 72, price: 6, category: ["festival", "networking"], createdBy: "asso_culture", startDate: daysFromNow(5),
  },
  {
    id: "evt-039", title: "Randonnée Urbaine", description: "Découverte des passages couverts de Paris en 3h.", postalcode: "75002", address: "Passage des Panoramas, Paris", capacity: 30, ticket: 30, price: 0, category: ["sport", "art"], createdBy: "cityHall", startDate: daysFromNow(31),
  },
  {
    id: "evt-040", title: "Atelier Méditation", description: "Pleine conscience et respiration guidée, tapis fournis.", postalcode: "75007", address: "Rue de Grenelle, Paris", capacity: 25, ticket: 20, price: 15, category: ["sport", "workshop"], createdBy: "asso_wellness", startDate: daysFromNow(34),
  },
  {
    id: "evt-041", title: "Table Ronde IA & Éthique", description: "Philosophes, ingénieurs et juristes débattent.", postalcode: "75005", address: "La Sorbonne, Paris", capacity: 200, ticket: 170, price: 0, category: ["conference"], createdBy: "eventhub", startDate: daysFromNow(50),
  },
  {
    id: "evt-042", title: "Marché Bio Hebdomadaire", description: "Producteurs locaux, légumes de saison et produits fermiers.", postalcode: "75014", address: "Place Brancusi, Paris", capacity: 300, ticket: 300, price: 0, category: ["food", "festival"], createdBy: "cityHall", startDate: daysFromNow(7),
  },
  {
    id: "evt-043", title: "Soirée Théâtre Impro", description: "Spectacle d'improvisation participatif, le public guide l'histoire.", postalcode: "75011", address: "Théâtre de l'Est Parisien", capacity: 100, ticket: 85, price: 14, category: ["theatre", "art"], createdBy: "asso_culture", startDate: daysFromNow(16),
  },
  {
    id: "evt-044", title: "Atelier Fabrication Savon", description: "Créez vos savons naturels à emporter.", postalcode: "75017", address: "25 Rue Legendre, Paris", capacity: 15, ticket: 15, price: 35, category: ["workshop"], createdBy: "asso_green", startDate: daysFromNow(43),
  },
  {
    id: "evt-045", title: "Concert Rock Indé", description: "3 groupes locaux, ambiance underground garantie.", postalcode: "75020", address: "La Flèche d'Or, Paris", capacity: 200, ticket: 180, price: 12, category: ["musique", "festival"], createdBy: "asso_music", startDate: daysFromNow(20),
  },
  {
    id: "evt-046", title: "Démo Live Machine Learning", description: "Démos en live : vision par ordinateur, NLP et génération d'images.", postalcode: "75008", address: "Hub BNP Paribas, Paris", capacity: 120, ticket: 100, price: 0, category: ["conference", "startup"], createdBy: "eventhub", startDate: daysFromNow(37),
  },
  {
    id: "evt-047", title: "Foire aux Plantes", description: "Échange et vente de plantes rares et succulentes.", postalcode: "75019", address: "Parc de la Villette, Paris", capacity: 600, ticket: 600, price: 0, category: ["festival"], createdBy: "cityHall", startDate: daysFromNow(44),
  },
  {
    id: "evt-048", title: "Atelier Sushi", description: "Initiation à la confection de sushis et makis.", postalcode: "75001", address: "10 Rue Sainte-Anne, Paris", capacity: 20, ticket: 18, price: 50, category: ["food", "workshop"], createdBy: "asso_food", startDate: daysFromNow(46),
  },
  {
    id: "evt-049", title: "Soirée Networking Startups", description: "Speed networking, pitchs de 2 minutes et afterwork.", postalcode: "75002", address: "Le Tank, Paris", capacity: 150, ticket: 130, price: 10, category: ["networking", "startup"], createdBy: "campusBDE", startDate: daysFromNow(39),
  },
  {
    id: "evt-050", title: "Triathlon Urbain", description: "Natation, vélo et course à pied au cœur de Paris.", postalcode: "75016", address: "Piscine Molitor, Paris", capacity: 200, ticket: 180, price: 30, category: ["sport"], createdBy: "cityHall", startDate: daysFromNow(55),
  },
];

async function main() {
  for (const e of events) {
    await prisma.event.upsert({
      where: { id: e.id },
      update: {
        title: e.title,
        description: e.description,
        postalcode: e.postalcode,
        address: e.address,
        capacity: e.capacity,
        ticket: e.ticket,
        price: e.price,
        category: e.category,
        createdBy: e.createdBy,
        startDate: e.startDate,
      },
      create: { ...e },
    });
    console.log(`Event "${e.title}" ajouté`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

