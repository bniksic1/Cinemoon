import React, {useEffect, useState} from 'react';
import './Nav.css';
import { useHistory } from 'react-router-dom';

const Nav = () => {
    const [show, handleShow] = useState(false);
    const history = useHistory();

    const transitionNavBar = () => {
        handleShow(window.scrollY > 100);
    }

    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar);

        return () => window.removeEventListener('scroll', transitionNavBar);
    }, []);

    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <div className="nav__contents">
                <img
                    className="nav__logo"
                    alt="Logo"
                    onClick={() => history.push('/')}
                />
                <img
                    className="nav__avatar"
                    src="https://image.flaticon.com/icons/png/512/194/194938.png"
                    alt="Avatar"
                    onClick={() => history.push('/profile')}
                />
            </div>
        </div>
    );
};

export default Nav;