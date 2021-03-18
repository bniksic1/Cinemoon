import React, {useEffect, useState} from "react";
import './App.css';
import HomeScreen from "./components/HomeScreen";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import { decodeToken, isExpired } from "react-jwt";
import ProfileScreen from "./components/ProfileScreen";

import {useSelector, useDispatch} from "react-redux";
import {selectUser, login} from "./features/userSlice";

function App() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const token = localStorage.getItem('jwt');
    const [isLoggedIn, setIsLoggedIn] = useState(decodeToken(token) != null && !isExpired(token));

    if(isExpired(token))
        localStorage.removeItem("jwt");
    else if(user == null)
        dispatch(login(decodeToken(token)));

    useEffect(() => {

    }, []);

    return (
        <div className="app">
            <Router>
                    {
                        isLoggedIn ?
                            <Switch>
                                <Route exact path="/">
                                    <HomeScreen setIsLoggedIn={setIsLoggedIn}/>
                                </Route>
                                <Route exact path="/profile">
                                    <ProfileScreen setIsLoggedIn={setIsLoggedIn}/>
                                </Route>
                            </Switch>
                            :
                            <LoginScreen setIsLoggedIn={setIsLoggedIn}/>
                    }
            </Router>
        </div>
    );
}

export default App;
