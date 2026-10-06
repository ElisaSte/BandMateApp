import AdCard from "@/components/ad-card";
import MusicianProfile from "@/components/musician-profile";
import { useAds } from "@/context/ad-context";
import type { Musician } from "@/data/musician";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Profile() {
  const { ads } = useAds();
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

  const myAds = ads
    .filter((ad) => ad.musician.id === musician?.id)
    .sort((a, b) => b.date.localeCompare(a.date));

  const activeAds = myAds.filter((ad) => ad.isActive);
  const closedAds = myAds.filter((ad) => !ad.isActive);

  const resetOnboarding = async () => {
    await AsyncStorage.removeItem("onboardingCompleted");
    await AsyncStorage.removeItem("currentMusician");
    router.replace("/onboarding");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {musician && <MusicianProfile musician={musician} />}
      <View style={styles.adsHeader}>
        <Text style={styles.adsTitle}>My ads</Text>

        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/create-ad")}
        >
          <MaterialCommunityIcons name="plus" size={26} color="#362323" />
        </Pressable>
      </View>
      {activeAds.length > 0 && (
        <>
          <Text style={styles.adsSectionTitle}>Active</Text>

          {activeAds.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </>
      )}
      {closedAds.length > 0 && (
        <>
          <Text style={styles.adsSectionTitle}>Closed</Text>

          {closedAds.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </>
      )}
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

  adsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 35,
    marginBottom: 10,
  },

  adsTitle: {
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 28,
  },

  addButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#a39b9b",
    alignItems: "center",
    justifyContent: "center",
  },

  adsSectionTitle: {
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 21,
    marginTop: 10,
    marginBottom: 10,
  },
});
