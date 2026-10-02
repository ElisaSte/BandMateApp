import type { Musician } from "@/data/musician";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface RecentMusicianCardProps {
  musician: Musician;
}

export default function RecentMusicianCard({
  musician,
}: RecentMusicianCardProps) {
  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        router.push(`/musicians/${musician.id}`);
      }}
    >
      {musician.profilePic ? (
        <Image
          source={
            typeof musician.profilePic === "string"
              ? { uri: musician.profilePic }
              : musician.profilePic
          }
          style={styles.profilePic}
        />
      ) : (
        <View style={styles.profilePicPlaceholder}>
          <MaterialCommunityIcons name="account" size={40} color="#362323" />
        </View>
      )}

      <Text style={styles.name} numberOfLines={1}>
        {musician.name}
      </Text>

      <Text style={styles.city} numberOfLines={1}>
        {musician.city}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: {
    width: 130,
    backgroundColor: "#4A3434",
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
    alignItems: "center",
  },

  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },

  profilePicPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#a39b9b",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  name: {
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 18,
    textAlign: "center",
    width: "100%",
  },

  city: {
    color: "#a39b9b",
    fontSize: 13,
    marginTop: 3,
    textAlign: "center",
    width: "100%",
  },
});
