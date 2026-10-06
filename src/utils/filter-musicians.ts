import type { InstrumentType } from "@/data/instrument";
import type { Musician } from "@/data/musician";
import { calculateDistance } from "./distance";

export function filterMusicians(
  musicians: Musician[],
  search: string,
  instrument: InstrumentType | "All",
  nearMe: boolean,
  currentMusician: Musician | null,
  radius: number | null,
): Musician[] {
  return musicians
    .filter((m) => {
      if (!m.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }

      if (
        instrument !== "All" &&
        !m.instruments.some((i) => i.name === instrument)
      ) {
        return false;
      }

      if (nearMe && currentMusician && radius !== null) {
        const distance = calculateDistance(
          currentMusician.latitude,
          currentMusician.longitude,
          m.latitude,
          m.longitude,
        );

        if (distance > radius) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => b.registrationDate.localeCompare(a.registrationDate));
}
