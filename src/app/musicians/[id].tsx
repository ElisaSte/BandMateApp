import { musicians } from "@/data/musicians";
import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

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
    <View style={styles.container}>
      <Image source={musician.profilePic} style={styles.profilePic} />

      <Text style={styles.name}>
        {musician.name}, {musician.age}
      </Text>

      <Text style={styles.city}>{musician.city}</Text>

      <Text style={styles.sectionTitle}>Genres</Text>
      <Text style={styles.text}>{musician.genres.join(", ")}</Text>

      <Text style={styles.sectionTitle}>Instruments</Text>
      <Text style={styles.text}>
        {musician.instruments.map((instrument) => instrument.name).join(", ")}
      </Text>

      <Text style={styles.sectionTitle}>Experience</Text>
      <Text style={styles.text}>{musician.yearsOfExperience} years</Text>

      <Text style={styles.sectionTitle}>About</Text>
      <Text style={styles.text}>{musician.bio}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#362323",
    padding: 20,
    alignItems: "center",
    //justifyContent: "center",
  },
  profilePic: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 20,
  },
  name: {
    color: "#a39b9b",
    fontSize: 30,
    fontFamily: "MetalMania",
    textAlign: "center",
  },
  city: {
    color: "#a39b9b",
    fontSize: 18,
    marginTop: 5,
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#a39b9b",
    fontSize: 20,
    fontFamily: "MetalMania",
    marginTop: 15,
  },
  text: {
    color: "#a39b9b",
    fontSize: 16,
    textAlign: "center",
    marginTop: 5,
  },
  error: {
    color: "#a39b9b",
    fontSize: 24,
    fontFamily: "MetalMania",
  },
});
