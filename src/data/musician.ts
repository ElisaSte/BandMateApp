import { Instrument } from "./instrument";

export interface Musician {
  id: number;
  name: string;
  instruments: Instrument[];
}
