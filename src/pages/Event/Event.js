import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
// import { EventCard } from "../../components/EventCard";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../static/css/Modal.css";
import { reynaldoStyles } from "../../assets/fonts/fonts";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarBisdev } from "../../components/navbar/NavbarBisdev";
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
import "../../static/css/event/Event.css";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/event/view-all")
      .then((res) => {
        setEvents(res.data.data);
        // console.log(res.data.data); // Make sure that res.data is an array
      })
      .catch(
        err => 
        console.log(err)
    )
  }, [events]);

  const handleCreateButton = () => {
    navigate("/event/create");
  };

const filterEvent = () => {
  if (!search.trim()) return events;
  return events.filter((event) =>
    Object.values(event).some(
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
    <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
      <style>{reynaldoStyles}</style>
      {( role === 'BISDEV' ) && (
          <NavbarBisdev style={{ zIndex: 999 }} />
      )}

      {( role === 'ADMIN' ) && (
          <NavbarAdmin style={{ zIndex: 999 }} />
      )}

      <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '200px' }}>
          <div>
              <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: 'left', fontSize: 50 }}>
              Event Management</h1>
              <div>
                  <p className="subtitle">Manage your event here</p>
              </div>
          </div>
      </div>
      
      <Toaster
                position="top-center"
                reverseOrder={false}
            />

      <br></br>

      <div className="button-field">
        <button className="button-pink" onClick={handleCreateButton}>
          + Create Event
        </button>
      </div>

        <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg" style={{ width: '300px', margin: '0 auto' }}>
          <div style={{ position: 'relative' }}>
            <input
              className="search px-4 py-3 w-full focus:outline-none"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                backgroundColor: '#ffffff',
                color: '#333333',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                lineHeight: '1.5',
                padding: '0.5rem 1rem',
                width: '300px',
                paddingRight: '40px',
              }}
            />
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
                className="feather feather-search"
                style={{ color: '#333333' }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
        </div>

        <br></br>

      <div className="mb-3" style={{ display: "flex", justifyContent: "center" }}>
        <table className="event-table mx-8">
          <thead>
            {/* Row headers */}
            <tr>
              <th style={{ width: "20%", textAlign: "center"}}>Event Name</th>
              <th style={{ width: "20%", textAlign: "center"}}>Start Date</th>
              <th style={{ width: "20%", textAlign: "center"}}>End Date</th>
              <th style={{ width: "20%", textAlign: "center"}}>Location</th>
            </tr>
          </thead>

          <tbody>
            {events && events.length > 0 ? (
              filterEvent().map((event, i) => (
                <tr key={i}>
                  <td>
                    <Link to={`/event/detail/${event.idEvent}`} style={{ color: "#A9B245", fontWeight: "bold" }}>
                    {highlightSearchText(event.eventName)}
                    </Link>
                  </td>
                  <td>{highlightSearchText(event.startDate)}</td>
                  <td>{highlightSearchText(event.endDate)}</td>
                  <td>{highlightSearchText(event.location)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No events available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Event;
