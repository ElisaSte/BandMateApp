import { ads } from "@/data/ads";
import { router, useLocalSearchParams } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function AdDetails() {
  const { id } = useLocalSearchParams();

  const ad = ads.find((ad) => ad.id === Number(id));

  if (!ad) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Ad not found</Text>
      </View>
    );
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString([], {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Pressable
        style={styles.author}
        onPress={() => {
          router.push({
            pathname: "/musicians/[id]",
            params: {
              id: ad.musician.id.toString(),
            },
          });
        }}
      >
        <Image
          source={
            typeof ad.musician.profilePic === "string"
              ? { uri: ad.musician.profilePic }
              : ad.musician.profilePic
          }
          style={styles.profilePic}
        />

        <View>
          <Text style={styles.authorName}>{ad.musician.name}</Text>

          <Text style={styles.city}>{ad.musician.city}</Text>
        </View>
      </Pressable>

      <Text style={styles.title}>{ad.title}</Text>

      <Text style={styles.date}>Posted {formatDate(ad.date)}</Text>

      <View style={styles.instrumentContainer}>
        <Text style={styles.instrumentLabel}>Looking for</Text>

        <Text style={styles.instrument}>{ad.lookingFor}</Text>
      </View>

      <Text style={styles.description}>{ad.description}</Text>

      {ad.isActive ? (
        <Pressable
          style={styles.messageButton}
          onPress={() => {
            router.push({
              pathname: "/chat/[id]",
              params: {
                id: ad.musician.id.toString(),
              },
            });
          }}
        >
          <Text style={styles.messageButtonText}>
            Message {ad.musician.name}
          </Text>
        </Pressable>
      ) : (
        <Text style={styles.closed}>This ad is no longer active.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#362323",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  author: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },

  authorName: {
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 22,
  },

  city: {
    color: "#a39b9b",
    fontSize: 14,
    marginTop: 3,
  },

  title: {
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 30,
    marginBottom: 8,
  },

  date: {
    color: "#a39b9b",
    fontSize: 13,
    marginBottom: 20,
  },

  instrumentContainer: {
    backgroundColor: "#4A3434",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },

  instrumentLabel: {
    color: "#a39b9b",
    fontSize: 13,
    marginBottom: 4,
  },

  instrument: {
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 20,
  },

  description: {
    color: "#a39b9b",
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 30,
  },

  messageButton: {
    backgroundColor: "#a39b9b",
    paddingVertical: 14,
    borderRadius: 10,
  },

  messageButtonText: {
    color: "#362323",
    fontFamily: "MetalMania",
    fontSize: 20,
    textAlign: "center",
  },

  closed: {
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
  },

  error: {
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
  },
});
