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
  yearsOfExperience: number;
  genres: Genre[];
  profilePic: string;
}
