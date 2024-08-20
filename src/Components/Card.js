import React,{useEffect} from "react";

import './card.css'
export default function Card({image ,name, time   }) {

  return (
    <div className="card">
      <img className="card-img-top" src={image} alt="Card " />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{time}</p>
      </div>
    </div>
  );
}
