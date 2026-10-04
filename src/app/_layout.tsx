import { ProfileProvider } from "@/context/profile-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkOnboarding = async () => {
      const completed = await AsyncStorage.getItem("onboardingCompleted");
      if (completed === "true") {
        router.replace("/(tabs)/find-musicians");
      } else {
        router.replace("/onboarding");
      }
      setLoading(false);
    };
    checkOnboarding();
  }, []);
  if (loading) {
    return null;
  }
  return (
    <ProfileProvider>
      <Stack>
        <Stack.Screen
          name="onboarding"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="musicians"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="chat"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ProfileProvider>
  );
}
