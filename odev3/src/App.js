import "./App.css";
import Weather from "./components/weather";
import { WeatherProvider } from "./context/WeatherContext";

function App() {
  return (
    <WeatherProvider>
      <Weather />
    </WeatherProvider>
  );
}

export default App;
