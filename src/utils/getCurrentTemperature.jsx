import axios from "axios";
import { useEffect } from "react";

    const getCurrentTemperature = async() => {
        try{
            const coordinatesLink = "http://api.openweathermap.org/geo/1.0/direct?q=Mumbai,IN&limit=5&appid=27a2ee89e03b4d0b5199b633e513ea3d";
            const coordinates_response = await axios.get(coordinatesLink);
            const latitude = coordinates_response.data[0].lat;
            const longitude = coordinates_response.data[0].lon;
            const weatherLink = "https://api.openweathermap.org/data/2.5/weather?lat=19.0759899&lon=72.8773928&appid=27a2ee89e03b4d0b5199b633e513ea3d"
            const weather_response = await axios.get(weatherLink);
            const currentTemp = weather_response.data.main.temp;
            const kelvinToDegree = currentTemp - 273.15;
        }
        catch(error){
            console.log(error);
        }
    }


export {getCurrentTemperature}