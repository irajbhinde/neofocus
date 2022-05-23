import { useState, useEffect } from "react";
import "../TimeComponent/timecard.css"

export default function TimeCard() {
  const [time, setTime] = useState(new Date());
  const [message, setMessage] = useState("")
  useEffect(() => {
    var timer = setInterval(() => setTime(new Date()), 1000);
    var hour = today.getHours();
    if(hour >= 0 && hour < 12 ){
      setMessage("Good Morning,")
      localStorage.setItem("welcomeMessage",message)
    }
    else if (hour >= 12 && hour <= 17) {
      setMessage("Good Afternoon,")
      localStorage.setItem("welcomeMessage",message)
    }
    else{
      setMessage("Good Evening,")
      localStorage.setItem("welcomeMessage",message)
    }
  
    return function cleanup() {
      clearInterval(timer);
    };
  });

  var today = new Date();
  if(today.getMinutes() < 10){
    var minutes = "0" + today.getMinutes();
  }else{
    var minutes = today.getMinutes();
  }
  var timeFormat = today.getHours() + ":" + minutes;

  return <h1 className="time_container">{timeFormat}</h1>;
}
