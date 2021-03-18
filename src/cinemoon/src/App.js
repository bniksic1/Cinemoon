import React, {useState} from "react";
import './App.css';
import HomeScreen from "./components/HomeScreen";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import { isExpired } from "react-jwt";
import ProfileScreen from "./components/ProfileScreen";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !isExpired(localStorage.getItem('jwt'))
    );

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
