import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function ProfilePhoto() {
  const [image, setImage] = useState<string | null>(null);
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    //if user close gallery and doesn't choose a pic
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile picture</Text>

      <Text style={styles.description}>
        Last step! Add a profile picture so other musicians can recognize you.
      </Text>
      <View style={styles.profileImageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <MaterialCommunityIcons name="account" size={70} color="#362323" />
        )}
      </View>

      <Pressable style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Choose from gallery</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>Take a photo</Text>
      </Pressable>

      <Pressable
        style={styles.skipButton}
        onPress={() => router.push("/(tabs)")}
      >
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#362323",
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 30,
    color: "#a39b9b",
    fontFamily: "MetalMania",
    textAlign: "center",
    marginBottom: 20,
  },

  description: {
    color: "#a39b9b",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#a39b9b",
    padding: 14,
    borderRadius: 8,
    marginBottom: 15,
  },

  buttonText: {
    color: "#362323",
    fontFamily: "MetalMania",
    fontSize: 18,
    textAlign: "center",
  },

  skipButton: {
    padding: 14,
    marginTop: 10,
  },

  skipText: {
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 18,
    textAlign: "center",
  },
  profileImageContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#a39b9b",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    overflow: "hidden",
  },

  profileImage: {
    width: "100%",
    height: "100%",
  },

  placeholder: {
    fontSize: 60,
  },
});
