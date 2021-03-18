import React, {useEffect} from 'react';
import "./ProfileScreen.css";
import Nav from "./Nav";
import { decodeToken } from "react-jwt";
import PlansScreen from "./PlansScreen";

const ProfileScreen = ({setIsLoggedIn}) => {
    const user = decodeToken(localStorage.getItem('jwt')).user;

    const logOutUser = () => {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
    }

    return (
        <div className="profileScreen">
            <Nav />
            <div className="profileScreen__body">
                <h1>Edit Profile</h1>
                <div className="profileScreen__info">
                    <img
                        src="https://image.flaticon.com/icons/png/512/194/194938.png"
                        alt="Avatar"
                    />
                    <div className="profileScreen__details">
                        <h2>{user.email}</h2>
                        <div className="profileScreen__plans">
                            <h3>Plans</h3>
                            <PlansScreen user={user}/>
                            <button
                                onClick={logOutUser}
                                className="profileScreen_signOut"
                            >Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;