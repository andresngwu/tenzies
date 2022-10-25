import React from "react";
import Die from "./Die";
import {nanoid} from "nanoid";
import Confetti from 'react-confetti';
import useWindowSize from "react-use/lib/useWindowSize";

export default function App(){
    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld);
        const first = dice[0].value;
        const allEqual = dice.every(die => die.value === first);
        if(allHeld && allEqual){
            setTenzies(true);
            console.log("You won!")
        }
    }, [dice]);

    function generateNewDie(){
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        };
    }
    function allNewDice(){
        const dice = [];
        for(let i = 0; i < 10; i++){
            dice.push(generateNewDie())
        }
        return dice;
    }
    
    function getNewDiceElements(){
        if(tenzies){
            setDice(allNewDice());
            setTenzies(false);
        }
        else{           
            setDice(oldDice => oldDice.map(dice => {
                return dice.isHeld ? dice : generateNewDie();
            }));
        }
    }

    function holdDice(id){
        setDice(oldDice => oldDice.map(dice => {
                                        return dice.id === id ? 
                                        {...dice, isHeld:!dice.isHeld} : dice
                                    }));
    } 
    
    const diceElements = dice.map(die => <Die 
                                            key={die.id}
                                            value={die.value} 
                                            isHeld={die.isHeld}
                                            holdDice={holdDice}
                                            id={die.id}
                                        /> );

 
    const { width, height } = useWindowSize()

    return(
        <main className="main-container">
            {tenzies && <Confetti width={width} height={height} />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice--container">
                {diceElements}
            </div>
            <button
             className="roll--btn"
             onClick={getNewDiceElements}
             >{tenzies ? "New Game" : "Roll" }</button>
        </main>
    );
}