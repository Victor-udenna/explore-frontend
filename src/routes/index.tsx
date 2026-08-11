import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { PopularSection } from "@/components/travel/PopularSection";
import { DealsSection } from "@/components/travel/DealsSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Xploredestination — Discover, Explore, Go" },
      {
        name: "description",
        content:
          "Discover new locations",
      },
      { property: "og:title", content: "Xploredestination — Discover, Explore, Go" },
      {
        property: "og:description",
        content:
          "Book stays, flights and winter trips with Xploredestination. Last minute deals and tailored travel experiences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
        <div
          className="relative overflow-hidden flex items-center justify-center bg-background bg-cover bg-center h-[80vh] rounded-3xl"
          style={{ backgroundImage: `url(${hero})` }}
        >
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          <div className="relative z-10 px-6 pb-10 text-white text-center sm:px-10">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
              Discover. Explore. Go!
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/80">
              Explore stunning destinations, unique experiences, and plan your perfect trip today!
            </p>
          </div>
        </div>
      </div>
      <div className="bg-background">
        <PopularSection />
      </div>
      <DealsSection />
      <footer className="bg-background px-6 py-10 text-center text-sm text-muted-foreground sm:px-10">
        © {new Date().getFullYear()} Xploredestination. Plan your next adventure.
      </footer>
    </main>
  );
}
