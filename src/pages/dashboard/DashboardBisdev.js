import React from 'react';
import { NavbarBisdev } from '../../components/navbar/NavbarBisdev';
import { useAuth } from '../../pages/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

const DashboardBisdev = () => {
    const { hasRole } = useAuth();

    if (!hasRole('BISDEV')) {
        // Redirect or show unauthorized message
        // return <UnauthorizedComponent />;
        return <useNavigate to="/login" />;
    }
    
    return (
        <main>
            <NavbarBisdev />
            <br></br>
            <h1>Hello, this is business development staff's dashboard</h1>
        </main>
    )
}

export { DashboardBisdev };