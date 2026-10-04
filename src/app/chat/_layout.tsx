import { Stack } from "expo-router";
import { Image } from "react-native";

export default function ChatLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",

        headerStyle: {
          backgroundColor: "#362323",
        },

        headerTintColor: "#a39b9b",

        headerTitle: () => (
          <Image
            source={require("@/assets/bm/BandMatelogo.png")}
            style={{
              width: 120,
              height: 55,
            }}
            resizeMode="contain"
          />
        ),
      }}
    />
  );
}
