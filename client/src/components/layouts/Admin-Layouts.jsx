 import React from 'react';
import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../store/Auth';
 
 const AdminLayouts = () => {

        const { user } = useAuth();

        console.log(user);

        if (user.isAdmin === false) {
        return  <Navigate to="/" />
        }

    return (
        <>
            <div className="container-fluid">
                <div className="row">

                    <div className="col-2">
                        <ul className='d-inline'>
                            <li ><NavLink to="/admin/users" >Users</NavLink></li>
                            <li ><NavLink to="/admin/contacts" >Contacts</NavLink></li>
                        </ul>
                    </div>

                    <div className="col-10">
                            <Outlet />
                    </div>
                    
                </div>
            </div>
        </>
    );
 }
 
 export default AdminLayouts;
 