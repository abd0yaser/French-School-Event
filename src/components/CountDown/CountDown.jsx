import React, { useState, useEffect } from "react";
import "./countDown.css";

export default function CountDown() {
  const [countdown, setCountdown] = useState({
    Jours: 32,
    heures: 20,
    minutes: 51,
    seconds: 3,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Update countdown values
      setCountdown((prevCountdown) => {
        const { days, hours, minutes, seconds } = prevCountdown;

        // Check if any value is greater than 0 before decrementing
        if (seconds > 0) {
          return { ...prevCountdown, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { ...prevCountdown, minutes: minutes - 1, seconds: 59 };
        } else if (hours > 0) {
          return {
            ...prevCountdown,
            hours: hours - 1,
            minutes: 59,
            seconds: 59,
          };
        } else if (days > 0) {
          return {
            ...prevCountdown,
            days: days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }

        // If all values are 0, clear the interval
        clearInterval(interval);
        return prevCountdown;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Separate the tens and units digit of the seconds
  const tensDigit = Math.floor(countdown.seconds / 10);
  const unitsDigit = countdown.seconds % 10;

  return (
    <div className="countdown-container ">
      <div className="backgroundColor"></div>
      <div className="countdown-content">
        <div className="TimeRunningOut">Le temps passe</div>
        <div className="BookYourTicket">Réservez votre billet</div>
        <div className="paragraph">
          Malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat
          vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet
          quam egestas semper. Aenean ultricies mi vitae est.
        </div>

        <div className="data">
          {Object.entries(countdown).map(([unit, value]) => (
            <div key={unit} className="countdown-item">
              <div className="countdown-value">
                {unit.toLowerCase() === "seconds" ? (
                  <>
                    <div>{tensDigit}</div>
                    <div>{unitsDigit}</div>
                  </>
                ) : (
                  value
                )}
              </div>
              <div className="countdown-title">{unit.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
