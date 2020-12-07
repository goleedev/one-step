import React from "react";
import { authService, firebaseInstance } from 'fbase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import './Auth.css';

const Auth = () => {
    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        await authService.signInWithPopup(provider);
    };
    return (
        <>
        <div className="container">
            <div className="login">
                <h3>
                    <FontAwesomeIcon icon={faUserCog} /> ADMIN
                </h3>
                <button onClick={onSocialClick} name="google" className="btn btn-lg">
                    <FontAwesomeIcon icon={faGoogle} /> Sign in with Google 
                </button>
            </div>
        </div>
        </>
    );
};

export default Auth;