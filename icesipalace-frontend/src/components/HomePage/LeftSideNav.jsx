import React, { useState, useEffect } from "react";
import AuthService from '../../services/AuthService';
import "../../styles/HomePage/LeftSideNav.css";
import { Nav, NavItem, NavLink, Input } from 'reactstrap';
import DataAccess from "../../services/DataAccess";

export default function LeftSideNav({ onClick, onSearchResult }) {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const triggerSearch = async (term) => {
        // Check if already searching, if yes, return
        if (isSearching) {
            return;
        }

        setIsSearching(true);

        // Implement your database query logic here using the 'term'
        // This function will be called when the user presses Enter
        if (term.trim() !== "") {
            const posts = await DataAccess.queryPostsBasedOnName(term)
            console.log(posts);
            setIsSearching(false);
            onSearchResult(posts);
        }
        else {
            const posts = await DataAccess.queryAllPosts();
            setIsSearching(false);
            onSearchResult(posts);
        }
    };

    const onChangeSearch = (e) => {
        const search = e.target.value;
        setSearchTerm(search);
    };

    const onKeyPressSearch = (e) => {
        // Check if the Enter key is pressed
        if (e.key === "Enter") {
            triggerSearch(searchTerm);
        }
    };

    return (
        <div>
            <Nav className="nav-bar">
                <NavItem className="nav-bar-title">
                    <span>MARKET PALACE</span>
                </NavItem>

                {currentUser ? (
                    <NavItem className="user-container">
                        <img src="https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png" alt="icono del usuario" className="user-image" />
                        <NavLink href="#" className="user-title">{currentUser.username}</NavLink>
                    </NavItem>
                ) : (
                    ""
                )}

                <Input className="input" placeholder="Search" onChange={onChangeSearch} onKeyPress={onKeyPressSearch} />

                <hr />
                <div className="categories">
                    <NavItem>
                        <h3>Categories</h3>
                    </NavItem>
                </div>

                <div className="actions">
                    <NavItem>
                        <NavLink href="#" className="btn btn-secondary">Settings</NavLink>
                    </NavItem>
                    {
                        AuthService.getCurrentUser() ? (

                            <NavItem>
                                <button className="btn btn-success" onClick={onClick}> Create Post</button>
                            </NavItem>
                        )
                            :
                            (
                                ""
                            )
                    }
                </div>
            </Nav>
        </div>
    )
}
