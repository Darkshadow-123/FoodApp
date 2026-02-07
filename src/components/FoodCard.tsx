import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { FoodItem } from '../types';
import { useFavorites } from '../context/FavoritesContext';

interface FoodCardProps {
  item: FoodItem;
  onPress: () => void;
}

export function FoodCard({ item, onPress }: FoodCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(item.id);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <View style={styles.skeleton}>
          <ActivityIndicator size="small" color="#ccc" />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} testID="food-title">
            {item.name}
          </Text>
          <View style={styles.ratingContainer}>
            <View style={styles.starPlaceholder} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.category}>{item.category}</Text>
        {item.tags && item.tags.length > 0 && (
          <Text style={styles.tags}>{item.tags.join(', ')}</Text>
        )}
      </View>
      <TouchableOpacity
        style={[styles.favoriteButton, favorite && styles.favoriteButtonActive]}
        onPress={(e) => {
          e.stopPropagation();
          toggleFavorite(item.id);
        }}
        activeOpacity={0.7}
      >
        <View style={[styles.heartIcon, favorite && styles.heartIconFilled]} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 150,
    backgroundColor: '#f5f5f5',
  },
  skeleton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  starPlaceholder: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFD700',
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  tags: {
    fontSize: 12,
    color: '#999',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  favoriteButtonActive: {
    backgroundColor: '#fff',
  },
  heartIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ccc',
    borderWidth: 2,
    borderColor: '#ccc',
  },
  heartIconFilled: {
    backgroundColor: '#FF4444',
    borderColor: '#FF4444',
  },
});
