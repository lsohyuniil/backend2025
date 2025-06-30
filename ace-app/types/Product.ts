export interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  description?: string;
  deal_price?: number;
  spec?: string;
}
