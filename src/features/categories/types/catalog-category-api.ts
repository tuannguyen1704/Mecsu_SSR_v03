export type CatalogCategoryNodeDto = {
  id: number;
  name: string;
  description?: string;
  lft: number;
  rgt: number;
  parentId?: number;
  depth: number;
  children: CatalogCategoryNodeDto[];
};
