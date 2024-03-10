import React from 'react';
import { NavbarFinance } from '../../components/navbar/NavbarFinance';
import { useAuth } from '../../pages/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

const DashboardFinance = () => {
    const { hasRole } = useAuth();

    if (!hasRole('FINANCE')) {
        // Redirect or show unauthorized message
        // return <UnauthorizedComponent />;
        return <useNavigate to="/login" />;
    }

    return (
        <main>
            <NavbarFinance />
            <br></br>
            <h1>Hello, this is finance staff's dashboard</h1>
        </main>
    )
}

export { DashboardFinance };