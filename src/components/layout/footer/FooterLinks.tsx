import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
};

type FooterLinksProps = {
  title: string;
  links: FooterLink[];
};

export function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <div className="flex flex-col">
      <h3 className="mb-5 border-b border-white/[0.08] pb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
        {title}
      </h3>
      <ul className="flex flex-col gap-3 text-[13px]">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link
              href={link.href}
              className="text-slate-400 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
