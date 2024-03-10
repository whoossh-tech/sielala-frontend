import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";
import Modal from "../../static/css/Modal.css";
import { reynaldoStyles } from "../../assets/fonts/fonts";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarBisdev } from "../../components/navbar/NavbarBisdev";
import "../../static/css/event/Event.css";

const Sponsor = () => {
  const [sponsors, setSponsors] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [eventData, setEventData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedEvent) {
      axios
        .get(`http://localhost:8080/api/sponsor/view-all/${selectedEvent}`)
        .then((res) => {
          setSponsors(res.data.data);
          console.log(sponsors)
        })
        .catch((err) => console.log(err));
    }

    axios
      .get("http://localhost:8080/api/event/view-all")
      .then((res) => {
        setEventData(res.data.data);
        // console.log(res.data.data); // Make sure that res.data is an array
      })
      .catch((error) => {
        toast.error("Failed to fetch sponsors");
      });
  }, [selectedEvent]);

  const handleCreateButton = () => {
    navigate("/sponsor/create");
  };

  const handleChange = (e) => {
    setSelectedEvent(e.target.value);
  };

  return (
    <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
      <style>{reynaldoStyles}</style>
      <NavbarBisdev />

      <div className="bg-neutral-100 relative" style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: "cover", height: "120px" }}>
        <div className="text-wrapper">
          <h1 className="title">Partnership Management</h1>
          <div className="subtitle-wrapper">
            <p className="subtitle">Manage your sponsor here</p>
          </div>
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />

      <br></br>

      <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg">
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
        <table className="event-table">
          <thead>
            {/* Row headers */}
            <tr>
              <th>ID</th>
              <th>Company Name</th>
              <th>Pic Name</th>
              <th>Company Address</th>
              <th>Company Email</th>
            </tr>
          </thead>

          <tbody>
            {sponsors && sponsors.length > 0 ? (
              sponsors.map((sponsor, i) => (
                <tr key={i}>
                  <td>{sponsor.idSponsor}</td>
                  <td>
                    <Link to={`/sponsor/detail/${sponsor.idSponsor}`} style={{ color: "#A9B245", fontWeight: "bold" }}>
                      {sponsor.companyName}
                    </Link>
                    <a href={`/sponsor/detail/${sponsor.idSponsor}`} style={{ color: "#A9B245", fontWeight: "bold" }}>
                      {sponsor.sponsorName}
                    </a>
                  </td>
                  <td>{sponsor.picName}</td>
                  <td>{sponsor.companyAddress}</td>
                  <td>{sponsor.companyEmail}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No sponsors available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sponsor;
