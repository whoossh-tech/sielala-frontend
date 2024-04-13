import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import '../../App.css';
import '../../static/css/invoice/Invoice.css';
import '../../static/css/Button.css';
import backgroundPhoto from '../../assets/bg-cover.png';
import { useState, useEffect, useHistory} from "react";
import { NavbarOperation } from '../../components/navbar/NavbarOperation';
import {toast, Toaster} from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { NavbarPartnership } from "../../components/navbar/NavbarPartnership";
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
import { NavbarFinance } from '../../components/navbar/NavbarFinance';

const Invoice = () => {
    const navigate = useNavigate();

    const [invoiceData, setInvoiceData] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const role = localStorage.getItem('role');

    useEffect(() => {

        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Pre-filled dropdown event
        const storedEvent = localStorage.getItem('idSelectedEvent');
        if (storedEvent) {
            setSelectedEvent(storedEvent);
            localStorage.removeItem('idSelectedEvent'); 
        }

        if (selectedEvent) {
            axios.get(`http://localhost:8080/api/invoice/view-all/${selectedEvent}`)
            .then(res => {
                console.log(res.data.data)
                setInvoiceData(res.data.data)
            }).catch(err => 
                console.log(err)
                )
        }

        axios.get('http://localhost:8080/api/reward/view-event-all')
            .then(res => {
                setEventData(res.data.data)
            }).catch(
                err => 
                console.log(err)
            )
    }, [selectedEvent])


    const handleChange = (e) => {
        setSelectedEvent(e.target.value);
    };


    return (  
        <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
            {( role === 'PARTNERSHIP' ) && (
            <NavbarPartnership style={{ zIndex: 999 }} />
            )}

            {( role === 'FINANCE' ) && (
                <NavbarFinance style={{ zIndex: 999 }} />
            )}

            {( role === 'ADMIN' ) && (
                <NavbarAdmin style={{ zIndex: 999 }} />
            )}

            <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '200px' }}>
                <div>
                    <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: 'left', fontSize: 50 }}>
                        Invoice</h1>
                    <div>
                            <p className="subtitle">Manage and view invoice's data here.</p>
                    </div>
                </div>
            </div>

            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            <br></br>

            {(!selectedEvent) && (
                <div className="text-center text-red-500 font-bold mb-4">
                    Event is not selected, please select event on the dropdown.
                </div>
            )}

            <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg" style={{ width: '300px', margin: '0 auto' }}>
                <div style={{ position: 'relative' }}>
                    <select 
                        className="appearance-none px-4 py-3 w-full focus:outline-none" 
                        onChange={handleChange}
                        value={selectedEvent}
                        style={{
                            backgroundColor: '#ffffff',
                            color: '#333333',
                            borderRadius: '0.375rem',
                            fontSize: '1rem',
                            lineHeight: '1.5',
                            padding: '0.5rem 1rem',
                            width: '300px',
                        }}
                    >
                        <option>select event</option>
                        {eventData && eventData.length > 0 ? 
                            (eventData.map((event, index) => (
                                <option key={index} value={event.idEvent}>{event.eventName}: {event.startDate}</option>
                            ))) : (
                                <option value="">No events available</option>
                            )
                        }
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
            </div>
            
            <br></br>

            {(selectedEvent && eventData.length > 0) && (
                <div className="mb-3" style={{ display: 'flex', justifyContent: 'center' }}>
                    <table>
                        <thead>
                            {/* Column headers */}
                            <tr>
                                <th>Invoice ID</th>
                                <th>Company</th>
                                <th>Type</th>
                                <th>Tracking Status</th>
                                <th>Payment Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceData && invoiceData.length > 0 ? (
                                invoiceData.map((invoice, i) => (
                                    <tr key={i}>
                                        <td style={{ color: '#A9B245', fontWeight: 'bold'}}>
                                            {invoice.idInvoice}
                                        </td>
                                        <td>{invoice.companyName}</td>
                                        <td>{invoice.type}</td>
                                        <td>{invoice.trackingStatus}</td>
                                        <td>{invoice.paymentStatus}</td>
                                        
                                        <td>
                                            <Link to={`/invoice/detail/${invoice.idInvoice}`}>
                                                <button className="button-green-invoice">Detail</button>
                                            </Link>
                                        </td>
                                        </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6}>No invoice available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            <br></br>
        </div>
        
    );
}
 
export default Invoice;