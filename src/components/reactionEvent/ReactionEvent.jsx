import { motion } from 'framer-motion';
import React, { useState } from 'react';
import reactions from './reactions.json';
import elements from '../element/elementList/elements.json';
import './reactionEvent.css';

localStorage.setItem('savedList1', JSON.stringify([]));
localStorage.setItem('savedList2', JSON.stringify([]));
localStorage.removeItem('savedList3');
localStorage.removeItem('savedList4');

let reloadedList = [{
        index: 1,
        allSymbols: []
    },
    {
        index: 2,
        allSymbols: []
    }
];

const ReactionEvent = () => {
    const [operatorsList, setOperatiorsList] = useState(reloadedList);

    let defaultElement = `reactions__reactionEvent-element_default_${operatorsList.length}`;
    let specifiedElement = `reactions__reactionEvent-element_specified_${operatorsList.length}`;
    let connector = `reactions__reactionEvent-connector_${operatorsList.length}`;
    let indexPos = `reactions__reactionEvent-element_specified_pair-index_${operatorsList.length}`;

    var arrow = '=>';
    var backArrow = '<=';

    const [indexAmount, setIndexAmount] = useState("1");

    const [pageStatus, setPageStatus] = useState("start");
    const [errorMsg, setErrorMsg] = useState("");

    const [animOpacity, setAnimOpacity] = useState(1);
    const [animX, setAnimX] = useState(0);

    const [allResults, setAllResults] = useState([]);
    const [finalResult, setFinalResult] = useState([]);

    let specifiedResult = `reactions__reactionEvent-result_specified_${finalResult.length}`;
    let resultConnector = `reactions__reactionEvent-result-connector_${finalResult.length}`;
    let resultIndexPos = `reactions__reactionEvent-result_specified_pair-index_${finalResult.length}`;

    const handleAmount = (e) => {
        const value = e.target.value;
        setIndexAmount(value);

        setAnimX(0);
        setAnimOpacity(1);
        setErrorMsg("");
    }

    const Element = (index) => {
        let key = 0;
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
                } else {
                    setSymbol(symbol + localStorage.getItem("symbol") + amountValue);
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
                {elementValues.length === 0 ? <div className={defaultElement}
                onClick={clearValue} 
                onMouseUp={changeValue}><p>+</p></div> : 
                <div className={specifiedElement}
                onClick={clearValue} 
                onMouseUp={changeValue}>
                    {elementValues.map((v) => {
                        key = key + 1;
                        if (v.indexValue === "1") {
                            return (
                                <div key={key} className='reactions__reactionEvent-element_specified_pair'>
                                    <p>{v.element}</p>
                                </div>
                            )
                        } else {
                            return (
                                <div key={key} className='reactions__reactionEvent-element_specified_pair'>
                                    <p>{v.element}</p>
                                    <div className={indexPos}>
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
                                <div className={connector}>
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
                let validElements = [];
                let substances = 0;
                let finalCheck = true;
                reaction.substances.map((substance) => {
                    substance.map((element) => {
                        substances = substances + 1;
                        operatorsList.map((operator) => {
                            let checkedSymbols = [];
                            operator.allSymbols.map((o) => {
                                if (o.element === element.symbol && o.indexValue === element.amount && operator.allSymbols.length === substance.length && !checkedSymbols.includes(o.element + o.indexValue)) {
                                    validElements.push(o.element + o.indexValue);
                                    checkedSymbols.push(o.element + o.indexValue);
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
                operatorsList.map((o) => {
                    o.allSymbols.map((s) => {
                        if (!validElements.includes(s.element + s.indexValue)) {
                            finalCheck = false;
                        }
                        return (
                            <></>
                        )
                    })
                    return (
                        <></>
                    )
                })
                if (validElements.length === operatorsSize && validElements.length === substances && finalCheck === true) {
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
                        littleList.push({elementSymbol: element.symbol, elementIndex: element.amount});
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
                <div className='reactions__reactionEvent-result_finish_button'>
                    <motion.p whileHover={{ color: "rgb(159, 166, 248)" }} onClick={BackToCreation}>{backArrow}</motion.p>
                </div>

                {finalResult.map((elementList) => {
                    if (number === 0) {
                        number = number + 1;
                        return (
                            <div key={elementList} className={specifiedResult}>
                                {elementList.map((element) => {
                                    if (element.elementIndex === 1) {
                                        return (
                                            <div className='reactions__reactionEvent-element_specified_pair'>
                                                <p>{element.elementSymbol}</p>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div className='reactions__reactionEvent-element_specified_pair'>
                                                <p>{element.elementSymbol}</p>
                                                <div className={resultIndexPos}>
                                                    <p>{element.elementIndex}</p>
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
                                <div className={resultConnector}>
                                    <p>+</p>
                                </div>

                                <div className={specifiedResult}>
                                    {elementList.map((element) => {
                                        if (element.elementIndex === 1) {
                                            return (
                                                <div className='reactions__reactionEvent-element_specified_pair'>
                                                    <p>{element.elementSymbol}</p>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div className='reactions__reactionEvent-element_specified_pair'>
                                                    <p>{element.elementSymbol}</p>
                                                    <div className={resultIndexPos}>
                                                        <p>{element.elementIndex}</p>
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

    function AddSlot() {
        setAnimX(0);
        setAnimOpacity(1);
        if (operatorsList.length < 4) {
            operatorsList.push({index: operatorsList.length + 1, allSymbols: []});
            localStorage.setItem(`savedList${operatorsList.length}`, JSON.stringify([]));
            operatorsList.push({index: operatorsList.length + 1, allSymbols: []});
            setOperatiorsList(operatorsList.filter((o) => o.index !== operatorsList.length));
            setErrorMsg("");
        }
    }

    function RemoveSlot() {
        setAnimX(0);
        setAnimOpacity(1);
        if (operatorsList.length > 2) {
            setOperatiorsList(operatorsList.filter((o) => o.index !== operatorsList.length));
            localStorage.removeItem(`savedList${operatorsList.length + 1}`);
            setErrorMsg("");
        }
    }

    const ShowButtons = () => {
        if (operatorsList.length === 2) {
            return (
                <div className='reactions__reactionEvent-elementAmount-slotCounter'>
                    <h5>Lisa või eemalda lünk:</h5>
                    <div className='reactions__reactionEvent-elementAmount-slotCounter-button'>
                        <motion.p whileHover={{ color: "rgb(159, 166, 248)", background: "greenyellow" }} onClick={AddSlot}>+1</motion.p>
                    </div>
                </div>
            )
        } else if (operatorsList.length === 4) {
            return (
                <div className='reactions__reactionEvent-elementAmount-slotCounter'>
                    <h5>Lisa või eemalda lünk:</h5>
                    <div className='reactions__reactionEvent-elementAmount-slotCounter-button'>
                        <motion.p whileHover={{ color: "rgb(159, 166, 248)", background: "red" }} onClick={RemoveSlot}>-1</motion.p>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='reactions__reactionEvent-elementAmount-slotCounter'>
                    <h5>Lisa või eemalda lünk:</h5>
                    <div className='reactions__reactionEvent-elementAmount-slotCounter-button'>
                        <motion.p whileHover={{ color: "rgb(159, 166, 248)", background: "red" }} onClick={RemoveSlot}>-1</motion.p>
                        <motion.p whileHover={{ color: "rgb(159, 166, 248)", background: "greenyellow" }} onClick={AddSlot}>+1</motion.p>
                    </div>
                </div>
            )
        }
    }

    const ShowContent = () => {
        if (pageStatus === "start") {
            return (
                <div className='reactions__reactionEvent'>
                    <div className='reactions__reactionEvent-elementAmount'>
                        <div className='reactions__reactionEvent-elementAmount-indexCounter'>
                            <p>Vali indeks</p>
                            <div>
                                <input type='number' min={1} name='index' value={indexAmount} onChange={handleAmount} />
                            </div>
                            <p>, mida järgnevalt lisatav element omandab</p>
                        </div>

                        <ShowButtons />
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
