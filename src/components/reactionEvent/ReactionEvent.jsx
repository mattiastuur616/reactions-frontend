import { motion } from 'framer-motion';
import React, { useState } from 'react';
import reactions from './reactions.json';
import './reactionEvent.css';

const ReactionEvent = () => {
    var arrow = '=>';
    var backArrow = '<=';

    const [pageStatus, setPageStatus] = useState("start");

    const [elementSymbol1, setElementSymbol1] = useState("+");
    const [elementColor1, setElementColor1] = useState("reactions__reactionEvent-element_default")

    const [elementSymbol2, setElementSymbol2] = useState("+");
    const [elementColor2, setElementColor2] = useState("reactions__reactionEvent-element_default")

    const [errorMsg, setErrorMsg] = useState("");

    const [explanation, setExplanation] = useState("");
    const [result1, setResult1] = useState("");
    const [result2, setResult2] = useState("");

    const [animOpacity, setAnimOpacity] = useState(1);
    const [animX, setAnimX] = useState(0);

    const changeElement1 = () => {
        if (localStorage.getItem("symbol") !== null) {
            if (elementSymbol1 === "+") {
                setElementSymbol1(localStorage.getItem("symbol"));
            } else {
                setElementSymbol1(elementSymbol1 + localStorage.getItem("symbol"));
            }
            setElementColor1("reactions__reactionEvent-element_specified");
            localStorage.removeItem("symbol");
        }

        setAnimOpacity(1);
        setAnimX(0);
        setErrorMsg("");
    }

    const changeElement2 = () => {
        if (localStorage.getItem("symbol") !== null) {
            if (elementSymbol2 === "+") {
                setElementSymbol2(localStorage.getItem("symbol"));
            } else {
                setElementSymbol2(elementSymbol2 + localStorage.getItem("symbol"));
            }
            setElementColor2("reactions__reactionEvent-element_specified");
            localStorage.removeItem("symbol");
        }

        setAnimOpacity(1);
        setAnimX(0);
        setErrorMsg("");
    }

    const showResult = () => {
        reactions.map((reaction) => {
            if ((reaction.element1 === elementSymbol1 || reaction.element1 === elementSymbol2) 
            && (reaction.element2 === elementSymbol1 || reaction.element2 === elementSymbol2)) {
                setResult1(reaction.result1);
                setResult2(reaction.result2);
                setExplanation(reaction.text);
                
                setPageStatus("finish");
                setAnimOpacity(0);
                setAnimX(-100);

                setErrorMsg("");
            } else {
                setErrorMsg("Element puudu või ei eksisteeri tulemust");
            }
            return (
                <></>
            )
        })
    }

    const backToCreation = () => {
        setResult1("");
        setResult2("");

        setExplanation("");
        setPageStatus("start");
    }

    const ShowContent = () => {
        if (pageStatus === "start") {
            return (
                <div className='reactions__reactionEvent'>
                    <motion.div animate={{ opacity: 1, x: 0 }} initial={{ opacity: animOpacity, x: animX }} transition={{ duration: 1.5 }} className='reactions__reactionEvent-operation'>
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
                            <motion.p whileHover={{ color: "rgb(159, 166, 248)" }} onClick={showResult}>{arrow}</motion.p>
                        </div>
                    </motion.div>

                    <motion.div animate={{ x: 0 }} initial={{ x: -100 }} transition={{ type: "spring" }} className='reactions__reactionEvent-error'>
                        <p>{errorMsg}</p>
                    </motion.div>

                    <div className='reactions__reactionEvent-instruction'>
                        <p>Lohista elemendid siia</p>
                        <p>Eemaldamiseks kliki lisatud elemendile</p>
                    </div>
                </div>
            )
        } else if (pageStatus === "finish") {
            return (
                <div className='reactions__reactionEvent'>
                    <motion.div animate={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 100 }} transition={{ duration: 1.5 }} className='reactions__reactionEvent-operation'>
                        <div className='reactions__reactionEvent-result_button'>
                            <motion.p whileHover={{ color: "rgb(159, 166, 248)" }} onClick={backToCreation}>{backArrow}</motion.p>
                        </div>

                        <div className={elementColor1}>
                            <p>{result1}</p>
                        </div>

                        <div className='reactions__reactionEvent-connector'>
                            <p>+</p>
                        </div>

                        <div className={elementColor1}>
                            <p>{result2}</p>
                        </div>
                    </motion.div>

                    <div className='reactions__reactionEvent-instruction'>
                        <p>{explanation}</p>
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            <ShowContent />
        </div>
    )
}

export default ReactionEvent
