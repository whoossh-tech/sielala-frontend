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
            <br></br>
            <h1 className="text-7xl">Lala Market</h1>
            <h1 className="text-2xl">Sexiest, Hottest, Endless Sale</h1>
            <h2>A Fashion Curated Bazaar Featuring 50+ Brands with Discounts Up to 90%</h2>
            <br></br>
            <div className="event-card bg-primary-10 shadow-md rounded-lg py-3 px-8 my-5">
                    <div className="flex justify-between">
                        <div className='text-left'>
                            <h1 className='text-2xl my-2'>tes q</h1>
                            <p className="text-md mb-2 text-center">
                                📆 tes 2 | 📍 tes 3
                            </p>
                        </div>

                        <div className="5 flex items-center gap-0 mx-3">
                            <div className="flex space-x-4">
                                <button className="button-pink text-sm" >
                                    Register as Visitor
                                </button>

                                    <button className="button-green text-sm" >
                                        Register as Tenant
                                    </button>
                            </div>
                        </div>
                    </div>
            </div>
            <h1 className="text-lg upcoming-title font-bold text-left">UPCOMING EVENT</h1>

            <br></br>
            
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

        </main>
    )
}

export { DashboardGuest };