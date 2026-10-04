import type { Conversation } from "@/data/conversation";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface ConversationCardProps {
  conversation: Conversation;
}

export default function ConversationCard({
  conversation,
}: ConversationCardProps) {
  const lastMessage = conversation.messages[conversation.messages.length - 1];

  const formatDate = (date: string) => {
    const messageDate = new Date(date);
    const now = new Date();

    const isToday =
      messageDate.getDate() === now.getDate() &&
      messageDate.getMonth() === now.getMonth() &&
      messageDate.getFullYear() === now.getFullYear();

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const isYesterday =
      messageDate.getDate() === yesterday.getDate() &&
      messageDate.getMonth() === yesterday.getMonth() &&
      messageDate.getFullYear() === yesterday.getFullYear();

    if (isToday) {
      return messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    if (isYesterday) {
      return "Yesterday";
    }

    return messageDate.toLocaleDateString([], {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        router.push({
          pathname: "/chat/[id]",
          params: {
            id: conversation.musician.id.toString(),
          },
        });
      }}
    >
      {conversation.musician.profilePic ? (
        <Image
          source={
            typeof conversation.musician.profilePic === "string"
              ? { uri: conversation.musician.profilePic }
              : conversation.musician.profilePic
          }
          style={styles.profilePic}
        />
      ) : (
        <View style={styles.profilePicPlaceholder}>
          <Text style={styles.avatarText}>♪</Text>
        </View>
      )}

      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>
            {conversation.musician.name}
          </Text>

          {lastMessage && (
            <Text style={styles.date}>{formatDate(lastMessage.date)}</Text>
          )}
        </View>

        <Text style={styles.message} numberOfLines={1}>
          {lastMessage
            ? lastMessage.senderId === 0
              ? `You: ${lastMessage.text}`
              : lastMessage.text
            : "No messages yet"}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A3434",
    borderRadius: 15,
    padding: 12,
    marginBottom: 10,
  },

  profilePic: {
    width: 65,
    height: 65,
    borderRadius: 33,
  },

  profilePicPlaceholder: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: "#a39b9b",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#362323",
    fontSize: 25,
  },

  info: {
    flex: 1,
    marginLeft: 15,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  name: {
    flex: 1,
    color: "#a39b9b",
    fontFamily: "MetalMania",
    fontSize: 20,
  },

  date: {
    color: "#a39b9b",
    fontSize: 12,
    marginLeft: 10,
  },

  message: {
    color: "#a39b9b",
    fontSize: 15,
    marginTop: 5,
  },
});
