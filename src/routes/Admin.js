import React from 'react'
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { authService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import './Admin.css';

const Admin = () => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    return (
        <>
        <div className="admin container row">
            <h3 className="col-12">
                <FontAwesomeIcon icon={faUserCog}/> ADMIN
            </h3>
            <span className="col-12 logout" onClick={onLogOutClick}>
                Sign Out
            </span>
            <div className="admin__box col-md-6">
                <Link to="/upload">
                    <h4>Upload Post</h4>
                </Link>
            </div>
            <div className="admin__box col-md-6">
                <Link to="/manage">
                    <h4>Manage Post</h4>
                </Link>
            </div>
        </div>
        </>
    );
};

export default Admin;