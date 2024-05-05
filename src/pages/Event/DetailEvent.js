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
import Sidebar from '../../pages/dashboard/Sidebar';
import '../../static/css/Style.css';
import { Link, useParams } from "react-router-dom";

const DetailEvent = () => {
  const navigate = useNavigate();
  const { idEvent } = useParams();
  const role = localStorage.getItem('role');

  const [eventData, setEventData] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [tenantData, setTenantData] = useState();
  const [activePage, setActivePage] = useState('event');

  const currentDate = new Date();

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    axios
      .get(`https://sielala-backend-production.up.railway.app/api/event/detail/${idEvent}`)
      .then((res) => {
        setEventData(res.data.data);
        setStartDate(new Date(eventData.startDate));
      })
      .catch((err) => console.log(err));
  });

  const handleBack = () => {
    navigate('/event');
  };

  return (
    <body>
      <Sidebar activePage={activePage}/> 
      <main style={{ marginLeft: "60px" }}>
        
        {/* Header Start */}
        <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '150px' }}>
            <div className="mx-8">
                <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 mx-8" style={{ paddingTop: 35, textAlign: 'left', fontSize: 50 }}>
                Event Detail</h1>
            </div>
            <div>
                <p className="subtitle">
                    <a href='/dashboard' style={{ borderBottom: '1px solid #E685AE', textDecoration: 'none' }}>Dashboard</a> / 
                    <a onClick={handleBack} style={{ borderBottom: '1px solid #E685AE', textDecoration: 'none', cursor: 'pointer' }}> Visitor List </a>
                    / Detail
                </p>
            </div>
        </div>
        {/* Header Ends */}

        <div className='content-container my-8'>
          <div className="dashboard-container">
            <div>
                <Toaster
                          position="top-center"
                          reverseOrder={false}
                      />

                <br></br>

                <div className="container mx-auto py-8">

                  <div className="detail-sponsor bg-white p-6 rounded-lg shadow-md mb-4">

                  <div className="ml-10" style={{justifyContent: "right"}}>
                          {currentDate < startDate ? (
                            <Link to={`/event/edit/${idEvent}`}>
                              <button className="button-pink">Edit Event</button>
                            </Link>
                          ) : (
                              <button className="button-pink" disabled>Edit Event</button>
                          )}
                  </div>
                    {/* <div className="flex justify-between items-center mb-4 grid grid-cols-3 w-full mx-auto"> */}

                      {/* <div className="mr-96">
                        <button className="button-green w-24" onClick={handleBack}>
                          Back
                        </button>
                      </div> */}

                      {/* <div className="ml-10">
                          {currentDate < startDate ? (
                            <Link to={`/event/edit/${idEvent}`}>
                              <button className="button-pink">Edit Event</button>
                            </Link>
                          ) : (
                              <button className="button-pink" disabled>Edit Event</button>
                          )}
                      </div> */}
                    {/* </div> */}

                    <div>
                        <h1 className="text-2xl font-semibold mb-34" style={{ textAlign: "center" }}>Event Detail</h1>
                    </div>

                  <div className="each-event">
                      <p className="event-text-title">Event Name:</p>
                      <p className="reward-text">{eventData?.eventName}</p>
                    </div>
                    <div className="each-event">
                      <p className="event-text-title">Start Date:</p>
                      <p className="reward-text">{eventData?.startDate ? new Date(eventData.startDate).toLocaleDateString("en-GB") : ""}</p>
                    </div>
                    <div className="each-event">
                      <p className="event-text-title">End Date:</p>
                      <p className="reward-text">{eventData?.endDate ? new Date(eventData.endDate).toLocaleDateString("en-GB") : ""}</p>
                    </div>
                    <div className="each-event">
                      <p className="event-text-title">Location:</p>
                      <p className="reward-text">{eventData?.location}</p>
                    </div>
                  </div>

                  <br></br>
                  <br></br>

                  <h1 className="text-2xl font-semibold mb-4">Accepted Tenant</h1>
                  {/* <div className="bg-white p-6 rounded-lg shadow-md mb-4"> */}
                      <div className="mb-3 rounded-md" style={{ display: "flex", justifyContent: "center" }}>
                        <table className="event-table mx-8 rounded">
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
                                <td colSpan="5">No tenant data available</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  {/* </div> */}
                </div>
              </div>
          <script src="script.js"></script>  
        </div>
        
      </main>
    </body>
  );
};

export default DetailEvent;
