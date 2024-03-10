import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element, allowedRoles, ...rest }) => {
  const { user } = useAuth();

  const isAuthorized = user && allowedRoles.includes(user.role);

  return isAuthorized ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default ProtectedRoute;

// import React from 'react';
// import { Navigate, Route } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const ProtectedRoute = ({ element, allowedRoles, ...rest }) => {
//   const { role } = useAuth(); // Change user to role here

//   const isAuthorized = role && allowedRoles.includes(role); // Change user to role here

//   return isAuthorized ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/unauthorized" replace />
//   );
// };

// export default ProtectedRoute;

// import { useLocation, Navigate, Outlet } from 'react-router-dom'
// import React, { useContext } from 'react'
// import AuthContext from './AuthContext'

// const ProtectedRoute = ({allowedRoles}) => {
//     let {user} = useContext(AuthContext)
//     const location = useLocation();

//     return(
//         user.group.find(role=>allowedRoles?.includes(role)) 
//         ? <Outlet />
//         : user ?
//             <Navigate to="/unauthorized" state={{ from: location }} replace />
//             : <Navigate to="/login" state={{ from: location }} replace />  
//     );
// }

// export default ProtectedRoute;


