import { useEffect, useState } from "react";
import { useOnboardingContext } from "../../context/user-context";
import "./useronboarding.css";

export default function UserOnboarding() {
  const { userDetails, setUserDetails } = useOnboardingContext();
  const { onboardingStatus } = userDetails;
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [userStatus, setUserStatus] = useState(false);
  const [userLocation, setUserLocation] = useState("");
  const [autoLocation, setAutoLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const emptyTextValidation = (e) => {
    const input = e.target.value;
    const trimmedInput = input.trim();
    setUserName(trimmedInput);
  };

  const onboardingHandler = () => {
    try {
      var userInfo = {
        name: userName,
        city: userLocation,
        geoLocation: autoLocation,
      };
      setUserDetails({
        ...userDetails,
        onboardingStatus: true,
        userInfo: userInfo,
      });
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } catch (error) {
      console.log(error);
    }
  };
  const clickHandler = (e) => {
    setUserStatus(true);
    var form = document.getElementById("myForm");
    form.value = "";
  };

  useEffect(() => {
    if (autoLocation.latitude !== null) {
      onboardingHandler();
    }
  }, [autoLocation]);

  useEffect(() => {
    if (onboardingStatus) {
      const getUserName = async () => {
        try {
          const objectContent = localStorage.getItem("userInfo");
          const userObject = JSON.parse(objectContent);
          setUserName(userObject.name);
          const welcomeMessage = localStorage.getItem("welcomeMessage");
          setMessage(welcomeMessage);
        } catch (error) {
          console.log(error);
        }
      };
      getUserName();
    }
  });

  const userNameHandler = (e) => {
    if (e.key === "Enter" && userName !== "") {
      clickHandler();
    }
  };
  const cityKeyHandler = (e) => {
    if (e.key === "Enter" && userLocation !== "") {
      onboardingHandler();
    }
  };
  return (
    <>
      <div>
        {onboardingStatus ? (
          <>
            <div className="welcome-msg">
              {message} {userName}
            </div>
          </>
        ) : userStatus ? (
          <>
            <div className="userInfo-container">
              <div className="userInfo">Which City do you live in ?</div>
              <input
                onKeyPress={(e) => cityKeyHandler(e)}
                onChange={(e) => setUserLocation(e.target.value)}
                className="user-input"
              />
              <h2>OR</h2>
              <div
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                      setAutoLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                      });
                    });
                  }
                  onboardingHandler();
                }}
                className="auto-detection"
              >
                <i className="fa-solid fa-location-crosshairs"></i>
                <p>Automatically Detect Your Location</p>
              </div>
              <div className="btn-container">
                <button
                  disabled={
                    userLocation?.trim() === "" && autoLocation.latitude === null
                  }
                  onClick={() => onboardingHandler()}
                  className="btn-continue"
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="userInfo-container">
              <div className="userInfo">Hello, What's your name ?</div>
              <input
                onKeyPress={(e) => userNameHandler(e)}
                id="myForm"
                onChange={(e) => emptyTextValidation(e)}
                className="user-input"
              />
              <div className="btn-container">
                <button
                  disabled={userName === ""}
                  onClick={clickHandler}
                  className="btn-continue"
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export { UserOnboarding };
