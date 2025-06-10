export type Course = {
  course: string;
  price?: number;
  description?: string;
  items?: Array<{
    name: string;
    price?: number | string;
    description?: string;
  }>;
  additionalItems?: Array<{
    name: string;
    price?: number;
  }>;
  additionalInfo?: Array<{
    name: string;
    disclaimer?: boolean;
  }>
};
export type Menu = Array<Course>;
export type MenuItem = {
  name: string;
  price?: number | string;
  description?: string;
};
export type AdditionalItem = {
  name: string;
  price: number;
};
