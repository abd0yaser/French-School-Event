import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faGlobe } from "@fortawesome/free-solid-svg-icons";
import "./eventTitle.css"; // Import the stylesheet

export default function EventTitle() {
  return (
    <section className="event-title-section">
      <div className="containerr">
        <div className="event-title-container">
          <svg
            className="badge-promo-icon"
            width="319"
            height="49"
            viewBox="0 0 319 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="svg-gradient-primary"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#FF8C00", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#FF00FF", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0H319L299 25L319 49H0L20 25L0 0Z"
              fill="rgba(217, 14, 144, 0.5)"
            ></path>
            <path
              opacity="0.08"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0H319L299 25L319 49L0 0Z"
              fill="white"
            ></path>
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="white"
              fontFamily="Arial"
              fontSize="16"
              fontWeight="bold"
            >
              Réservez votre billet
            </text>
          </svg>
          <div className="Hurry">
            Dépêchez-vous ! Ne perdez pas de temps et réservez maintenant
          </div>
          <div className="BigEvent">Prochaine cérémonie des diplômes 2024</div>
          <div className="DateTime">
            <div className="location">
              <div>
                <FontAwesomeIcon icon={faGlobe} />
              </div>
              <div className="Data">
                <div> Où</div>
                <div>Lycée Français du Caire </div>
              </div>
            </div>
            <div className="date">
              <div>
                <FontAwesomeIcon icon={faCalendarDays} />
              </div>
              <div className="Data">
                <div> Quand</div>
                <div>Le jeudi 27 Juin 2024 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
