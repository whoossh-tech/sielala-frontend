import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import { reynaldoStyles } from "../../assets/fonts/fonts";
import "../../static/css/event/DetailEvent.css";
import "../../static/css/Button.css";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarBisdev } from "../../components/navbar/NavbarBisdev";
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
import { toast, Toaster } from "react-hot-toast";
import Sidebar from '../../pages/dashboard/Sidebar';
import '../../static/css/Style.css';
import { Link, useParams } from "react-router-dom";
import { NavbarGuest } from '../../components/navbar/NavbarGuest';
import 'boxicons/css/boxicons.min.css';

const DetailPreviousEvent = () => {
  const navigate = useNavigate();
  const { idEvent } = useParams();
  const role = localStorage.getItem('role');

  const [eventData, setEventData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [tenantData, setTenantData] = useState();
  const [activePage, setActivePage] = useState('event');
  const [filteredEvent, setFilteredEvent] = useState();

  const currentDate = new Date();

  const token = localStorage.getItem('token');

    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }

    useEffect(() => {
        axios
          .get(`http://localhost:8080/api/event/ended`)
          .then((res) => {
            console.log(idEvent);
            const filteredEvent = res.data.data.filter(event => event.idEvent === idEvent);
            setEventData(filteredEvent);
          })
          .catch((err) => console.log(err));
      }, []);
      

    const handleBack = () => {
        navigate('/');
    };

    return (
        <main>
            <NavbarGuest />
            <style>{reynaldoStyles}</style>
            <div className="bg-neutral-100 relative" style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: "cover", height: "200px" }}>
                <div>
                <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 35, textAlign: "left", fontSize: 50 }}>
                    Discover Event Detail
                </h1>
                <div>
                    <p className="subtitle">
                    <a href='/' style={{ textDecoration: 'none' }}>
                        <span style={{ borderBottom: '1px solid #E685AE' }}>Home</span>&nbsp;
                    </a>
                    / Discover Event
                    </p>
                </div>
                </div>
            </div>
            
            <br></br>
            <div>
                <div className="detailevent-cards-container" style={{justifyContent: "center"}}>
                {eventData.map((event, i) => (
                    <div key={i} className="detailevent1-card bg-primary-10 shadow-md rounded-lg py-3 px-8 my-5" style={{ backgroundColor: '#EBF0B0', alignContent: "center"}}>
                        <div className="flex justify-between">
                            <div className='text-center'>
                                <h1 className="font-reynaldo mb-2 text-general" style={{ paddingTop: 5, textAlign: 'center', fontSize: 30 }}>
                                    {event.eventName}</h1>
                                <p className="text-md mb-2 text-center">
                                    {event.description}
                                </p>
                                <p className="text-md mb-2 text-center" style={{fontWeight: "bold"}}>
                                    📆 {event.startDateFormatted} - {event.endDateFormatted} | 📍 {event.location}
                                </p>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            <h1 className="text-lg upcoming-title font-bold text-left">All Tenant Available</h1>

            <div className="detailevent-cards-container">
            {eventData.map((event, i) => (
                event?.listTenant && event.listTenant.length > 0 ? (
                    event.listTenant.map((tenant, j) => (
                    <div key={j} className="previousevent-card bg-primary-10 shadow-md rounded-lg py-3 px-8 my-5" style={{ backgroundColor: '#E9D8CB' }}>
                        <h1 className='text-2xl my-2 text-start'>{tenant.brandName}</h1> {/* Corrected brandName */}
                        <p className="text-md mb-2 text-start">
                            <i className="bx bxl-instagram"></i> <a href={`https://www.instagram.com/${tenant.brandInstagram}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>{tenant.brandInstagram}</a>
                        </p>
                        <p className="text-md mb-2 text-start">
                            🛒 {tenant.category}
                        </p>
                        <p className="text-md mb-2 text-start">
                            💰 {tenant.brandPromo}
                        </p>
                    </div>
                    ))
                ) : (
                    <div style={{ backgroundColor: "#FFB2D3", borderRadius: "20px", padding: "10px", display: "inline-block", textAlign: "center" }} className="rounded my-4 px-2">
                    <p><b>No Tenant Available</b></p>
                    </div>
                )
                ))}
            </div>
            <br></br>
        </main>
    )
}

export default DetailPreviousEvent;
