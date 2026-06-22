type HomeSectionHeaderProps = {
  title: string;
  className?: string;
  titleClassName?: string;
};

export function HomeSectionHeader({
  title,
  className = "",
  titleClassName = "text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight",
}: HomeSectionHeaderProps) {
  return (
    <div className={className}>
      <h2 className={titleClassName}>{title}</h2>
    </div>
  );
}
