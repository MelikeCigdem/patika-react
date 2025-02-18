import { createContext, useEffect, useState } from "react";
import { fetchCityFromCoords } from "../services/currentLocation";
import getGeolocation from "../services/location";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if(city !== null){
        weaterLocation(city)
    }
  }, [city])

  const weaterLocation = async (city) => {
    // mevcut konum alma
    try {
      const data = await getGeolocation(city);
     setWeather(data)
     
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePositionSuccess = async (position) => {
    try {
      const cityName = await fetchCityFromCoords(position);
      setCity(cityName);
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePositionError = (error) => {
    setError("Konum alınırken hata oluştu.");
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handlePositionSuccess,
        handlePositionError
      );
    } else {
      setError("Geolocation API desteklenmiyor.");
    }
  }, []);

  return (
    <WeatherContext.Provider value={{ city, setCity, error, weather}}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
