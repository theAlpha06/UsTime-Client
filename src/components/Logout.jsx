import React, { useContext } from 'react'
import { BiLogOut } from 'react-icons/bi';
import AuthContext from "../auth/authContext";
import { useNavigate } from "react-router-dom";

function Logout() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    authContext.logout();
    navigate('/login');
  }
  return (
    <div onClick={handleLogout}>
      <BiLogOut size={30} />
    </div>
  )
}

export default Logout