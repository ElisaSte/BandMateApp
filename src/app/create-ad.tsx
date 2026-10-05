import { useAds } from "@/context/ad-context";
import { useProfile } from "@/context/profile-context";
import { Ad } from "@/data/ad";
import type { InstrumentType } from "@/data/instrument";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function CreateAd() {
  const { profile } = useProfile();
  const { addAd } = useAds();

  const [title, setTitle] = useState("");
  const [lookingFor, setLookingFor] = useState<InstrumentType>("Guitar");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState("");

  const handleCreateAd = async () => {
    if (!title.trim()) {
      setError("Please enter a title");
      return;
    }

    if (!description.trim()) {
      setError("Please enter a description");
      return;
    }

    const savedProfile = await AsyncStorage.getItem("currentMusician");

    if (!savedProfile) {
      setError("Could not load your profile");
      return;
    }

    const currentMusician = JSON.parse(savedProfile);

    const newAd: Ad = {
      id: Date.now(),
      musician: currentMusician,
      title: title.trim(),
      lookingFor,
      description: description.trim(),
      date: new Date().toISOString(),
      isActive,
    };

    await addAd(newAd);

    router.replace("/ads");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Create an ad</Text>

          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="What are you looking for?"
            placeholderTextColor="#6f6868"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Looking for</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={lookingFor}
              onValueChange={(value) => setLookingFor(value as InstrumentType)}
            >
              <Picker.Item label="Guitar" value="Guitar" />
              <Picker.Item label="Bass" value="Bass" />
              <Picker.Item label="Drums" value="Drums" />
              <Picker.Item label="Vocals" value="Vocals" />
              <Picker.Item label="Keyboard" value="Keyboard" />
            </Picker>
          </View>

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Tell other musicians about your project..."
            placeholderTextColor="#6f6868"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />

          <View style={styles.activeRow}>
            <View>
              <Text style={styles.activeTitle}>Active ad</Text>
              <Text style={styles.activeDescription}>
                Other musicians can see and respond to this ad.
              </Text>
            </View>

            <Switch
              value={isActive}
              onValueChange={setIsActive}
              trackColor={{ false: "#6f6868", true: "#a39b9b" }}
              thumbColor="#362323"
            />
          </View>

          {error && <Text style={styles.error}>{error}</Text>}

          <Pressable style={styles.button} onPress={handleCreateAd}>
            <Text style={styles.buttonText}>Create ad</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#362323",
  },

  content: {
    flexGrow: 1,
    padding: 20,
  },

  title: {
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 25,
  },

  label: {
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 20,
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    backgroundColor: "#a39b9b",
    color: "#362323",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },

  descriptionInput: {
    minHeight: 140,
  },

  pickerContainer: {
    backgroundColor: "#a39b9b",
    borderRadius: 10,
    overflow: "hidden",
  },

  activeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    padding: 15,
    backgroundColor: "#4A3434",
    borderRadius: 10,
  },

  activeTitle: {
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 18,
  },

  activeDescription: {
    color: "#a39b9b",
    fontSize: 12,
    marginTop: 3,
    maxWidth: 250,
  },

  error: {
    color: "#a39b9b",
    fontSize: 15,
    marginTop: 15,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#a39b9b",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 20,
  },

  buttonText: {
    color: "#362323",
    fontFamily: "MetalMania",
    fontSize: 20,
    textAlign: "center",
  },
});
