import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import { reynaldoStyles } from "../../assets/fonts/fonts";
import "../../static/css/event/DetailEvent.css";
import "../../static/css/Button.css";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarBisdev } from "../../components/navbar/NavbarBisdev";
import { NavbarAdmin } from "../../components/navbar/NavbarAdmin";
import { toast, Toaster } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const DetailEvent = () => {
  const navigate = useNavigate();
  const { idEvent } = useParams();
  const role = localStorage.getItem('role');

  const [eventData, setEventData] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [tenantData, setTenantData] = useState();
  const currentDate = new Date();

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/event/detail/${idEvent}`)
      .then((res) => {
        setEventData(res.data.data);
        setStartDate(new Date(eventData.startDate));
      })
      .catch((err) => console.log(err));
  });

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
      {( role === 'BISDEV' ) && (
          <NavbarBisdev style={{ zIndex: 999 }} />
      )}

      {( role === 'ADMIN' ) && (
          <NavbarAdmin style={{ zIndex: 999 }} />
      )}

      <div className="bg-neutral-100 relative" style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: "cover", height: "200px" }}>
        <div>
          <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: "left", fontSize: 50 }}>
            Event Detail
          </h1>
          <div>
            <p className="subtitle">Manage and view event data here</p>
          </div>
        </div>
      </div>
      
      <Toaster
                position="top-center"
                reverseOrder={false}
            />

      <br></br>

      <div className="container mx-auto py-8">

        <div className="detail-sponsor bg-white p-6 rounded-lg shadow-md mb-4">

        <div className="flex justify-between items-center mb-4 grid grid-cols-3 w-full mx-auto">

          <div className="mr-96">
            <button className="button-green w-24" onClick={handleBack}>
              Back
            </button>
          </div>

          <div>
            <h1 className="text-2xl font-semibold mb-4" style={{ textAlign: "center" }}>Event Detail</h1>
          </div>

          <div className="ml-10">
              {currentDate < startDate ? (
                <Link to={`/event/edit/${idEvent}`}>
                  <button className="button-pink">Edit Event</button>
                </Link>
              ) : (
                  <button className="button-pink" disabled>Edit Event</button>
              )}
          </div>
        </div>

          <div className="each-event">
            <p className="event-text-title">Event Name:</p>
            <p className="reward-text">{eventData?.eventName}</p>
          </div>
          <div className="each-event">
            <p className="event-text-title">Start Date:</p>
            <p className="reward-text">{eventData?.startDate ? new Date(eventData.startDate).toLocaleDateString("en-GB") : ""}</p> {/* Convert startDate to desired format */}
          </div>
          <div className="each-event">
            <p className="event-text-title">End Date:</p>
            <p className="reward-text">{eventData?.endDate ? new Date(eventData.endDate).toLocaleDateString("en-GB") : ""}</p> {/* Convert endDate to desired format */}
          </div>
          <div className="each-event">
            <p className="event-text-title">Location:</p>
            <p className="reward-text">{eventData?.location}</p>
          </div>
        </div>

        <br></br>
        <br></br>

        <h1 className="text-2xl font-semibold mb-4">Accepted Tenant</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <table className="Tenant-table w-full">
            <thead>
              <tr>
                <th style={{ width: "20%", textAlign: "center" }}>Brand Name</th>
                <th style={{ width: "20%", textAlign: "center" }}>PIC Name</th>
                <th style={{ width: "20%", textAlign: "center" }}>Brand Email</th>
                <th style={{ width: "20%", textAlign: "center" }}>Brand Telephone</th>
              </tr>
            </thead>
            <tbody>
              {eventData?.listTenant && eventData.listTenant.length > 0 ? (
                eventData.listTenant.map((tenant, i) => (
                  <tr key={i}>
                    <td>{tenant.brandName}</td>
                    <td>{tenant.picName}</td>
                    <td>{tenant.brandEmail}</td>
                    <td>{tenant.brandTelephone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No tenantData available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailEvent;
