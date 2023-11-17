import { useEffect, useState } from "react";
import countriesService from "../services/countries";
const CountryDetails = ({ country }) => {
  const { name, capital, area, languages, flags } = country;
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    const latlng = country.latlng;
    const lat = latlng[0];
    const lon = latlng[1];
    countriesService.getWeatherInformation(lat, lon).then((response) => {
      console.log("weather", response);
      setWeather(response);
    });
  }, [country]);
  return (
    <div>
      <h1>{name.common}</h1>
      <p>
        <b>Capital:</b> {capital}
      </p>
      <p>
        <b>Area:</b> {area}
      </p>
      <h3>Languages:</h3>
      {Object.values(languages).map((lan) => (
        <li key={lan}>{lan}</li>
      ))}
      <img src={flags.svg} alt={flags.alt} height={200} width={200} />
      {weather && (
        <>
          <h2>Weather in {capital}</h2>
          <p>temperature: {weather.main.temp} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <p>wind: {weather.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
};
export default CountryDetails;
