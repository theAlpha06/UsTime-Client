import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactTypingEffect from "react-typing-effect";
import "./Login.css";
import axios from "axios";
import { baseUrl } from "../../API/api.js";
import AuthContext from "../../auth/authContext";
import Loader from "../../components/Loader/Loader";
import { BiError } from 'react-icons/bi';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const clietId = '601397706760-3od9siogho9pvcivv36tr8a0oe7mruo6.apps.googleusercontent.com';

function Login() {
  const [usernameoremail, setUsernameoremail] = useState("");
  const [Password, setPassword] = useState("");
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [passwordError, setpasswordError] = useState('');
  const [fieldError, setfieldError] = useState('');
  const [userError, setuserError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (userData) => {
    await axios.post(`${baseUrl}/auth/login`, userData)
      .then((res) => {
        if (res.status === 200) {
          const user = {
            token: res.data.token,
            userId: res.data.userId,
            expiresIn: res.data.expiresIn,
            isFirstLogin: res.data.isFirstLogin,
          }
          authContext.login(user);
          // if (!res.data.isFirstLogin) {
          navigate("/");
          // }
        } else if (res.status === 208) {
          setIsLoading(false);
          if (res.data.message.includes('User')) {
            setuserError(res.data.message);
            setTimeout(() => {
              setuserError(null);
            }, 3000);
            return;
          } else if (res.data.message.includes('password')) {
            setpasswordError(res.data.message);
            setTimeout(() => {
              setpasswordError(null);
            }, 3000);
            return;
          }
        }
        else {
          setfieldError(res.data.message);
          setTimeout(() => {
            setfieldError(null);
          }, 3000);
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (usernameoremail === '' || Password === '') {
      setfieldError('Please fill all the fields');
      setTimeout(() => {
        setfieldError(null);
      }, 3000);
      return;
    }
    const userData = {
      usernameoremail: usernameoremail,
      password: Password,
    }
    handleLogin(userData);
  }

  const handleGoogleLogin = async (credentialResponse) => {
    let decoded = jwt_decode(credentialResponse.credential);
    let user = {
      usernameoremail: decoded.email,
      password: decoded.sub
    }
    handleLogin(user);
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main className="register">
          <div className="register_container">
            <div className="register_logo">
              <div className="register_logo_container">
                <img
                  src="/images/UT.png"
                  alt="UsTime Logo"
                  className="register_logo_img"
                />
              </div>
              <div className="register_logo_desc">
                <h1 className="register_logo_heading">
                  Welcome to <span className="app_name">UsTime</span>
                </h1>
                <p className="register_logo_tagline">
                  Spend quality time with your{" "}
                  <span className="typing">
                    <ReactTypingEffect
                      text={[" Family.", " Friends.", " Relatives."]}
                      speed={100}
                      eraseSpeed={100}
                      eraseDelay={1000}
                      typingDelay={1000}
                    />
                  </span>
                </p>
              </div>
            </div>
            <div className="register_google">
              <GoogleOAuthProvider clientId={clietId}>
                <GoogleLogin
                  onSuccess={credentialResponse => {handleGoogleLogin(credentialResponse)}}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
              </GoogleOAuthProvider>
            </div>
            <div className="login_or">
              <div className="login_or_line"></div>
              <p className="login_or_text">OR</p>
              <div className="login_or_line"></div>
            </div>
            <div className="register_field">
              {fieldError && <p class="error_text"><BiError /> {fieldError}</p>}
              <form className="register_field_name">
                <input
                  type="text"
                  placeholder="Username / Email"
                  onChange={(e) => setUsernameoremail(e.target.value)}
                  autoComplete="off"
                  required
                />
                {userError && <p class="error_text"><BiError /> {userError}</p>}
                <input
                  type="password"
                  placeholder="Password"
                  required
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <p class="error_text"><BiError /> {passwordError}</p>}
              </form>
              <div className="register_field_button">
                <button className="register_btn" onClick={(e) => {handleLoginSubmit(e)}}>Login</button>
                <p className="register_account_text">
                  Don't have an account ?{" "}
                  <Link to="/register">
                    <span className="register_login_link">Register</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </main>
      )
      }
    </>
  );
}

export default Login;
