import React from 'react';
import { NavbarAdmin } from '../../components/navbar/NavbarAdmin';
// import { useAuth } from '../../pages/auth/AuthProvider';
// import { useNavigate } from 'react-router-dom';

const DashboardAdmin = () => {
    // const { hasRole } = useAuth();

    // if (!hasRole('ADMIN')) {
    //     // Redirect or show unauthorized message
    //     // return <UnauthorizedComponent />;
    //     return <useNavigate to="/login" />;
    // }

    return (
        <main>
            <NavbarAdmin />
            <br></br>
            <h1>Hello, this is admin staff's dashboard</h1>
        </main>
    )
}

export { DashboardAdmin };