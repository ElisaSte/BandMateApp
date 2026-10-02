import { useProfile } from "@/context/profile-context";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function ReviewProfile() {
  const { profile } = useProfile();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review your profile</Text>

      {profile.profilePic && (
        <Image
          source={{ uri: profile.profilePic }}
          style={styles.profileImage}
        />
      )}

      <Text style={styles.name}>{profile.name}</Text>

      <Text style={styles.info}>Age: {profile.age}</Text>
      <Text style={styles.info}>City: {profile.city}</Text>

      <Text style={styles.info}>
        Instruments: {profile.instruments.join(", ")}
      </Text>

      <Text style={styles.info}>Genres: {profile.genres.join(", ")}</Text>

      <Text style={styles.info}>
        Experience: {profile.yearsOfExperience} years
      </Text>

      <Text style={styles.bio}>{profile.bio}</Text>

      <Pressable style={styles.button} onPress={() => router.push("/(tabs)")}>
        <Text style={styles.buttonText}>Create profile</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#362323",
    padding: 20,
  },

  title: {
    fontSize: 30,
    color: "#a39b9b",
    fontFamily: "MetalMania",
    textAlign: "center",
    marginBottom: 30,
  },

  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignSelf: "center",
    marginBottom: 20,
  },

  name: {
    color: "#a39b9b",
    fontSize: 26,
    fontFamily: "MetalMania",
    textAlign: "center",
    marginBottom: 20,
  },

  info: {
    color: "#a39b9b",
    fontSize: 16,
    marginBottom: 10,
  },

  bio: {
    color: "#a39b9b",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#a39b9b",
    padding: 14,
    borderRadius: 8,
  },

  buttonText: {
    color: "#362323",
    fontFamily: "MetalMania",
    fontSize: 20,
    textAlign: "center",
  },
});
