import { InstrumentType } from "@/data/instrument";
import { Musician } from "@/data/musician";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import MusicianCard from "../../components/musician-card";
import { musicians } from "../../data/musicians";

export default function FindMusicians() {
  const [search, setSearch] = useState("");
  const [instrument, setInstrument] = useState<InstrumentType | "All">("All");
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );

  const getLocation = async () => {
    //ask phone to use position
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return;
    }

    //if user accept, get location
    const currentLocation = await Location.getCurrentPositionAsync({});

    setLocation(currentLocation);
  };

  const filteredMusicians: Musician[] = musicians.filter((m) => {
    if (!m.name.toLowerCase().includes(search.toLowerCase())) {
      //excludes musicians who´s name doesn´t include the search
      return false;
    }

    if (
      instrument !== "All" &&
      !m.instruments.some((i) => i.name === instrument)
    ) {
      //excludes musician that doesn't have the selected instrument in the instrument list
      return false;
    }

    return true;
  });

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Filter</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name"
        value={search}
        onChangeText={setSearch}
      />
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
      <Pressable onPress={getLocation} style={styles.locationButton}>
        <Text style={styles.locationButtonText}>Near me</Text>
      </Pressable>
      {location && (
        <Text style={styles.locationText}>
          📍 {location.coords.latitude}, {location.coords.longitude}
        </Text>
      )}
      <Text style={styles.text}>Our musicians</Text>
      {filteredMusicians.length === 0 && (
        <Text style={styles.noResults}>Oops! No musicians found.</Text>
      )}

      <FlatList
        style={styles.list}
        data={filteredMusicians.sort((a, b) =>
          b.registrationDate.localeCompare(a.registrationDate),
        )}
        keyExtractor={(m) => m.id.toString()}
        renderItem={({ item }) => <MusicianCard musician={item} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 12,
    backgroundColor: "#362323",
  },
  text: {
    fontSize: 30,
    color: "#a39b9b",
    padding: 20,
    marginTop: 40,
    fontFamily: "MetalMania",
  },
  button: {
    backgroundColor: "#a39b9b",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 60,
  },
  buttonText: {
    color: "#362323",
    fontSize: 18,
    fontFamily: "MetalMania",
  },
  list: {
    width: "100%",
    flex: 1,
  },
  searchInput: {
    backgroundColor: "#a39b9b",
    color: "#362323",
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
    width: "100%",
  },
  pickerContainer: {
    backgroundColor: "#a39b9b",
    borderRadius: 8,
    marginBottom: 10,
    overflow: "hidden",
    width: "100%",
  },
  noResults: {
    color: "#a39b9b",
    fontSize: 20,
    fontFamily: "MetalMania",
    textAlign: "center",
    marginTop: 30,
  },
  locationButton: {
    backgroundColor: "#a39b9b",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
    marginTop: 5,
  },

  locationButtonText: {
    color: "#362323",
    fontFamily: "MetalMania",
    fontSize: 18,
    textAlign: "center",
  },
  locationText: {
    color: "#a39b9b",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
});
