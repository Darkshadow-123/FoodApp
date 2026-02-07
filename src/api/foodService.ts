import { FoodItem } from '../types';

const API_URL = 'https://api.jsonbin.io/v3/b/698184b543b1c97be96155bf';

export async function fetchFoodItems(): Promise<FoodItem[]> {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    return data.record || [];
  } catch (error) {
    throw new Error('Failed to fetch food items');
  }
}

export function getCategories(items: FoodItem[]): string[] {
  return Array.from(new Set(items.map(item => item.category))).sort();
}
