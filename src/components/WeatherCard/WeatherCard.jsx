import { useState, useEffect } from "react";
import axios from "axios";
import { useOnboardingContext } from "../../context/user-context";
import "../WeatherCard/weathercard.css"

export default function WeatherCard() {
  const [temperature, setTemperature] = useState("");
  const { userDetails } = useOnboardingContext();
  const { userInfo } = userDetails;
  const userObj = JSON.parse(userInfo);
  const userLocation = userObj.city;
  useEffect(() => {
    const getCurrentTemperature = async () => {
      console.log("UseEffect temp", temperature);
      try {
        const coordinatesLink = `http://api.openweathermap.org/geo/1.0/direct?q=${userLocation}&limit=5&appid=27a2ee89e03b4d0b5199b633e513ea3d`;
        console.log(coordinatesLink);
        const coordinates_response = await axios.get(coordinatesLink);
        const latitude = coordinates_response.data[0].lat;
        const longitude = coordinates_response.data[0].lon;
        const weatherLink = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=27a2ee89e03b4d0b5199b633e513ea3d`;
        const weather_response = await axios.get(weatherLink);
        console.log(weatherLink);
        const currentTemp = weather_response.data.main.temp;
        const tempInCelcius = currentTemp - 273.15;
        setTemperature(tempInCelcius);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentTemperature();
  });

  return (
    <>
    <div className="weather_and_city">
      <h1>{temperature}°</h1>
      <h3>{userLocation}</h3>
    </div>
    </>
  );
}
