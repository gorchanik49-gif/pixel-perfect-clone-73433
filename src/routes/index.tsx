import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Award, Heart, Leaf, ShieldCheck, Sparkles, Star, Truck, Users } from "lucide-react";
import { useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png.asset.json";
import { ProductCard } from "@/components/site/ProductCard";
import { QuantityPicker } from "@/components/site/QuantityPicker";
import { BRAND, formatPKR, products } from "@/data/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fruity Nuts | Fresh, Healthy, Pure — Premium Quality Since 1947" },
      {
        name: "description",
        content:
          "Shop Khalis Besan, Kabab Papar and Besan Bundi Special from Fruity Nuts, Lahore. Premium quality Pakistani food products trusted since 1947.",
      },
      { property: "og:title", content: "Fruity Nuts | Fresh, Healthy, Pure — Since 1947" },
      {
        property: "og:description",
        content:
          "Premium quality besan, papar and bundi from Fruity Nuts, Lahore. Cash on delivery across Pakistan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const HIGHLIGHTS = [
  { icon: Award, title: "Since 1947", text: "Nearly eight decades of trusted quality." },
  { icon: Sparkles, title: "Premium Quality", text: "Carefully selected, carefully packed." },
  { icon: Leaf, title: "Fresh & Pure", text: "No added colours or preservatives." },
  { icon: ShieldCheck, title: "Trusted Products", text: "Loved by families across Pakistan." },
];

const WHY = [
  { icon: Award, title: "Trusted Since 1947", text: "A family name Pakistani kitchens have relied on for generations." },
  { icon: Sparkles, title: "Premium Quality", text: "Every batch is checked before it reaches our resealable packaging." },
  { icon: Leaf, title: "Fresh Products", text: "Prepared in small batches so freshness reaches your home." },
  { icon: Users, title: "Customer Focused", text: "Order on WhatsApp and pay cash on delivery, anywhere in Pakistan." },
];

const REVIEWS = [
  {
    text: "Excellent quality and beautiful packaging. Very satisfied with the product.",
    name: "Muhammad A.",
    city: "Lahore",
  },
  {
    text: "The besan is very fine and clean. My pakoras turned out perfect for iftar.",
    name: "Ayesha K.",
    city: "Karachi",
  },
  {
    text: "Ordered the Kabab Papar for tea-time. Crispy, fresh and delivered on time.",
    name: "Bilal R.",
    city: "Islamabad",
  },
];

