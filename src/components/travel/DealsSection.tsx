import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { apiUrl } from "@/config";

type Location = {
  uuid: string;
  name: string;
  location: string;
  country: string;
  continent: string;
  is_open_to_public: boolean;
  image: string;
};

export function DealsSection() {
  const [country, setCountry] = useState("india");
  const [continent, setContinent] = useState("asia");
  const [appliedFilter, setAppliedFilter] = useState({ country: "india", continent: "asia" });
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function getLocations() {
      try {
        setLoading(true);
        setError(null);
        const searchParams = new URLSearchParams();
        if (appliedFilter.country) searchParams.set("country", appliedFilter.country);
        if (appliedFilter.continent) searchParams.set("continent", appliedFilter.continent);

        const response = await fetch(`${apiUrl}/api?${searchParams.toString()}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data: Location[] = await response.json();
        setLocations(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    getLocations();
    return () => controller.abort();
  }, [appliedFilter]);

  function handleFilter(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAppliedFilter({ country, continent });
  }

  const continents = [
    { label: "Africa", value: "africa" },
    { label: "Asia", value: "asia" },
    { label: "Europe", value: "europe" },
    { label: "North America", value: "north america" },
    { label: "Oceania", value: "oceania" },
    { label: "South America", value: "south america" },
  ];

  const countriesByContinent = [
    {
      continent: "africa",
      countries: [
        { label: "Mauritius", value: "mauritius" },
        { label: "Zambia", value: "zambia" },
      ],
    },
    {
      continent: "asia",
      countries: [
        { label: "China", value: "china" },
        { label: "India", value: "india" },
        { label: "Japan", value: "japan" },
        { label: "Korea", value: "korea" },
        { label: "Turkmenistan", value: "turkmenistan" },
        { label: "Turkey", value: "turkey" },
        { label: "Yemen", value: "yemen" },
      ],
    },
    {
      continent: "europe",
      countries: [
        { label: "Norway", value: "norway" },
        { label: "Northern Ireland", value: "northern ireland" },
      ],
    },
    {
      continent: "north america",
      countries: [
        { label: "Mexico", value: "mexico" },
        { label: "USA", value: "usa" },
      ],
    },
    {
      continent: "oceania",
      countries: [{ label: "New Zealand", value: "new zealand" }],
    },
    {
      continent: "south america",
      countries: [
        { label: "Brazil", value: "brazil" },
        { label: "Colombia", value: "colombia" },
      ],
    },
  ];

  const countryOptions =
    countriesByContinent.find((group) => group.continent === continent)?.countries ?? [];

  function handleContinentChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextContinent = event.target.value;
    setContinent(nextContinent);
    const nextCountries =
      countriesByContinent.find((group) => group.continent === nextContinent)?.countries ?? [];
    setCountry(nextCountries[0]?.value ?? "");
  }

  return (
    <section className="px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Last minute deals in unique places
        </h2>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          Plan, book, and embark on your dream adventure with our expert guidance and tailored
          experiences.
        </p>

        <form onSubmit={handleFilter} className="mt-6 grid gap-3 sm:grid-cols-3">
          <label className="grid gap-1.5 text-sm font-medium">
            Continent
            <select
              value={continent}
              onChange={handleContinentChange}
              className="h-11 rounded-lg border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-ring"
            >
              {continents.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            Country
            <select
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              className="h-11 rounded-lg border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-ring"
            >
              {countryOptions.map((countryOption) => (
                <option key={countryOption.value} value={countryOption.value}>
                  {countryOption.label}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="mt-auto h-11 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Filter locations
          </button>
        </form>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading && (
            <div className="sm:col-span-2 lg:col-span-3 w-full h-[325px] flex flex-col items-center justify-center gap-3 rounded-lg border border-border bg-muted/30">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Loading locations…</p>
            </div>
          )}
          {error && (
            <p className="sm:col-span-2 lg:col-span-3 text-destructive">
              Could not load locations: {error}
            </p>
          )}
          {!loading && !error && locations.length === 0 && (
            <p className="sm:col-span-2 lg:col-span-3 text-muted-foreground">
              No locations found for this filter.
            </p>
          )}
          {!loading &&
            !error &&
            locations.map((location) => (
              <Link
                key={location.uuid}
                to="/locations/$uuid"
                params={{ uuid: location.uuid }}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
              >
                <div className="relative">
                  <img
                    src={`${apiUrl}${location.image}`}
                    alt={location.name}
                    loading="lazy"
                    width={800}
                    height={560}
                    className="h-52 w-full object-cover"
                  />
                </div>
                <div className="space-y-2 p-5">
                  <h3 className="font-semibold">{location.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {location.location}, {location.country}
                  </p>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {location.continent}
                    {!location.is_open_to_public && " · Closed to visitors"}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
