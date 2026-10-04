import AdCard from "@/components/ad-card";
import { ads } from "@/data/ads";
import type { InstrumentType } from "@/data/instrument";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Ads() {
  const [instrument, setInstrument] = useState<InstrumentType | "All">("All");

  const filteredAds = ads
    .filter((ad) => ad.isActive)
    .filter((ad) => {
      if (instrument === "All") {
        return true;
      }

      return ad.lookingFor === instrument;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Ads</Text>

        <Text style={styles.text}>Filter by instrument</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={instrument}
            onValueChange={(value) => setInstrument(value)}
          >
            <Picker.Item label="All instruments" value="All" />
            <Picker.Item label="Guitar" value="Guitar" />
            <Picker.Item label="Bass" value="Bass" />
            <Picker.Item label="Drums" value="Drums" />
            <Picker.Item label="Vocals" value="Vocals" />
            <Picker.Item label="Keyboard" value="Keyboard" />
          </Picker>
        </View>

        <Text style={styles.text}>Latest ads</Text>

        {filteredAds.length === 0 && (
          <Text style={styles.noResults}>No ads found.</Text>
        )}

        {filteredAds.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 12,
    backgroundColor: "#362323",
  },

  title: {
    fontSize: 30,
    color: "#a39b9b",
    padding: 20,
    marginTop: 40,
    fontFamily: "MetalMania",
    textAlign: "center",
  },

  text: {
    fontSize: 24,
    color: "#a39b9b",
    padding: 10,
    marginTop: 10,
    marginBottom: 5,
    fontFamily: "MetalMania",
  },

  pickerContainer: {
    backgroundColor: "#a39b9b",
    borderRadius: 8,
    marginBottom: 15,
    overflow: "hidden",
    width: "100%",
  },

  noResults: {
    color: "#a39b9b",
    fontSize: 18,
    fontFamily: "MetalMania",
    textAlign: "center",
    marginTop: 30,
  },
});
