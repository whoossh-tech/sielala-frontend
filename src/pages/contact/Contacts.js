import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";
import Modal from "../../static/css/Modal.css";
import { reynaldoStyles } from "../../assets/fonts/fonts";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarPartnership } from "../../components/navbar/NavbarPartnership";
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
import "../../static/css/Contact.css";
// import { Sidebar } from "flowbite-react";
import Sidebar from '../dashboard/Sidebar';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [eventData, setEventData] = useState([]);
  const [activePage, setActivePage] = useState('contact');
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const navigate = useNavigate();
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
        .get(`https://sielala-backend-production.up.railway.app/api/contact/all/${selectedEvent}`)
        .then((res) => {
          setContacts(res.data.data);
          console.log(res.data.data);
        })
        .catch((error) => {
          setContacts([]);
        });
    }

    axios
      .get("https://sielala-backend-production.up.railway.app/api/sponsor/view-event-all")
      .then((res) => {
        setEventData(res.data.data);
        
        // if (!selectedEvent && res.data.data.length > 0) {
        //   setSelectedEvent(res.data.data[0].idEvent);
        // }
      })
      .catch((err) => console.log(err));
  }, [selectedEvent]);

  const handleCreateButton = () => {
    if (selectedEvent) {
      navigate(`/sponsor/create/${selectedEvent}`);
    } else {
      toast.error("Please select event first");
    }
  };

  const handleChange = (e) => {
    setSelectedEvent(e.target.value);
  };

  const filterContact = () => {
    if (!search.trim()) return contacts;
    return contacts.filter((contact) =>
      Object.values(contact).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const highlightSearchText = (text) => {
    const parts = text.split(new RegExp(`(${search})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} className="highlighted-text">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <body> 
      <Sidebar activePage={activePage}/>
      <main style={{marginLeft: "60px"}}>

      {/* Header Start */}
      <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '150px' }}>
          <div className="mx-8">
              <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 mx-8" style={{ paddingTop: 35, textAlign: 'left', fontSize: 50 }}>
              Partnership Management</h1>
              <div>
                <p className="subtitle">
                    <a href='/dashboard' style={{ textDecoration: 'none' }}>
                        <span style={{ borderBottom: '1px solid #E685AE' }}>Dashboard</span>&nbsp;
                    </a>                        
                    / Partnership Management
                </p>
              </div>
          </div>
      </div>
      {/* Header Ends */}

      <div className='content-container my-4'>
      <Toaster position="top-center" reverseOrder={false} />

      <br></br>

      {(!selectedEvent) && (
        <div className="text-center text-red-500 font-bold mb-4">
            Event is not selected, please select event on the dropdown.
        </div>
      )}
 
      <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg" style={{ width: '400px', margin: '0 auto' }}>
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
                            width: '400px',
                        }}
                    >
                        <option value="">Select event</option>
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

            {selectedEvent && eventData.length > 0 && (
        <div className="search-and-button-container">
        <div className="button-container">
          <button className="button-pink" onClick={handleCreateButton}>
            + Add Sponsor
          </button>
        </div>
        <div className="search-container">
          <input
            className="search px-4 py-3 w-full focus:outline-none"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              backgroundColor: "#ffffff",
              color: "#333333",
              borderRadius: "0.375rem",
              fontSize: "1rem",
              lineHeight: "1.5",
              padding: "0.5rem 1rem",
              width: "300px",
              border: "1px solid #ccc",
            }}
          />
          <div style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}>
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
              className="feather feather-search"
              style={{ color: "#333333" }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>
      </div>
      )}

      {(selectedEvent && eventData.length > 0) && (
      <React.Fragment>
      <div className="mb-3 mx-8" style={{ display: "flex", justifyContent: "center" }}>
     
          <table className="contact-table mx-12">
            <thead>
              {/* Row headers */}
              <tr>
                <th>Company Name</th>
                <th>Pic Name</th>
                <th>Company Address</th>
                <th>Company Email</th>
                <th>Company Telephone</th>
                <th>Contact Type</th>
              </tr>
            </thead>

            <tbody>
              {contacts && contacts.length > 0 ? (
                filterContact().map((contact, i) => (
                  <tr key={i}>
                    { contact.type === 'Tenant' && (
                        <td>
                            <Link to={`/tenant/detail/${contact.idContact}`} style={{ color: "#A9B245", fontWeight: "bold" }}>
                            {highlightSearchText(contact.name)}
                            </Link>
                        </td>
                    )}

                    { contact.type === 'Sponsor' && (
                        <td>
                            <Link to={`/sponsor/detail/${contact.idContact}`} style={{ color: "#A9B245", fontWeight: "bold" }}>
                            {highlightSearchText(contact.name)}
                            </Link>
                        </td>
                    )}

                    <td>{highlightSearchText(contact.picName)}</td>
                    <td>{highlightSearchText(contact.address)}</td>
                    <td>{highlightSearchText(contact.email)}</td>
                    <td>{highlightSearchText("+62 " + contact.telephone)}</td>

                    { contact.type === 'Tenant' && (
                              <td className="text-secondary-80"><b>Tenant</b></td>
                    )}

                    { contact.type === 'Sponsor' && (
                        <td className="text-tertiary-80"><b>Sponsor</b></td>
                    )}

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No contacts available</td>
                </tr>
              )}
            </tbody>
            {search.trim() && filterContact().length === 0 && (
                <tr>
                  <td colSpan="6">No Contact match the search criteria</td>
                </tr>
              )}
          </table>
      </div>
      </React.Fragment>
    )}
      <br></br>
    </div>

      </main>
    </body>


    
  );
};

export default Contacts;