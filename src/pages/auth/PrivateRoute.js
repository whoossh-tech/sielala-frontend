import React from 'react';
import { Route } from 'react-router-dom';
import { useAuth } from './AuthProvider'; // Assuming you have an AuthProvider

// Custom Route component for role-based routing
const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const { user } = useAuth();

  // Check if the user has one of the allowed roles
  const isAuthorized = user && allowedRoles.includes(user.role);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthorized ? <Component {...props} /> : <useNavigate to="/unauthorized" />
      }
    />
  );
};

export default PrivateRoute;

// import { useLocation, Navigate, Outlet } from 'react-router-dom'
// import React, { useContext } from 'react'
// import { AuthProvider } from './AuthProvider';
// // import AuthContext from '../authorization/AuthContext'

// const PrivateRoute = ({allowedRoles}) => {
//     let {user} = useContext(AuthProvider)
//     const location = useLocation();

//     return(
//         user.group.find(role=>allowedRoles?.includes(role)) 
//         ? <Outlet />
//         : user ?
//             <Navigate to="/unauthorized" state={{ from: location }} replace />
//             : <Navigate to="/login" state={{ from: location }} replace />  
//     );
// }

// export default PrivateRoute;
