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
    const [totalEvent, setTotalEvent] = useState(0);
    const [totalTenant, setTotalTenant] = useState(0);
    const [totalVisitor, setTotalVisitor] = useState(0);
    const [endedEvents, setEndedEvents] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem('token');

        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    
        axios.get('https://sielala-backend-production.up.railway.app/api/event/ongoing')
            .then(res => {
                setEvents(res.data.data)
                console.log(res.data.data)
            }).catch(
                err => 
                console.log(err)
            )

            axios.get('https://sielala-backend-production.up.railway.app/api/event/ended')
            .then(res => {
                setEndedEvents(res.data.data)
                console.log(res.data.data)
            }).catch(
                err => 
                console.log(err)
            )

            axios.get('https://sielala-backend-production.up.railway.app/api/event/total')
            .then(res => {
                setTotalEvent(res.data.totalEvent)
                setTotalTenant(res.data.totalTenant)
                setTotalVisitor(res.data.totalVisitor)
                console.log(res.data)
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
            
            <br>
            </br>

            <div className="mb-3" style={{ display: 'flex', justifyContent: 'center', marginBottom: "40px" }}>
                <div className="square-card bg-primary-10 shadow-md rounded-lg py-4 px-14 my-3 mx-2" style={{ backgroundColor: '#F59FC3' }}>
                    <h1>{totalEvent}++</h1>
                    <h2>Events</h2>
                </div>
                <div className="square-card bg-primary-10 shadow-md rounded-lg py-4 px-14 my-3 mx-2" style={{ backgroundColor: '#B2BA59' }}>
                    <h1>{totalTenant}++</h1>
                    <h2>Brands</h2>
                </div>

                <div className="square-card bg-primary-10 shadow-md rounded-lg py-4 px-14 my-3 mx-2" style={{ backgroundColor: '#8C6749' }}>
                    <h1>{totalVisitor}++</h1>
                    <h2>Visitors</h2>
                </div>
            </div>

            <h1 className="text-lg upcoming-title font-bold text-left">UPCOMING EVENT</h1>

            <br></br>

            {/* <div style={{ textAlign: "left" }} className="ongoing-event-container"> */}
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
                    <div style={{ backgroundColor: "#FFB2D3", borderRadius: "20px", padding: "10px", display: "inline-block", textAlign: "left", alignContent: "left" }} className="rounded">
                        <p><b>No Upcoming Events Available</b></p>
                    </div>
                )}
            {/* </div> */}

            <br></br>
            <br></br>

            <h1 className="text-lg upcoming-title font-bold text-left">PREVIOUS EVENT</h1>

            <div className="previous-event-cards-container">
                {endedEvents && endedEvents.length > 0 ? (
                    endedEvents.map((event, i) => (
                        <div key={i} className="previousevent-card bg-primary-10 shadow-md rounded-lg py-3 px-8 my-5" style={{ backgroundColor: '#EBF0B0' }}>
                            <h1 className='text-2xl my-2 text-start'>{event.eventName}</h1>
                            <p className="text-md mb-2 text-start">
                                📆 {event.startDateFormatted} - {event.endDateFormatted}
                            </p>
                            <p className="text-md mb-2 text-start">
                                📍 {event.location}
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'center'}}>
                                <div className="detail-square-card bg-primary-10 shadow-md rounded-lg py-1 px-6 my-14 mx-3" style={{ backgroundColor: '#F59FC3' }}>
                                    <h1 style={{ fontSize: '20px' }}>{event.totalVisitor}</h1>
                                    <h2>Visitors</h2>
                                </div>

                                <div className="detail-square-card bg-primary-10 shadow-md rounded-lg py-1 px-6 my-14 mx-3" style={{ backgroundColor: '#B2BA59' }}>
                                    <h1 style={{ fontSize: '20px' }}>{event.totalTenant}</h1>
                                    <h2>Tenants</h2>
                                </div>
                            </div>
                            </div>
                    ))
                ) : (
                    <div style={{ backgroundColor: "#FFB2D3", borderRadius: "20px", padding: "10px", display: "inline-block", textAlign: "center" }} className="rounded my-4 px-2">
                        <p><b>No Previous Events Available</b></p>
                    </div>
                )}
            </div>
            <br></br>
        </main>
    )
}

export { DashboardGuest };