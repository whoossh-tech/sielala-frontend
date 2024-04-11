import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../static/css/Modal.css";
import { reynaldoStyles } from "../../assets/fonts/fonts";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarPartnership } from "../../components/navbar/NavbarPartnership";
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
// import "../../static/css/event/Event.css";

const TenantApplicant = () => {
    const [tenantApplicants, setTenantApplicants] = useState("");
    const [selectedEvent, setSelectedEvent] = useState("");
    const [eventData, setEventData] = useState([]);

    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const role = localStorage.getItem('role');

    useEffect(() => {

        // Pre-filled dropdown event
        const storedEvent = localStorage.getItem('idSelectedEvent');
        if (storedEvent) {
            setSelectedEvent(storedEvent);
            localStorage.removeItem('idSelectedEvent'); 
        }

        if (selectedEvent) {
            axios
            .get(`http://localhost:8080/api/tenant/view-all/${selectedEvent}`)
            .then((res) => {
                setTenantApplicants(res.data.data);
                console.log(res.data.data);
            })
            .catch((error) => {
                toast.error("Failed to fetch tenant applicant"); // TODO: fix this
            });
        }

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
        <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
            <style>{reynaldoStyles}</style>

            {( role === 'PARTNERSHIP' ) && (
                <NavbarPartnership style={{ zIndex: 999 }} />
            )}

            {( role === 'ADMIN' ) && (
                <NavbarAdmin style={{ zIndex: 999 }} />
            )}
    
            <div className="bg-neutral-100 relative" style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: "cover", height: "200px" }}>
                <div>
                <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: "left", fontSize: 50 }}>
                    Tenant Applicant List
                </h1>
                <div>
                    <p className="subtitle">Manage tenant applicants here</p>
                </div>
                </div>
            </div>
        
            <Toaster position="top-center" reverseOrder={false} />
        
            <br></br>

            {(!selectedEvent) && (
                <div className="text-center text-red-500 font-bold mb-4">
                    Event is not selected, please select event on the dropdown.
                </div>
            )}
        
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
        
            <br></br>
        
            <div className="mb-3" style={{ display: "flex", justifyContent: "center" }}>
                {selectedEvent ? (
                <table className="event-table mx-8">

                    <thead>
                        <tr>
                            <th style={{ width: "28%", textAlign: "center" }}>Brand Name</th>
                            <th style={{ width: "20%", textAlign: "center" }}>Email</th>
                            <th style={{ width: "20%", textAlign: "center" }}>Instagram</th>
                            <th style={{ width: "20%", textAlign: "center" }}>PIC Name</th>
                            <th style={{ width: "12%", textAlign: "center" }}>Status</th>
                        </tr>
                    </thead>
        
                    <tbody>
                    {tenantApplicants && tenantApplicants.length > 0 ? (
                        tenantApplicants.map((tenant, i) => (
                        <tr key={i}>
                            <td>
                            <Link to={`/tenant-applicant/${tenant.idTenant}`} style={{ color: "#A9B245", fontWeight: "bold" }}>
                                {tenant.brandName}
                            </Link>
                            </td>
                            <td>{tenant.brandEmail}</td>
                            <td>{tenant.brandInstagram}</td>
                            <td>{tenant.picName}</td>

                            { tenant.selectionDone === false && (
                                <td className="text-secondary-80"><b>Pending</b></td>
                            ) }

                            { (tenant.accepted === true && tenant.selectionDone === true) && (
                                <td className="text-tertiary-80"><b>Accepted</b></td>
                            ) }

                            { (tenant.accepted === false && tenant.selectionDone === true) && (
                                <td className="text-warning-DEFAULT"><b>Rejected</b></td>
                            ) } 
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="6">No tenant applicants available</td>
                        </tr>
                    )}
                    </tbody>
                </table>

                ) : (
                <div className="text-center">Please select an event to view tenant applicant</div>
                )}

            </div>
            </div>
    );      
}

export default TenantApplicant;