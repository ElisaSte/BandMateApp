import type { Musician } from "@/data/musician";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";

interface MusicianProfileProps {
  musician: Musician;
}

export default function MusicianProfile({ musician }: MusicianProfileProps) {
  return (
    <View style={styles.profileCard}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          {musician.profilePic ? (
            <Image
              source={
                typeof musician.profilePic === "string"
                  ? { uri: musician.profilePic }
                  : musician.profilePic
              }
              style={styles.profileImage}
            />
          ) : (
            <MaterialCommunityIcons name="account" size={70} color="#362323" />
          )}
        </View>

        <View style={styles.basicInfo}>
          <Text style={styles.name}>
            {musician.name}, {musician.age}
          </Text>

          <View style={styles.cityContainer}>
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={20}
              color="#a39b9b"
            />
            <Text style={styles.city}>{musician.city}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instruments</Text>

        <View style={styles.tagsContainer}>
          {musician.instruments.map((instrument) => (
            <View key={instrument.id} style={styles.tag}>
              <Text style={styles.tagText}>{instrument.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Genres</Text>

        <View style={styles.tagsContainer}>
          {musician.genres.map((genre) => (
            <View key={genre} style={styles.tag}>
              <Text style={styles.tagText}>{genre}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>

        <View style={styles.experienceContainer}>
          <MaterialCommunityIcons
            name="music-circle-outline"
            size={24}
            color="#a39b9b"
          />

          <Text style={styles.info}>{musician.yearsOfExperience} years</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>

        <Text style={styles.bio}>{musician.bio}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: "#4A3434",
    borderRadius: 20,
    padding: 20,
  },

  profileHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  profileImageContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#a39b9b",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  profileImage: {
    width: "100%",
    height: "100%",
  },

  basicInfo: {
    flex: 1,
    marginLeft: 20,
  },

  name: {
    color: "#a39b9b",
    fontSize: 30,
    fontFamily: "MetalMania",
  },

  cityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 5,
  },

  city: {
    color: "#a39b9b",
    fontSize: 17,
  },

  section: {
    width: "100%",
    marginTop: 25,
  },

  sectionTitle: {
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 21,
    marginBottom: 10,
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  tag: {
    backgroundColor: "#a39b9b",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  tagText: {
    color: "#362323",
    fontSize: 15,
  },

  experienceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  info: {
    color: "#a39b9b",
    fontSize: 16,
  },

  bio: {
    color: "#a39b9b",
    fontSize: 16,
    lineHeight: 24,
  },
});
