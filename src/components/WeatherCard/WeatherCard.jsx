import { useState, useEffect } from "react";
import axios from "axios";
import { useOnboardingContext } from "../../context/user-context";
import "../WeatherCard/weathercard.css";

export default function WeatherCard() {
  const [temperature, setTemperature] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const { userDetails } = useOnboardingContext();
  const [temp, tempStatus] = useState(false);
  const { userInfo, onboardingStatus } = userDetails;

  useEffect(() => {
    if (onboardingStatus) {
      const getCurrentTemperature = async () => {
        try {
          if (typeof userInfo === "object") {
            const stringyObj = JSON.stringify(userInfo);
            const userObj = JSON.parse(stringyObj);
            setUserLocation(userObj.city);
          } else {
            const userObj = JSON.parse(userInfo);
            setUserLocation(userObj.city);
          }
          const coordinatesLink = `http://api.openweathermap.org/geo/1.0/direct?q=${userLocation}&limit=5&appid=27a2ee89e03b4d0b5199b633e513ea3d`;
          const coordinates_response = await axios.get(coordinatesLink);
          const latitude = coordinates_response.data[0].lat;
          const longitude = coordinates_response.data[0].lon;
          const weatherLink = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=27a2ee89e03b4d0b5199b633e513ea3d`;
          const weather_response = await axios.get(weatherLink);
          const currentTemp = weather_response.data.main.temp;
          const tempInCelcius = currentTemp - 273.15;
          const filteredTemp = tempInCelcius.toFixed(0);
          setTemperature(filteredTemp);
          tempStatus(true);
        } catch (error) {
          console.log(error);
        }
      };
      getCurrentTemperature();
    }
  });

  return (
    <>
      <div className="weather_and_city">
        {temp ? (
          <>
            <h1>{temperature}°</h1>
            <h3>{userLocation}</h3>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
