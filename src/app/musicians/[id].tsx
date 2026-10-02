import MusicianProfile from "@/components/musician-profile";
import { musicians } from "@/data/musicians";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <MusicianProfile musician={musician} />
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
});
