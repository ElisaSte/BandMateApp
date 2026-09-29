import { Stack } from "expo-router";

export default function MusiciansLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "Musician",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#362323",
        },
        headerTintColor: "#a39b9b",
        headerTitleStyle: {
          fontFamily: "MetalMania",
          fontSize: 24,
        },
      }}
    />
  );
}
