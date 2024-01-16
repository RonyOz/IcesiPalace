import React, { useState, useEffect } from "react";
import AuthService from '../../services/AuthService';
import "../../styles/HomePage/LeftSideNav.css";

import {
    Nav,
    NavItem,
    NavLink,
    Input
} from 'reactstrap';

export default function LeftSideNav({onClick}) {

    const [currentUser, setCurrentUser] = useState(undefined);



    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const logOut = () => {
        localStorage.removeItem("user");
        window.location.reload();
    }



    return (
        <div className="main-container">
            <Nav className="nav-bar">

                <NavItem>
                    <span className="nav-bar-title">MARKET PALACE</span>
                </NavItem>

                {
                    currentUser ? (

                        <NavItem className="user-container">
                            <img src="https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png" alt="icono del usuario" className="user-image" />
                            <NavLink href="#" className="user-title">{currentUser.username}</NavLink>
                        </NavItem>

                    ) : (
                        <NavItem className="user-container">

                        </NavItem>
                    )
                }

                <Input className="input" placeholder="Search" />

                <hr />
                <div className="categories">
                    <NavItem>
                        <h3>
                            Categories
                        </h3>
                    </NavItem>
                </div>


                <div className="actions">
                    <NavItem>
                        <NavLink href="#" className="action-title">Settings</NavLink>
                    </NavItem>
                    <NavItem>
                        <button className="btn btn-secondaty" onClick={logOut}>Log out</button>
                    </NavItem>
                    <NavItem>
                        <button className="btn btn-outline-primary" onClick={onClick}> Create Post</button>
                    </NavItem>
                </div>
            </Nav>
        </div>
    )
}