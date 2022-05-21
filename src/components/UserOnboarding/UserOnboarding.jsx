import { useEffect, useState } from "react";
import { useOnboardingContext } from "../../context/user-context";
import "./useronboarding.css";

export default function UserOnboarding() {
  const { userDetails, setUserDetails } = useOnboardingContext();
  const { onboardingStatus } = userDetails;
  const [userName, setUserName] = useState("");
  const [userStatus, setUserStatus] = useState(false);
  const [userLocation, setUserLocation] = useState("Mumbai");
  const onboardingHandler = () => {
    try {
      const userInfo = {
        name: userName,
        city: userLocation,
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
    if (onboardingStatus) {
      const getUserName = async () => {
        try {
          const objectContent = localStorage.getItem("userInfo");
          const userObject = JSON.parse(objectContent);
          setUserName(userObject.name);
        } catch (error) {
          console.log(error);
        }
      };
      getUserName();
    }
  });

  return (
    <>
      <div className="centered">
        {onboardingStatus ? (
          <>
            <div className="welcome-msg">Hello {userName}</div>
          </>
        ) : userStatus ? (
          <>
            <div className="userInfo-container">
              <div className="userInfo">Which City do you live in ?</div>
              <input
                onChange={(e) => setUserLocation(e.target.value)}
                className="user-input"
              />
              <div className="btn-container">
                <button
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
                id="myForm"
                onChange={(e) => setUserName(e.target.value)}
                className="user-input"
              />
              <div className="btn-container">
                <button onClick={clickHandler} className="btn-continue">
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
