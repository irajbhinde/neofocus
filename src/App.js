import "./App.css";
import TimeCard from "./components/TimeComponent/TimeCard.jsx";
import { BackroundImage, QuoteCard, WeatherCard } from "./components";
import { getCurrentTemperature } from "./utils/getCurrentTemperature.jsx";

function App() {
  getCurrentTemperature();
  return (
    <>
    <div className="container">
      <BackroundImage />
      <div className="centered">
      <TimeCard />
      <QuoteCard />
      <WeatherCard />
      </div>
    </div>
      
    </>
  );
}

export default App;
