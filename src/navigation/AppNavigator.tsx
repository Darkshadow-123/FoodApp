import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';

export type RootStackParamList = {
  Main: undefined;
  Details: { item: any };
};

export type MainTabParamList = {
  Home: undefined;
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <TabIcon name="Home" />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: () => <TabIcon name="Favorites" />,
        }}
      />
    </Tab.Navigator>
  );
}

function TabIcon({ name }: { name: string }) {
  return (
    <View style={styles.iconContainer}>
      <View style={name === 'Home' ? styles.homeIcon : styles.favoritesIcon} />
    </View>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeIcon: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#007AFF',
  },
  favoritesIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF4444',
  },
});
