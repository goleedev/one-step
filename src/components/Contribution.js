import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons";

import me from '../images/golee.png';
import './Contribution.css';

const Contribution = () => {
    return (
        <>
            <div className="contribution">
                <div className="container">
                    <h3 className="contribution__title">1 STEP 함께 하기</h3>
                    <div className="contribution__members row">
                        <div className="contribution__member col-3">
                            <img src={me} alt="my-pic" />
                            <h5>GO Lee</h5>
                            <span className="contribution__links row">
                                <a href="https://github.com/goleedev"><FontAwesomeIcon icon={faGithub} /></a>
                                <a href="https://www.youtube.com/channel/UCtZ1vB4zqdPDerUmxFRLFaw?view_as=subscriber"><FontAwesomeIcon icon={faYoutube} /></a>
                            </span>
                        </div>
                        <h4 className="col-9">...loading!</h4>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contribution;
