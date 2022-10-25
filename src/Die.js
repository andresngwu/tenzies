import React from "react";


export default function Die(props){
    return (
        <div 
        className={`die ${props.isHeld ? "die--isHeld" : ""}`}
        onClick={() => props.holdDice(props.id)} >
            <h2>{props.value}</h2>
        </div>
    );
}