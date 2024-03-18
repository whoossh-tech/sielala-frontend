import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import { reynaldoStyles } from "../../assets/fonts/fonts";
import "../../static/css/event/DetailEvent.css";
import "../../static/css/Button.css";
import backgroundPhoto from "../../assets/bg-cover.png";
import { NavbarBisdev } from "../../components/navbar/NavbarBisdev";
import { toast, Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

const DetailEvent = () => {
  const navigate = useNavigate();
  const { idEvent } = useParams();
  const [eventData, setEventData] = useState();
  const [tenantData, setTenantData] = useState();

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/event/detail/${idEvent}`)
      .then((res) => {
        setEventData(res.data.data);
      })
      .catch((err) => console.log(err));
    console.log(eventData);
  });

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
      <NavbarBisdev />

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

      <br></br>

      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-4">
          <button className="button-green" onClick={handleBack}>
            Back
          </button>
          <h1 className="text-2xl font-semibold mb-4" style={{ marginLeft: "-6%" }}>Event Detail</h1>
          <div></div>
        </div>

        <div className="detail-sponsor bg-white p-6 rounded-lg shadow-md mb-4">
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
