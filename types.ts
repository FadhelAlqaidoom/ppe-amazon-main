export interface item {
  id: string;
  name: string;
  sizeOptions: string[];
  quantityAvailable: number;
  category: string;
  imageUrl: string;
}

export interface Variant {
  id: string;
  size: string;
  quantity: number;
}

export interface ItemsTable {
  id: string;
  name: string;
  description: string;
  unitCost: number;
  variants: Variant[];
  category: string;
  site: string;
  imageUrl: string;
  selectedSize?: string;
}

export interface Image {
  id: string;
  url: string;
}

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}
