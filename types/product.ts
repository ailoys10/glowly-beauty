export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  image: string;
  images?: string[];
  rating: {
    rate: number;
    count: number;
  };
  badge?: string;
  featured?: boolean;
}

export interface WishlistItem {
  id: number;
  title: string;
  price: number;
  image: string;
}
