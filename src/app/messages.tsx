import { conversations } from "@/data/conversations";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Messages() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>

      <FlatList
        data={conversations}
        keyExtractor={(conversation) => conversation.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.musician.name}</Text>
            <Text>{item.messages[item.messages.length - 1]?.text}</Text>
          </View>
        )}
      />
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
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
  },
});
