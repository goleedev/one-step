import React from 'react';
import Fade from 'react-reveal/Fade';
import './NoResult.css';

const NoResult = () => {
    return (
        <Fade up>
            <div className="no-result">
                <h3>검색 결과가 없습니다<span role="img" aria-label="sad">😢</span></h3>
                <p>더 많은 이야기를 준비 중입니다!</p>
            </div>
        </Fade>
    );
};

export default NoResult;