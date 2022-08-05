import { useState, useEffect } from "react";
import axios from "axios";
import { useOnboardingContext } from "../../context/user-context";
import "../WeatherCard/weathercard.css";

export default function WeatherCard() {
  const [temperature, setTemperature] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const { userDetails } = useOnboardingContext();
  const [temperatureStatus, setTemperatureStatus] = useState(false);
  const { userInfo, onboardingStatus } = userDetails;
  const weatherFunc = (userObj) => {
    if (userObj.city !== "") {
      const getCurrentTemperature = async () => {
        try {
          setUserLocation(userObj.city);
          const coordinatesLink = `https://api.openweathermap.org/geo/1.0/direct?q=${userLocation}&limit=5&appid=27a2ee89e03b4d0b5199b633e513ea3d`;
          const coordinates_response = await axios.get(coordinatesLink);
          const latitude = coordinates_response.data[0].lat;
          const longitude = coordinates_response.data[0].lon;
          const weatherLink = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=27a2ee89e03b4d0b5199b633e513ea3d`;
          const weather_response = await axios.get(weatherLink);
          const currentTemp = weather_response.data.main.temp;
          const tempInCelcius = currentTemp - 273.15;
          const filteredTemp = tempInCelcius.toFixed(0);
          setTemperature(filteredTemp);
          setTemperatureStatus(true);
        } catch (error) {
          console.log(error);
        }
      };
      getCurrentTemperature();
    } else if (userObj.geoLocation.latitude !== null) {
      const getCurrentTemperature = async () => {
        try {
          const weatherLink = `https://api.openweathermap.org/data/2.5/weather?lat=${userObj.geoLocation.latitude}&lon=${userObj.geoLocation.longitude}&appid=27a2ee89e03b4d0b5199b633e513ea3d`;
          const weather_response = await axios.get(weatherLink);
          const currentTemp = weather_response.data.main.temp;
          const tempInCelcius = currentTemp - 273.15;
          const filteredTemp = tempInCelcius.toFixed(0);
          setTemperature(filteredTemp);
          setTemperatureStatus(true);
        } catch (error) {
          console.log(error);
        }
      };
      getCurrentTemperature();
    }
  };
  useEffect(() => {
    if (onboardingStatus) {
      if (typeof userInfo === "object") {
        const stringyObj = JSON.stringify(userInfo);
        const userObj = JSON.parse(stringyObj);
        weatherFunc(userObj);
      } else {
        const objectContent = localStorage.getItem("userInfo");
        const userObj = JSON.parse(objectContent);
        weatherFunc(userObj);
      }
    }
  });

  return (
    <>
      <div className="weather_and_city">
        {temperatureStatus ? (
          <>
            <h1>{temperature}°</h1>
            <h3>{userLocation}</h3>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
