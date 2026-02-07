export interface FoodItem {
  id: string;
  name: string;
  image: string;
  rating: number;
  category: string;
  cuisine: string;
  description?: string;
  tags?: string[];
}

export type AppState = 'idle' | 'loading' | 'error' | 'success';
