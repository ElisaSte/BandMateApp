import AdCard from "@/components/ad-card";
import MusicianProfile from "@/components/musician-profile";
import { ads } from "@/data/ads";
import { musicians } from "@/data/musicians";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function MusicianDetails() {
  const { id } = useLocalSearchParams();

  const musician = musicians.find((m) => m.id === Number(id));

  if (!musician) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Musician not found</Text>
      </View>
    );
  }
  const musicianAds = ads.filter((ad) => ad.musician.id === musician.id);

  const activeAds = musicianAds
    .filter((ad) => ad.isActive)
    .sort((a, b) => b.date.localeCompare(a.date));

  const closedAds = musicianAds
    .filter((ad) => !ad.isActive)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <MusicianProfile musician={musician} />
      <Pressable
        style={styles.messageButton}
        onPress={() => {
          router.push({
            pathname: "/chat/[id]",
            params: { id: musician.id.toString() },
          });
        }}
      >
        <Text style={styles.messageButtonText}>Message</Text>
      </Pressable>
      <Text style={styles.adsTitle}>My ads</Text>

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

  error: {
    color: "#a39b9b",
    fontSize: 20,
    textAlign: "center",
  },
  messageButton: {
    backgroundColor: "#a39b9b",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  messageButtonText: {
    color: "#362323",
    fontFamily: "MetalMania",
    fontSize: 20,
    textAlign: "center",
  },
  adsTitle: {
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 28,
    marginTop: 35,
    marginBottom: 10,
  },

  adsSectionTitle: {
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 21,
    marginTop: 10,
    marginBottom: 10,
  },
});
