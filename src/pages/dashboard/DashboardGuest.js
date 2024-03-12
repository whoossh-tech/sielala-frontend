import React from 'react';
import { NavbarGuest } from '../../components/navbar/NavbarGuest';
import { useNavigate } from 'react-router-dom';

const DashboardGuest = () => {
    return (
        <main>
            <NavbarGuest />
            <br></br>
            <h1>Hello, this is guest's dashboard</h1>
        </main>
    )
}

export { DashboardGuest };