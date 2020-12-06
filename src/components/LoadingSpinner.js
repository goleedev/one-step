import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => {
    return (
        <div className="loading-container container flex-lg-column">
            <Spinner animation="border" variant="secondary" className="loading" />
            <h5>영차 영차 <span role="img" aria-label="sweat">💦</span></h5>
        </div>
    );
};

export default LoadingSpinner
