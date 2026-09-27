import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png.asset.json";
import { BRAND } from "@/data/products";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    setMenuOpen(false);
    navigate({ to: "/shop", search: { q: term || undefined } });
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-forest text-forest-foreground">
        <p className="mx-auto max-w-7xl px-4 py-2 text-center text-[0.68rem] tracking-[0.16em] uppercase sm:text-xs">
          {BRAND.secondary} <span className="opacity-50">|</span> Fresh • Healthy • Pure{" "}
          <span className="opacity-50">|</span> Since {BRAND.since}
        </p>
      </div>

      <nav
        className={cn(
          "border-b border-border/70 bg-background/95 backdrop-blur transition-shadow",
          scrolled && "shadow-card",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="Fruity Nuts home">
            <img src={logo.url} alt="Fruity Nuts" className="h-10 w-auto sm:h-12" />
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-8 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary [&.active]:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              aria-label="Search products"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((v) => !v)}
              className="rounded-full p-2.5 text-foreground/75 transition-colors hover:bg-secondary hover:text-primary"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              to="/cart"
              aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
              className="relative rounded-full p-2.5 text-foreground/75 transition-colors hover:bg-secondary hover:text-primary"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="bg-gold text-gold-foreground absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[0.65rem] font-bold">
                  {count}
                </span>
              )}
            </Link>

            <Link
              to="/shop"
              className="bg-gold text-gold-foreground hover:brightness-105 focus-visible:ring-ring hidden rounded-full px-5 py-2.5 text-sm font-bold transition focus-visible:ring-2 focus-visible:outline-none sm:inline-flex"
            >
              Shop Now
            </Link>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-full p-2.5 text-foreground/75 transition-colors hover:bg-secondary lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <form onSubmit={submitSearch} className="border-t border-border/70 bg-secondary/60">
            <div className="mx-auto flex max-w-7xl gap-2 px-4 py-3">
              <input
                autoFocus
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search Fruity Nuts products…"
                aria-label="Search products"
                className="border-border bg-surface focus-visible:ring-ring flex-1 rounded-full border px-4 py-2.5 text-sm focus-visible:ring-2 focus-visible:outline-none"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground rounded-full px-5 py-2.5 text-sm font-bold"
              >
                Search
              </button>
            </div>
          </form>
        )}

        {menuOpen && (
          <div className="border-t border-border/70 bg-background lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col px-4 py-2">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-border/60 py-3 text-sm font-semibold text-foreground/85 last:border-0 [&.active]:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
