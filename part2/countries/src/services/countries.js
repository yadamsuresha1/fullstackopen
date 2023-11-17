import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";
const WEATHER_API_KEY = import.meta.env.WEATHER_API_KEY;

const getByName = (country) => {
  const request = axios.get(`${baseUrl}/name/${country}`);
  return request.then((response) => {
    console.log("response", response);
    return response.data;
  });
};
const getAll = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((response) => response.data);
};

const getWeatherInformation = (lat, lon) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
  );
  return request.then((response) => {
    console.log(response.data);
    return response.data;
  });
};

export default {
  getByName,
  getAll,
  getWeatherInformation,
};
