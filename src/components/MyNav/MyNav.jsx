// MyNav.js

import React from "react";
import { Link } from "react-router-dom";
import { useCustomNavigation } from "../navigationUtils";
import "./nav.css"; // Import the CSS file

const MyNav = () => {
  const { navigateToBookForm } = useCustomNavigation();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src="https://www.lfcaire.org/wp-content/uploads/2021/05/logo-lfcaire-1-copie.png"
          alt="Logo"
        />
      </div>
      <div className="navbar-buttons">
        <button className="buy-now-button" onClick={navigateToBookForm}>
          Reserve maintenant
        </button>
      </div>
    </nav>
  );
};

export default MyNav;
