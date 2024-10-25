import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store';

interface PrivateRouteProps{
    element:React.ComponentType;
}

const PrivateRoute:React.FC<PrivateRouteProps> = ({ element: Element }) => {

    const {user} = useSelector((state:RootState)=> state.user);

    return  user ? <Element /> : <Navigate to={'/login'} />
}

export default PrivateRoute