export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="bg-forest text-forest-foreground motif">
      <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:py-20">
        <p className="eyebrow text-gold">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">{title}</h1>
        {intro && <p className="mx-auto mt-4 max-w-2xl text-sm opacity-85 sm:text-base">{intro}</p>}
      </div>
    </section>
  );
}
