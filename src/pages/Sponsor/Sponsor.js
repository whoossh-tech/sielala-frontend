import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";
import Modal from "../../static/css/Modal.css";
import { reynaldoStyles } from "../../assets/fonts/fonts";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarPartnership } from '../../components/navbar/NavbarPartnership';
import "../../static/css/event/Event.css";

const Sponsor = () => {
  const [sponsors, setSponsors] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [eventData, setEventData] = useState([]);

  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/sponsor/view-all")
      .then((res) => {
        setSponsors(res.data.data);
        console.log(res.data.data); // Make sure that res.data is an array
      })
      .catch((error) => {
        toast.error("Failed to fetch sponsors");
      });
  }, [sponsors]);

  const handleCreateButton = () => {
    navigate("/sponsor/create");
  };

  return (
    <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
      <style>{reynaldoStyles}</style>
      <NavbarPartnership />

      <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '200px' }}>
          <div>
              <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: 'left', fontSize: 50 }}>
              Partnership Management</h1>
              <div>
                  <p className="subtitle">Manage your sponsor here</p>
              </div>
          </div>
      </div>

      <br></br>

      <div className="button-field">
        <button className="button-pink" onClick={handleCreateButton}>
          + Add Sponsor
        </button>
      </div>

      <div className="mb-3" style={{ display: "flex", justifyContent: "center" }}>
        <table className="event-table mx-8">
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
                    <a href={`/sponsor/detail/${sponsor.idSponsor}`} style={{ color: '#A9B245', fontWeight: 'bold'}}>{sponsor.sponsorName}</a>
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