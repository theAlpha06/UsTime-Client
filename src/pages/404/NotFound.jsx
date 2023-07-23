import React from "react";
import "./NotFound.css";

function NotFound() {
  return (
    <>
      <div className="notfound_container">
        <div className="notfound_bg"></div>
        <div className="notfound">
          <h1>Oops! Page Not Found.</h1>
          <p className="notfound_text">
            Sorry, the page you're looking for either doesn't exist or you don't
            have access to it.
          </p>
        </div>
      </div>
    </>
  );
}

export default NotFound;
