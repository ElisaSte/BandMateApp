import MusicianProfile from "@/components/musician-profile";
import type { Musician } from "@/data/musician";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

export default function Profile() {
  const resetOnboarding = async () => {
    await AsyncStorage.removeItem("onboardingCompleted");
  };

  const [musician, setMusician] = useState<Musician | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const savedProfile = await AsyncStorage.getItem("currentMusician");

      if (savedProfile) {
        const parsedProfile: Musician = JSON.parse(savedProfile);
        setMusician(parsedProfile);
      }
    };

    loadProfile();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Profile</Text>

      {musician && <MusicianProfile musician={musician} />}

      {/* Temporary development button */}
      <Pressable style={styles.resetButton} onPress={resetOnboarding}>
        <Text style={styles.resetButtonText}>Reset onboarding</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#362323",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 32,
    textAlign: "center",
    marginBottom: 25,
  },

  resetButton: {
    marginTop: 20,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  resetButtonText: {
    color: "#6f6868",
    fontSize: 13,
  },
});
