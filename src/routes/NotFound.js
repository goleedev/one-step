import React from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom/cjs/react-router-dom';
import missing from 'images/find.png';
import './NotFound.css';

const NotFound = () => {
    let history = useHistory();
    const onClick = () => {
        history.goBack();
	    window.scrollTo(0,0);
    }
    return (
        <div className="page">
            <div className="content">
                <h1>404</h1>
                <span>not found</span>
                <div className="detail">
                    <Link className="detail__link" onClick={onClick}>
                        Back
                    </Link>
                    <Link className="detail__link" to="/">
                        Home
                    </Link>
                </div>
                <img src={missing} alt="person-missing" />
            </div>
        </div>
    );
};

export default NotFound
