import React, {useContext} from 'react';
import { Navigate, Route , Outlet} from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element, allowedRoles, ...rest }) => {
    const { user, role } = useAuth();
    // const { user, role } = useContext(AuthContext);
    console.log('Role in ProtectedRoute:', role); // Checkpoint: Log the user's role

    const isAuthorized = user && allowedRoles.includes(role);

    return isAuthorized ? (
        <Outlet />
    ) : (
        <Navigate to="/unauthorized" replace />
    );
};

export default ProtectedRoute;