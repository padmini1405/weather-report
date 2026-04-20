import { useState, useEffect, useCallback } from "react";
import UnitModal from "./Components/UnitModel";
import History from "./Components/History";
import WeatherCard from "./Components/WeatherCard";
import axios from "axios";
import "./App.css";
import weatherIcon from "./assets/Images/cloudy (1).png";
import historyIcon from "./assets/Images/clock.png";
import homeIcon from "./assets/Images/house.png";
import unitIcon from "./assets/Images/temparature.png";

function App() {
  const [unit, setUnit] = useState("metric");
  const [history, setHistory] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState("home");
  const [city, setCity] = useState("");

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const getWeather = useCallback(async (cityName, shouldRedirect = false) => {
    if (!cityName) return;
    try {
      const currentRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${unit}`
      );
      setWeatherData(currentRes.data);
      setCity(currentRes.data.name);

      if (shouldRedirect) setView("home");

      const historyRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      setHistory((prev) => {
        const filtered = prev.filter(
          (item) => item.name.toLowerCase() !== historyRes.data.name.toLowerCase()
        );
        return [historyRes.data, ...filtered];
      });
    } catch {
      alert("City not found!");
    }
  }, [unit, API_KEY]);

  useEffect(() => {
    if (city) {
      getWeather(city);
    }
  }, [unit, city, getWeather]);

  return (
    <div className="main">
      {/* DYNAMIC NAVBAR */}
      <div className="navbar">
        <h2>
          {view === "home" ? (
            <>
              <img
                src={weatherIcon}
                alt="Weather Icon"
                className="nav-logo"
              />
              WeatherNow
            </>
          ) : (
            <>
              <img
                src={historyIcon}
                alt="History Icon"
                className="nav-logo"
              />
              Search History
            </>
          )}
        </h2>

        <div className="nav-icons">
          <span onClick={() => setShowModal(true)} title="Unit"><img
            src={unitIcon}
            alt="unit Icon"
            className="side-nav-logo"
          /> </span>

          {/* Toggle between Home and History icons */}
          {view === "home" ? (
            <span onClick={() => setView("history")} title="History"><img
              src={historyIcon}
              alt="History Icon"
              className="side-nav-logo"
            /> </span>
          ) : (
            <span onClick={() => setView("home")} title="Home"><img
              src={homeIcon}
              alt="Home Icon"
              className="side-nav-logo"
            /> </span>
          )}
        </div>
      </div>

      {view === "home" && (
        <WeatherCard data={weatherData} unit={unit} onSearch={getWeather} />
      )}

      {view === "history" && (
        <History unit={unit} history={history} onSearch={getWeather} />
      )}

      {showModal && (
        <UnitModal
          unit={unit}
          setUnit={setUnit}
          close={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default App;