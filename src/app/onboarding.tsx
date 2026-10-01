import {
  MetalMania_400Regular,
  useFonts,
} from "@expo-google-fonts/metal-mania";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Onboarding() {
  const [fontsLoaded] = useFonts({
    MetalMania: MetalMania_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  const completeOnboarding = async () => {
    await AsyncStorage.setItem("onboardingCompleted", "true");
    router.replace("/find-musicians");
  };
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
        onPress={() => router.push("/create-profile")}
      >
        <Text style={styles.buttonText}>Create your profile</Text>
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
    fontFamily: "MetalMania",
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
