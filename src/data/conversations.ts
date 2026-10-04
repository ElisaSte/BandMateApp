import { musicians } from "@/data/musicians";
import { Conversation } from "./conversation";
export const conversations: Conversation[] = [
  {
    id: 1,
    musician: musicians[0],
    messages: [
      {
        id: 1,
        text: "Hey! I saw your profile and your music looks awesome.",
        senderId: musicians[0].id,
        date: "2026-10-04T12:10:00",
      },
      {
        id: 2,
        text: "Thanks! I'm currently looking for a guitarist.",
        senderId: 0,
        date: "2026-10-04T12:15:00",
      },
      {
        id: 3,
        text: "That sounds interesting. What kind of music do you play?",
        senderId: musicians[0].id,
        date: "2026-10-04T12:18:00",
      },
    ],
  },

  {
    id: 2,
    musician: musicians[1],
    messages: [
      {
        id: 4,
        text: "Hey! Want to jam sometime?",
        senderId: musicians[1].id,
        date: "2026-10-03T18:20:00",
      },
      {
        id: 5,
        text: "Sure! I'm free this weekend.",
        senderId: 0,
        date: "2026-10-03T18:25:00",
      },
    ],
  },

  {
    id: 3,
    musician: musicians[2],
    messages: [
      {
        id: 6,
        text: "Are you still looking for a drummer?",
        senderId: 0,
        date: "2026-10-02T14:05:00",
      },
      {
        id: 7,
        text: "Yes! We are actually meeting next week.",
        senderId: musicians[2].id,
        date: "2026-10-02T14:12:00",
      },
    ],
  },

  {
    id: 4,
    musician: musicians[3],
    messages: [
      {
        id: 8,
        text: "Hey, I think we might have similar music tastes.",
        senderId: musicians[3].id,
        date: "2026-10-01T20:30:00",
      },
    ],
  },
];
