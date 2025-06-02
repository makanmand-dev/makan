'use client';

import { createContext, useContext, useState } from 'react';

type LocationData = {
  lat: number;
  lng: number;
  address: string;
};

type LocationContextType = {
  location: LocationData | null;
  setLocation: (loc: LocationData) => void;
};

const LocationContext = createContext<LocationContextType>({
  location: null,
  setLocation: () => {},
});

export function LocationProvider({ children }: { children: React.ReactNode }) {
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
