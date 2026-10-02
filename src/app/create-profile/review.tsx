import { useProfile } from "@/context/profile-context";
import type { Musician } from "@/data/musician";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function ReviewProfile() {
  const { profile } = useProfile();

  const createProfile = async () => {
    const musician: Musician = {
      id: Date.now(),
      name: profile.name,
      age: profile.age,
      city: profile.city,
      instruments: profile.instruments.map((name, index) => ({
        id: index + 1,
        name: name,
      })),
      registrationDate: new Date().toISOString(),
      latitude: profile.latitude,
      longitude: profile.longitude,
      yearsOfExperience: profile.yearsOfExperience,
      genres: profile.genres,
      profilePic: profile.profilePic,
      bio: profile.bio,
    };
    await AsyncStorage.setItem("currentMusician", JSON.stringify(musician));
    await AsyncStorage.setItem("onboardingCompleted", "true");

    router.replace("/(tabs)/find-musicians");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review your profile</Text>

      <View style={styles.profileImageContainer}>
        {profile.profilePic ? (
          <Image
            source={{ uri: profile.profilePic }}
            style={styles.profileImage}
          />
        ) : (
          <MaterialCommunityIcons name="account" size={70} color="#362323" />
        )}
      </View>

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

      <Pressable style={styles.button} onPress={createProfile}>
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
  profileImageContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#a39b9b",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    overflow: "hidden",
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
