import React from "react";
import './App.css';
import HomeScreen from "./components/HomeScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";

function App() {
  return (
    <div className="app">
        <Router>
            <Switch>
                <Route exact path="/login">
                    <LoginScreen />
                </Route>
                <Route exact path="/">
                    <HomeScreen />
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
