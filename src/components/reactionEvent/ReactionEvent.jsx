import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './reactionEvent.css';

const ReactionEvent = () => {
    var arrow = '=>';

    const [elementSymbol1, setElementSymbol1] = useState("+");
    const [elementColor1, setElementColor1] = useState("reactions__reactionEvent-element_default")

    const [elementSymbol2, setElementSymbol2] = useState("+");
    const [elementColor2, setElementColor2] = useState("reactions__reactionEvent-element_default")

    const changeElement1 = () => {
        if (elementSymbol1 === "+") {
            setElementSymbol1(localStorage.getItem("symbol"));
        } else {
            setElementSymbol1(elementSymbol1 + localStorage.getItem("symbol"));
        }
        setElementColor1("reactions__reactionEvent-element_specified");
        localStorage.removeItem("symbol");
    }

    const changeElement2 = () => {
        if (elementSymbol2 === "+") {
            setElementSymbol2(localStorage.getItem("symbol"));
        } else {
            setElementSymbol2(elementSymbol2 + localStorage.getItem("symbol"));
        }
        setElementColor2("reactions__reactionEvent-element_specified");
        localStorage.removeItem("symbol");
    }

    return (
        <div className='reactions__reactionEvent'>
            <div className='reactions__reactionEvent-operation'>
                <div className={elementColor1} 
                onClick={() => {setElementSymbol1("+"); 
                setElementColor1("reactions__reactionEvent-element_default")}} 
                onMouseUp={changeElement1}>
                    <p>{elementSymbol1}</p>
                </div>

                <div className='reactions__reactionEvent-connector'>
                    <p>+</p>
                </div>

                <div className={elementColor2}
                onClick={() => {setElementSymbol2("+"); 
                setElementColor2("reactions__reactionEvent-element_default")}} 
                onMouseUp={changeElement2}>
                    <p>{elementSymbol2}</p>
                </div>

                <div className='reactions__reactionEvent-result_button'>
                    <motion.p whileHover={{ color: "rgb(159, 166, 248)" }}>{arrow}</motion.p>
                </div>
            </div>

            <div className='reactions__reactionEvent-instruction'>
                <p>Lohista elemendid siia</p>
            </div>
        </div>
    )
}

export default ReactionEvent
