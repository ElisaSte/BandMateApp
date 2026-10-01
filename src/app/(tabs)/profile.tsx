import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable, StyleSheet, Text, View } from "react-native";
export default function Profile() {
  const resetOnboarding = async () => {
    await AsyncStorage.removeItem("onboardingCompleted");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Pressable style={styles.button} onPress={resetOnboarding}>
        <Text style={styles.buttonText}>Reset onboarding</Text>
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
    padding: 20,
  },
  title: {
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 32,
    marginBottom: 30,
  },
  button: { backgroundColor: "#a39b9b", padding: 14, borderRadius: 8 },
  buttonText: { color: "#362323", fontFamily: "MetalMania", fontSize: 18 },
});
