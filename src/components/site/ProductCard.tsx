import { Link, useNavigate } from "@tanstack/react-router";
import { formatPKR, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const navigate = useNavigate();

  return (
    <article className="group bg-surface flex flex-col overflow-hidden rounded-2xl border border-border/70 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="bg-secondary/50 relative block aspect-square overflow-hidden"
      >
        <span className="bg-forest text-forest-foreground absolute top-3 left-3 z-10 rounded-full px-3 py-1 text-[0.65rem] font-bold tracking-wider uppercase">
          {product.weight}
        </span>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-primary">{product.category}</p>
        <h3 className="mt-1.5 font-display text-xl text-brown">
          <Link to="/product/$slug" params={{ slug: product.slug }} className="hover:underline">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>
        <p className="mt-4 font-display text-2xl text-forest">{formatPKR(product.price)}</p>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => add(product.slug)}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-ring flex-1 rounded-full border-2 px-4 py-2.5 text-sm font-bold transition focus-visible:ring-2 focus-visible:outline-none"
          >
            Add to Cart
          </button>
          <button
            type="button"
            onClick={() => {
              add(product.slug);
              navigate({ to: "/checkout" });
            }}
            className="bg-gold text-gold-foreground focus-visible:ring-ring flex-1 rounded-full px-4 py-2.5 text-sm font-bold transition hover:brightness-105 focus-visible:ring-2 focus-visible:outline-none"
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}
