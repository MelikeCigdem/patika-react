export const fetchCityFromCoords = async (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const apiKey = process.env.REACT_APP_GOOGLE_GEOCODING_API_KEY;

  try {
    const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    const response = await fetch(geoUrl);
    if (!response.ok) throw new Error("API isteği başarısız!");

    const geoData = await response.json();
    if (geoData.status === "OK") {
      const city = geoData.results.find((result) =>
        result.types.includes("locality")
      );
      if (city) {
        const splitAddress = city.formatted_address.split(",");

        const cityName = splitAddress[0].trim();
        
        return cityName;
      } else {
        return alert("Şehir bilgisi bulunamadı.");
      }
    } else {
      return alert("Geocoding işlemi başarısız.");
    }
  } catch (error) {
    return alert("Hata:", error);
  }
};

export const handleError = (error) => {
  console.error("Hata:", error);
};
