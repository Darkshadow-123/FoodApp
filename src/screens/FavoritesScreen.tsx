import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../context/FavoritesContext';
import { FoodItem } from '../types';
import { FoodCard } from '../components/FoodCard';
import { EmptyState } from '../components/EmptyState';

export function FavoritesScreen() {
  const navigation = useNavigation();
  const { favorites } = useFavorites();
  const [favoriteItems, setFavoriteItems] = React.useState<FoodItem[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const loadFavorites = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await fetch('https://api.jsonbin.io/v3/b/698184b543b1c97be96155bf');
      const data = await response.json();
      const allItems = data.record || [];
      const filtered = allItems.filter((item: FoodItem) => favorites.has(item.id));
      setFavoriteItems(filtered);
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setRefreshing(false);
    }
  }, [favorites]);

  React.useEffect(() => {
    if (favorites.size > 0) {
      loadFavorites();
    } else {
      setFavoriteItems([]);
    }
  }, [favorites, loadFavorites]);

  const handleItemPress = useCallback((item: FoodItem) => {
    navigation.navigate('Details', { item });
  }, [navigation]);

  if (favoriteItems.length === 0) {
    return <EmptyState title="No favorites yet" message="Tap the heart icon on any food item to save it here" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.count}>{favoriteItems.length} items</Text>
      </View>

      <FlatList
        data={favoriteItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FoodCard item={item} onPress={() => handleItemPress(item)} />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadFavorites} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
  },
  count: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  listContent: {
    padding: 16,
  },
});
