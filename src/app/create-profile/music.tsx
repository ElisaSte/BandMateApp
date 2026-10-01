import { Genre } from "@/data/genre";
import type { InstrumentType } from "@/data/instrument";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function MusicProfile() {
  const instruments: InstrumentType[] = [
    "Guitar",
    "Bass",
    "Drums",
    "Vocals",
    "Keyboard",
  ];
  const [selectedInstruments, setSelectedInstruments] = useState<
    InstrumentType[]
  >([]);
  const toggleInstrument = (instrument: InstrumentType) => {
    if (selectedInstruments.includes(instrument)) {
      setSelectedInstruments(
        selectedInstruments.filter((i) => i !== instrument),
      );
    } else {
      setSelectedInstruments([...selectedInstruments, instrument]);
    }
  };

  const genres: Genre[] = [
    "Metal",
    "Rock",
    "Alternative",
    "Punk",
    "Pop",
    "Jazz",
    "Blues",
    "Electronic",
    "Indie",
    "Classical",
  ];
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const toggleGenre = (genre: Genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Instruments</Text>
      <View style={styles.inputContainer}>
        {instruments.map((instrument) => (
          <Pressable
            key={instrument}
            style={[
              styles.inputButton,
              selectedInstruments.includes(instrument) && styles.selected,
            ]}
            onPress={() => toggleInstrument(instrument)}
          >
            <Text style={styles.text}>{instrument}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Genres</Text>
      <View style={styles.inputContainer}>
        {genres.map((g) => (
          <Pressable
            key={g}
            style={[
              styles.inputButton,
              selectedGenres.includes(g) && styles.selected,
            ]}
            onPress={() => toggleGenre(g)}
          >
            <Text style={styles.text}>{g}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Years of experience</Text>
      <TextInput
        style={styles.input}
        placeholder="Years"
        placeholderTextColor="#6f6868"
        keyboardType="numeric"
      />

      <Text style={styles.label}>About you</Text>
      <TextInput
        style={[styles.input, styles.bioInput]}
        placeholder="Tell other musicians about yourself..."
        placeholderTextColor="#6f6868"
        multiline
      />

      <Pressable
        style={styles.button}
        onPress={() => router.push("/create-profile/photo")}
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

  bioInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#a39b9b",
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },

  buttonText: {
    color: "#362323",
    fontFamily: "MetalMania",
    fontSize: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },

  inputButton: {
    backgroundColor: "#a39b9b",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },

  selected: {
    backgroundColor: "#6f6868",
  },

  text: {
    color: "#362323",
    fontSize: 16,
  },
});
