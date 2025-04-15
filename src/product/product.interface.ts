export interface IProduct {
  name: string;
  brand: string;
  model: string;
  price: number;
  quantity?: number;
  stock?: boolean;
  image?: string;
  about?: string;
  isDeleted?: boolean;
}
