import { StyleSheet, Text, View } from "react-native";
import type { Musician } from "../data/musician";

interface MusicianCardProps {
  musician: Musician;
}

export default function MusicianCard(musicianProp: MusicianCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{musicianProp.musician.name}</Text>
      <Text>{musicianProp.musician.city}</Text>
      <Text>
        {musicianProp.musician.instruments
          .map((instrument) => instrument.name)
          .join(", ")}
      </Text>
      <Text>{musicianProp.musician.genres.join(", ")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 12,
    backgroundColor: "#a39b9b",
    borderRadius: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
