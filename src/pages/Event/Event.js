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
              {/* <div>
                  <p className="subtitle">Manage your event here</p>
              </div> */}
              <div>
                <p className="subtitle">
                  <a href='/dashboard' style={{ textDecoration: 'none' }}>
                      <span style={{ borderBottom: '1px solid #E685AE' }}>Dashboard</span>&nbsp;
                  </a>
                  / Event Management
                </p>
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
              events.map((event, i) => (
                <tr key={i}>
                  <td>
                    <Link to={`/event/detail/${event.idEvent}`} style={{ color: "#A9B245", fontWeight: "bold" }}>
                    {event.eventName}
                    </Link>
                  </td>
                  <td>{event.startDate}</td>
                  <td>{event.endDate}</td>
                  <td>{event.location}</td>
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
