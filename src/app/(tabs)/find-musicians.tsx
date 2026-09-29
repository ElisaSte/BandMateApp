import { FlatList, StyleSheet, Text, View } from "react-native";
import MusicianCard from "../../components/musician-card";
import { musicians } from "../../data/musicians";

export default function FindMusicians() {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Our new musicians:</Text>
      <FlatList
        style={styles.list}
        data={musicians
          .sort((a, b) => b.registrationDate.localeCompare(a.registrationDate))
          .slice(0, 8)}
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
});
