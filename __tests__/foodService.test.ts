import { getCategories } from '../src/api/foodService';
import { FoodItem } from '../src/types';

describe('FoodService', () => {
  describe('getCategories', () => {
    it('should extract unique categories from food items', () => {
      const mockItems: FoodItem[] = [
        { id: 1, title: 'Pizza', thumbNailImage: '', mainImage: '', rating: 4.5, category: 'Italian', cuisine: 'Italian', description: '', price: 100, prepTimeMins: 20, isVeg: true },
        { id: 2, title: 'Sushi', thumbNailImage: '', mainImage: '', rating: 4.8, category: 'Japanese', cuisine: 'Japanese', description: '', price: 200, prepTimeMins: 30, isVeg: false },
        { id: 3, title: 'Pasta', thumbNailImage: '', mainImage: '', rating: 4.3, category: 'Italian', cuisine: 'Italian', description: '', price: 150, prepTimeMins: 25, isVeg: true },
        { id: 4, title: 'Tacos', thumbNailImage: '', mainImage: '', rating: 4.6, category: 'Mexican', cuisine: 'Mexican', description: '', price: 120, prepTimeMins: 15, isVeg: false },
      ];

      const categories = getCategories(mockItems);

      expect(categories).toEqual(['Italian', 'Japanese', 'Mexican']);
      expect(categories).toHaveLength(3);
    });

    it('should return empty array when no items provided', () => {
      const categories = getCategories([]);
      expect(categories).toEqual([]);
      expect(categories).toHaveLength(0);
    });

    it('should return categories in alphabetical order', () => {
      const mockItems: FoodItem[] = [
        { id: 1, title: 'Z', thumbNailImage: '', mainImage: '', rating: 4, category: 'Zebra', cuisine: 'Test', description: '', price: 100, prepTimeMins: 20, isVeg: true },
        { id: 2, title: 'A', thumbNailImage: '', mainImage: '', rating: 4, category: 'Apple', cuisine: 'Test', description: '', price: 100, prepTimeMins: 20, isVeg: true },
        { id: 3, title: 'M', thumbNailImage: '', mainImage: '', rating: 4, category: 'Mango', cuisine: 'Test', description: '', price: 100, prepTimeMins: 20, isVeg: true },
      ];

      const categories = getCategories(mockItems);

      expect(categories).toEqual(['Apple', 'Mango', 'Zebra']);
    });

    it('should handle items with same category', () => {
      const mockItems: FoodItem[] = [
        { id: 1, title: 'Item 1', thumbNailImage: '', mainImage: '', rating: 4, category: 'Same', cuisine: 'Test', description: '', price: 100, prepTimeMins: 20, isVeg: true },
        { id: 2, title: 'Item 2', thumbNailImage: '', mainImage: '', rating: 4, category: 'Same', cuisine: 'Test', description: '', price: 100, prepTimeMins: 20, isVeg: true },
        { id: 3, title: 'Item 3', thumbNailImage: '', mainImage: '', rating: 4, category: 'Same', cuisine: 'Test', description: '', price: 100, prepTimeMins: 20, isVeg: true },
      ];

      const categories = getCategories(mockItems);

      expect(categories).toEqual(['Same']);
      expect(categories).toHaveLength(1);
    });
  });
});
