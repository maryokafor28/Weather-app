"use client";

import { useState, useEffect } from "react";

type GeolocationData = {
  lat: string | null;
  lon: string | null;
  city: string | null;
  country: string | null;
  error: string | null;
  loading: boolean;
};

export function useGeolocation(): GeolocationData {
  const [lat, setLat] = useState<string | null>(null);
  const [lon, setLon] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const latStr = latitude.toString();
        const lonStr = longitude.toString();

        setLat(latStr);
        setLon(lonStr);

        try {
          // Reverse geocode to get city + country name
          const res = await fetch(
            `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}`
          );
          const data = await res.json();
          const result = data?.results?.[0];

          if (result) {
            setCity(result.name || null);
            setCountry(result.country || null);
          }
        } catch (err) {
          console.warn("Reverse geocoding failed:", err);
          setError("Failed to retrieve city and country name.");
        }

        setLoading(false);
      },
      (err) => {
        setError("Location permission denied or unavailable.");
        console.warn("Geolocation error:", err);
        setLoading(false);
      }
    );
  }, []);

  return { lat, lon, city, country, error, loading };
}
