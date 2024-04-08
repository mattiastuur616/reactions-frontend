import React, { useEffect, useState } from "react";
import tyyrLogo from '../../assets/tyyrLogo.png';
import logo1 from '../../assets/reactionsLogoPt1.png';
import logo2 from '../../assets/reactionsLogoPt2.png';
import logo3 from '../../assets/reactionsLogoPt3.png';
import logo4 from '../../assets/reactionsLogo.png';
import './mainPageNav.css';

const MainPageNav = () => {
    const images = [logo1, logo2, logo3, logo4];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (currentIndex === images.length - 1) {
                setCurrentIndex(0);
            } else {
                setCurrentIndex(currentIndex + 1);
            }
        }, 900)

        return () => clearInterval(intervalId);
    })

    return (
        <div className="reactions__navbar">
            <div className="reactions__navbar-image">
                <img src={images[currentIndex]} alt='reactionsLogo' />
            </div>

            <div className="reactions__navbar-items">
                <h1 className="reactions__navbar-items-title">Reaktsioonid.ee</h1>
            </div>

            <div className="reactions__navbar-tyyr">
                <img src={tyyrLogo} alt="tyyrLogo" />
            </div>
        </div>
    )
}

export default MainPageNav