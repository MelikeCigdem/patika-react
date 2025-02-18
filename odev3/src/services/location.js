async function getGeolocation(city) {
  const cityName = city;
  const countryCode = "TR";
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY; 

  // Şehirden enlem ve boylamı almak
  const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${apiKey}`;
  const geoResponse = await fetch(geoUrl);
  if (!geoResponse.ok) throw new Error("API isteği başarısız!");

  const geoData = await geoResponse.json();
  const latitude = geoData.coord.lat;
  const longitude = geoData.coord.lon;

  // 7 günlük hava durumu verisini almak için OneCall API'yi kullanıyoruz
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=tr`;
  

  try {
    const response = await fetch(url); // GET isteği
    if (!response.ok) throw new Error("API isteği başarısız!");

    const data = await response.json();
    
    return data; // 7 günlük veriyi döndür
  } catch (error) {
    console.error("Hata:", error);
    return null;
  }
}

export default getGeolocation;
