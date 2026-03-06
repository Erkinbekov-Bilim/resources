export interface ICategory {
  id: number;
  name: string;
  description: string | null;
}

export interface ICategoryWithoutId {
  name: string;
  description: string | null;
}

export interface IItemLocation {
  id: number;
  name: string;
  description: string | null;
}

export interface IInventory {
  id: number;
  category_id: number;
  location_id: number;
  name: string;
  description: string | null;
  image: string | null;
  date_from: string;
}
