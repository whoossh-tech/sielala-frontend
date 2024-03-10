// import React from 'react';
// import { Navigate, Route } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const ProtectedRoute = ({ element, allowedRoles, ...rest }) => {
//   const { user } = useAuth();

//   const isAuthorized = user && allowedRoles.includes(user.role);

//   return isAuthorized ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/unauthorized" replace />
//   );
// };

// export default ProtectedRoute;

import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element, allowedRoles, ...rest }) => {
  const { role } = useAuth(); // Change user to role here

  const isAuthorized = role && allowedRoles.includes(role); // Change user to role here

  return isAuthorized ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default ProtectedRoute;

