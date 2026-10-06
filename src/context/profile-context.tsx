import type { Genre } from "@/data/genre";
import type { InstrumentType } from "@/data/instrument";
import { createContext, useContext, useState } from "react";

interface ProfileData {
  name: string;
  age: number;
  city: string;
  instruments: InstrumentType[];
  genres: Genre[];
  yearsOfExperience: number;
  bio: string;
  profilePic?: string;
  latitude: number;
  longitude: number;
}

interface ProfileContextType {
  profile: ProfileData;

  //setProfile is the function that allow to modify state profile
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

//children = everything that is inside profileProvider
//define that every react component can be a child
export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    age: 0,
    city: "",
    instruments: [],
    genres: [],
    yearsOfExperience: 0,
    bio: "",
    latitude: 0,
    longitude: 0,
  });

  return (
    //every component in this Provider has access to profile and setProfile (children in layout)
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

//custom hook
export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }

  return context;
}
