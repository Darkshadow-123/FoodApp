# Food App

A React Native mobile application for browsing food items from a mock API, viewing details, and saving favorites.

## Tech Stack

- **React Native CLI** (0.83.1)
- **TypeScript**
- **React Navigation** (Stack + Bottom Tabs)
- **AsyncStorage** (favorites persistence)
- **Jest** + **React Native Testing Library**

## Features

- Home screen with food items list
- Detailed view for each food item
- Favorites management with AsyncStorage persistence
- Search functionality
- Pull-to-refresh
- Loading, error, and empty states

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Android Studio or Xcode
- React Native CLI
- Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide

### Installation

```bash
npm install
```

### Running the App

#### Start Metro

```bash
npm start
```

#### Android

```bash
npm run android
```

#### iOS

For iOS, install CocoaPods dependencies first:

```bash
cd ios && pod install && cd ..
```

Then run:

```bash
npm run ios
```

### Running Tests

```bash
npm test
```

## Project Structure

```
FoodApp/
├── src/
│   ├── api/           # API service
│   ├── components/    # Reusable UI components
│   ├── context/       # Context providers
│   ├── navigation/    # Navigation setup
│   ├── screens/       # Screen components
│   ├── types/         # TypeScript types
│   └── utils/         # Utility functions
├── __tests__/         # Test files
└── App.tsx            # Root component
```

## API

The app fetches food items from:
```
https://api.jsonbin.io/v3/b/698184b543b1c97be96155bf
```

## Screens

1. **Home** - List of all food items with search and pull-to-refresh
2. **Details** - Detailed view of a food item
3. **Favorites** - List of favorited food items

## License

This project was created as part of a React Native assignment.
