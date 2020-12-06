import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';
import CountUp from 'react-countup';
import Char from './svg/Char';
import logo from 'images/logo.png';
import './Header.css';

const Header = () => {
    const [userCount, setUserCount] = useState(0);
    const onReloadClick = async () => {
        await window.location.reload();
    };
    const onSubmit = (event) => {
        setTimeout(function () {
            document.getElementById("alert").innerHTML = '';
            document.getElementById("alert").style.display = "none";
        }, 3000);
        document.getElementById("alert").style.display = "inline-block";
        document.getElementById("alert").innerHTML = 'Sent Successfully!👋';
        event.target.reset();
    };
    return (
        <header>
            <div className="container">
                <h3 onClick={onReloadClick} className="header__logo">1 STEP <img src={logo} alt="logo" /></h3>
                <div className="header__content row">
                    <div className="header__content-left col-md-6 col-sm-12">
                        <h2> 
                            <span className="row">
                                오늘도
                                <Typewriter
                                    className="header__type"
                                    options={{
                                    strings: ['IT에', '개발에', '커리어에'],
                                    autoStart: true,
                                    loop: true,
                                    }}
                                />
                                <br/>     
                            </span>
                            <span className="row">1 Step 가까워진다</span>
                        </h2>
                        <div className="header__user-count row">👏
                        <CountUp start={0} end={userCount} delay={0}>
                            {({ countUpRef }) => (
                                <div>
                                    <span ref={countUpRef} />
                                </div>
                            )}
                        </CountUp>
                        명이 함께 하고 있어요!</div>
                        <form onSubmit={onSubmit}>
                            <div className="form__field row">
                                <input placeholder="EMAIL" name="email" id="email" className="form__input" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required />
                                <input onSubmit={onSubmit} className="form__btn" type="submit" value="소식 받아보기" />
                            </div>
                        </form>
                    </div>
                    <Char />
                </div>
            </div>  
        </header>
    )
}

export default Header
