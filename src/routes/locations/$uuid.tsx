import { ArrowLeft } from "lucide-react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { apiUrl } from "@/config";

type LocationDetails = {
  name: string;
  location: string;
  country: string;
  continent: string;
  is_open_to_public: boolean;
  uuid: string;
  image: string;
  details: Array<{ fun_fact?: string; description?: string }>;
};

export const Route = createFileRoute("/locations/$uuid")({
  loader: async ({ params }) => {
    const response = await fetch(`${apiUrl}/api/country/details/${params.uuid}`);
    if (!response.ok) {
      if (response.status === 404) throw notFound();
      throw new Error(`Failed to load location details: ${response.status}`);
    }

    const data = (await response.json()) as LocationDetails;
    if (!data?.uuid) throw notFound();
    return { location: data };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Location not found — Xploredestination" },
          { name: "robots", content: "noindex" },
        ],
      };
    }

    const title = `${loaderData.location.name} — Xploredestination`;
    const description = `Discover ${loaderData.location.name} in ${loaderData.location.location}, ${loaderData.location.country}.`;

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
  component: LocationDetailsPage,
});

function LocationDetailsPage() {
  const { location } = Route.useLoaderData();
  const imageUrl = location.image.startsWith("http")
    ? location.image
    : `${apiUrl}${location.image}`;

  return (
    <main className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl">
          <div className="relative h-105 sm:h-135">
            <img
              src={imageUrl}
              alt={location.name}
              width={1600}
              height={900}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
            <div className="absolute inset-0 z-10 flex flex-col justify-between px-6 pb-10 pt-20 sm:px-10 sm:pb-14">
              <Link
                to="/"
                className="inline-flex w-fit items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to home
              </Link>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                  {location.country} · {location.continent}
                </p>
                <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
                  {location.name}
                </h1>
                <p className="mt-3 max-w-2xl text-lg text-white/80">
                  {location.location} •{" "}
                  {location.is_open_to_public ? "Open to the public" : "Closed to the public"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-background px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">About this location</h2>
              <p className="text-sm text-muted-foreground">
                Explore the highlights, location details, and unique facts for this destination.
              </p>

              <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Country
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">{location.country}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Continent
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">
                      {location.continent}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Location
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">
                      {location.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Visitor access
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">
                      {location.is_open_to_public ? "Open to the public" : "Closed to visitors"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h3 className="text-xl font-semibold tracking-tight">Quick facts</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {location.details.map((item, index) => (
                  <li key={index} className="rounded-2xl bg-background p-4">
                    {item.fun_fact ? (
                      <>
                        <p className="text-xs uppercase tracking-[0.18em] text-foreground">
                          Fun fact
                        </p>
                        <p className="mt-2 text-sm text-foreground">{item.fun_fact}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-xs uppercase tracking-[0.18em] text-foreground">
                          Description
                        </p>
                        <p className="mt-2 text-sm text-foreground">{item.description}</p>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="text-xl font-semibold tracking-tight">Explore more</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Check this location's full background, photos, and travel tips in one place.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
