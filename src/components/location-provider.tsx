"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type LocationContextType = {
  location: {
    latitude: number | null;
    longitude: number | null;
    displayName: string | null;
    city: string | null;
    state: string | null;
  };
  isLoading: boolean;
  error: string | null;
  getLocation: () => Promise<void>;
};

const LocationContext = createContext<LocationContextType>({
  location: {
    latitude: null,
    longitude: null,
    displayName: null,
    city: null,
    state: null,
  },
  isLoading: false,
  error: null,
  getLocation: async () => {},
});

export const useLocation = () => useContext(LocationContext);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState({
    latitude: null as number | null,
    longitude: null as number | null,
    displayName: null as string | null,
    city: null as string | null,
    state: null as string | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          });
        },
      );

      const { latitude, longitude } = position.coords;
      setLocation((prev) => ({ ...prev, latitude, longitude }));

      // Fetch location name using reverse geocoding API
      const response = await fetch(
        `/api/location?lat=${latitude}&lng=${longitude}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch location data");
      }

      const data = await response.json();

      setLocation((prev) => ({
        ...prev,
        displayName: data.display_name || null,
        city: data.city || null,
        state: data.state || null,
      }));
    } catch (err) {
      if (err instanceof GeolocationPositionError) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Location permission denied");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Location information is unavailable");
            break;
          case err.TIMEOUT:
            setError("Location request timed out");
            break;
          default:
            setError("An unknown error occurred");
        }
      } else {
        setError("Failed to get location");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Automatically try to get location when component mounts
    getLocation();
  }, []);

  return (
    <LocationContext.Provider
      value={{ location, isLoading, error, getLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
}
