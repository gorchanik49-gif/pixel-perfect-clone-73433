import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { BRAND } from "@/data/products";

export function Footer() {
  return (
    <footer className="bg-forest text-forest-foreground motif">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src={logo.url}
            alt="Fruity Nuts"
            className="h-14 w-auto rounded-md bg-white/95 p-1.5"
          />
          <p className="mt-4 font-display text-xl">{BRAND.tagline}</p>
          <p className="mt-2 max-w-xs text-sm opacity-80">
            Premium quality products from {BRAND.city}, trusted by families since {BRAND.since}.
          </p>
        </div>

        <div>
          <h3 className="eyebrow text-gold">Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/shop", label: "Shop" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="opacity-85 transition-opacity hover:opacity-100">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-gold">Contact</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 opacity-70" />
              <a href={`tel:${BRAND.phoneHref}`} className="opacity-85 hover:opacity-100">
                {BRAND.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 opacity-70" />
              <a href={`mailto:${BRAND.email}`} className="opacity-85 hover:opacity-100">
                {BRAND.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 opacity-70" />
              <span className="opacity-85">{BRAND.city}</span>
            </li>
            <li>
              <a
                href={`https://${BRAND.site}`}
                className="opacity-85 hover:opacity-100"
                rel="noreferrer"
              >
                https://{BRAND.site}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-gold">Follow Us</h3>
          <div className="mt-4 flex gap-3">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href={`https://${BRAND.site}`}
                aria-label="Fruity Nuts social profile"
                rel="noreferrer"
                className="rounded-full border border-white/25 p-2.5 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="mt-6 text-sm opacity-80">Cash on Delivery & Bank Transfer accepted.</p>
        </div>
      </div>

      <div className="border-t border-white/15">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-xs opacity-70">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
