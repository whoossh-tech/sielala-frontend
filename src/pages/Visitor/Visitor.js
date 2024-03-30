import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { NavbarPartnership } from "../../components/navbar/NavbarPartnership";
import backgroundPhoto from "../../assets/bg-cover.png";
import "../../static/css/Visitor.css";

const Visitor = () => {
  const [visitors, setVisitors] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [eventData, setEventData] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/visitor/view-event-all")
      .then((res) => {
        setEventData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setSelectedEvent(e.target.value);
  };

  useEffect(() => {
    if (selectedEvent) {
      axios
        .get(`http://localhost:8080/api/visitor/view-all/${selectedEvent}`)
        .then((res) => {
          setVisitors(res.data.data);
        })
        .catch((error) => {
          toast.error("Failed to fetch visitors");
        });
    }
  }, [selectedEvent]);

  const filterVisitors = () => {
    if (!search.trim()) return visitors;
    return visitors.filter((visitor) =>
      Object.values(visitor).some(
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
      <NavbarPartnership style={{ zIndex: 999 }} />
      <div
        className="bg-neutral-100 relative"
        style={{
          backgroundImage: `url(${backgroundPhoto})`,
          backgroundSize: "cover",
          height: "200px",
        }}
      >
        <div>
          <h1
            id="page-title"
            className="font-reynaldo mb-6 text-primary-10 ml-6"
            style={{
              paddingTop: 80,
              paddingLeft: 185,
              textAlign: "left",
              fontSize: 50,
            }}
          >
            Visitor Data Management
          </h1>
          <div>
            <p className="subtitle">Manage your visitor here</p>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
      <br />
      <div
        className="relative overflow-clip w-full border border-neutral-40 rounded-lg"
        style={{ width: "200px", margin: "0 auto" }}
      >
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
      <br />
      <input
        className="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="mb-3" style={{ display: "flex", justifyContent: "center" }}>
        {selectedEvent ? (
          <table className="event-table mx-8">
            <thead>
              <tr>
                <th style={{ width: "20%", textAlign: "center" }}>Event Pass</th>
                <th style={{ width: "20%", textAlign: "center" }}>Name</th>
                <th style={{ width: "20%", textAlign: "center" }}>Email</th>
                <th style={{ width: "20%", textAlign: "center" }}>
                  Telephone No.
                </th>
              </tr>
            </thead>
            <tbody>
              {filterVisitors().map((visitor, i) => (
                <tr key={i}>
                  <td>{highlightSearchText(visitor.eventPass)}</td>
                  <td>{highlightSearchText(visitor.name)}</td>
                  <td>{highlightSearchText(visitor.email)}</td>
                  <td>{highlightSearchText(visitor.telephone)}</td>
                </tr>
              ))}
              {filterVisitors().length === 0 && (
                <tr>
                  <td colSpan="4">No visitors match the search criteria</td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <div className="text-center">Please select an event to view visitors</div>
        )}
      </div>
    </div>
  );
};

export default Visitor;
