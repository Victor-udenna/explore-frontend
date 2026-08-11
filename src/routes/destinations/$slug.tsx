import { createFileRoute, Link, notFound, useLocation } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/travel/SiteHeader";
import { destinations, getDestination } from "@/lib/destinations";
import { useEffect, useState } from "react";
import Loading from "@/components/travel/Loading";
import { apiUrl } from "@/config";

export const Route = createFileRoute("/destinations/$slug")({
  loader: ({ params }) => {
    const destination = getDestination(params.slug);
    if (!destination) throw notFound();
    return { destination };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Destination not found — Xploredestination" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { destination } = loaderData;
    const title = `${destination.name} travel guide — Xploredestination`;
    const description = `${destination.tagline}. ${destination.description.slice(0, 110)}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: DestinationPage,
});

function DestinationPage() {
  const { destination } = Route.useLoaderData();
  const others = destinations.filter((d) => d.slug !== destination.slug);
  const location = useLocation();
  const slug = location.pathname.split("/").pop();
  console.log(slug);
  console.log(location);

  const [destinationlocation, setDestinationLocation] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getLocation() {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/api/country/${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setDestinationLocation(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    getLocation();
  }, [slug]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!location) return null;

  return (
    <main className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl">
          <SiteHeader className="absolute inset-x-0 top-0 z-20" variant="light" />
          <div className="relative h-105 sm:h-135">
            <img
              src={destination.image}
              alt={`${destination.name} — ${destination.tagline}`}
              width={1600}
              height={900}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/25" aria-hidden="true" />

            <div className="absolute inset-0 z-10 flex flex-col justify-between px-6 pb-10 pt-20 sm:px-10 sm:pb-14">
              <Link
                to="/"
                className="inline-flex w-fit items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to all destinations
              </Link>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                  {destination.tagline}
                </p>
                <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
                  {destination.name}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-background px-6 py-20 sm:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Destinations</h2>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem vero maiores vitae
            illo dicta corporis ipsam, nostrum repudiandae nobis voluptas.
          </div>
        </div>
        <div className="mt-10 mx-auto max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(destinationlocation ?? []).map((destionation) => (
            <article
              key={destionation.name}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
            >
              <div className="relative">
                <img
                  src={`https://wild-horizons-jlcx.onrender.com${destionation.image}`}
                  alt={destionation.name}
                  loading="lazy"
                  width={800}
                  height={560}
                  className="h-52 w-full object-cover"
                />
              </div>
              <div className="space-y-2 p-5">
                <h3 className="font-semibold">{destionation.name}</h3>
                <p className="text-sm text-muted-foreground">{destionation.country}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-background px-6 pb-20 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold tracking-tight">More destinations</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {others.map((d) => (
              <Link
                key={d.slug}
                to="/destinations/$slug"
                params={{ slug: d.slug }}
                className="group relative block h-56 overflow-hidden rounded-2xl"
              >
                <img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: "var(--gradient-image-fade)" }}
                  aria-hidden="true"
                />
                <h3 className="absolute bottom-5 left-5 text-2xl font-bold text-on-image">
                  {d.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-background px-6 py-10 text-center text-sm text-muted-foreground sm:px-10">
        © {new Date().getFullYear()} Xploredestination. Plan your next adventure.
      </footer>
    </main>
  );
}
