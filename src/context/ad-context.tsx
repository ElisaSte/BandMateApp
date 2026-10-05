import type { Ad } from "@/data/ad";
import { ads as mockAds } from "@/data/ads";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface AdContextType {
  ads: Ad[];
  addAd: (ad: Ad) => void;
}

const AdContext = createContext<AdContextType | undefined>(undefined);

export function AdProvider({ children }: { children: ReactNode }) {
  const [ads, setAds] = useState<Ad[]>(mockAds);

  useEffect(() => {
    const loadAds = async () => {
      const savedAds = await AsyncStorage.getItem("ads");

      if (savedAds) {
        setAds(JSON.parse(savedAds));
      }
    };

    loadAds();
  }, []);

  const addAd = async (ad: Ad) => {
    const updatedAds = [ad, ...ads];

    setAds(updatedAds);
    await AsyncStorage.setItem("ads", JSON.stringify(updatedAds));
  };

  return (
    <AdContext.Provider value={{ ads, addAd }}>{children}</AdContext.Provider>
  );
}

export function useAds() {
  const context = useContext(AdContext);

  if (!context) {
    throw new Error("useAds must be used inside AdProvider");
  }

  return context;
}
