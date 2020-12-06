import React from 'react';
import './NoResult.css';

const NoResult = () => {
    return (
        <div data-aos="fade-up" className="no-result">
            <h3>검색 결과가 없습니다<span role="img" aria-label="sad">😢</span></h3>
            <p>더 많은 이야기를 준비 중입니다!</p>
        </div>
    );
};

export default NoResult;