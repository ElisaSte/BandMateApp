import MusicianCard from "@/components/musician-card";
import { musicians } from "@/data/musicians";
import {
  MetalMania_400Regular,
  useFonts,
} from "@expo-google-fonts/metal-mania";
import { router } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  const [fontsLoaded] = useFonts({
    MetalMania: MetalMania_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.root}>
      <FlatList
        style={styles.list}
        ListHeaderComponent={
          <>
            <Image
              style={styles.logo}
              source={require("../../../assets/bm/BandMatelogo.png")}
              resizeMode="contain"
            />

            <Text style={styles.description}>
              Find the perfect musicians for your band,
              {"\n"} connect with fellow artists,
              {"\n"}and turn your musical ideas
              {"\n"}into something real.
              {"\n"}🎸🎶
            </Text>
            <Pressable
              style={styles.button}
              onPress={() => router.push("/explore")}
            >
              <Text style={styles.buttonText}> Find musicians</Text>
            </Pressable>
            <Text style={styles.text}>Our new musicians:</Text>
          </>
        }
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
  text: {
    fontSize: 30,
    color: "#a39b9b",
    padding: 20,
    marginTop: 40,
    fontFamily: "MetalMania",
  },
  list: {
    width: "100%",
  },
});
