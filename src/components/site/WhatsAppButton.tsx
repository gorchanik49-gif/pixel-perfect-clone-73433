import { MessageCircle } from "lucide-react";
import { BRAND } from "@/data/products";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${BRAND.phoneHref.replace("+", "")}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Fruity Nuts on WhatsApp"
      className="bg-primary text-primary-foreground fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-lift transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
