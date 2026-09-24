import { FlatList, StyleSheet, Text, View } from "react-native";
import { musicians } from "../../data/musicians";

export default function Musicians() {
  return (
    <View style={styles.root}>
      <Text>Our new musicians:</Text>
      <FlatList
        data={musicians
          .sort((a, b) => b.registrationDate.localeCompare(a.registrationDate))
          .slice(0, 20)}
        keyExtractor={(m) => m.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "#362323",
  },
  logo: {
    width: "90%",
    height: 200,
  },
  description: {
    textAlign: "center",
    fontSize: 30,
    color: "#a39b9b",
    fontFamily: "MetalMania",
    marginTop: 30,
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
});
