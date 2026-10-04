import { Message } from "./message";
import { Musician } from "./musician";

export interface Conversation {
  id: number;
  musician: Musician;
  messages: Message[];
}
