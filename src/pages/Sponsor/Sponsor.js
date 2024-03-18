import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";
import Modal from "../../static/css/Modal.css";
import { reynaldoStyles } from "../../assets/fonts/fonts";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarPartnership } from "../../components/navbar/NavbarPartnership";
import "../../static/css/event/Event.css";

const Sponsor = () => {
  const [sponsors, setSponsors] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [eventData, setEventData] = useState([]);

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedEvent) {
      axios
        .get(`http://localhost:8080/api/sponsor/view-all/${selectedEvent}`)
        .then((res) => {
          setSponsors(res.data.data);
          console.log(res.data.data);
        })
        .catch((error) => {
          toast.error("Failed to fetch sponsors");
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
      <NavbarPartnership style={{ zIndex: 999 }} />

      <div className="bg-neutral-100 relative" style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: "cover", height: "200px" }}>
        <div>
          <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: "left", fontSize: 50 }}>
            Partnership Management
          </h1>
          <div>
            <p className="subtitle">Manage your sponsor here</p>
          </div>
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />

      <br></br>

      <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg" style={{ width: '200px', margin: '0 auto' }}>
                <select 
                    className="appearance-none px-4 py-3 w-full focus:outline-none" 
                    onChange={handleChange}
                    style={{
                        backgroundColor: '#ffffff',
                        color: '#333333',
                        borderRadius: '0.375rem',
                        border: '1px solid #E3E2E6',
                        fontSize: '1rem',
                        lineHeight: '1.5',
                        padding: '0.5rem 1rem',
                        width: '200px',
                        alignItems: 'center', justifyContent : 'center'
                    }}
                >
                    <option>select event</option>
                    {eventData && eventData.length > 0 ? 
                        (eventData.map((event, index) => (
                            <option key={index} value={event.idEvent}>{event.eventName}</option>
                        ))) : (
                            <option value="">No events available</option>
                        )
                    }
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
      </tr>
    </thead>

    <tbody>
      {sponsors && sponsors.length > 0 ? (
        sponsors.map((sponsor, i) => (
          <tr key={i}>
            <td>
              <Link to={`/sponsor/detail/${sponsor.idSponsor}`} style={{ color: "#A9B245", fontWeight: "bold" }}>
                {sponsor.companyName}
              </Link>
            </td>
            <td>{sponsor.picName}</td>
            <td>{sponsor.companyAddress}</td>
            <td>{sponsor.companyEmail}</td>
            <td>{sponsor.companyTelephone}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6">No sponsors available</td>
        </tr>
      )}
    </tbody>
  </table>
) : (
  <div className="text-center">Please select an event to view sponsors</div>
)}
      </div>
    </div>
  );
};

export default Sponsor;
