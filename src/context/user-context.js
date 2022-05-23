import { createContext, useContext, useState } from "react";

const OnboardingContext = createContext(null);
const useOnboardingContext = () => useContext(OnboardingContext);
const OnboardProvider = ({children}) => {
    const [userDetails, setUserDetails] = useState({
        onboardingStatus : !!localStorage.getItem("userInfo"),
        userInfo : localStorage.getItem("userInfo"),
        todoStatus : !!localStorage.getItem("focusContent")
    })
    return(
        <OnboardingContext.Provider value={{userDetails, setUserDetails}} >
            {children}
        </OnboardingContext.Provider>
    )
} 

export {useOnboardingContext, OnboardProvider}