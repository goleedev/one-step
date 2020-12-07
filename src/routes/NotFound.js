import React from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Find from 'components/svg/Find';
import './NotFound.css';

const NotFound = () => {
    let history = useHistory();
    const onClick = () => {
        history.goBack();
	    window.scrollTo(0,0);
    }
    return (
        <div className="page">
            <div className="page__content">
                <h1>404</h1>
                <span>not found</span>
                <div className="detail">
                    <a className="detail__link" onClick={onClick}>
                        Back
                    </a>
                    <Link className="detail__link" to="/">
                        Home
                    </Link>
                </div>
                <Find />
            </div>
        </div>
    );
};

export default NotFound
