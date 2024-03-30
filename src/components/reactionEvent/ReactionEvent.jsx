import { motion } from 'framer-motion';
import React, { useState } from 'react';
import reactions from './reactions.json';
import './reactionEvent.css';

localStorage.setItem(1, "+");
localStorage.setItem(2, "+");

const operatorsList = [{
        index: 1,
        allSymbols: []
    },
    {
        index: 2,
        allSymbols: []
    }
];

const ReactionEvent = () => {
    var arrow = '=>';
    var backArrow = '<=';

    const Element = (index) => {
        const [symbol, setSymbol] = useState(localStorage.getItem(`${index.index}`));

        let correctColor = "";
        if (symbol === "+") {
            correctColor = "reactions__reactionEvent-element_default";
        } else {
            correctColor = "reactions__reactionEvent-element_specified";
        }
        
        const [bgColor, setBgColor] = useState(correctColor);

        const [storedElements, setStoredElements] = useState([]);

        const changeValue = () => {
            if (localStorage.getItem("symbol") !== null) {
                if (symbol === "+") {
                    setSymbol(localStorage.getItem("symbol"));
                    localStorage.setItem(`${index.index}`, localStorage.getItem("symbol"));
                } else {
                    setSymbol(symbol + localStorage.getItem("symbol"));
                    localStorage.setItem(`${index.index}`, symbol + localStorage.getItem("symbol"));
                }
                storedElements.push(localStorage.getItem("symbol"));
                setBgColor("reactions__reactionEvent-element_specified");

                operatorsList.map((i) => {
                    if (i.index === index.index) {
                        i.allSymbols.push(localStorage.getItem("symbol"));
                    }
                    return (
                        <></>
                    )
                })

                localStorage.removeItem("symbol");
            }
        }

        const clearValue = () => {
            setSymbol("+");
            setBgColor("reactions__reactionEvent-element_default");
            setErrorMsg("");
            setStoredElements([]);
            localStorage.setItem(`${index.index}`, "+");

            operatorsList.map((i) => {
                if (i.index === index.index) {
                    i.allSymbols.splice(0, i.allSymbols.length);
                }
                return (
                    <></>
                )
            })
        }

        return (
            <div className={bgColor}
            onClick={clearValue} 
            onMouseUp={changeValue}>
                <p>{symbol}</p>
            </div>
        )
    }

    const RenderElements = () => {
        return (
            <div className='reactions__reactionEvent-operation'>
                {operatorsList.map((i) => {
                    if (i.index === 1) {
                        return (
                            <div key={i.index}>
                                <Element index={i.index}/>
                            </div>
                        )
                    } else {
                        return (
                            <div key={i.index} className='reactions__reactionEvent-operation'>
                                <div className='reactions__reactionEvent-connector'>
                                    <p>+</p>
                                </div>
                                <Element index={i.index}/>
                            </div>
                        )
                    }
                })}
                <div className='reactions__reactionEvent-result_button'>
                    <motion.p whileHover={{ color: "rgb(159, 166, 248)" }} onClick={PerformReaction}>{arrow}</motion.p>
                </div>
            </div>
        )
    }

    const [pageStatus, setPageStatus] = useState("start");
    const [errorMsg, setErrorMsg] = useState("");

    const [animOpacity, setAnimOpacity] = useState(1);
    const [animX, setAnimX] = useState(0);

    const [allResults, setAllResults] = useState([]);
    const [finalResult, setFinalResult] = useState([]);

    function PerformReaction() {
        let letItPass = true;
        let operatorsSize = 0;

        operatorsList.map((operator) => {
            if (operator.allSymbols.length === 0) {
                letItPass = false;
            }
            operatorsSize = operatorsSize + operator.allSymbols.length;
            return (
                <></>
            )
        })

        if (letItPass === true) {
            reactions.map((reaction) => {
                let validElements = 0;
                let substances = 0;
                reaction.substances.map((substance) => {
                    substance.map((element) => {
                        substances = substances + 1;
                        operatorsList.map((operatior) => {
                            if (operatior.allSymbols.includes(element.symbol) && operatior.allSymbols.length === substance.length) {
                                validElements = validElements + 1;
                            }
                            return (
                                <></>
                            )
                        })
                        return (
                            <></>
                        )
                    })
                    return (
                        <></>
                    )
                })
                if (validElements === operatorsSize && validElements === substances) {
                    reaction.results.map((result) => {
                        allResults.push(result);
                        return (
                            <></>
                        )
                    })
                }
                return (
                    <></>
                )
            })
            if (allResults.length !== 0) {
                allResults.map((result) => {
                    let symbol = "";
                    result.map((element) => {
                        symbol = symbol + element.symbol;
                        return (
                            <></>
                        )
                    })
                    finalResult.push(symbol);
                    return (
                        <></>
                    )
                })
                setErrorMsg("");
                setAnimX(-100);
                setAnimOpacity(0);
                setPageStatus("finish");
            } else {
                setAllResults([]);
                setErrorMsg("Reaktsiooni ei eksisteeri");
                setAnimX(0);
                setAnimOpacity(1);
            }
        } else {
            setAllResults([]);
            setErrorMsg("Reaktsiooni ei eksisteeri");
            setAnimX(0);
            setAnimOpacity(1);
        } 
    }

    const ShowResult = () => {
        let number = 0;
        return (
            <div className='reactions__reactionEvent-operation'>
                <div className='reactions__reactionEvent-result_button'>
                    <motion.p whileHover={{ color: "rgb(159, 166, 248)" }} onClick={BackToCreation}>{backArrow}</motion.p>
                </div>

                {finalResult.map((element) => {
                    if (number === 0) {
                        number = number + 1;
                        return (
                            <div key={element} className="reactions__reactionEvent-element_specified">
                                <p>{element}</p>
                            </div>
                        )
                    } else {
                        return (
                            <div key={element} className='reactions__reactionEvent-operation'>
                                <div className='reactions__reactionEvent-connector'>
                                    <p>+</p>
                                </div>

                                <div className="reactions__reactionEvent-element_specified">
                                    <p>{element}</p>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }

    function BackToCreation() {
        setFinalResult([]);
        setAllResults([]);
        setPageStatus("start");
    }

    const ShowContent = () => {
        if (pageStatus === "start") {
            return (
                <div className='reactions__reactionEvent'>
                    <motion.div animate={{ opacity: 1, x: 0 }} initial={{ opacity: animOpacity, x: animX }} transition={{ duration: 1.5 }} className='reactions__reactionEvent-operation'>
                        <RenderElements />
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
                        <ShowResult />
                    </motion.div>
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
