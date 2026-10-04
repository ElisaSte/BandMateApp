import { InstrumentType } from "./instrument";
import { Musician } from "./musician";

export interface Ad {
  id: number;
  musician: Musician;
  title: string;
  lookingFor: InstrumentType;
  description: string;
  date: string;
  isActive: boolean;
}
