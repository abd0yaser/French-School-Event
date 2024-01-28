import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./bookForm.css";

const TicketForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketCount, setTicketCount] = useState(1);
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
    navigate("/payment");
  };

  return (
    <div className="book-form-container">
      <h2 className="book-form-header">Réservation maintenant</h2>
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

        <p className="total-price">Prix ​​total: {calculateTotalPrice()} LE</p>
        <button className="buy-button" type="button" onClick={handleBuyClick}>
          Reserve maintenant
        </button>
      </form>
    </div>
  );
};

export default TicketForm;