function Index() {
  const featured = products[0];
  const { add } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          width={1600}
          height={1104}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/92 to-background/35" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="eyebrow text-primary">Established in {BRAND.since}</p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] text-brown sm:text-6xl lg:text-7xl">
              Fresh. Healthy. Pure.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-foreground/75 sm:text-lg">
              Premium quality products from Fruity Nuts — bringing trusted taste and quality to your
              home.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="bg-gold text-gold-foreground shadow-card rounded-full px-8 py-3.5 text-sm font-bold transition hover:brightness-105"
              >
                Shop Now
              </Link>
              <a
                href="#products"
                className="border-forest text-forest hover:bg-forest hover:text-forest-foreground rounded-full border-2 px-8 py-3.5 text-sm font-bold transition"
              >
                Explore Products
              </a>
            </div>
            <p className="mt-8 eyebrow text-brown/60">{BRAND.tagline}</p>
          </div>

          <div className="relative flex justify-center">
            <div className="bg-gold/25 absolute -top-6 right-8 h-24 w-24 rounded-full blur-2xl" />
            <div className="bg-primary/20 absolute bottom-4 left-6 h-32 w-32 rounded-full blur-3xl" />
            <img
              src={featured.image}
              alt={featured.name}
              width={900}
              height={900}
              className="relative max-h-[480px] w-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="border-y border-border/70 bg-surface">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3.5 rounded-xl p-3">
              <span className="bg-accent text-forest flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-lg text-brown">{title}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="motif scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="text-center">
            <p className="eyebrow text-primary">Our Range</p>
            <h2 className="mt-3 font-display text-4xl text-brown sm:text-5xl">
              Our Premium Products
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Carefully selected products made for quality-conscious families.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCT */}
      <section className="bg-surface border-y border-border/70">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-2 sm:py-20">
          <div className="bg-accent/50 flex justify-center rounded-3xl p-8">
            <img
              src={featured.image}
              alt={featured.name}
              loading="lazy"
              className="max-h-[440px] w-auto drop-shadow-xl"
            />
          </div>
          <div>
            <p className="eyebrow text-gold">Premium Quality</p>
            <h2 className="mt-3 font-display text-4xl text-brown sm:text-5xl">{featured.name}</h2>
            <p className="mt-4 leading-relaxed text-foreground/75">{featured.description}</p>
            <p className="mt-6 font-display text-3xl text-forest">{formatPKR(featured.price)}</p>
            <p className="text-sm text-muted-foreground">Pack size: {featured.weight}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <QuantityPicker value={qty} onChange={setQty} />
              <button
                type="button"
                onClick={() => add(featured.slug, qty)}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full border-2 px-7 py-3 text-sm font-bold transition"
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={() => {
                  add(featured.slug, qty);
                  navigate({ to: "/checkout" });
                }}
                className="bg-gold text-gold-foreground rounded-full px-7 py-3 text-sm font-bold transition hover:brightness-105"
              >
                Buy Now
              </button>
            </div>

            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-forest">
              <Heart className="h-4 w-4" /> Fresh • Healthy • Pure
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-2 sm:py-20">
        <div>
          <img src={logo.url} alt="Fruity Nuts" loading="lazy" className="h-20 w-auto" />
          <h2 className="mt-6 font-display text-4xl text-brown sm:text-5xl">
            A Legacy of Quality Since 1947
          </h2>
          <p className="mt-5 leading-relaxed text-foreground/75">
            Fruity Nuts is built around a simple promise — fresh, healthy and pure products with
            quality you can trust. With a legacy dating back to 1947, we continue to bring
            premium-quality products to our customers.
          </p>
          <Link
            to="/about"
            className="border-forest text-forest hover:bg-forest hover:text-forest-foreground mt-7 inline-flex rounded-full border-2 px-7 py-3 text-sm font-bold transition"
          >
            Read Our Story
          </Link>
        </div>
        <img
          src={heroBg}
          alt="Pistachios, almonds and freshly milled gram flour on a warm wooden kitchen counter"
          loading="lazy"
          width={1600}
          height={1104}
          className="shadow-lift h-full max-h-[420px] w-full rounded-3xl object-cover"
        />
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-surface motif border-y border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="text-center">
            <p className="eyebrow text-primary">The Fruity Nuts Difference</p>
            <h2 className="mt-3 font-display text-4xl text-brown sm:text-5xl">Why Choose Us</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bg-background shadow-card rounded-2xl border border-border/70 p-6 text-center"
              >
                <span className="bg-gradient-to-br from-gold to-gold/70 text-gold-foreground mx-auto flex h-14 w-14 items-center justify-center rounded-full">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-xl text-forest">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="text-center">
          <p className="eyebrow text-primary">Customer Reviews</p>
          <h2 className="mt-3 font-display text-4xl text-brown sm:text-5xl">What Families Say</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="bg-surface shadow-card flex flex-col rounded-2xl border border-border/70 p-7"
            >
              <div className="text-gold flex gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 leading-relaxed text-foreground/80">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-5 text-sm font-bold text-forest">
                — {r.name}
                <span className="block font-normal text-muted-foreground">{r.city}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest text-forest-foreground motif">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
          <h2 className="font-display text-4xl sm:text-5xl">Bring Premium Quality Home</h2>
          <p className="mt-4 opacity-85">
            Shop Fruity Nuts and experience freshness, quality and purity.
          </p>
          <Link
            to="/shop"
            className="bg-gold text-gold-foreground mt-8 inline-flex rounded-full px-9 py-3.5 text-sm font-bold transition hover:brightness-105"
          >
            Shop Now
          </Link>
          <p className="mt-6 inline-flex items-center justify-center gap-2 text-xs opacity-70">
            <Truck className="h-4 w-4" /> Flat Rs 250 delivery nationwide • Cash on Delivery
          </p>
        </div>
      </section>
    </>
  );
}
