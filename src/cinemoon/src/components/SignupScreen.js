import React, {useRef, useState} from 'react';
import axios from "axios";
import './SignupScreen.css';


const SignupScreen = () => {
    const [isSigningUp, setIsSigningUp] = useState(false);
    const usernameRef = useRef(null);
    const numberRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const createNewUserDetails = () => (
        {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            phoneNumber: numberRef.current.value
        }
    );

    const createLoginCredentials = () => (
        {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        }
    );

    const register = (ev) => {
        ev.preventDefault();
        axios.post("http://localhost:8080/api/auth/register", createNewUserDetails())
            .then(res => res.data)
            .then(user => {

            })
            .catch(err => {

            });
    };

    const signIn = (ev) => {
        ev.preventDefault();
        axios.post("http://localhost:8080/api/auth/login", createLoginCredentials())
            .then(res => res.data)
            .then(user => {
                console.log(user)
            })
            .catch(err => {
                alert(err.message)
            });
    };

    const switchInterface = (isSignUpInterface) => {
        setIsSigningUp(isSignUpInterface);
        usernameRef.current.value = "";
        passwordRef.current.value = "";
    }

    return (
        <div className="signupScreen">
            {isSigningUp ?
                <form>
                    <h1>Register</h1>
                    <input ref={usernameRef} type="text" placeholder="Username"/>
                    <input ref={numberRef} type="text" placeholder="Phone number"/>
                    <input ref={emailRef} type="email" placeholder="Email"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    <button type="submit" onClick={register}>Sign Up</button>

                    <h4>
                        <span className="signupScreen__gray">Already have account? </span>
                        <span className="signupScreen__link" onClick={() => switchInterface(false)}>Sign in</span>
                    </h4>
                </form>
                :
                <form>
                    <h1>Sign In</h1>
                    <input ref={usernameRef} type="text" placeholder="Username or email"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    <button type="submit" onClick={signIn}>Sign In</button>

                    <h4>
                        <span className="signupScreen__gray">New to Cinemoon? </span>
                        <span className="signupScreen__link" onClick={() => switchInterface(true)}>Sign up now.</span>
                    </h4>
                </form>
            }
        </div>
    );
};

export default SignupScreen;