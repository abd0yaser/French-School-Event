import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./bookForm.css";
import Spinner from "react-bootstrap/Spinner";

const TicketForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketCount, setTicketCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const ticketPrice = 1600;

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
    setIsLoading(true);

    const totalPrice = calculateTotalPrice();

    const apiEndpoint = "https://api.shopimix.com/api/general";
    const requestBody = {
      ConnectionStringName: "FrenshSchool",
      StoredProcedureName: "Unauthorized.InsertTransaction",

      SpParams: { amount: calculateTotalPrice(), name: name, mobile: "" },
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
        window.location.href = `https://pay.advansystelecom.com/TMEPayments/RedirectTo?serviceID=15&serviceGatewayId=0&merchantRefNo=${orderID}&inquireInfo=${orderID}&amount=${totalPrice}`;
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
          Email:
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        {/* <button className="buy-button" type="button" onClick={handleBuyClick}>
          Réserver maintenant
        </button> */}
        <button
          type="submit"
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
