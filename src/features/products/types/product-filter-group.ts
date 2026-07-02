export type ProductFilterOption = {
  id: string;
  label: string;
  value: string;
  count?: number;
  disabled?: boolean;
};

export type ProductFilterGroup = {
  id: string;
  title: string;
  queryKey: string;
  searchable?: boolean;
  options: ProductFilterOption[];
};
