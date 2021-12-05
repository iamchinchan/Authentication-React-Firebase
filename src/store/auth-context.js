import React, { useState } from "react";
const AuthContext = React.createContext({
  token: null,
  isLoggedIn: false.valueOf,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime =(expiringTime)=>{
  const currentTime = new Date().getTime();
  const expectedExpiringTime = new Date(expiringTime).getTime();
  const remainingTime = expectedExpiringTime-currentTime;
  return remainingTime; 
}

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setIsToken] = useState(initialToken);
  const userIsLoggeedIn = !!token;
  
  const onLogoutHandler = () => {
    setIsToken(null);
    localStorage.removeItem('token');
  };
  const onLoginHandler = (token) => {
    setIsToken(token);
    localStorage.setItem('token',token);
    // const remainingTime = calculateRemainingTime(expiringTime);
    // console.log("remaining time is:",remainingTime); 
    // setTimeout(onLogoutHandler,remainingTime);
  };
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggeedIn,
    login: onLoginHandler,
    logout: onLogoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
