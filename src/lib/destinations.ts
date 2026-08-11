import mauritius from "@/assets/mauritius.jpg";
import india from "@/assets/india.avif";
import korea from "@/assets/korea.avif";

export type Destination = {
  slug: string;
  name: string;
  image: string;
  tagline: string;
  description: string;
  highlights: string[];
};

export const destinations: Destination[] = [
  {
    slug: "korea",
    name: "South Korea",
    image: korea,
    tagline: "Neon nights and mountain mornings",
    description:
      "A blend of futuristic cities, peaceful temples, coastal villages, and dramatic mountain scenery. South Korea is perfect for travelers who want culture, food, and nature in one trip.",
    highlights: [
      "Seoul night market food tour",
      "Gyeongbokgung Palace visit",
      "Jeju Island coastal drive",
      "Nami Island and mountain day trip",
    ],
  },
  {
    slug: "india",
    name: "India",
    image: india,
    tagline: "Palaces, mountains, and timeless traditions",
    description:
      "A country of vibrant cities, ancient temples, Himalayan landscapes, and unforgettable food. India offers everything from royal palaces and deserts to beaches and spiritual retreats.",
    highlights: [
      "Taj Mahal at sunrise",
      "Jaipur palace and market tour",
      "Kerala backwater houseboat cruise",
      "Himalayan mountain escape",
    ],
  },

  {
    slug: "mauritius",
    name: "Mauritius",
    image: mauritius,
    tagline: "Turquoise lagoons and tropical luxury",
    description:
      "A tropical island paradise with white-sand beaches, coral reefs, lush mountains, and a rich blend of African, Indian, French, and Creole cultures.",
    highlights: [
      "Le Morne beach and lagoon",
      "Chamarel Seven Colored Earth",
      "Catamaran cruise to Île aux Cerfs",
      "Black River Gorges nature trails",
    ],
  },
];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}
