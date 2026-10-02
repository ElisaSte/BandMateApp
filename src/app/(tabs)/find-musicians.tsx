import { InstrumentType } from "@/data/instrument";
import { Musician } from "@/data/musician";
import { calculateDistance } from "@/utils/distance";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import MusicianCard from "../../components/musician-card";
import { musicians } from "../../data/musicians";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function FindMusicians() {
  const [search, setSearch] = useState("");
  const [instrument, setInstrument] = useState<InstrumentType | "All">("All");
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [radius, setRadius] = useState<number | null>(10);

  const getLocation = async () => {
    //ask phone to use position
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return;
    }

    //if user accept, get location
    const currentLocation = await Location.getCurrentPositionAsync({});
    console.log("LOCATION:", currentLocation);
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
    if (location && radius !== null) {
      const distance = calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        m.latitude,
        m.longitude,
      );

      if (distance > radius) {
        return false;
      }
    }

    return true;
  });

  return (
    <View style={styles.root}>
      <ScrollView>
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
          <View style={styles.pickerContainer}>
            <Text style={styles.radiusText}>Search radius</Text>
            <Picker
              selectedValue={radius}
              onValueChange={(value) => setRadius(value)}
            >
              <Picker.Item label="5 km" value={5} />
              <Picker.Item label="10 km" value={10} />
              <Picker.Item label="15 km" value={15} />
              <Picker.Item label="20 km" value={20} />
              <Picker.Item label="25 km" value={25} />
              <Picker.Item label="30 km" value={30} />
              <Picker.Item label="35 km" value={35} />
              <Picker.Item label="40 km" value={40} />
              <Picker.Item label="45 km" value={45} />
              <Picker.Item label="50 km" value={50} />
              <Picker.Item label="100 km" value={100} />
              <Picker.Item label="remove filter" value={null} />
            </Picker>
          </View>
        )}

        <Text style={styles.text}>Our musicians</Text>
        {filteredMusicians.length === 0 && (
          <Text style={styles.noResults}>Oops! No musicians found.</Text>
        )}

        {filteredMusicians
          .sort((a, b) => b.registrationDate.localeCompare(a.registrationDate))
          .map((musician) => (
            <MusicianCard key={musician.id} musician={musician} />
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
  radiusText: {
    color: "#a39b9b",
    fontSize: 18,
    fontFamily: "MetalMania",
    marginBottom: 6,
    marginTop: 5,
  },
});
