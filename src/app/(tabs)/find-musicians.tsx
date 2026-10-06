import MusicianCard from "@/components/musician-card";
import RecentMusicianCard from "@/components/recent-musician-card";
import type { InstrumentType } from "@/data/instrument";
import type { Musician } from "@/data/musician";
import { musicians } from "@/data/musicians";
import { filterMusicians } from "@/utils/filter-musicians";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function FindMusicians() {
  const [search, setSearch] = useState("");
  const [instrument, setInstrument] = useState<InstrumentType | "All">("All");
  const [nearMe, setNearMe] = useState(false);
  const [radius, setRadius] = useState<number | null>(10);
  const [currentMusician, setCurrentMusician] = useState<Musician | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const savedProfile = await AsyncStorage.getItem("currentMusician");

      if (savedProfile) {
        const parsedProfile: Musician = JSON.parse(savedProfile);
        setCurrentMusician(parsedProfile);
      }
    };

    loadProfile();
  }, []);

  const handleNearMe = () => {
    if (nearMe) {
      setNearMe(false);
      return;
    }

    if (!currentMusician) {
      return;
    }

    setNearMe(true);
  };
  const filteredMusicians = filterMusicians(
    musicians,
    search,
    instrument,
    nearMe,
    currentMusician,
    radius,
  );
  const latestMusicians = [...musicians]
    .sort((a, b) => b.registrationDate.localeCompare(a.registrationDate))
    .slice(0, 8);
  return (
    <View style={styles.root}>
      <FlatList
        data={filteredMusicians}
        keyExtractor={(musician) => musician.id.toString()}
        renderItem={({ item }) => <MusicianCard musician={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Our musicians</Text>

            <Text style={styles.text}>Latest musicians</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.latestContainer}
            >
              {latestMusicians.map((musician) => (
                <RecentMusicianCard key={musician.id} musician={musician} />
              ))}
            </ScrollView>

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

            <Pressable onPress={handleNearMe} style={styles.locationButton}>
              <Text style={styles.locationButtonText}>
                {nearMe ? "Show all" : "Near me"}
              </Text>
            </Pressable>

            {nearMe && currentMusician && (
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
          </>
        }
        ListEmptyComponent={
          <Text style={styles.noResults}>Oops! No musicians found.</Text>
        }
        contentContainerStyle={styles.listContent}
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
  listContent: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 40,
    color: "#a39b9b",
    padding: 10,
    marginTop: 10,
    fontFamily: "MetalMania",
  },
  text: {
    fontSize: 30,
    color: "#a39b9b",
    padding: 10,
    marginTop: 40,
    fontFamily: "MetalMania",
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
  radiusText: {
    color: "#a39b9b",
    fontSize: 18,
    fontFamily: "MetalMania",
    marginBottom: 6,
    marginTop: 5,
  },
  latestContainer: {
    paddingHorizontal: 8,
    paddingBottom: 10,
  },
});
