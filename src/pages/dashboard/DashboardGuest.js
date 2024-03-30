import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavbarGuest } from '../../components/navbar/NavbarGuest';
import { reynaldoStyles } from "../../assets/fonts/fonts";
import '../../static/css/Dashboard.css';
import '../../static/css/Button.css';

import { useNavigate } from 'react-router-dom';
import {toast, Toaster} from 'react-hot-toast';

const DashboardGuest = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');

    useEffect(() => {

        const token = localStorage.getItem('token');

        // if ( role === 'BISDEV' || role === 'ADMIN' || role === 'PARTNERSHIP' || role === 'OPERATION' || role === 'FINANCE') {
        //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // } else {
        //     delete axios.defaults.headers.common["Authorization"];
        // }

        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    
        axios.get('http://localhost:8080/api/event/ongoing')
            .then(res => {
                setEvents(res.data.data)
                console.log(res.data.data)
            }).catch(
                err => 
                console.log(err)
            )
    }, [])

    const visitorRegistrationClick = (eventId) => {
        navigate(`/visitor-registration/${eventId}`);
    };

    const tenantRegistrationClick = (eventId) => {
        navigate(`/tenant-registration/${eventId}`);
    };

    return (
        <main>
            <NavbarGuest />
            <style>{reynaldoStyles}</style>
            <br></br>
            <h1>Hello, this is guest's dashboard</h1>

            <br></br>
            <h1 className="text-lg upcoming-title font-bold text-left">UPCOMING EVENT</h1>

            {events && events.length > 0 ? (
              events.map((event, i) => (
                <div className="event-card bg-primary-10 shadow-md rounded-lg py-3 px-8 my-5">
                    <div className="flex justify-between">
                        <div className='text-left'>
                            <h1 className='text-2xl my-2'>{event.eventName}</h1>
                            <p className="text-md mb-2 text-center">
                                📆 {event.startDateFormatted} - {event.endDateFormatted} | 📍 {event.location}
                            </p>
                        </div>

                        <div className="5 flex items-center gap-0 mx-3">
                            <div className="flex space-x-4">
                                <button className="button-pink text-sm" onClick={() => visitorRegistrationClick(event.idEvent)}>
                                    Register as Visitor
                                </button>

                                {event.tenantOpen && (
                                    <button className="button-green text-sm" onClick={() => tenantRegistrationClick(event.idEvent)}>
                                        Register as Tenant
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
              ))
            ) : (
              <p><b>No Upcoming Events Available</b></p>
            )}

            {/* <div className="event-card bg-primary-10 shadow-lg rounded-lg py-4 px-8">
                <div className="flex justify-between">
                    <div className='text-left'>
                        <h1 className='text-2xl my-2'>LalaMarket Lebaran Edition</h1>
                        <p className="text-md mb-2 text-center">
                            📆 16 March 2024 - 18 March 2024 | 📍 Gelora Bung Karno
                        </p>
                    </div>

                    <div className="5 flex items-center gap-0 mx-3">
                        <div className="flex space-x-4">
                            <button className="button-pink text-sm">
                                Register as Visitor
                            </button>

                            {isTenantRegistrationOpen && (
                                <button className="button-green text-sm" onClick={tenantRegistrationClick}>
                                    Register as Tenant
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div> */}

        </main>
    )
}

export { DashboardGuest };