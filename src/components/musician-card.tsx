import { Image, StyleSheet, Text, View } from "react-native";
import type { Musician } from "../data/musician";

interface MusicianCardProps {
  musician: Musician;
}

export default function MusicianCard(musicianProp: MusicianCardProps) {
  return (
    <View style={styles.card}>
      <Image
        source={musicianProp.musician.profilePic}
        style={styles.profilePic}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{musicianProp.musician.name}</Text>
        <Text>{musicianProp.musician.city}</Text>
        <Text>
          {musicianProp.musician.instruments
            .map((instrument) => instrument.name)
            .join(", ")}
        </Text>
        <Text>{musicianProp.musician.genres.join(", ")}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 12,
    backgroundColor: "#a39b9b",
    borderRadius: 8,
  },
  name: {
    fontSize: 22,
    fontFamily: "MetalMania",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 15,
  },
});
