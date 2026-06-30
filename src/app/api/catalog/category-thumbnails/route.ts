import { fetchCatalogCategoryDetail } from "@/features/categories/services/catalog-category-detail-api";
import { getIsCatalogApiEnabled } from "@/features/categories/services/category-service";

const MAX_IDS_PER_REQUEST = 40;

type ThumbnailItem = {
  id: number;
  imageUrl: string;
};

function parseCategoryIds(request: Request) {
  const url = new URL(request.url);
  const rawIds = url.searchParams.get("ids") || "";
  const ids = rawIds
    .split(",")
    .map((value) => Number.parseInt(value.trim(), 10))
    .filter((value, index, source) =>
      Number.isFinite(value) && value > 0 && source.indexOf(value) === index,
    );

  return ids.slice(0, MAX_IDS_PER_REQUEST);
}

export async function GET(request: Request) {
  if (!getIsCatalogApiEnabled()) {
    return Response.json({ items: [] satisfies ThumbnailItem[] });
  }

  const ids = parseCategoryIds(request);

  if (ids.length === 0) {
    return Response.json({ items: [] satisfies ThumbnailItem[] });
  }

  const results = await Promise.allSettled(
    ids.map(async (id): Promise<ThumbnailItem | null> => {
      const detail = await fetchCatalogCategoryDetail(id);
      const imageUrl =
        detail?.images?.[0]?.thumbUrl ?? detail?.images?.[0]?.fullUrl ?? null;

      return imageUrl ? { id, imageUrl } : null;
    }),
  );

  const items: ThumbnailItem[] = [];

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      if (result.value) {
        items.push(result.value);
      }

      return;
    }

    console.warn(
      "[catalog-api] Category thumbnail failed",
      ids[index],
      result.reason,
    );
  });

  return Response.json({ items });
}
