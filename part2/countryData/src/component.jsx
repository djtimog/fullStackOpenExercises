import axios from "axios";
import { useEffect, useState } from "react";

export const CountryBox = ({ countriesToShow }) => {
  if (!countriesToShow || countriesToShow.length === 0) return null;

  if (countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countriesToShow.length > 2) {
    return (
      <div>
        {countriesToShow.map((country) => (
          <CountryList country={country} key={country.area} />
        ))}
      </div>
    );
  } else {
    const country = countriesToShow[0];

    return <CountryView country={country} />;
  }
};

const CountryList = ({ country }) => {
  const [showCountry, setShowCountry] = useState(false);

  return (
    <div>
      {country.name.common}
      <button onClick={() => setShowCountry(!showCountry)}>
        {!showCountry ? "Show" : "Hide"}
      </button>
      {showCountry && <CountryView country={country} />}
    </div>
  );
};

const CountryView = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const languages = Object.values(country.languages);
  const api_key = import.meta.env.VITE_WEATHER_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}`
      )
      .then((response) => setWeather(response.data));
  }, []);

  return (
    <div>
      <h1>{country.name.common}</h1>

      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>

      <h3>Languages</h3>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={`${country.name.common} flag`} />

      {weather && (
        <div>
          <h3>Weather in {country.capital[0]}</h3>
          <p>Temperature: {weather.main.temp} Celsuis</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};
