import "./App.css";
import TimeCard from "./components/TimeComponent/TimeCard.jsx";
import {
  BackroundImage,
  QuoteCard,
  WeatherCard,
  UserOnboarding,
  Focus,
} from "./components";

function App() {
  return (
    <>
      <BackroundImage />
      <div className="container">
        <WeatherCard />
        <TimeCard />
        <UserOnboarding />
        <Focus />
        <QuoteCard />
      </div>
    </>
  );
}

export default App;
