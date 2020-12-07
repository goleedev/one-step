import React, { useState, useEffect } from 'react';
import './Intro.css';
import Loading from './Loading';
import LoadingSpinner from './LoadingSpinner';

const Intro = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        setIsLoaded(true);
    }, []);
    return (
        <>
            <div className="intro">
                <div className="container">
                    <h3 className="intro__title">1 STEP 알아보기</h3>  
                    <p className="intro__des">
                    정기 시리즈인 <span>‘MEME 사용 설명서’</span> , ‘돌아서면 까먹는 <span>용어 백과’</span>부터,<br/>
                    시즌 별 <span>특집 시리즈</span>와 <span>쿼터별 퀴즈</span> 까지!
                    </p>
                    <div className="intro__video">
                        {isLoaded ?
                        <iframe
                            frameBorder="0"
                            className="intro__iframe"
                            src="https://www.youtube.com/embed/EwEsWtinZ3w?autoplay=1&mute=1"
                        >
                        </iframe>
                        : <LoadingSpinner />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Intro;
