import { useState, useEffect } from "react";
import axios from "axios";

export default function WeatherCard() {
  const [location, setLocation] = useState("Mumbai");
  const [temperature, setTemperature] = useState();
    const getCurrentTemperature = async () => {
      try {
        const coordinatesLink = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=27a2ee89e03b4d0b5199b633e513ea3d`;
        console.log(coordinatesLink);   
        const coordinates_response = await axios.get(coordinatesLink);
        const latitude = coordinates_response.data[0].lat;
        const longitude = coordinates_response.data[0].lon;
        const weatherLink =
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=27a2ee89e03b4d0b5199b633e513ea3d`;
        const weather_response = await axios.get(weatherLink);
        const currentTemp = weather_response.data.main.temp;
        setTemperature(currentTemp - 273.15);
        console.log(temperature);
      } 
      catch (error) {
        console.log(error);
      }
    };
  
  return (
    <div>
      Enter your location{" "}
      <input onChange={(e) => setLocation(e.target.value)} />
      <button onClick={getCurrentTemperature}>Get Temperature</button>
      {location}
      {temperature}
    </div>
  );
}
