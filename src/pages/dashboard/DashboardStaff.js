import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

import { NavbarAdmin } from '../../components/navbar/NavbarAdmin';
import { NavbarPartnership } from '../../components/navbar/NavbarPartnership';
import { NavbarBisdev } from '../../components/navbar/NavbarBisdev';
import { NavbarFinance } from '../../components/navbar/NavbarFinance';
import { NavbarOperation } from '../../components/navbar/NavbarOperation';

const DashboardStaff = () => {
    const [selectedEvent, setSelectedEvent] = useState("");
    const [eventData, setEventData] = useState([]);

    const role = localStorage.getItem('role');

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/event/view-all")
            .then((res) => {
            setEventData(res.data.data);
            })
            .catch((err) => console.log(err));
    }, [selectedEvent]);

    const handleChange = (e) => {
        setSelectedEvent(e.target.value);
    };

    return (
        <main>

            {/* Navigation Bar */}
            {( role === 'ADMIN' ) && ( <NavbarAdmin style={{ zIndex: 999 }} />)}
            {( role === 'PARTNERSHIP' ) && ( <NavbarPartnership style={{ zIndex: 999 }} />)}
            {( role === 'BISDEV' ) && ( <NavbarBisdev style={{ zIndex: 999 }} />)}
            {( role === 'FINANCE' ) && ( <NavbarFinance style={{ zIndex: 999 }} />)}
            {( role === 'OPERATION' ) && ( <NavbarOperation style={{ zIndex: 999 }} />)}
            <br></br>

            {/* Event Dropdown */}
            <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg" style={{ width: "200px", margin: "0 auto" }}>
                <select
                className="appearance-none px-4 py-3 w-full focus:outline-none"
                onChange={handleChange}
                value={selectedEvent}
                style={{
                    backgroundColor: "#ffffff",
                    color: "#333333",
                    borderRadius: "0.375rem",
                    border: "1px solid #E3E2E6",
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    padding: "0.5rem 1rem",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                >
                <option>select event</option>
                {eventData && eventData.length > 0 ? (
                    eventData.map((event, index) => (
                    <option key={index} value={event.idEvent}>
                        {event.eventName}
                    </option>
                    ))
                ) : (
                    <option value="">No events available</option>
                )}
                </select>
                <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        width="24" 
                        height="24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="feather feather-chevron-down"
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </div>

            {/* Event Charts */}

        </main>
    )
}

export { DashboardStaff };