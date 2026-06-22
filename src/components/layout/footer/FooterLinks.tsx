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
      <h3 className="mb-6 text-lg font-semibold uppercase text-white">
        {title}
      </h3>
      <ul className="flex flex-col gap-4 text-sm">
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
