'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

type LocationData = {
  lat: number;
  lng: number;
  address: string;
};

const LocationContext = createContext<{
  location: LocationData | null;
  setLocation: (data: LocationData) => void;
}>({
  location: null,
  setLocation: () => {},
});

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationData | null>(null);
  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  return useContext(LocationContext);
}
