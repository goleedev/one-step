import React from 'react';
import person from '../images/person-run.png';
import './Loading.css';

//Loading
//https://codepen.io/FlorinCornea/pen/JjXeyzz
const Loading = () => {
    return (
        <div className="page">
            <span>loading...</span>
            <div className="progress__bar">
                <div className="progress"><img alt="person-running" src={person} className="progress__person" /></div>
            </div>
        </div>
    );
};

export default Loading;
