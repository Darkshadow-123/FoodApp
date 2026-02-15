import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { FoodItem } from '../types';
import { useFavorites } from '../context/FavoritesContext';

type DetailsScreenRouteProp = RouteProp<{ Details: { item: FoodItem } }, 'Details'>;

export function DetailsScreen() {
  const route = useRoute<DetailsScreenRouteProp>();
  const navigation = useNavigation();
  const { item } = route.params;
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(String(item.id));
  const [imageError, setImageError] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          {!imageError ? (
            <Image
              source={{ uri: item.mainImage }}
              style={styles.image}
              onError={() => setImageError(true)}
            />
          ) : (
            <View style={styles.imagePlaceholder} />
          )}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <View style={styles.backIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.favoriteButton, favorite && styles.favoriteButtonActive]}
            onPress={() => toggleFavorite(String(item.id))}
          >
            <View style={[styles.heartIcon, favorite && styles.heartIconFilled]} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{item.price}</Text>
            {item.prepTimeMins && (
              <Text style={styles.prepTime}>{item.prepTimeMins} mins</Text>
            )}
          </View>

          <View style={styles.ratingContainer}>
            <View style={styles.starIcon} />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.ratingLabel}>Rating</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Category</Text>
              <Text style={styles.infoValue}>{item.category}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Cuisine</Text>
              <Text style={styles.infoValue}>{item.cuisine}</Text>
            </View>
          </View>

          {item.description && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}

          {item.tags && item.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              <Text style={styles.sectionTitle}>Tags</Text>
              <View style={styles.tagsList}>
                {item.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 300,
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
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
  backIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#333',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
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
  content: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
    marginRight: 16,
  },
  prepTime: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    padding: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  starIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFD700',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginRight: 8,
  },
  ratingLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoItem: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  tagsContainer: {
    marginBottom: 24,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
    color: '#007AFF',
  },
});
