import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import WeatherContext from "../../context/WeatherContext";
import Cities from "../../services/cities";

function Weather() {
  const { city, setCity, weather } = useContext(WeatherContext);
  // Sadece weather verisi geldiyse işlem yapıyoruz
  const groupedByDate = weather?.list?.reduce((acc, current) => {
    const date = current.dt_txt.split(" ")[0];
    if (!acc[date]) {
      acc[date] = current;
    }
    return acc;
  }, {});

  const firstOfEachDay = groupedByDate ? Object.values(groupedByDate) : [];

  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2); // 2 basamağa yuvarlayalım
  };

  return (
    <div className="container">
      <div className="city-select">
        <select
          value={city}
          name="cities"
          id="cities"
          onChange={(e) => setCity(e.target.value)}
        >
          {Cities.map((item, index) => (
            <option key={index} value={item.CityName}>
              {item.CityName}
            </option>
          ))}
        </select>
      </div>
      <div className="weather-contaner">
        {firstOfEachDay?.map((item, index) => {
          const timestamp = item.dt * 1000; // Unix zaman damgası milisaniyeye çevirme
          const date = new Date(timestamp);

          const dayName = date.toLocaleDateString("tr-TR", { weekday: "long" });
          const today = new Date().toLocaleDateString("tr-TR", {
            weekday: "long",
          });
          const minTemp = kelvinToCelsius(item.main.temp_min);
          const maxTemp = kelvinToCelsius(item.main.temp_max);
          return (
            <div
              key={index}
              className={dayName === today ? "today" : "other-day"}
            >
              <div>{dayName}</div>
              <div>
                <img
                  className="w-14 h-14 "
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt="weather icon"
                />
              </div>
              <div>
                <span className="min-heat">{minTemp}°C</span>{" "}
                <span className="max-heat">{maxTemp}°C</span>{" "}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Weather;
