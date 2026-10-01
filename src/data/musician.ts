import { ImageSourcePropType } from "react-native";
import { Genre } from "./genre";
import { Instrument } from "./instrument";

export interface Musician {
  id: number;
  name: string;
  age: number;
  instruments: Instrument[];
  registrationDate: string;
  bio: string;
  city: string;
  latitude: number;
  longitude: number;
  yearsOfExperience: number;
  genres: Genre[];
  profilePic: ImageSourcePropType | string;
}
