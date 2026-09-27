import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Check, Star, Truck } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { QuantityPicker } from "@/components/site/QuantityPicker";
import { BRAND, formatPKR, getProduct, products, SHIPPING_FEE } from "@/data/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => {
    const name = loaderData?.name ?? "Product";
    const desc = loaderData?.shortDescription ?? "Premium quality product from Fruity Nuts.";
    return {
      meta: [
        { title: `${name} | Fruity Nuts` },
        { name: "description", content: desc },
        { property: "og:title", content: `${name} — Fruity Nuts` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

const REVIEWS = [
  { text: "Quality is exactly as described. Packaging arrived sealed and clean.", name: "Hamza S." },
  { text: "Ordered twice now. Consistent quality and quick delivery to Multan.", name: "Fatima N." },
];

function ProductPage() {
  const product = Route.useLoaderData();
  const { add } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const related = products.filter((p) => p.slug !== product.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
      <nav className="text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-primary">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="bg-accent/50 flex items-center justify-center rounded-3xl p-8">
          <img
            src={product.image}
            alt={product.name}
            width={900}
            height={900}
            className="max-h-[520px] w-auto drop-shadow-xl"
          />
        </div>

        <div>
          <p className="eyebrow text-primary">{product.category}</p>
          <h1 className="mt-2 font-display text-4xl text-brown sm:text-5xl">{product.name}</h1>
          <p className="mt-3 font-display text-3xl text-forest">{formatPKR(product.price)}</p>
          <p className="text-sm text-muted-foreground">Pack size: {product.weight}</p>

          <p className="mt-5 leading-relaxed text-foreground/75">{product.description}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <QuantityPicker value={qty} onChange={setQty} />
            <button
              type="button"
              onClick={() => add(product.slug, qty)}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full border-2 px-7 py-3 text-sm font-bold transition"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => {
                add(product.slug, qty);
                navigate({ to: "/checkout" });
              }}
              className="bg-gold text-gold-foreground rounded-full px-7 py-3 text-sm font-bold transition hover:brightness-105"
            >
              Buy Now
            </button>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="eyebrow text-gold">Product Details</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {product.details.map((d) => (
                  <li key={d} className="flex gap-2">
                    <Check className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                    <span className="text-foreground/80">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow text-gold">Shipping Information</h2>
              <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                <li className="flex gap-2">
                  <Truck className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                  Flat {formatPKR(SHIPPING_FEE)} delivery anywhere in Pakistan.
                </li>
                <li>Dispatched from {BRAND.city} within 1–2 working days.</li>
                <li>Cash on Delivery and Bank Transfer accepted.</li>
                <li>
                  Questions? WhatsApp{" "}
                  <a className="text-primary font-semibold" href={`tel:${BRAND.phoneHref}`}>
                    {BRAND.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-3xl text-brown">Customer Reviews</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="bg-surface shadow-card rounded-2xl border border-border/70 p-6"
            >
              <div className="text-gold flex gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 text-foreground/80">“{r.text}”</blockquote>
              <figcaption className="mt-4 text-sm font-bold text-forest">— {r.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-3xl text-brown">You May Also Like</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
