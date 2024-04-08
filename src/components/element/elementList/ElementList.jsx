import elements from './elements.json';
import React, { useState } from 'react';
import { FaFilter } from "react-icons/fa";
import { RiCloseLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import ElementBar from '../elementBar/ElementBar';
import './elementList.css';

let filteredElements = elements;

const ElementList = () => {
    const [search, setSearch] = useState("");

    const [filterMenu, setFilterMenu] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setSearch(value);
    }

    const FilteredElements = () => {
        const allSearchedElements = [];
        if (search === "") {
            return (
                <div>
                    {filteredElements.map((element) => (
                    <div key={element.number}>
                        <ElementBar symbol={element.symbol} name={element.name} />
                    </div>
                    ))}
                </div>
            )
        } else {
            const filtered = filteredElements.map((element) => {
                if (element.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                    allSearchedElements.push(element);
                    return (
                        <ElementBar symbol={element.symbol} name={element.name} />
                    )
                }
                return (
                    <></>
                )
            })
            if (allSearchedElements.length === 0) {
                return (
                    <p className='reactions__elementList-noResult'>No results</p>
                )
            } else {
                return (
                    <div>
                        {filtered}
                    </div>
                )
            }
        }
    }

    function filterElementsByType(type) {
        if (type === "All") {
            filteredElements = elements;
        } else if (type === "Metals") {
            filteredElements = elements.filter((e) => e.type === "A- rühma metall" || e.type === "B- rühma metall");
        } else if (type === "A-metals") {
            filteredElements = elements.filter((e) => e.type === "A- rühma metall");
        } else if (type === "B-metals") {
            filteredElements = elements.filter((e) => e.type === "B- rühma metall");
        } else if (type === "Non-metals") {
            filteredElements = elements.filter((e) => e.type === "Mittemetall");
        } else if (type === "Gas") {
            filteredElements = elements.filter((e) => e.type === "Väärisgaas");
        }
        setFilterMenu(false);
    }

    return (
        <div className='reactions__elementList'>
            <div className='reaction__elementList-searchBar'>
                <input type='text' name='search' placeholder='Otsi elementi' value={search} onChange={handleChange}/>

                <div className='reactions__elementList-filterbutton'>
                    {filterMenu 
                    ? <RiCloseLine className='reaction__elementList-filter' onClick={() => setFilterMenu(false)} />
                    : <FaFilter className='reaction__elementList-filter' onClick={() => setFilterMenu(true)} />}
                    {filterMenu && (
                        <motion.div initial={{ opacity: 0, scale: 0.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "tween", duration: 0.3 }} className='reaction__elementList-filterbox'>
                            <motion.p whileHover={{ color: "rgb(106, 254, 0)", cursor: "pointer" }} onClick={() => filterElementsByType("All")}>Kõik elemendid</motion.p>
                            <motion.p whileHover={{ color: "rgb(106, 254, 0)", cursor: "pointer" }} onClick={() => filterElementsByType("Metals")}>Kõik metallid</motion.p>
                            <motion.p whileHover={{ color: "rgb(106, 254, 0)", cursor: "pointer" }} onClick={() => filterElementsByType("A-metals")}>A- rühma metallid</motion.p>
                            <motion.p whileHover={{ color: "rgb(106, 254, 0)", cursor: "pointer" }} onClick={() => filterElementsByType("B-metals")}>B- rühma metallid</motion.p>
                            <motion.p whileHover={{ color: "rgb(106, 254, 0)", cursor: "pointer" }} onClick={() => filterElementsByType("Non-metals")}>Mittemetallid</motion.p>
                            <motion.p whileHover={{ color: "rgb(106, 254, 0)", cursor: "pointer" }} onClick={() => filterElementsByType("Gas")}>Väärisgaasid</motion.p>
                        </motion.div>
                    )}
                </div>
            </div>
            <div className='reactions__elementList-elements'>
                <FilteredElements />
            </div>
        </div>
    )
}

export default ElementList
