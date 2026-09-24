export type InstrumentType =
  | "Guitar"
  | "Bass"
  | "Drums"
  | "Vocals"
  | "Keyboard";

export interface Instrument {
  id: number;
  name: InstrumentType;
}
