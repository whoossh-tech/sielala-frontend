import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";
import Modal from "../../static/css/Modal.css";
import { reynaldoStyles } from "../../assets/fonts/fonts";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarPartnership } from "../../components/navbar/NavbarPartnership";
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
import "../../static/css/event/Event.css";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [eventData, setEventData] = useState([]);

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (selectedEvent) {
      axios
        .get(`http://localhost:8080/api/contact/all/${selectedEvent}`)
        .then((res) => {
          setContacts(res.data.data);
          console.log(res.data.data);
        })
        .catch((error) => {
          setContacts([]);
        });
    }

    axios
      .get("http://localhost:8080/api/sponsor/view-event-all")
      .then((res) => {
        setEventData(res.data.data);
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
            Partnership Management
          </h1>
          <div>
            <p className="subtitle">Manage your contact here</p>
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
          style={{
            backgroundColor: "#ffffff",
            color: "#333333",
            borderRadius: "0.375rem",
            border: "1px solid #E3E2E6",
            fontSize: "1rem",
            lineHeight: "1.5",
            padding: "0.5rem 1rem",
            width: "200px",
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
      </div>

      <br></br>

      <div className="button-field">
        <button className="button-pink" onClick={handleCreateButton}>
          + Add Sponsor
        </button>
      </div>

      <div className="mb-3" style={{ display: "flex", justifyContent: "center" }}>
        {selectedEvent ? (
          <table className="event-table mx-8">
            <thead>
              {/* Row headers */}
              <tr>
                <th style={{ width: "20%", textAlign: "center" }}>Company Name</th>
                <th style={{ width: "20%", textAlign: "center" }}>Pic Name</th>
                <th style={{ width: "20%", textAlign: "center" }}>Company Address</th>
                <th style={{ width: "20%", textAlign: "center" }}>Company Email</th>
                <th style={{ width: "20%", textAlign: "center" }}>Company Telephone</th>
                <th style={{ width: "20%", textAlign: "center" }}>Contact Type</th>
              </tr>
            </thead>

            <tbody>
              {contacts && contacts.length > 0 ? (
                contacts.map((contact, i) => (
                  <tr key={i}>
                    { contact.type === 'Tenant' && (
                        <td>
                            <Link to={`/tenant/detail/${contact.idContact}`} style={{ color: "#A9B245", fontWeight: "bold" }}>
                            {contact.name}
                            </Link>
                        </td>
                    )}

                    { contact.type === 'Sponsor' && (
                        <td>
                            <Link to={`/sponsor/detail/${contact.idContact}`} style={{ color: "#A9B245", fontWeight: "bold" }}>
                            {contact.name}
                            </Link>
                        </td>
                    )}

                    <td>{contact.picName}</td>
                    <td>{contact.address}</td>
                    <td>{contact.email}</td>
                    <td>{contact.telephone}</td>

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
          </table>
        ) : (
          <div className="text-center">Please select an event to view contacts</div>
        )}
      </div>

      <br></br>
    </div>
  );
};

export default Contacts;