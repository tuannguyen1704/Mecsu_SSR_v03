const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://mecsu.vn"
).replace(/\/$/, "");

export function buildAbsoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) {
    return SITE_URL;
  }

  try {
    return new URL(pathOrUrl).toString();
  } catch {
    const normalizedPath = pathOrUrl.startsWith("/")
      ? pathOrUrl
      : `/${pathOrUrl}`;

    return `${SITE_URL}${normalizedPath}`;
  }
}

export function buildFacebookShareUrl(productUrl: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
}

export function buildTwitterShareUrl(
  productUrl: string,
  productName: string,
): string {
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(productName)}`;
}

export function buildPinterestShareUrl(
  productUrl: string,
  imageUrl: string,
  productName: string,
): string {
  return `https://www.pinterest.com/pin-builder/?url=${encodeURIComponent(productUrl)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(productName)}&method=link`;
}

export function buildGmailShareUrl(
  productUrl: string,
  productName: string,
): string {
  return `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(productName)}&body=${encodeURIComponent(`${productName} - ${productUrl}`)}`;
}
