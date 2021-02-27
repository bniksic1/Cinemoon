import React, {useEffect, useState} from 'react';
import './Nav.css';

const Nav = () => {
    const [show, handleShow] = useState(false);

    const transitionNavBar = () => {
        handleShow(window.scrollY > 100);
    }

    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar)

        return () => window.removeEventListener('scroll', transitionNavBar)
    }, [])

    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <div className="nav__contents">
                <img className="nav__logo" src="https://w7.pngwing.com/pngs/298/685/png-transparent-movies-logo-backsheet-hand-painted-practical.png" alt="Logo"/>
                <img className="nav__avatar" src="https://image.flaticon.com/icons/png/512/194/194938.png" alt="Avatar"/>
            </div>
        </div>
    );
};

export default Nav;