import {useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import { useAuth } from "./../store/Auth";

const Logout = () => {

    const {logOutUser} = useAuth();

    useEffect(() => {

        logOutUser();

    }, [logOutUser]);

    return (
        <div>
            <Navigate to="/"/>
        </div>
    );
}

export default Logout;
