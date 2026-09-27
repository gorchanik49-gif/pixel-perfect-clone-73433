import khalisBesan from "@/assets/khalis-besan.png.asset.json";
import kababPapar from "@/assets/kabab-papar.png.asset.json";
import besanBundi from "@/assets/besan-bundi.png.asset.json";

export type Product = {
  slug: string;
  name: string;
  category: string;
  weight: string;
  price: number;
  shortDescription: string;
  description: string;
  image: string;
  details: string[];
};

/**
 * Single source of truth for the Fruity Nuts catalogue.
 * Edit names, prices or copy here and every page updates.
 */
export const products: Product[] = [
  {
    slug: "khalis-besan",
    name: "Khalis Besan",
    category: "Flour",
    weight: "1000 g",
    price: 650,
    shortDescription: "Pure gram flour milled from dal chana for everyday cooking.",
    description:
      "Khalis Besan is pure gram flour prepared from dal chana, a staple across South Asian cuisine. Rich in carbohydrates, protein and fiber, it brings wholesome nourishment and versatility to the kitchen — perfect for pakoras, sweets, batters and countless traditional dishes with authentic flavor.",
    image: khalisBesan.url,
    details: [
      "Milled from selected dal chana",
      "No added colours or preservatives",
      "Resealable, food-grade packaging",
      "Ideal for pakoras, batters and traditional sweets",
    ],
  },
  {
    slug: "kabab-papar",
    name: "Kabab Papar",
    category: "Snacks",
    weight: "1000 g",
    price: 950,
    shortDescription: "Crispy unroasted papar pellets with a savoury kabab flavour.",
    description:
      "Kabab Papar is a crispy, unroasted papar with a savory kabab flavor. This dehydrated snack pellet puffs up instantly when dropped into hot oil, quickly prepared at home — light, crunchy and full of flavor, a satisfying family-favorite snack for tea-time.",
    image: kababPapar.url,
    details: [
      "Puffs up in seconds in hot oil",
      "Savoury kabab seasoning",
      "Airtight jar keeps it crisp",
      "A tea-time favourite for the whole family",
    ],
  },
  {
    slug: "besan-bundi-special",
    name: "Besan Bundi Special",
    category: "Snacks",
    weight: "500 g",
    price: 550,
    shortDescription: "Traditional crispy bundi for dahi bhallay, pakoriyan and gol gappay.",
    description:
      "Besan Bundi Special is a traditional favorite, perfect for preparing delicious dahi bhallay, pakoriyan, gol gappay and other appetizers. With its delightful flavor and unique, crispy texture, it is a cherished street food and homemade treat — bringing authentic taste and satisfying crunch.",
    image: besanBundi.url,
    details: [
      "Made from pure besan",
      "Crisp texture that holds in yoghurt",
      "Perfect for dahi bhallay and gol gappay",
      "Resealable 500 g pouch",
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const formatPKR = (value: number) =>
  `Rs ${value.toLocaleString("en-PK", { maximumFractionDigits: 0 })}`;

export const SHIPPING_FEE = 250;

export const BRAND = {
  name: "Fruity Nuts",
  since: 1947,
  tagline: "Fresh | Healthy | Pure",
  secondary: "Premium Quality Products",
  phone: "+92 332 7003680",
  phoneHref: "+923327003680",
  email: "sales@fruitynuts.pk",
  site: "fruitynuts.pk",
  city: "Lahore, Pakistan",
};
