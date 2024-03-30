import elements from './elements.json';
import React, { useState } from 'react';
import ElementBar from '../elementBar/ElementBar';
import './elementList.css';

const ElementList = () => {
    const [search, setSearch] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setSearch(value);
    }

    const FilteredElements = () => {
        const allSearchedElements = [];
        if (search === "") {
            return (
                <div>
                    {elements.map((element) => (
                    <div key={element.number}>
                        <ElementBar symbol={element.symbol} name={element.name} />
                    </div>
                    ))}
                </div>
            )
        } else {
            const filtered = elements.map((element) => {
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
                    <p>No results</p>
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

    return (
        <div className='reactions__elementList'>
            <div className='reaction__elementList-searchBar'>
                <input type='text' name='search' placeholder='Otsi elementi' value={search} onChange={handleChange}/>
            </div>
            <div className='reactions__elementList-elements'>
                <FilteredElements />
            </div>
        </div>
    )
}

export default ElementList
