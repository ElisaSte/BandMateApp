import { Musician } from "@/data/musician";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import MusicianCard from "../../components/musician-card";
import { musicians } from "../../data/musicians";

export default function FindMusicians() {
  const [search, setSearch] = useState("");

  const musiciansByName: Musician[] = musicians.filter((m) =>
    m.name.toLowerCase().includes(search.toLocaleLowerCase()),
  );

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Filter</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name"
        value={search}
        onChangeText={setSearch}
      />
      <Text style={styles.text}>Our musicians</Text>
      <FlatList
        style={styles.list}
        data={musiciansByName.sort((a, b) =>
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
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
});
