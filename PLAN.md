# Food App - Plan and Overview

## Project Overview

A React Native mobile application that allows users to browse food items from a mock API, view detailed information about each item, and save their favorites locally.

## Tech Stack

- **Framework**: React Native CLI (0.83.1)
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **Storage**: AsyncStorage for favorites persistence
- **Testing**: Jest + React Native Testing Library

## Architecture

### Project Structure

```
FoodApp/
├── src/
│   ├── api/
│   │   └── foodService.ts        # API integration
│   ├── components/
│   │   ├── FoodCard.tsx          # Food item card component
│   │   ├── LoadingSpinner.tsx    # Loading indicator
│   │   ├── EmptyState.tsx        # Empty state component
│   │   └── ErrorMessage.tsx      # Error display component
│   ├── context/
│   │   └── FavoritesContext.tsx  # Favorites state management
│   ├── navigation/
│   │   └── AppNavigator.tsx      # Navigation setup
│   ├── screens/
│   │   ├── HomeScreen.tsx        # Main list screen
│   │   ├── DetailsScreen.tsx     # Item details screen
│   │   └── FavoritesScreen.tsx   # Saved favorites screen
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   └── utils/
│       └── (future utilities)
├── __tests__/
│   ├── foodService.test.ts       # Unit tests
│   └── HomeScreen.test.tsx       # Component tests
└── App.tsx                        # Root component
```

### Key Design Decisions

1. **Context API for Favorites**: Using React Context with AsyncStorage for state persistence provides a clean way to share favorite state across all screens.

2. **Modular Components**: Reusable UI components (FoodCard, LoadingSpinner, etc.) ensure consistency and maintainability.

3. **TypeScript**: Strong typing helps catch errors early and provides better developer experience.

4. **Pull-to-Refresh**: Added as a bonus feature for better UX.

5. **Search**: Real-time filtering implemented as a bonus feature.

## Features Implemented

### Core Requirements

1. **Home Screen**
   - Fetches food items from API
   - Displays food cards with image, title, rating, category
   - Handles loading, error, and empty states
   - Bonus: Search functionality and pull-to-refresh

2. **Details Screen**
   - Large image display
   - Full item information (title, rating, description, tags)
   - Favorite/unfavorite action

3. **Favorites**
   - Toggle favorite status
   - Favorites persisted via AsyncStorage
   - Favorites reflected across all screens
   - Dedicated Favorites tab

4. **Navigation**
   - Stack navigation (Home → Details)
   - Bottom tabs (Home, Favorites)

5. **UI/UX**
   - Consistent spacing and typography
   - Clean, readable layout
   - Meaningful empty states
   - Touch target sizes (40-48px)
   - Responsive design principles

6. **Testing**
   - Unit test: `foodService.test.ts` - Tests category extraction logic
   - Component test: `HomeScreen.test.tsx` - Tests screen rendering and interactions

### Bonus Features

- Search/filter functionality
- Pull-to-refresh
- Skeleton loaders (simplified version)

## API Integration

**Endpoint**: `https://api.jsonbin.io/v3/b/698184b543b1c97be96155bf`

The app assumes successful response and focuses on:
- State management (loading/error/success)
- Error handling
- Data transformation

## Testing Strategy

### Unit Tests

- `getCategories()` function tests:
  - Extracts unique categories
  - Handles empty arrays
  - Alphabetical sorting

### Component Tests

- HomeScreen rendering:
  - Loading state
  - Success state with items
  - Error state
  - Empty state
  - Item press navigation
  - Search filtering

## Trade-offs and Limitations

1. **Image Loading**: Uses placeholders instead of actual image loading to keep the solution simple. In production, would implement `FastImage` or similar with caching.

2. **Offline Support**: Basic error message shown when network fails. Full offline support with local data caching not implemented.

3. **Animations**: Limited animations to keep codebase focused. Smooth transitions between screens handled by React Navigation.

4. **Mock Icons**: Used placeholder shapes instead of vector icons to avoid additional native dependencies.

## How to Build and Run

### Prerequisites
- Node.js (v16+)
- Android Studio / Xcode
- React Native CLI

### Commands

```bash
# Install dependencies
npm install

# Run on Android
npx react-native run-android

# Run on iOS
npx react-native run-ios

# Run tests
npm test

# Run with Android emulator
npx react-native run-android

# Build APK (Android)
cd android && ./gradlew assembleRelease
```

## Future Enhancements

1. Implement proper image caching with FastImage
2. Add more detailed filtering options
3. Implement sharing functionality
4. Add user reviews/ratings feature
5. Integrate with real backend API
6. Add analytics tracking
7. Implement deep linking
8. Add animations and transitions

## Submission Checklist

- ✅ React Native CLI project (not Expo)
- ✅ TypeScript implementation
- ✅ Home Screen with API integration
- ✅ Details Screen
- ✅ Favorites with AsyncStorage
- ✅ Navigation (Stack + Bottom Tabs)
- ✅ Loading, error, and empty states
- ✅ Clean UI/UX
- ✅ 2 tests (1 unit, 1 component)
- ✅ Bonus features (search, pull-to-refresh)
