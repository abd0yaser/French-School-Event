import React from "react";
import MyNav from "./MyNav/MyNav";
import EventTitle from "./EventTitle/EventTitle";
import CountDown from "./CountDown/CountDown";
import BuyTicket from "./BuyTicket/BuyTicket";

export default function Main() {
  return (
    <div>
      <MyNav />

      <EventTitle />
      <CountDown />
      <BuyTicket />
    </div>
  );
}
