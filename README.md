# BandMate

BandMate is a mobile application for musicians who want to find other musicians, connect with them, and discover opportunities to join or build a band.

The application was developed as an individual school assignment in the course **Applikationsutveckling (APP) SUVNET25**, using React Native, Expo and TypeScript.

## Description

BandMate is designed for musicians looking for people to play with.

Users can create their own musician profile with information such as name, age, city, instruments, genres, years of experience, a short biography and a profile picture.

The application allows users to:

* Search for musicians by name
* Filter musicians by instrument
* Find musicians within a selected distance
* Browse recently registered musicians
* View detailed musician profiles
* Start conversations with other musicians
* View a list of conversations
* Read and send mock messages
* Browse active musician advertisements
* Filter advertisements by instrument
* View full advertisement details
* Contact the musician who created an advertisement
* View active and closed advertisements on a musician's profile

## How to build and run the project

### 1. Clone the repository

```bash
git clone 
```

### 2. Navigate to the project folder

```bash
cd BandMateApp
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the Expo development server

```bash
npx expo start
```

### 5. Run the app in Expo Go

Install **Expo Go** on your mobile device and scan the QR code displayed by Expo.

The application can also be run using an Android emulator or an iOS simulator.

## React Native components used

### View

Used to structure and group content throughout the application.

### Text

Used for headings, labels, descriptions, buttons and other text content.

### Image

Used to display musician profile pictures and other images.

### Pressable

Used for interactive elements such as buttons, musician cards, conversation cards and advertisement cards.

### TextInput

Used for editable form fields, musician search and writing messages.

### ScrollView

Used for vertically scrollable pages and for horizontally scrolling through recently registered musicians.

### FlatList

Used to efficiently display lists of data, including messages and conversations.

### ActivityIndicator

Used to show loading feedback while the user's location is being retrieved.

## Expo SDK modules used

### expo-location

Used to request location permission, retrieve the device's current location, determine the user's city through reverse geocoding, and convert manually entered cities into coordinates. The coordinates are also used by the "Near me" feature.

### expo-image-picker

Used when creating a profile to allow the user to select a profile picture from the device gallery or take a new photo with the camera.

### expo-haptics

Used to provide haptic feedback when the user sends a message.

### expo-status-bar

Used to control the appearance of the device status bar. BandMate uses a light status bar style to fit the application's dark visual theme.

## Navigation

BandMate uses **Expo Router** for navigation.

The main navigation consists of four tabs:

* Musicians
* Messages
* Profile
* Ads

Additional screens are used for detailed musician profiles, individual conversations and advertisement details.

The application uses dynamic routes such as:

```text
/musicians/[id]
/chat/[id]
/ads/[id]
```

These screens use `useLocalSearchParams` to read the selected ID.

This allows users to navigate from lists to specific musicians, conversations and advertisements.

## Data and storage

The application uses mock data for musicians, advertisements, conversations and messages.

The user's own profile is stored locally using `AsyncStorage`.

There is currently no backend or Web API.

The messaging system is also a mock implementation. Messages are handled locally in the application and are not sent to another device or stored on a remote server.

## Additional external React Native module

The project also uses:

### @react-native-picker/picker

Used for dropdown selections such as instrument filters and search radius.

## AI usage

AI tools were used as a development aid throughout the project.

One of the main uses of AI was to help understand **React Native and Expo**, especially when working with concepts that were new to me. AI was also useful for discovering and understanding React Native components and Expo modules that could be relevant to the application's functionality.

AI was also used during troubleshooting and debugging. When something did not work as expected, such as routing, keyboard handling, location handling or component behaviour, AI was used to help identify possible causes and suggest solutions. The proposed solutions were then tested in the application and adjusted when necessary.

Another important use of AI was **brainstorming and planning**. It was used to discuss ideas for the application's structure, features, navigation and UI, and to evaluate different ways of implementing them before writing the code.

AI was used more extensively when developing the **messaging functionality**. This included brainstorming the structure of conversations and messages, planning the navigation between conversations and chats, designing the mock messaging flow, and troubleshooting the different parts of the chat implementation.

The AI-generated suggestions were not accepted without verification. The code was tested continuously during development, both in an emulator and on a physical Android device. Errors and unexpected behaviour were investigated and corrected during the development process.

The use of AI was therefore mainly as a learning, problem-solving and development support tool, while the resulting code was reviewed, tested and adapted as part of the development process.

## Project structure

```text
src/
├── app/
│   ├── (tabs)/
│   │   ├── find-musicians.tsx
│   │   ├── messages.tsx
│   │   ├── profile.tsx
│   │   └── ads.tsx
│   │
│   ├── musicians/
│   │   └── [id].tsx
│   │
│   ├── chat/
│   │   └── [id].tsx
│   │
│   ├── ads/
│   │   └── [id].tsx
│   │
│   └── ...
│
├── components/
│   ├── musician-card.tsx
│   ├── recent-musician-card.tsx
│   ├── musician-profile.tsx
│   ├── conversation-card.tsx
│   └── ad-card.tsx
│
├── data/
│   ├── musician.ts
│   ├── musicians.ts
│   ├── instrument.ts
│   ├── message.ts
│   ├── conversation.ts
│   ├── conversations.ts
│   ├── ad.ts
│   └── ads.ts
│
└── context/
    └── profile-context.tsx
```

## Requirements checklist

### Pass requirements (G)

* [x] At least 4 React Native components are used
* [x] At least 4 Expo SDK modules are used
* [x] The used React Native components and Expo SDK modules are documented in this README
* [x] Expo Router is used for navigation
* [x] At least one screen receives a parameter through a dynamic route
* [x] Git and GitHub have been used throughout development
* [x] The project contains a README.md
* [x] The project has been submitted on time
* [ ] The oral presentation has been completed

### Pass with distinction requirements (VG)

* [x] An additional external React Native module is used: `@react-native-picker/picker`
* [ ] The application retrieves data from a Web API
* [x] The use of AI tools is documented in this README

## Limitations

BandMate currently uses mock data and does not have a backend or Web API.

The messaging system is therefore simulated locally. Messages can be sent and displayed within the current chat, but they are not synchronized between different devices or users.

The application is intended to demonstrate React Native, Expo, TypeScript, navigation, reusable components and mobile device functionality.


