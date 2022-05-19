import "./App.css";
import TimeCard from "./components/TimeComponent/TimeCard.jsx";
import {
  BackroundImage,
  QuoteCard,
  WeatherCard,
  UserOnboarding,
} from "./components";

function App() {
  return (
    <>
      <BackroundImage />
      <TimeCard />
      <UserOnboarding />
      <WeatherCard />
      <QuoteCard />
    </>
  );
}

export default App;
