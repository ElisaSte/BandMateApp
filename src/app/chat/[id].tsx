import { conversations } from "@/data/conversations";
import type { Message } from "@/data/message";
import { musicians } from "@/data/musicians";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Chat() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const musician = musicians.find((musician) => musician.id === Number(id));

  const conversation = conversations.find(
    (conversation) => conversation.musician.id === Number(id),
  );

  const [messages, setMessages] = useState<Message[]>(
    conversation?.messages ?? [],
  );

  const [message, setMessage] = useState("");

  if (!musician) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Musician not found</Text>
      </View>
    );
  }

  const sendMessage = async () => {
    if (!message.trim()) {
      return;
    }

    const newMessage: Message = {
      id: Date.now(),
      text: message.trim(),
      senderId: 0,
      date: new Date().toISOString(),
    };

    setMessages((current) => [...current, newMessage]);
    setMessage("");

    await Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Confirm);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.chatHeader}
        onPress={() => {
          router.push({
            pathname: "/musicians/[id]",
            params: {
              id: musician.id.toString(),
            },
          });
        }}
      >
        {musician.profilePic ? (
          <Image
            source={
              typeof musician.profilePic === "string"
                ? { uri: musician.profilePic }
                : musician.profilePic
            }
            style={styles.headerAvatar}
          />
        ) : (
          <View style={styles.headerAvatarPlaceholder}>
            <Text style={styles.avatarText}>♪</Text>
          </View>
        )}

        <View>
          <Text style={styles.headerName}>{musician.name}</Text>
          <Text style={styles.headerCity}>{musician.city}</Text>
        </View>
      </Pressable>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messages}
        renderItem={({ item }) => {
          const isMine = item.senderId === 0;

          return (
            <View
              style={[
                styles.messageContainer,
                isMine
                  ? styles.myMessageContainer
                  : styles.otherMessageContainer,
              ]}
            >
              {!isMine && (
                <Pressable
                  onPress={() => {
                    router.push({
                      pathname: "/musicians/[id]",
                      params: {
                        id: musician.id.toString(),
                      },
                    });
                  }}
                >
                  <Image
                    source={
                      typeof musician.profilePic === "string"
                        ? { uri: musician.profilePic }
                        : musician.profilePic
                    }
                    style={styles.messageAvatar}
                  />
                </Pressable>
              )}

              <View
                style={[
                  styles.messageBubble,
                  isMine ? styles.myMessage : styles.otherMessage,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    !isMine && styles.otherMessageText,
                  ]}
                >
                  {item.text}
                </Text>
              </View>

              {isMine && <Text style={styles.sent}>Sent ✓</Text>}
            </View>
          );
        }}
      />

      <View
        style={[
          styles.inputContainer,
          {
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Write a message..."
          placeholderTextColor="#6f6868"
          value={message}
          onChangeText={setMessage}
        />

        <Pressable style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>➤</Text>
        </Pressable>
      </View>
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
    fontSize: 24,
    textAlign: "center",
    marginBottom: 15,
  },

  messages: {
    paddingVertical: 10,
  },

  messageContainer: {
    marginBottom: 12,
  },

  myMessageContainer: {
    alignItems: "flex-end",
  },
  messageBubble: {
    padding: 12,
    borderRadius: 15,
    maxWidth: "80%",
  },

  myMessage: {
    backgroundColor: "#a39b9b",
  },

  otherMessage: {
    backgroundColor: "#4A3434",
  },

  messageText: {
    color: "#362323",
    fontSize: 16,
  },

  otherMessageText: {
    color: "#a39b9b",
  },

  sent: {
    color: "#a39b9b",
    fontSize: 11,
    marginTop: 3,
    marginRight: 4,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  input: {
    flex: 1,
    backgroundColor: "#a39b9b",
    color: "#362323",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },

  sendButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#a39b9b",
    alignItems: "center",
    justifyContent: "center",
  },

  sendText: {
    color: "#362323",
    fontSize: 20,
  },

  error: {
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
  },
  messageAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 8,
  },

  otherMessageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#a39b9b",
  },

  headerAvatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    marginRight: 10,
  },

  headerAvatarPlaceholder: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#a39b9b",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  avatarText: {
    color: "#362323",
    fontSize: 20,
  },

  headerName: {
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 20,
  },

  headerCity: {
    color: "#a39b9b",
    fontSize: 13,
    marginTop: 2,
  },
});
