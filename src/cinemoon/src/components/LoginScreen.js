import React, {useState} from 'react';
import './LoginScreen.css';
import SignupScreen from "./SignupScreen";

const LoginScreen = () => {
    const [signIn, setSignIn] = useState(false);

    return (
        <div className="loginScreen">
            <div className="loginScreen__background">
                <img
                    className="loginScreen__logo"
                    alt="Logo"
                    onClick={() => setSignIn(false)}
                />
                <button
                    onClick={() => setSignIn(true)}
                    className="loginScreen__button"
                >
                    Sign in
                </button>
                <div className="loginScreen__gradient"/>
            </div>

            <div className="loginScreen__body">
                {signIn ?
                    <SignupScreen />
                    :
                    <>
                        <h1>Unlimited films, TV programes and more.</h1>
                        <h2>Watch anywhere. Cancel at any time.</h2>
                        <h3>Ready to watch? Enter your email to crate or restart your membership.</h3>

                        <div className="loginScreen__input">
                            <form>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                />
                                <button
                                    className="loginScreen__getStarted"
                                    onClick={() => setSignIn(true)}
                                >
                                    GET STARTED
                                </button>
                            </form>
                        </div>
                    </>
                }

            </div>
        </div>
    );
};

export default LoginScreen;