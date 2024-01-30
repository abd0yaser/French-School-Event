import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import "./data.css";

export default function Data() {
  const [studentName, setStudentName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [ticketNumber, setTicketNumber] = useState(0);
  const [maxTicketsFromApi, setMaxTicketsFromApi] = useState(0);
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("ut")) navigate("/");

    const fetchData = async () => {
      let invitationID = search.split("id=")[1];
      console.log(invitationID);

      try {
        if (!invitationID) return;

        const response = await fetch("https://api.shopimix.com/api/General/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ConnectionStringName: "FrenshSchool",
            StoredProcedureName: "Unauthorized.userInfo",
            SpParams: {
              invitationID: invitationID,
            },
          }),
        });

        const data = await response.json();

        const userInfo = data.table1[0] || {};
        setStudentName(userInfo.Name || "");
        setMobileNumber(userInfo.Mobile || "");
        setEmail(userInfo.Email || "");
        setTicketNumber(userInfo.TicketsNumber || 0);
        setMaxTicketsFromApi(userInfo.TicketsNumber || 1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleIncrement = () => {
    if (ticketNumber < maxTicketsFromApi) {
      setTicketNumber(ticketNumber + 1);
    }
  };

  const handleDecrement = () => {
    if (ticketNumber > 0) {
      setTicketNumber(ticketNumber - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      if (ticketNumber === 0) {
        alert("Number of tickets should be greater than 0 .");
        return;
      }

      if (ticketNumber > maxTicketsFromApi) {
        alert("Number of tickets cannot be greater than the maximum allowed.");
        return;
      }

      const response = await fetch("https://api.shopimix.com/api/General/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ConnectionStringName: "FrenshSchool",
          StoredProcedureName: "Unauthorized.ConsumeTickets",
          SpParams: {
            invitationID: search.split("id=")[1],
            ticketsNum: ticketNumber,
          },
        }),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
      } else {
        alert("Form submission failed.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container">
      <div className="scan">
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
            fill="url(#svg-gradient-primary)"
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
            Lycée Français du Caire
          </text>
        </svg>
      </div>
      <div className="information">
        <div>Nom d'étudiant: {studentName}</div>
        <div>Numéro de portable: {mobileNumber}</div>
        <div className="ticket-section">
          <div>numéro de billet</div>
          <div className="ticket-de">
            <button onClick={handleDecrement} disabled={ticketNumber <= 0}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <div className="ticket-number">{ticketNumber}</div>
            <button
              onClick={handleIncrement}
              disabled={ticketNumber >= maxTicketsFromApi}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
      <div>
        <button className="Submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
