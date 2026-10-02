import { useProfile } from "@/context/profile-context";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function CreateProfile() {
  const { profile, setProfile } = useProfile();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your profile</Text>
      <Text style={styles.title}>Step 1</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Your name"
        placeholderTextColor="#6f6868"
        value={profile.name}
        //when user writes, update name in context (take current profile like it is and change name with text)
        onChangeText={(text) =>
          setProfile((current) => ({
            ...current,
            name: text,
          }))
        }
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Your age"
        placeholderTextColor="#6f6868"
        keyboardType="numeric"
        //if profile.age is 0 (as default) return "", else return profile age to string (because <Text>)
        value={profile.age === 0 ? "" : profile.age.toString()}
        onChangeText={(text) =>
          setProfile((current) => ({
            ...current,
            age: Number(text),
          }))
        }
      />

      <Text style={styles.label}>City</Text>
      <TextInput
        style={styles.input}
        placeholder="Where are you based?"
        placeholderTextColor="#6f6868"
        value={profile.city}
        onChangeText={(text) =>
          setProfile((current) => ({
            ...current,
            city: text,
          }))
        }
      />

      <Pressable
        style={styles.button}
        onPress={() => router.push("/create-profile/music")}
      >
        <Text style={styles.buttonText}>Continue</Text>
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
    marginBottom: 40,
    marginTop: 30,
  },

  label: {
    color: "#a39b9b",
    fontSize: 18,
    fontFamily: "MetalMania",
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#a39b9b",
    color: "#362323",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#a39b9b",
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },

  buttonText: {
    color: "#362323",
    fontFamily: "MetalMania",
    fontSize: 20,
    textAlign: "center",
  },
});
