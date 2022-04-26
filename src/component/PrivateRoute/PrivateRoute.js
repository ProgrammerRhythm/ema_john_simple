import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = ({ children }) => {
    const location = useLocation()
    const [login,setLogIn] = useContext(UserContext)
    const auth = login.email;
    return auth ? children :  <Navigate  to='/login'  state={{ from: location }} />;
}    

export default PrivateRoute;