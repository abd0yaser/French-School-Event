import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "./bookForm.css";

const TicketForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ticketCount, setTicketCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const ticketPrice = 5;

  const calculateTotalPrice = () => {
    return ticketCount * ticketPrice;
  };

  const handleTicketIncrement = () => {
    setTicketCount((prevCount) => Math.min(4, prevCount + 1));
  };

  const handleTicketDecrement = () => {
    setTicketCount((prevCount) => Math.max(1, prevCount - 1));
  };

  const handleBuyClick = () => {
    if (
      name.trim() === "" ||
      phoneNumber.trim() === "" ||
      email.trim() === ""
    ) {
      alert("Remplissez tous les champs s'il vous plaît");
      return;
    }

    if (!/^(010|011|015|012)\d{8}$/.test(phoneNumber)) {
      alert(
        "Numéro de portable invalide. Veuillez entrer un numéro de portable valide."
      );
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert(
        "Adresse e-mail invalide. Veuillez entrer une adresse e-mail valide."
      );
      return;
    }

    setIsLoading(true);

    const totalPrice = calculateTotalPrice();

    const apiEndpoint = "https://api.shopimix.com/api/general";
    const requestBody = {
      ConnectionStringName: "FrenshSchool",
      StoredProcedureName: "Unauthorized.InsertTransaction",
      SpParams: {
        amount: calculateTotalPrice(),
        name: name,
        mobile: phoneNumber,
      },
    };

    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);

        let orderID = data.table1[0].OrderID;
        window.location.href = `https://pay.advansystelecom.com/TMEPayments/RedirectTo?serviceID=15&serviceGatewayId=0&merchantRefNo=${orderID}&inquireInfo=${orderID}&amount=${totalPrice}&mobileNumber=${phoneNumber}`;
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="book-form-container">
      <h2 className="book-form-header">Réservation maintenant</h2>
      <form className="ticket-form">
        <label className="form-label">
          Nom d'étudiant
          <input
            className="form-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="form-label">
          E-mail:
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="form-label">
          Numéro de portable:
          <input
            className="form-input"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>

        <label className="ticket-counter-label">
          Nombre de billets:
          <div className="ticket-counter">
            <button
              className="counter-button"
              type="button"
              onClick={handleTicketDecrement}
            >
              -
            </button>
            <span className="counter-value">{ticketCount}</span>
            <button
              className="counter-button"
              type="button"
              onClick={handleTicketIncrement}
            >
              +
            </button>
          </div>
        </label>

        <p className="total-price">Prix total: {calculateTotalPrice()} LE</p>
        <button
          type="button"
          className="buy-button"
          onClick={handleBuyClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner animation="border" size="sm" role="status" />
          ) : (
            "Réserver maintenant"
          )}
        </button>
      </form>
    </div>
  );
};

export default TicketForm;
