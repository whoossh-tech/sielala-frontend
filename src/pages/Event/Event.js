import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
// import { EventCard } from "../../components/EventCard";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../static/css/Modal.css";
import { reynaldoStyles } from "../../assets/fonts/fonts";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarBisdev } from "../../components/navbar/NavbarBisdev";
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

  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/event/view-all")
      .then((res) => {
        setEvents(res.data.data);
        // console.log(res.data.data); // Make sure that res.data is an array
      })
      .catch((error) => {
        toast.error("Failed to fetch events");
      });
  }, [events]);

  const handleCreateButton = () => {
    navigate("/event/create");
  };

  return (
    <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
      <style>{reynaldoStyles}</style>
      <NavbarBisdev />

      <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '200px' }}>
          <div>
              <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: 'left', fontSize: 50 }}>
              Event Management</h1>
              <div>
                  <p className="subtitle">Manage your event here</p>
              </div>
          </div>
      </div>

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
              <th>ID</th>
              <th>Event Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Location</th>
            </tr>
          </thead>

          <tbody>
            {events && events.length > 0 ? (
              events.map((event, i) => (
                <tr key={i}>
                  <td>{event.idEvent}</td>
                  <td>
                    <Link to={`/event/detail/${event.idEvent}`} style={{ color: "#A9B245", fontWeight: "bold" }}>
                    {event.eventName}
                    </Link>
                    <a href={`/event/detail/${event.idEvent}`} style={{ color: '#A9B245', fontWeight: 'bold'}}>{event.eventName}</a>
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
