import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/data/products";

type ShopSearch = { q?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search.q === "string" && search.q ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop | Fruity Nuts — Besan, Papar & Bundi" },
      {
        name: "description",
        content:
          "Browse all Fruity Nuts products: Khalis Besan, Kabab Papar and Besan Bundi Special. Cash on delivery across Pakistan.",
      },
      { property: "og:title", content: "Shop Fruity Nuts Premium Products" },
      {
        property: "og:description",
        content: "All three Fruity Nuts products in one place, with search, filters and sorting.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

const CATEGORIES = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

function Shop() {
  const { q } = Route.useSearch();
  const [term, setTerm] = useState(q ?? "");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<"featured" | "asc" | "desc">("featured");

  const visible = useMemo(() => {
    const needle = term.trim().toLowerCase();
    let list = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (!needle ||
          p.name.toLowerCase().includes(needle) ||
          p.shortDescription.toLowerCase().includes(needle) ||
          p.category.toLowerCase().includes(needle)),
    );
    if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [term, category, sort]);

  return (
    <>
      <PageHeader
        eyebrow={`Premium Quality Products`}
        title="Shop Fruity Nuts"
        intro="Three carefully made products, packed fresh in Lahore and delivered across Pakistan."
      />

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="bg-surface shadow-card flex flex-col gap-4 rounded-2xl border border-border/70 p-5 lg:flex-row lg:items-center">
          <div className="flex-1">
            <label htmlFor="shop-search" className="eyebrow text-muted-foreground">
              Search
            </label>
            <input
              id="shop-search"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search products…"
              className="border-border focus-visible:ring-ring mt-2 w-full rounded-full border px-4 py-2.5 text-sm focus-visible:ring-2 focus-visible:outline-none"
            />
          </div>

          <div>
            <span className="eyebrow text-muted-foreground">Category</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                  className={
                    category === c
                      ? "bg-forest text-forest-foreground rounded-full px-4 py-2 text-sm font-bold"
                      : "border-border hover:border-primary hover:text-primary rounded-full border px-4 py-2 text-sm font-semibold"
                  }
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="shop-sort" className="eyebrow text-muted-foreground">
              Sort by price
            </label>
            <select
              id="shop-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="border-border focus-visible:ring-ring mt-2 w-full rounded-full border bg-surface px-4 py-2.5 text-sm focus-visible:ring-2 focus-visible:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="asc">Price: low to high</option>
              <option value="desc">Price: high to low</option>
            </select>
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Showing {visible.length} of {products.length} products
        </p>

        {visible.length ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <p className="mt-10 rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
            No products match your search. Try a different word.
          </p>
        )}
      </div>
    </>
  );
}
