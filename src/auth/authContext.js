import { createContext, useState } from 'react';

const AuthContext = createContext({
    token: '',
    isUserLoggedIn: false,
    login: (user) => {},
    logout: () => {}
});

export const AuthContextProvider = (props) => {
  const localtoken = localStorage.getItem('token');
  const user = localStorage.getItem('userId');
  const [userId, setUserId] = useState(user);
  const [token, setToken] = useState(localtoken);
  let userLoggedIn = !!token;

  const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
  };

  const logoutHandler = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiryDate');
    userLoggedIn = false;
  }

  const loginHandler = (user) => {
    setToken(user.token);
    setUserId(user.userId)
    localStorage.setItem('token', user.token);
    localStorage.setItem('userId', user.userId);
    const remainingMilliseconds = 7 * 24 * 60 * 60 * 1000;
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
    localStorage.setItem('expiryDate', expiryDate.toISOString());
    userLoggedIn = true;
    const remainingTime = calculateRemainingTime(expiryDate);
    setTimeout(logoutHandler, remainingTime);
  }

  const contextValue = {
    token: token,
    userId: userId,
    isUserLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
