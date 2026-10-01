import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Onboarding() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bm/BandMatelogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Find your bandmates</Text>

      <Text style={styles.description}>
        BandMate helps you find musicians, connect with people near you, and
        find the right people to create music together.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/(tabs)/profile")}
      >
        <Text style={styles.buttonText}>Create your profile</Text>
      </Pressable>

      <Pressable
        style={styles.secondaryButton}
        onPress={() => router.replace("/(tabs)")}
      >
        <Text style={styles.secondaryButtonText}>Explore musicians</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#362323",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  logo: {
    width: "90%",
    height: 250,
    marginBottom: 20,
  },
  title: {
    color: "#a39b9b",
    fontSize: 32,
    fontFamily: "MetalMania",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    color: "#a39b9b",
    fontSize: 17,
    lineHeight: 25,
    textAlign: "center",
    marginBottom: 35,
  },
  button: {
    backgroundColor: "#a39b9b",
    width: "100%",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: "#362323",
    fontFamily: "MetalMania",
    fontSize: 19,
    textAlign: "center",
  },
  secondaryButton: {
    padding: 12,
  },
  secondaryButtonText: {
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 17,
    textAlign: "center",
  },
});
