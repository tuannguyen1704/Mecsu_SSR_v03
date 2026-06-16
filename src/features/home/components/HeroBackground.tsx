type HeroBackgroundProps = {
  imageUrl: string;
  imageAlt: string;
};

export function HeroBackground({ imageUrl, imageAlt }: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0" aria-label={imageAlt}>
      <div
        className="h-full w-full bg-cover bg-center bg-no-repeat opacity-40 grayscale brightness-50"
        style={{ backgroundImage: `url("${imageUrl}")` }}
      />
      <div className="absolute inset-0 bg-slate-950/80" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/10 blur-[120px]" />
    </div>
  );
}
