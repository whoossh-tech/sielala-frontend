import React from 'react';
import { NavbarPartnership } from '../../components/navbar/NavbarPartnership';
import { useAuth } from '../../pages/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

const DashboardPartnership = () => {
    const { hasRole } = useAuth();

    if (!hasRole('PARTNERSHIP')) {
        // Redirect or show unauthorized message
        // return <UnauthorizedComponent />;
        return <useNavigate to="/login" />;
    }

    return (
        <main>
            <NavbarPartnership />
            <br></br>
            <h1>Hello, this is partnership staff's dashboard</h1>
        </main>
    )
}

export { DashboardPartnership };