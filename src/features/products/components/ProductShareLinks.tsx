import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  buildAbsoluteUrl,
  buildFacebookShareUrl,
  buildGmailShareUrl,
  buildPinterestShareUrl,
  buildTwitterShareUrl,
} from "../utils/share";

type ProductShareLinksProps = {
  productName: string;
  productUrl: string;
  imageUrl?: string;
  className?: string;
};

const shareLinkClass =
  "flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-[15px] font-bold text-slate-600 transition hover:border-[#163F78] hover:text-[#163F78] hover:shadow-sm";

export function ProductShareLinks({
  productName,
  productUrl,
  imageUrl,
  className,
}: ProductShareLinksProps) {
  const absoluteProductUrl = buildAbsoluteUrl(productUrl);
  const absoluteImageUrl = buildAbsoluteUrl(imageUrl || "");
  const links = [
    {
      label: "Chia sẻ sản phẩm lên Facebook",
      href: buildFacebookShareUrl(absoluteProductUrl),
      content: "f",
    },
    {
      label: "Chia sẻ sản phẩm lên X",
      href: buildTwitterShareUrl(absoluteProductUrl, productName),
      content: "X",
    },
    {
      label: "Chia sẻ sản phẩm lên Pinterest",
      href: buildPinterestShareUrl(
        absoluteProductUrl,
        absoluteImageUrl,
        productName,
      ),
      content: "P",
    },
    {
      label: "Chia sẻ sản phẩm qua Gmail",
      href: buildGmailShareUrl(absoluteProductUrl, productName),
      content: <Mail size={17} strokeWidth={2.1} />,
    },
  ];

  return (
    <div
      className={cn(
        "mt-1 flex items-center gap-2 text-[15px] text-slate-600",
        className,
      )}
    >
      <span className="font-medium">Chia sẻ:</span>
      <div className="flex items-center gap-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={shareLinkClass}
            aria-label={link.label}
          >
            {link.content}
          </a>
        ))}
      </div>
    </div>
  );
}
