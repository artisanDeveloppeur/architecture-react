import { useEffect, useState } from "react";
import "./../assets/css/meteo.css"

export function Meteo() {

  const VITE_WEATHERAPI_KEY = import.meta.env.VITE_WEATHERAPI_KEY

  const [cityName, setCityName] = useState("Liege");
  const [fetchErrorCity, setFetchErrorCity] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState({
    temperature: null,
    feelsLike: null,
    conditionText: null,
    locationText: null,
    localtime: null,
    dayOfWeek: null,
    humidity: null,
    wind_kph: null,
    icon: null,
    forecast: [],
  });
  const [previousResearch, setPreviousResearch] = useState(() => {
    const storedData = localStorage.getItem("previousResearch");
    return storedData ? JSON.parse(storedData) : [];
  });
  useEffect(() => {
    fetchData(cityName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("previousResearch", JSON.stringify(previousResearch));
  }, [previousResearch]);
  const fetchData = async (cityName) => {
    setIsLoading(true);
    setFetchErrorCity(false)



    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${VITE_WEATHERAPI_KEY}&q=${cityName}&days=5`,
      );
      const data = await response.json();
      const { current, location, forecast } = data;
      const { temp_c: tempC, feelslike_c: feelsLikeC, humidity, wind_kph } = current;
      const { name, country, localtime: localtimeText } = location;
      const date = new Date(localtimeText);
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
      };
      const formatDayOfWeek = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'long' });
      };
      const formatForecast = (forecast) => {
        const forecastDays = forecast.forecastday;
        return forecastDays.map((day) => {
          const date = new Date(day.date);
          const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
          const maxTemp = day.day.maxtemp_c;
          const minTemp = day.day.mintemp_c;
          const icon = day.day.condition.icon;
          return { dayOfWeek, icon, maxTemp: `${maxTemp}C`, minTemp: `${minTemp}C` };
        });
      };

      const formattedDateTime = formatDate(date);
      const dayOfWeek = formatDayOfWeek(date);
      const conditionText = current.condition.text;
      const icon = current.condition.icon;
      const formattedForecast = formatForecast(forecast);
      setWeather({
        cityName,
        temperature: `${tempC}`,
        feelsLike: `${feelsLikeC}`,
        humidity: `${humidity}`,
        wind_kph: `${wind_kph}`,
        conditionText,
        icon,
        name,
        country,
        locationText: formattedDateTime,
        localtime: formattedDateTime,
        dayOfWeek,
        forecast: formattedForecast,
      });
      if (previousResearch.length >= 5) {
        let updatedResearch = [...previousResearch, cityName].slice(-5);
        setPreviousResearch(updatedResearch);
      } else {
        setPreviousResearch(previousResearch => [...previousResearch, cityName])
      }

      localStorage.setItem("previousResearch", JSON.stringify(previousResearch));
    } catch (err) {
      setFetchErrorCity(true)
      console.error('City not found')
    } finally {
      setIsLoading(false);
    }
  };
  const handleCityChange = (event) => {
    setCityName(event.target.value);
  };

  const handleSearchClick = (cityName) => {
    fetchData(cityName);
  };
  const handleCityChangeViaStorage = (cityName) => {
    setCityName(cityName);
    handleSearchClick(cityName)
  }
  return (
    <>

      <div className="container_body">
        <div className="container_meteo">
          <div className="weather-side">
            <div className="weather-gradient"><img src={weather.icon} alt="" /></div>
            <div className="date-container">
              <p className="location">{weather.name} - {weather.country}</p>

              <h2 className="date-dayname">{weather.dayOfWeek}</h2>
              <i className="location-icon" data-feather="map-pin"></i>
              <span className="location">{weather.locationText}</span>
            </div>
            <div className="weather-container"><i className="weather-icon" data-feather="sun"></i>
              <h1 className="weather-temp">{weather.temperature}°C</h1>
              <h3 className="weather-desc">{weather.conditionText}</h3>
            </div>
          </div>
          <div className="info-side">
            <div className="today-info-container">
              <div className="today-info">
                <div className="precipitation"><span className="title">WIND</span><span
                  className="value">{weather.wind_kph} km/h</span>
                  <div className="clear"></div>
                </div>
                <div className="humidity"><span className="title">HUMIDITY</span><span
                  className="value">{weather.humidity}%</span>
                  <div className="clear"></div>
                </div>
                <div className="wind"><span className="title">FELLING LIKE</span><span
                  className="value">{weather.feelsLike}°C</span>
                  <div className="clear"></div>
                </div>
              </div>
            </div>
            <div className="week-container today-info">
              <span className="title">NEXT THREE DAYS</span>
              <ul className="week-list">
                {weather.forecast && weather.forecast.map((day) => (
                  <li key={day.dayOfWeek}>
                    <i className="day-icon" data-feather="cloud"><img src={day.icon}
                      alt="" /></i>
                    <span className="day-name">{day.dayOfWeek}</span>
                    <span className="day-temp">{day.maxTemp}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="location-container">

              <input
                type="text"
                placeholder="Enter a city name"
                id="search-btn"
                className={`searchTerm${fetchErrorCity ? ' errorCity' : ''}`}
                value={cityName}
                onChange={handleCityChange}
              />
              <button className="location-button" onClick={() => handleSearchClick(cityName)}>
                <span>Change location</span>
              </button>
              {
                fetchErrorCity && (
                  <p className="text-error-city">
                    Wrong city
                  </p>
                )
              }
            </div>
          </div>
        </div>
        {previousResearch.length > 0 &&
          <section className="container_research">
            <h2>5 Previous research</h2>
            <ul>
              {previousResearch.map((element, index) => (
                <li onClick={() => handleCityChangeViaStorage(element)} key={index}>{element}</li>
              ))}
            </ul>
          </section>
        }
      </div>
    </>
  );
}