import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Setavatar from "./pages/Setavatar/Setavatar";
import "./App.css";
import AuthContext from "./auth/authContext";
import NotFound from "./pages/404/NotFound";

function App() {
  const authContext = React.useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(()=>{
    (!authContext.isUserLoggedIn && navigate('/login'))
  },[authContext.isUserLoggedIn])
  return (
      <Routes>
        {authContext.isUserLoggedIn && <Route path="/" element={<Chat />} />}
        {!authContext.isUserLoggedIn && <Route path="/login" element={<Login />} />}
        {!authContext.isUserLoggedIn && <Route path="/register" element={<Register />} />}
        {authContext.isUserLoggedIn && <Route path="/setavatar" element={<Setavatar />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
