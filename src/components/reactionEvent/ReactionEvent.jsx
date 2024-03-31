import { motion } from 'framer-motion';
import React, { useState } from 'react';
import reactions from './reactions.json';
import elements from '../element/elementList/elements.json';
import './reactionEvent.css';

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

    const [indexAmount, setIndexAmount] = useState("1");

    const [pageStatus, setPageStatus] = useState("start");
    const [errorMsg, setErrorMsg] = useState("");

    const [animOpacity, setAnimOpacity] = useState(1);
    const [animX, setAnimX] = useState(0);

    const [allResults, setAllResults] = useState([]);
    const [finalResult, setFinalResult] = useState([]);

    const handleAmount = (e) => {
        const value = e.target.value;
        setIndexAmount(value);

        setAnimX(0);
        setAnimOpacity(1);
        setErrorMsg("");
    }

    const Element = (index) => {
        const [symbol, setSymbol] = useState(localStorage.getItem(`${index.index}`));

        const [elementValues, setElementsValues] = useState(JSON.parse(localStorage.getItem(`savedList${index.index}`)));

        const changeValue = () => {
            if (localStorage.getItem("symbol") !== null) {
                let amountValue = indexAmount
                if (amountValue === "1") {
                    amountValue = "";
                }
                if (localStorage.getItem(`savedList${index.index}`).length === 0) {
                    setSymbol(amountValue);
                    localStorage.setItem(`${index.index}`, localStorage.getItem("symbol") + amountValue);
                } else {
                    setSymbol(symbol + localStorage.getItem("symbol") + amountValue);
                    localStorage.setItem(`${index.index}`, localStorage.getItem("symbol") + amountValue);
                }

                operatorsList.map((i) => {
                    if (i.index === index.index) {
                        i.allSymbols.push({element: localStorage.getItem("symbol"), indexValue: indexAmount});
                        window.localStorage.setItem(`savedList${index.index}`, JSON.stringify(i.allSymbols));
                        elementValues.push({element: localStorage.getItem("symbol"), indexValue: indexAmount});
                    }
                    return (
                        <></>
                    )
                })

                localStorage.removeItem("symbol");
            }
        }

        const clearValue = () => {
            setElementsValues([]);
            setErrorMsg("");
            window.localStorage.setItem(`savedList${index.index}`, JSON.stringify([]));

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
            <div>
                {elementValues.length === 0 ? <div className="reactions__reactionEvent-element_default"
                onClick={clearValue} 
                onMouseUp={changeValue}><p>+</p></div> : 
                <div className="reactions__reactionEvent-element_specified"
                onClick={clearValue} 
                onMouseUp={changeValue}>
                    {elementValues.map((v) => {
                        if (v.indexValue === "1") {
                            return (
                                <div className='reactions__reactionEvent-element_specified_pair'>
                                    <p>{v.element}</p>
                                </div>
                            )
                        } else {
                            return (
                                <div className='reactions__reactionEvent-element_specified_pair'>
                                    <p>{v.element}</p>
                                    <div className='reactions__reactionEvent-element_specified_pair-index'>
                                        <p>{v.indexValue}</p>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>}
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
                            operatior.allSymbols.map((o) => {
                                if (o.element === element.symbol && o.indexValue === element.amount && operatior.allSymbols.length === substance.length) {
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
                    let littleList = [];
                    result.map((element) => {
                        littleList.push(element.symbol);
                        localStorage.setItem(`index${element.symbol}`, element.amount);
                        return (
                            <></>
                        )
                    })
                    finalResult.push(littleList);
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

                {finalResult.map((elementList) => {
                    if (number === 0) {
                        number = number + 1;
                        return (
                            <div key={elementList} className="reactions__reactionEvent-element_specified">
                                {elementList.map((element) => {
                                    if (localStorage.getItem(`index${element}`) === "1") {
                                        return (
                                            <div className='reactions__reactionEvent-element_specified_pair'>
                                                <p>{element}</p>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div className='reactions__reactionEvent-element_specified_pair'>
                                                <p>{element}</p>
                                                <div className='reactions__reactionEvent-element_specified_pair-index'>
                                                    <p>{localStorage.getItem(`index${element}`)}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        )
                    } else {
                        return (
                            <div key={elementList} className='reactions__reactionEvent-operation'>
                                <div className='reactions__reactionEvent-connector'>
                                    <p>+</p>
                                </div>

                                <div className="reactions__reactionEvent-element_specified">
                                    {elementList.map((element) => {
                                        if (localStorage.getItem(`index${element}`) === "1") {
                                            return (
                                                <div className='reactions__reactionEvent-element_specified_pair'>
                                                    <p>{element}</p>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div className='reactions__reactionEvent-element_specified_pair'>
                                                    <p>{element}</p>
                                                    <div className='reactions__reactionEvent-element_specified_pair-index'>
                                                        <p>{localStorage.getItem(`index${element}`)}</p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }

    function BackToCreation() {
        elements.map((element) => {
            localStorage.removeItem(`index${element.symbol}`);
            return (
                <></>
            )
        });
        setFinalResult([]);
        setAllResults([]);
        setPageStatus("start");
    }

    const ShowContent = () => {
        if (pageStatus === "start") {
            return (
                <div className='reactions__reactionEvent'>
                    <div className='reactions__reactionEvent-elementAmount'>
                        <p>Vali elemendi indeks</p>
                        <div>
                            <input type='number' min={1} name='index' value={indexAmount} onChange={handleAmount} />
                        </div>
                        <p>, mida järgnevalt lisatav element omandab</p>
                    </div>

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
