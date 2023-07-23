import React, { useEffect, useState, useContext } from "react";
import "./Setavatar.css";
import axios from "axios";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../API/api.js";
import Loader from "../../components/Loader/Loader";
import AuthContext from "../../auth/authContext";
import { BiError } from 'react-icons/bi';

function Setavatar() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarError, setavatarError] = useState('');

  const api = `https://api.multiavatar.com/`;
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const setProfile = async() => {
    if (selectedAvatar === undefined) {
      setavatarError('Please choose an avatar!')
      setTimeout(() => {
        setavatarError(null);
      }, 3000);
      return;
    } else {
      const data = {
        avatar: avatars[selectedAvatar],
      };
      try {
        console.log(authContext.userId)
        await axios.post(
          `${baseUrl}/user/avatar/${authContext.userId}`,
          data
        )
        .then((res) => {
        if (res.status === 200) {
          navigate("/");
        } else {
          setavatarError(res.data.message);
          setTimeout(() => {
            setavatarError(null);
          }, 3000);
          return;
        }
      });
      } catch (error) {
        console.log(error);
      }
    }
  }

  const fetchAvatar = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      setIsLoading(true);
      await axios.get(
        `${api}/${Math.round(Math.random() * 10000)}
        }`
      ).then((image) => {
        const buffer = new Buffer.from(image.data);
        const base64 = buffer.toString("base64");
        data.push(base64);
      }).catch((error) => {
        alert('Avatar is not available currently!')
        navigate('/');
      })
    }
    setAvatars(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="avatar_container">
          <div className="avatar_box">
            <div className="avatar_title">
              <h1>Choose your avatar</h1>
            </div>
            <div className="avatar_images">
              {avatars.map((avatar, index) => {
                return (
                  <div
                    className={`avatar ${
                      selectedAvatar === index ? "selected" : ""
                    }`}
                    key={index}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${avatar}`}
                      className="avatar_image"
                      alt="avatar"
                      key={avatar}
                      onClick={() => setSelectedAvatar(index)}
                    />
                  </div>
                );
              })}
            </div>
            <div className="avatar_button_container">
            {avatarError && <p class="error_text"><BiError /> {avatarError}</p>}
              <button
                onClick={setProfile}
                className="avatar_button"
              >
                Choose Avatar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Setavatar;
