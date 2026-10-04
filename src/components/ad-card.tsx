import type { Ad } from "@/data/ad";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface AdCardProps {
  ad: Ad;
}

export default function AdCard({ ad }: AdCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString([], {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        router.push({
          pathname: "/ads/[id]",
          params: {
            id: ad.id.toString(),
          },
        });
      }}
    >
      <Image
        source={
          typeof ad.musician.profilePic === "string"
            ? { uri: ad.musician.profilePic }
            : ad.musician.profilePic
        }
        style={styles.profilePic}
      />

      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>
            {ad.musician.name}
          </Text>

          <Text style={styles.date}>{formatDate(ad.date)}</Text>
        </View>

        <Text style={styles.title} numberOfLines={1}>
          {ad.title}
        </Text>

        <Text style={styles.lookingFor}>Looking for: {ad.lookingFor}</Text>

        <Text style={styles.description} numberOfLines={2}>
          {ad.description}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#4A3434",
    borderRadius: 15,
    padding: 12,
    marginBottom: 10,
  },

  profilePic: {
    width: 65,
    height: 65,
    borderRadius: 33,
  },

  info: {
    flex: 1,
    marginLeft: 15,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  name: {
    flex: 1,
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 19,
  },

  date: {
    color: "#a39b9b",
    fontSize: 12,
    marginLeft: 10,
  },

  title: {
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 17,
    marginTop: 4,
  },

  lookingFor: {
    color: "#a39b9b",
    fontSize: 13,
    marginTop: 3,
  },

  description: {
    color: "#a39b9b",
    fontSize: 14,
    marginTop: 5,
  },
});
