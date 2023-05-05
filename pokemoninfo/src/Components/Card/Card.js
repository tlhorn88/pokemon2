import React from "react";
import './Card.css';

const Card = (props) => {
    const typeToClass = {
        normal: 'normal',
        fire: 'fire',
        fighting: 'fighting',
        water: 'water',
        flying: 'flying',
        poison: 'poison',
        grass: 'grass',
        electric: 'electric',
        ground: 'ground',
        psychic: 'psychic',
        rock: 'rock',
        ice: 'ice',
        bug: 'bug',
        dragon: 'dragon',
        ghost: 'ghost',
        dark: 'dark',
        steel: 'steel',
        fairy: 'fairy'
    }

    return (
        <div className="card">
            <div className="pokeName">
                <h1 className="title">{props.name.toUpperCase()}</h1>
            </div>
            <p className="colorText">{props.flavorText}</p>
            <div className="typeArea">
                <h5 className={`type ${typeToClass[props.type1]}`}>{props.type1}</h5>
                <h5 className={`type ${typeToClass[props.type2]}`}>{props.type2}</h5>
            </div>
            <img className="image" alt="" src={(`${props.img}`)}
            />
        </div>
        )
    }

export default Card;