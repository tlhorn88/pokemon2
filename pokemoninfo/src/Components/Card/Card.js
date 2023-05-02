import React from "react";
import './Card.css';

const Card = (props) => {
    return (
            <div className="card">
                <h1>{props.name}</h1>
                <h5>{props.type1}</h5>
                <h5>{props.type2}</h5>
                <img alt="" src={(`${props.img}`)}
                />
            </div>
        )
    }

export default Card;