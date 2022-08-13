import { useEffect, useState } from "react";
import { getLocation } from "../services/location";

export const useLocation = () => {
  const [lat, setLat] = useState();
  const [lng, setLong] = useState();
  const getDefaultLocation = async () => {
    try {
      const { lat, lng } = await getLocation();
      setLat(lat);
      setLong(lng);
    } catch (error) {
      setLat(44);
      setLong(-80);
    }
  };

  useEffect(() => {
    getDefaultLocation();
  }, []);

  return { lat, lng };
};
