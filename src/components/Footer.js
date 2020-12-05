import React from 'react';
import ScrollTop from 'react-scrolltop-button';
import { Link } from 'react-router-dom';
import logo from 'images/logo.png';
import point from 'images/point.png';
import './Footer.css';

const Footer = () => {
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
        <footer>
            <p id="alert"></p>
            <div className="container">
                <h3 className="footer__logo">1 STEP <img src={logo} alt="logo" /></h3>
                <div className="footer__cta">
                    <div>
                        <h3>소식 듣고 1 STEP 가까워지기</h3>
                        <p>
                        매주 목요일, 관심있는 분야에<br/>
                        <b>한 걸음</b> 가까워 집니다.
                        </p>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="form__field row">
                            <input placeholder="EMAIL" name="email" id="email" className="form__input" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required />
                            <input onSubmit={onSubmit} className="form__btn" type="submit" value="소식 받아보기" />
                        </div>
                    </form>
                </div>
                <div className="footer__social">
                    <a href="https://www.instagram.com/1step.read/">인스타그램</a>
                    <Link to="/faq">고객센터</Link>
                    <Link to="/support">후원하기</Link>
                </div>
                <p id="copy" className="col-lg-12">
                    &copy; Copyright {new Date().getFullYear()} GO Lee. All rights reserved.
                </p>
                <ScrollTop 
                speed={50}
                text={<img src={point}/>}
                distance={150}
                style={{ backgroundColor: "transparent", border: "none" }}
                className="footer-scroll"
                /> 
            </div>
        </footer>
    );
};

export default Footer
