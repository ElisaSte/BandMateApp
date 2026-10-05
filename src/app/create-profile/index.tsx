import { useProfile } from "@/context/profile-context";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function CreateProfile() {
  const { profile, setProfile } = useProfile();
  const [cityError, setCityError] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [usedLocation, setUsedLocation] = useState(false);

  const handleContinue = async () => {
    const city = profile.city.trim();
    if (usedLocation) {
      router.push("/create-profile/music");
      return;
    }

    try {
      const results = await Location.geocodeAsync(city);

      if (results.length === 0) {
        setCityError("City not found");
        return;
      }

      const { latitude, longitude } = results[0];

      setProfile((current) => ({
        ...current,
        city,
        latitude,
        longitude,
      }));

      setCityError("");

      router.push("/create-profile/music");
    } catch {
      setCityError("Could not verify city");
    }
  };
  const useCurrentLocation = async () => {
    setLoadingLocation(true);
    setCityError("");
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setCityError("Location permission is required");
      setLoadingLocation(false);
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({});

      const results = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      //console.log("Location:", location.coords);
      //console.log("Geocode result:", results);

      if (results.length === 0) {
        setCityError("Could not determine your city");
        setLoadingLocation(false);
        return;
      }

      const city = results[0].city ?? results[0].district;
      if (!city) {
        setCityError("Could not determine your city");
        setLoadingLocation(false);
        return;
      }

      setProfile((current) => ({
        ...current,
        city,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }));
      setUsedLocation(true);
      setLoadingLocation(false);
      setCityError("");
    } catch {
      setCityError("Could not get your location");
      setLoadingLocation(false);
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Create your profile</Text>
            <Text style={styles.title}>Step 1</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Your name"
              placeholderTextColor="#6f6868"
              value={profile.name}
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
              onChangeText={(text) => {
                setUsedLocation(false);

                setProfile((current) => ({
                  ...current,
                  city: text,
                  latitude: 0,
                  longitude: 0,
                }));
              }}
            />
            {(profile.latitude !== 0 || profile.longitude !== 0) && (
              <Text style={styles.detectedLocation}>
                Location detected: {profile.city}
              </Text>
            )}
            {cityError && <Text style={styles.error}>{cityError}</Text>}
            <Pressable
              style={styles.locationButton}
              onPress={useCurrentLocation}
              disabled={loadingLocation}
            >
              {loadingLocation ? (
                <View style={styles.loadingContent}>
                  <ActivityIndicator color="#a39b9b" />
                  <Text style={styles.locationButtonText}>
                    Finding your location...
                  </Text>
                </View>
              ) : (
                <Text style={styles.locationButtonText}>Use my location</Text>
              )}
            </Pressable>
            <Pressable style={styles.button} onPress={handleContinue}>
              <Text style={styles.buttonText}>Continue</Text>
            </Pressable>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  error: {
    color: "#a39b9b",
    marginTop: -15,
    marginBottom: 15,
  },
  locationButton: {
    backgroundColor: "#4A3434",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#a39b9b",
  },

  locationButtonText: {
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 17,
    textAlign: "center",
  },
  detectedLocation: {
    color: "#a39b9b",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  loadingContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  content: {
    flexGrow: 1,
  },
});
