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
      <TimeCard />
      <UserOnboarding />
      <Focus />
      <WeatherCard />
      <QuoteCard />
    </>
  );
}

export default App;
