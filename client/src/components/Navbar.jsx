import React from 'react';
import {NavLink} from 'react-router-dom';
import {useAuth} from './../store/Auth';

const Navbar = () => {
    
    const {isLoggedIn, user} = useAuth();

    console.log(user);

    return (
        <div>
            <NavLink to="/">Home</NavLink> 
            <NavLink to="/contact">Contact</NavLink> 
            <NavLink to="/service">Services</NavLink> 
            { user.isAdmin && isLoggedIn && (<NavLink to="/admin">Admin</NavLink>) }

            {isLoggedIn ?  (    
                <>
                <NavLink to="/logout">Logout</NavLink>
                </>        
                ) : (<NavLink to="/login">Login</NavLink>)}
            </div>
    );
}

export default Navbar;
