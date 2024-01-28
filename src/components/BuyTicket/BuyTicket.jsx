import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useCustomNavigation } from "../navigationUtils";
import "./buyTicket.css"; // Make sure to create and import your CSS file

export default function BuyTicket() {
  const { navigateToBookForm } = useCustomNavigation(); // Use the navigation utility

  return (
    <section className="container">
      <div className="buytickets">
        <div className="left">
          <div className="AboutEvent">À propos de l'événement</div>
          <div className="head">Chers diplômés et familles,</div>
          <div className="description">
            Nous sommes ravis d'annoncer que les réservations de billets pour
            notre prochaine cérémonie des diplômes 2024 sont ouvertes ! Veuillez
            réserver vos billets et assurez-vous que vos proches puissent se
            joindre à nous pour honorer vos réalisations. Les places sont
            limitées, alors ne tardez pas – réservez vos places dès aujourd'hui
            et faites de cette remise des diplômes un moment inoubliable !
          </div>

          <div className="DateTime">
            <div className="location">
              <div>
                <FontAwesomeIcon icon={faGlobe} />
              </div>
              <div className="Data-content">
                <div> Où</div>
                <div>Lycée Français du Caire </div>
              </div>
            </div>
            <div className="date">
              <div>
                <FontAwesomeIcon icon={faCalendarDays} />
              </div>
              <div className="Data-content">
                <div> Quand</div>
                <div>Le jeudi 27 Juin 2024 </div>
              </div>
            </div>
          </div>

          <div className="button-buy-tickets" onClick={navigateToBookForm}>
            <div>Reserve maintenant</div>
          </div>
        </div>

        <div className="right">
          <img
            src="https://www.propertyfinder.eg/blog/wp-content/uploads/2020/03/lycee-francais-du-caire-facade-800x439.jpg"
            alt=""
          />
          {/* <img
            src="https://voelas.dan-fisher.dev/images/home-1-02-270x257.jpg"
            alt=""
          /> */}
        </div>
      </div>
    </section>
  );
}
