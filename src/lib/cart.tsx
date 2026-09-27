import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, SHIPPING_FEE, type Product } from "@/data/products";

const STORAGE_KEY = "fruitynuts-cart-v1";

export type CartLine = { slug: string; qty: number };
export type CartItem = { product: Product; qty: number; lineTotal: number };

type CartContextValue = {
  lines: CartLine[];
  items: CartItem[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) {
          setLines(parsed.filter((l) => products.some((p) => p.slug === l.slug) && l.qty > 0));
        }
      }
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable */
    }
  }, [lines]);

  const value = useMemo<CartContextValue>(() => {
    const items: CartItem[] = lines.flatMap((line) => {
      const product = products.find((p) => p.slug === line.slug);
      if (!product) return [];
      return [{ product, qty: line.qty, lineTotal: product.price * line.qty }];
    });
    const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);
    const shipping = items.length ? SHIPPING_FEE : 0;

    return {
      lines,
      items,
      count: items.reduce((sum, i) => sum + i.qty, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      add: (slug, qty = 1) =>
        setLines((prev) => {
          const existing = prev.find((l) => l.slug === slug);
          if (existing) {
            return prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l));
          }
          return [...prev, { slug, qty }];
        }),
      setQty: (slug, qty) =>
        setLines((prev) =>
          qty <= 0
            ? prev.filter((l) => l.slug !== slug)
            : prev.map((l) => (l.slug === slug ? { ...l, qty } : l)),
        ),
      remove: (slug) => setLines((prev) => prev.filter((l) => l.slug !== slug)),
      clear: () => setLines([]),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
