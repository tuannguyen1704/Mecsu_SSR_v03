export function getSeededPlaceholder(seed: string): string {
  const encoded = encodeURIComponent(seed.charAt(0).toUpperCase());
  return `https://placehold.co/100x100/ffffff/003B73?text=${encoded}`;
}
