import React from 'react';
import './Loading.css';

const Loading = () => {
    return (
        <div className="page">
            <span>loading...</span>
            <div className="progress__bar">
                <div className="progress"></div>
            </div>
        </div>
    );
};

export default Loading;
