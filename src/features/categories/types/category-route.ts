export type CategoryRouteNode = {
  id: string;
  apiId: number;
  name: string;
  slug: string;
  path: string;
  href: string;
  description?: string;
  depth: number;
  parentId?: number;
  children: CategoryRouteNode[];
};

export type CategoryRouteIndex = {
  root: CategoryRouteNode;
  nodes: CategoryRouteNode[];
  byApiId: Map<number, CategoryRouteNode>;
  byPath: Map<string, CategoryRouteNode>;
};
