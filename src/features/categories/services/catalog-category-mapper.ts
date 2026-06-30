import { toSlug } from "@/lib/routing";
import type { CatalogCategoryNodeDto } from "../types/catalog-category-api";
import type {
  CategoryRouteIndex,
  CategoryRouteNode,
} from "../types/category-route";

function createUniqueSlug(
  node: CatalogCategoryNodeDto,
  siblingSlugs: Set<string>,
) {
  const baseSlug = toSlug(node.name) || `category-${node.id}`;
  const slug = siblingSlugs.has(baseSlug) ? `${baseSlug}-${node.id}` : baseSlug;

  siblingSlugs.add(slug);

  return slug;
}

function mapNode(
  node: CatalogCategoryNodeDto,
  parentPath: string,
  parentId?: number,
): CategoryRouteNode {
  const isRoot = node.depth === 0 || node.parentId === undefined;
  const slug = isRoot ? "" : toSlug(node.name) || `category-${node.id}`;
  const path = isRoot ? "" : [parentPath, slug].filter(Boolean).join("/");
  const childSiblingSlugs = new Set<string>();

  const routeNode: CategoryRouteNode = {
    id: String(node.id),
    apiId: node.id,
    name: node.name,
    slug,
    path,
    href: path ? `/danh-muc/${path}` : "/danh-muc",
    description: node.description,
    depth: node.depth,
    parentId: node.parentId ?? parentId,
    children: [],
  };

  routeNode.children = node.children.map((child) =>
    mapNodeWithSiblingScope(child, path, node.id, childSiblingSlugs),
  );

  return routeNode;
}

function mapNodeWithSiblingScope(
  node: CatalogCategoryNodeDto,
  parentPath: string,
  parentId: number,
  siblingSlugs: Set<string>,
): CategoryRouteNode {
  const slug = createUniqueSlug(node, siblingSlugs);
  const path = [parentPath, slug].filter(Boolean).join("/");
  const childSiblingSlugs = new Set<string>();

  return {
    id: String(node.id),
    apiId: node.id,
    name: node.name,
    slug,
    path,
    href: `/danh-muc/${path}`,
    description: node.description,
    depth: node.depth,
    parentId: node.parentId ?? parentId,
    children: node.children.map((child) =>
      mapNodeWithSiblingScope(child, path, node.id, childSiblingSlugs),
    ),
  };
}

function flattenNodes(
  node: CategoryRouteNode,
  includeRoot = false,
): CategoryRouteNode[] {
  const children = node.children.flatMap((child) => flattenNodes(child, true));

  return includeRoot ? [node, ...children] : children;
}

export function buildCategoryRouteIndex(
  rootDto: CatalogCategoryNodeDto,
): CategoryRouteIndex {
  const root = mapNode(rootDto, "");
  const nodes = flattenNodes(root);
  const byApiId = new Map<number, CategoryRouteNode>();
  const byPath = new Map<string, CategoryRouteNode>();

  nodes.forEach((node) => {
    byApiId.set(node.apiId, node);
    byPath.set(node.path, node);
  });

  return {
    root,
    nodes,
    byApiId,
    byPath,
  };
}
