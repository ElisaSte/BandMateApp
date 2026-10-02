import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import type { Musician } from "../data/musician";

interface MusicianCardProps {
  musician: Musician;
}

export default function MusicianCard(musicianProp: MusicianCardProps) {
  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.push({
          pathname: "/musicians/[id]",
          params: {
            id: musicianProp.musician.id.toString(),
          },
        });
      }}
    >
      <Image
        source={
          typeof musicianProp.musician.profilePic === "string"
            ? { uri: musicianProp.musician.profilePic }
            : musicianProp.musician.profilePic
        }
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
    </Pressable>
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
  profilePicPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: "#6f6868",
    alignItems: "center",
    justifyContent: "center",
  },
});
