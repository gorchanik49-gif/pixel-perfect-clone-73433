import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { QuantityPicker } from "@/components/site/QuantityPicker";
import { formatPKR } from "@/data/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart | Fruity Nuts" },
      {
        name: "description",
        content: "Review your Fruity Nuts order, update quantities and proceed to checkout.",
      },
      { property: "og:title", content: "Your Cart — Fruity Nuts" },
      { property: "og:description", content: "Review your Fruity Nuts order before checkout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal, shipping, total } = useCart();

  return (
    <>
      <PageHeader eyebrow="Your Order" title="Shopping Cart" />

      <div className="mx-auto max-w-7xl px-4 py-12">
        {items.length === 0 ? (
          <div className="bg-surface shadow-card mx-auto max-w-lg rounded-2xl border border-border/70 p-12 text-center">
            <h2 className="font-display text-2xl text-brown">Your cart is empty</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Add a Fruity Nuts product to get started.
            </p>
            <Link
              to="/shop"
              className="bg-gold text-gold-foreground mt-6 inline-flex rounded-full px-7 py-3 text-sm font-bold"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <ul className="space-y-4">
              {items.map(({ product, qty, lineTotal }) => (
                <li
                  key={product.slug}
                  className="bg-surface shadow-card flex flex-col gap-4 rounded-2xl border border-border/70 p-4 sm:flex-row sm:items-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="bg-accent/40 h-24 w-24 shrink-0 rounded-xl object-contain p-2"
                  />
                  <div className="flex-1">
                    <Link
                      to="/product/$slug"
                      params={{ slug: product.slug }}
                      className="font-display text-xl text-brown hover:underline"
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {product.weight} • {formatPKR(product.price)} each
                    </p>
                  </div>
                  <QuantityPicker value={qty} onChange={(n) => setQty(product.slug, n)} />
                  <p className="font-display w-28 text-right text-xl text-forest">
                    {formatPKR(lineTotal)}
                  </p>
                  <button
                    type="button"
                    aria-label={`Remove ${product.name} from cart`}
                    onClick={() => remove(product.slug)}
                    className="hover:text-destructive rounded-full p-2.5 text-muted-foreground transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>

            <aside className="bg-surface shadow-card h-fit rounded-2xl border border-border/70 p-6">
              <h2 className="font-display text-2xl text-brown">Order Summary</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-semibold">{formatPKR(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="font-semibold">{formatPKR(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <dt className="font-display text-lg text-brown">Total</dt>
                  <dd className="font-display text-lg text-forest">{formatPKR(total)}</dd>
                </div>
              </dl>
              <Link
                to="/checkout"
                className="bg-gold text-gold-foreground mt-6 block rounded-full px-6 py-3.5 text-center text-sm font-bold transition hover:brightness-105"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/shop"
                className="mt-3 block text-center text-sm font-semibold text-primary hover:underline"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
