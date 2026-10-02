import { createContext, useContext, useState } from "react";
import type { Genre } from "@/data/genre";
import type { InstrumentType } from "@/data/instrument";

interface ProfileData {
  name: string;
  age: number;
  city: string;
  instruments: InstrumentType[];
  genres: Genre[];
  yearsOfExperience: number;
  bio: string;
  profilePic?: string;
}

interface ProfileContextType {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    age: 0,
    city: "",
    instruments: [],
    genres: [],
    yearsOfExperience: 0,
    bio: "",
  });

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }

  return context;
}
