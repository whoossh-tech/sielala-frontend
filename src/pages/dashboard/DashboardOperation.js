import React from 'react';
import { NavbarOperation } from '../../components/navbar/NavbarOperation';
// import { useAuth } from '../../pages/auth/AuthProvider';
// import { useNavigate } from 'react-router-dom';

const DashboardOperation = () => {
    // const { hasRole } = useAuth();

    // if (!hasRole('OPERATION')) {
    //     // Redirect or show unauthorized message
    //     // return <UnauthorizedComponent />;
    //     return <useNavigate to="/login" />;
    // }

    return (
        <main>
            <NavbarOperation />
            <br></br>
            <h1>Hello, this is operation staff's dashboard</h1>
        </main>
    )
}

export { DashboardOperation };