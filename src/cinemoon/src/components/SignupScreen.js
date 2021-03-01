import React from 'react';
import './SignupScreen.css';

const SignupScreen = () => {
    const register = (ev) => {
        ev.preventDefault();

    };

    const signIn = (ev) => {
        ev.preventDefault();

    };

    return (
        <div className="signupScreen">
            <form>
                <h1>Sign In</h1>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <button type="submit" onClick={signIn}>Sign In</button>

                <h4>
                    <span className="signupScreen__gray">New to Cinemoon? </span>
                    <span className="signupScreen__link" onClick={register}>Sign up now.</span>
                </h4>
            </form>
        </div>
    );
};

export default SignupScreen;