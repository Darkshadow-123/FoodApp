import { getCategories } from '../src/api/foodService';
import { FoodItem } from '../src/types';

describe('FoodService', () => {
  describe('getCategories', () => {
    it('should extract unique categories from food items', () => {
      const mockItems: FoodItem[] = [
        { id: '1', name: 'Pizza', image: '', rating: 4.5, category: 'Italian', cuisine: 'Italian' },
        { id: '2', name: 'Sushi', image: '', rating: 4.8, category: 'Japanese', cuisine: 'Japanese' },
        { id: '3', name: 'Pasta', image: '', rating: 4.3, category: 'Italian', cuisine: 'Italian' },
        { id: '4', name: 'Tacos', image: '', rating: 4.6, category: 'Mexican', cuisine: 'Mexican' },
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
        { id: '1', name: 'Z', image: '', rating: 4, category: 'Zebra', cuisine: 'Test' },
        { id: '2', name: 'A', image: '', rating: 4, category: 'Apple', cuisine: 'Test' },
        { id: '3', name: 'M', image: '', rating: 4, category: 'Mango', cuisine: 'Test' },
      ];

      const categories = getCategories(mockItems);

      expect(categories).toEqual(['Apple', 'Mango', 'Zebra']);
    });

    it('should handle items with same category', () => {
      const mockItems: FoodItem[] = [
        { id: '1', name: 'Item 1', image: '', rating: 4, category: 'Same', cuisine: 'Test' },
        { id: '2', name: 'Item 2', image: '', rating: 4, category: 'Same', cuisine: 'Test' },
        { id: '3', name: 'Item 3', image: '', rating: 4, category: 'Same', cuisine: 'Test' },
      ];

      const categories = getCategories(mockItems);

      expect(categories).toEqual(['Same']);
      expect(categories).toHaveLength(1);
    });
  });
});
