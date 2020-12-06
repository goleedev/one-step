import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Loading from 'components/Loading';
import NoResult from 'components/NoResult';
import './More.css';

const More = () => {
    return (
        <>
            <div className="more">
                <div className="container">
                    <h3 className="more__title">1 STEP 둘러보기</h3>
                    <div className="more__list row">
                        <span>전체</span>
                        <span>테크</span>
                        <span>개발</span>
                        <span>커리어</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default More;
