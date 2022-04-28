import { useState, useEffect } from "react";

export default function TimeCard() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    var timer = setInterval(() => setTime(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  var today = new Date();
  var timeFormat = today.getHours() + ":" + today.getMinutes();

  return <h1>{timeFormat}</h1>;
}
