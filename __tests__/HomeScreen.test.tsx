import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { HomeScreen } from '../src/screens/HomeScreen';
import { FavoritesProvider } from '../src/context/FavoritesContext';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('../src/api/foodService', () => ({
  fetchFoodItems: jest.fn(),
  getCategories: jest.fn(),
}));

const mockFetchFoodItems = require('../src/api/foodService').fetchFoodItems;

const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => mockNavigation,
  };
});

const mockFoodItems = [
  {
    id: '1',
    name: 'Pizza',
    image: 'https://example.com/pizza.jpg',
    rating: 4.5,
    category: 'Italian',
    cuisine: 'Italian',
    description: 'Delicious pizza',
    tags: ['vegetarian', 'cheese'],
  },
  {
    id: '2',
    name: 'Sushi',
    image: 'https://example.com/sushi.jpg',
    rating: 4.8,
    category: 'Japanese',
    cuisine: 'Japanese',
    description: 'Fresh sushi',
    tags: ['seafood', 'raw'],
  },
];

function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <NavigationContainer>
      <FavoritesProvider>{children}</FavoritesProvider>
    </NavigationContainer>
  );
}

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    mockFetchFoodItems.mockImplementation(() => new Promise(() => {}));

    const { getByTestId } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );

    const activityIndicator = getByTestId('activity-indicator');
    expect(activityIndicator).toBeTruthy();
  });

  it('should render food items after successful fetch', async () => {
    mockFetchFoodItems.mockResolvedValue(mockFoodItems);

    const { getByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(mockFetchFoodItems).toHaveBeenCalled();
      expect(getByText('Pizza')).toBeTruthy();
      expect(getByText('Sushi')).toBeTruthy();
    });
  });

  it('should render error state on fetch failure', async () => {
    mockFetchFoodItems.mockRejectedValue(new Error('Network error'));

    const { getByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(getByText('Oops!')).toBeTruthy();
      expect(getByText('Retry')).toBeTruthy();
    });
  });

  it('should render empty state when no items returned', async () => {
    mockFetchFoodItems.mockResolvedValue([]);

    const { getByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(getByText('No items found')).toBeTruthy();
    });
  });

  it('should navigate to details screen when item pressed', async () => {
    mockFetchFoodItems.mockResolvedValue(mockFoodItems);

    const { getByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(getByText('Pizza')).toBeTruthy();
    });

    fireEvent.press(getByText('Pizza'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Details', {
      item: mockFoodItems[0],
    });
  });

  it('should filter items based on search query', async () => {
    mockFetchFoodItems.mockResolvedValue(mockFoodItems);

    const { getByPlaceholderText, getByText, queryByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(getByText('Pizza')).toBeTruthy();
      expect(getByText('Sushi')).toBeTruthy();
    });

    const searchInput = getByPlaceholderText('Search foods...');
    fireEvent.changeText(searchInput, 'Pizza');

    await waitFor(() => {
      expect(getByText('Pizza')).toBeTruthy();
      expect(queryByText('Sushi')).toBeNull();
    });
  });
});
