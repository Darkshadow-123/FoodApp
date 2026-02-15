export interface FoodItem {
  id: number;
  title: string;
  thumbNailImage: string;
  mainImage: string;
  rating: number;
  category: string;
  cuisine: string;
  description: string;
  tags?: string[];
  price: number;
  prepTimeMins: number;
  isVeg: boolean;
}

export type AppState = 'idle' | 'loading' | 'error' | 'success';
