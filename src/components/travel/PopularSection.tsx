import { Link } from "@tanstack/react-router";
import { destinations, type Destination } from "@/lib/destinations";

function Card({
  slug,
  image,
  name,
  className,
  height,
}: Readonly<{
  slug: string;
  image: string;
  name: string;
  className?: string;
  height: number;
}>) {
  return (
    <Link
      to="/destinations/$slug"
      params={{ slug }}
      className={`group relative block overflow-hidden rounded-2xl ${className ?? ""}`}
    >
      <img
        src={image}
        alt={name}
        loading="lazy"
        width={1000}
        height={height}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "var(--gradient-image-fade)" }}
        aria-hidden="true"
      />
      <h3 className="absolute bottom-5 left-5 text-3xl font-bold text-on-image">{name}</h3>
    </Link>
  );
}

export function PopularSection() {
  const [singapore, australia, thailand] = destinations as [Destination, Destination, Destination];

  return (
    <section className="px-6  py-20 sm:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[320px_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Traveler's Favourite
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Explore All Popular Locations
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Plan, book, and embark on your dream adventure with our expert guidance and tailored
            experiences.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Card
            slug={singapore.slug}
            image={singapore.image}
            name={singapore.name}
            height={1100}
            className="h-80 sm:h-104"
          />
          <div className="grid gap-5">
            <Card
              slug={australia.slug}
              image={australia.image}
              name={australia.name}
              height={620}
              className="h-40 sm:h-50"
            />
            <Card
              slug={thailand.slug}
              image={thailand.image}
              name={thailand.name}
              height={620}
              className="h-40 sm:h-50"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
